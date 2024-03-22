export function Comment(router, post, parent, post_id) {

    const { ViewPost, IsLogedIn, CommentLiked, LikeComment, GetProfile } = require("../scripts/api.mjs")
    const { Module,Display } = require("../lib/Framework.mjs")
    
    const display = new Display()
    const module = new Module("Comment")
    const blank_logo = module.image("logo_blank.svg")

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = ('0' + a.getHours()).slice(-2); // Pad single-digit hours with leading zero
        var min = ('0' + a.getMinutes()).slice(-2); // Pad single-digit minutes with leading zero
        var sec = ('0' + a.getSeconds()).slice(-2); // Pad single-digit seconds with leading zero
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }


    module.html(`
    <div id="comment">
        <div id="comment-top-container">
            <img id="comment-img" class="profile-picture" class="text"></img>
            <div id="comment-user" class="text username">Loading...</div>
            <div class="comment-badges-container"></div>
            <div id="comment-meta" class="text timestamp" >BlockCoin Browser App - Loading...</div>
        </div>
        <div id="comment-data" class="text data">Loading...</div>
        <div id="comment-stats" class="stats text">
            <span class="material-symbols-outlined like-button">favorite</span> 
            <span class="likes">0</span>
            <div id="reply-button" class="reply-button"><span class="material-symbols-outlined">reply</span> Reply </div> 
        </div>
    </div>
    <div id="comment-reply" class="comment-reply">
    </div>
    `)

    module.css(`
    .a-blockcoin {
        width:24px;
        height:24px;
    }
    .like-button {
        transition-duration: 0.5s;
        cursor:pointer;
    }
    .like-button:hover {
        font-size: 26px;
    }
    .a-blockcoin:hover {
        transition-duration: 0.5s;
        cursor:pointer;
        width:26px;
        height:26px;
    }
    .liked {
        color:#FF0000;
        font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
    #comment {
        background: ${display.get("comment")["background"]};
        width:100%;
        min-width:450px;
        height: 100%;
        top:0;
        left:0;
        border: ${display.get("comment")["border"]};
        border-radius: ${display.get("comment")["border-radius"]}
    }
    .comment-reply {
        width:90%;
        height: fit-content;
    }
    .comment-badge {
        font-size: 25px;
        color: ${display.get("badge")["color"]};
  
      }
      #comment-badges-container {
        width:20%;
        display:flex;
        flex-direction:row;
        justify-content:flex-start;
        align-items:center;
        margin:10px;
        border:${display.get("badge")["border"]};
        border-radius:${display.get("badge")["border-radius"]};
      }
    .text {
        font-family: '${display.get("text")["font"]}', sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        font-size: ${display.get("text")["size"][1]};
        color:${display.get("text")["color"]};
    }

    #comment-img {
        cursor:pointer;
        border-radius:256px;
        width: 48px;
        height: 48px;
        margin: 10px;
    }

    #comment-user {
        cursor:pointer;
        margin: 10px;
        margin-left:0;
    }

    #comment-top-container {
        position:relative;
        top:0;
        left:0;
        width:100%;
        height:fit-content;
        display:flex;
        justify-content: start;
        align-items: center;
        flex-direction: row;
    
    }
    #reply-button {
        cursor:pointer;
        transition-duration: 0.5s;
        font-family: '${display.get("text")["font"]}', sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        font-size: ${display.get("text")["size"][1]};
        color:${display.get("text")["color"]};
        height:auto;
        width:auto;
        text-align:center;
        width:fit-content;
      }
      #reply-button:hover {
        font-size: 26px;
      }
    #comment-meta {
        margin: 10px;
        font-weight: 300;
        font-size: 17px;
    }
    #comment-stats {
        margin: 10px;
        bottom:0;
        position:relative;
        right:0;
        text-align:right;
        font-weight: 300;
        font-size: 17px;
    }
    #comment-data {
        margin: 10px;
    }
    `)
    module.parent(parent)
    function on_render() {
        let buyer = null
        module.div.id = post["id"]
        document.getElementById("comment-reply").id = post["id"] + "-container"
        let text = post["data"]
        text = text.replace(/>/g, '')
        text = text.replace(/</g, '')
        var htmlContent = marked.parse(text);
        module.div.getElementsByClassName("username")[0].innerText = post["user"]
        module.div.getElementsByClassName("data")[0].innerHTML = htmlContent;
        module.div.getElementsByClassName("timestamp")[0].innerText = `${timeConverter(post["date"])}`
        module.div.getElementsByClassName("reply-button")[0].onclick = function(){
            router.navigateTo("/comment/"+post_id+"/"+post["id"])
        }
        if (buyer == null) {
            module.div.getElementsByClassName("profile-picture")[0].src = post["profile-picture"]
        } else {
            module.div.getElementsByClassName("profile-picture")[0].src = buyer["profile-picture"]
        }

        module.div.getElementsByClassName("likes")[0].innerText = post["likes"]
        module.div.getElementsByClassName("profile-picture")[0].onclick = function () {
            router.navigateTo("/profile/" + post["user-id"])
        }
        module.div.getElementsByClassName("username")[0].onclick = function () {
            router.navigateTo("/profile/" + post["user-id"])
        }
        const container = module.div.getElementsByClassName("comment-badges-container")[0];

        const badges = [
            "award_star", "verified", "shield_person", "smart_toy", "local_fire_department", "science", 'bug_report'
        ]
        const titles = [
            "BlockCoin Admin", "Verified Account", "BlockCoin Staff", "Bot Account", "BlockCoin Premium", "Beta Tester", "Bug Report"
        ]

        for (var i = 0; i < post["badges"].length; i++) {
            var span = document.createElement("span");
            span.className = "material-symbols-outlined comment-badge";
            span.innerHTML = badges[post["badges"][i]];
            span.title = titles[post["badges"][i]]
            // Append the span element to the container div
            container.appendChild(span);
        }

        let liked = false
        let sent_requests = false
        function check_scroll() {
            var targetDiv = module.div;
            var bounding = targetDiv.getBoundingClientRect();

            // Checking if the div is in the viewport
            if (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                if (IsLogedIn() && sent_requests == false) {
                    sent_requests = true
                    CommentLiked(post_id, post["id"]).then((data) => {
                        console.log(data)
                        liked = data["liked"]
                        if (data["liked"]) {
                            module.div.getElementsByClassName("like-button")[0].classList.add('liked')
                        }
                    })
                    module.div.getElementsByClassName("like-button")[0].onclick = function () {
                        console.log("Clicked")
                        if (liked) {
                            liked = false
                            module.div.getElementsByClassName("like-button")[0].classList.remove('liked')
                            module.div.getElementsByClassName("likes")[0].innerText = parseInt(module.div.getElementsByClassName("likes")[0].innerText) - 1
                            LikeComment(post["id"], post_id)
                        } else {
                            liked = true
                            module.div.getElementsByClassName("like-button")[0].classList.add('liked')
                            module.div.getElementsByClassName("likes")[0].innerText = parseInt(module.div.getElementsByClassName("likes")[0].innerText) + 1
                            LikeComment(post["id"], post_id)
                        }
                    }
                }
            }
        }
        check_scroll()
        window.addEventListener('scroll', function () {
            check_scroll()
        });
    }
    module.on_render(on_render)
    const element = document.getElementById(post["id"]);
    if (element == null) {
        module.render()
    } else {
        return ""
    }
}


