export function Trending(router) {
    const { Page } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { Post } = require("../elements/post.mjs")
    const { IsLogedIn } = require("../scripts/api.mjs")
    const { Notification } = require("../elements/notifications.mjs")
    const { NewPostButton } = require("../elements/new_post_button.mjs")

    const page = new Page("Trending")

    page.clear(["background","navbar","fonts","new_post_button"])

    Fonts(router)
    Background(router)
    Navbar(router)
    NewPostButton(router)

    page.html(`
    <div id="post-container">

    </div>
    `)

    page.css(`

    #post-container {
        margin-top: 7.5%;
        position: absolute;
        min-height:100%;
        width:100%;
        height:fit-content;
        top:0;
        left:0;
        display:flex;
        justify-content:start;
        align-items:center;
        flex-direction:column;
    }

    #post-container post {
      width:60%;
      height:fit-content;
      min-height: 5%;
      margin: 1%
    }
    `)

    let api_url = "wss://api.blockcoin.social"
    if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
        api_url = "ws://127.0.0.1:8080"
    }
    let socket = null;
    function on_render() {



      socket = new WebSocket(api_url+'/post');
      let cache = []

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
        function parsecache() {
          if (cache != null) {
            if (cache["opcode"] == 5) {
              for (const [key, value] of Object.entries(cache["data"])) {
                try {
                  const post = value
                  let post_data  = post["data"]
                  post_data["user-id"] = post["profile"]["id"]
                  post_data["user"] = post["profile"]["display"]
                  post_data["profile-picture"] = post["profile"]["profile-picture"]
                  post_data["badges"] = post["profile"]["badges"]
                  const new_post = new Post(router,post_data,document.getElementById("post-container"))
                } catch (e) {
                  console.log("Error", e.stack);
                  console.log("Error", e.name);
                  console.log("Error", e.message);
              }
              }
              
            }
          }
        }

        socket.addEventListener('message', function (event) {
          const data = JSON.parse(event.data)
          cache = data
          parsecache()
        });
        socket.addEventListener('close', function (event) {
          socket = new WebSocket(api_url+'/post')
        });
        socket.addEventListener('open', function (event) {
          socket.send(JSON.stringify({'opcode':5,'limit':10}))

        })
        window.onscroll = function() {
          var scrollHeight = document.documentElement.scrollHeight;
          var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
          var windowHeight = window.innerHeight;
          if (scrollTop + windowHeight >= scrollHeight) {
              socket.send(JSON.stringify({'opcode':2,'limit':20}))
              parsecache()
          }
        

    };
    
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