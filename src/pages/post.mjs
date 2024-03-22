export function Post(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { Post } = require("../elements/post.mjs")
    const { IsLogedIn, GetComments } = require("../scripts/api.mjs")
    const { Notification } = require("../elements/notifications.mjs")
    const { NewPostButton } = require("../elements/new_post_button.mjs")
    const { Comment } = require("../elements/comment.mjs")

    const display = new Display()
    const page = new Page("Post")

    page.clear(["background", "navbar", "fonts", "new_post_button"])

    Fonts(router)
    Background(router)
    Navbar(router)
    NewPostButton(router)

    page.html(`
    <div id="comment-container" />
        <div id="post-container-single"> </div>
        <div class="title">Comments <div id="new-button"><span class="material-symbols-outlined">add</span> New Comment </div> </div>
        <div id="comment-container"></div>
    </div>
    `)

    page.css(`
    #global-container {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        position: absolute;
        left: 0;
        width: 100%;
        height: fit-content;
    }
    .title {
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        color: ${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][2]}; /* Adjust font size */
        width: 60%;
    }

    #post-container-single {
        margin-top: 7.5%;
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
    }

    #post-container-single post {
        width: 60%;
        height: fit-content;
        min-height: 5%;
        margin: 1%;
    }

    #comment-container {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
    }

    #comment-container comment {
        width: 60%;
        height: fit-content;
        min-height: 5%;
        margin-top: 1%;
    }

    #new-button {
        cursor: pointer;
        transition-duration: 0.5s;
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        font-size: ${display.get("text")["size"][1]}; /* Adjust font size */
        color: ${display.get("text")["color"]};
        height: auto;
        width: auto;
        text-align: center;
        width: fit-content;
    }
    #new-button:hover {
        font-size: ${parseInt(display.get("text")["size"][2]) + 2}px; /* Increase font size on hover */
    }
`);


    function on_render() {
        let api_url = "wss://api.blockcoin.social"
        if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost") {
            api_url = "ws://127.0.0.1:8080"
        }
        let socket = null;
        let cache = null
        const post_id = window.location.pathname.split("/")[2]
        
        document.getElementById("new-button").onclick = function(){
            router.navigateTo("/comment/"+post_id)
        }

        socket = new WebSocket(api_url + '/post');

        socket.addEventListener('message', function (event) {
            const data = JSON.parse(event.data)
            cache = data
        });

        function waitForNonNullCache(interval = 100) {
            return new Promise((resolve) => {
                function checkVariable() {
                    (cache)
                    if (cache !== null) {
                        resolve(cache);
                    } else {
                        setTimeout(checkVariable, interval);
                    }
                }
                checkVariable();
            });
        }

        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify({ 'opcode': 1, "id": post_id }))
        })


        waitForNonNullCache().then((value) => {
            const post = value
            if (value["success"] != true) {
                Notification(1,"Unknown Post")
                router.navigateTo("/explore")
                return ""
              }
            let post_data = post["data"]
            post_data["user-id"] = post["profile"]["id"]
            post_data["user"] = post["profile"]["display"]
            post_data["profile-picture"] = post["profile"]["profile-picture"]
            post_data["badges"] = post["profile"]["badges"]
            const new_post = new Post(router, post_data, document.getElementById("post-container-single"))
        });
        let post_hierarcy = {} //Ig that's how you write it i'm not sure about it tbh but i'm gonna let it like that for now

        function add_all_comments_for_key(key) { //a bit long I have to admit lol
            if (key in post_hierarcy) {
                
                for (const comment in post_hierarcy[key]) {
                    let parent = "comment-container"
                    if (key != "/") {
                        parent = key+"-container"
                    }
                    console.log(parent)
                    console.log(post_hierarcy[key][comment])
                    const new_comment = new Comment(router,post_hierarcy[key][comment],document.getElementById(parent),post_id)
                    add_all_comments_for_key(post_hierarcy[key][comment]["id"])
                }
            }
        }

        GetComments(post_id).then(function(data){ 
            for (const [key, value] of Object.entries(data)) {
                console.log(value)
                if (value["parent"] in post_hierarcy) {
                    post_hierarcy[value["parent"]].push(value)
                } else {
                    post_hierarcy[value["parent"]] = [value]
                }
            }
            console.log(post_hierarcy)
            add_all_comments_for_key("/")
            //const new_comment = new Comment(router,value,document.getElementById("comment-container"))
        })
    }



    page.delete_animation(`
    @keyframes delete {
        0% {
          opacity: 1;
          transform: translateY(0%);
        }
        100% {
          opacity: 0;
          transform: translateY(10%); /* Adjust the distance you want to move on the y-axis */
        }
      }
    `
    )
    page.spawn_animation(`
    @keyframes spawn {
        0% {
          opacity: 0;
          transform: translateY(-10%);
        }
        100% {
          opacity: 1;
          transform: translateY(0); /* Adjust the distance you want to move on the y-axis */
        }
      }
    `
    )

    function on_delete() {
        socket.close()
    }

    page.on_delete(on_delete)

    page.on_render(on_render)
    page.render()
}