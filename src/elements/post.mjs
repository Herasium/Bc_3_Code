export function Post(router, post, parent) {

    const { Module, Display } = require("../lib/Framework.mjs")
    const { ViewPost, IsLogedIn, PostLiked, LikePost, GetProfile } = require("../scripts/api.mjs")

    const display = new Display()
    const module = new Module("Post")
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
    <div id="post" class="post">
        <div id="top-container">
            <img id="post-img" class="profile-picture" class="text"></img>
            <div id="post-user" class="text username">Loading...</div>
            <div class="post-badges-container"></div>
        </div>
        <div id="post-data" class="text data">Loading...</div>
        <div id="post-meta" class="text timestamp" >BlockCoin Browser App - Loading...</div>
        <div id="post-stats" class="stats text">
            <span class="material-symbols-outlined">visibility</span> 
            <span class="views">0</span> 
            <span class="material-symbols-outlined like-button">favorite</span> 
            <span class="likes">0</span> 
            <span class="material-symbols-outlined comment-button">chat</span> 
            <span class="comment">0</span> 
            <img src="${blank_logo}" class="a-blockcoin" /> 
            <span class="blockcoin">0</span> 
        </div>
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
    .comment-button:hover {
        font-size: 26px;
    }
    .comment-button {
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
    #post {
        background: ${display.get("post")["background"]};
        width:100%;
        height: 100%;
        top:0;
        left:0;
        border: ${display.get("post")["border"]};
        border-radius: ${display.get("post")["border-radius"]}
    }
    .post-badge {
        font-size: 25px;
        color: ${display.get("badge")["color"]};
  
      }
      #post-badges-container {
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


    #post-img {
        cursor:pointer;
        border-radius:256px;
        width: 48px;
        height: 48px;
        margin: 10px;
    }

    #post-user {
        cursor:pointer;
        margin: 10px;
        margin-left:0;
    }

    #top-container {
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

    #post-meta {
        margin: 10px;
        font-weight: 300;
        font-size: 17px;
    }
    #post-stats {
        margin: 10px;
        bottom:0;
        position:relative;
        right:0;
        text-align:right;
        font-weight: 300;
        font-size: 17px;
    }
    #post-data {
        margin: 10px;
    }
    `)
    module.parent(parent)
    function on_render() {
        console.log(post)
        let buyer = null
        if ("comments" in post) {
            module.div.getElementsByClassName("comment")[0].innerText = Object.keys(post["comments"]).length
        }
        if (post["buyer"] != "None") {
            GetProfile(post["buyer"]).then(function (value) {
                buyer = value
                let liked = false
                module.div.id = post["id"]
                if (buyer == null) {
                    module.div.getElementsByClassName("username")[0].innerText = post["user"]
                } else {
                    module.div.getElementsByClassName("username")[0].innerText = buyer["display"] + " original by " + post["user"]
                }

                let text = post["data"]
                text = text.replace(/>/g, '')
                text = text.replace(/</g, '')
                var htmlContent = marked.parse(text);
                module.div.getElementsByClassName("data")[0].innerHTML = htmlContent;
                module.div.getElementsByClassName("timestamp")[0].innerText = `BlockCoin Browser App - ${timeConverter(post["date"])}`
                if (buyer == null) {
                    module.div.getElementsByClassName("profile-picture")[0].src = post["profile-picture"]
                } else {
                    module.div.getElementsByClassName("profile-picture")[0].src = buyer["profile-picture"]
                }

                module.div.getElementsByClassName("views")[0].innerText = post["views"]
                module.div.getElementsByClassName("likes")[0].innerText = post["likes"]
                module.div.getElementsByClassName("blockcoin")[0].innerText = post["price"]
                module.div.getElementsByClassName("profile-picture")[0].onclick = function () {

                    if (buyer == null) {
                        router.navigateTo("/profile/" + post["user-id"])
                    } else {
                        router.navigateTo("/profile/" + buyer["id"])
                    }
                }
                if (post["isBuyable"] == true) {
                    module.div.getElementsByClassName("a-blockcoin")[0].onclick = function () {
                        router.navigateTo("/buy/" + post["id"])
                    }
                } else {
                    module.div.getElementsByClassName("blockcoin")[0].remove()
                    module.div.getElementsByClassName("a-blockcoin")[0].remove()
                }
                module.div.getElementsByClassName("username")[0].onclick = function () {
                    if (buyer == null) {
                        router.navigateTo("/profile/" + post["user-id"])
                    } else {
                        router.navigateTo("/profile/" + buyer["id"])
                    }
                }
                const container = module.div.getElementsByClassName("post-badges-container")[0];

                const badges = [
                    "award_star", "verified", "shield_person", "smart_toy", "local_fire_department", "science"
                ]
                const titles = [
                    "BlockCoin Admin", "Verified Account", "BlockCoin Staff", "Bot Account", "BlockCoin Premium", "Beta Tester"
                ]

                for (var i = 0; i < buyer["badges"].length; i++) {
                    var span = document.createElement("span");
                    span.className = "material-symbols-outlined post-badge";
                    span.innerHTML = badges[buyer["badges"][i]];
                    span.title = titles[buyer["badges"][i]]
                    // Append the span element to the container div
                    container.appendChild(span);
                }

            })
        } else {
            let liked = false
            module.div.id = post["id"]
            if (buyer == null) {
                module.div.getElementsByClassName("username")[0].innerText = post["user"]
            } else {
                module.div.getElementsByClassName("username")[0].innerText = buyer["display"] + " original by " + post["user"]
            }

            let text = post["data"]
            text = text.replace(/>/g, '')
            text = text.replace(/</g, '')
            var htmlContent = marked.parse(text);
            module.div.getElementsByClassName("data")[0].innerHTML = htmlContent;
            module.div.getElementsByClassName("timestamp")[0].innerText = `BlockCoin Browser App - ${timeConverter(post["date"])}`
            if (buyer == null) {
                module.div.getElementsByClassName("profile-picture")[0].src = post["profile-picture"]
            } else {
                module.div.getElementsByClassName("profile-picture")[0].src = buyer["profile-picture"]
            }

            module.div.getElementsByClassName("views")[0].innerText = post["views"]
            module.div.getElementsByClassName("likes")[0].innerText = post["likes"]
            module.div.getElementsByClassName("blockcoin")[0].innerText = post["price"]
            module.div.getElementsByClassName("profile-picture")[0].onclick = function () {

                if (buyer == null) {
                    router.navigateTo("/profile/" + post["user-id"])
                } else {
                    router.navigateTo("/profile/" + buyer["id"])
                }
            }
            if (post["isBuyable"] == true) {
                module.div.getElementsByClassName("a-blockcoin")[0].onclick = function () {
                    router.navigateTo("/buy/" + post["id"])
                }
            } else {
                module.div.getElementsByClassName("blockcoin")[0].remove()
                module.div.getElementsByClassName("a-blockcoin")[0].remove()
            }
            module.div.getElementsByClassName("username")[0].onclick = function () {
                router.navigateTo("/profile/" + post["user-id"])
            }
            const container = module.div.getElementsByClassName("post-badges-container")[0];

            const badges = [
                "award_star", "verified", "shield_person", "smart_toy", "local_fire_department", "science", 'bug_report'
            ]
            const titles = [
                "BlockCoin Admin", "Verified Account", "BlockCoin Staff", "Bot Account", "BlockCoin Premium", "Beta Tester", "Bug Report"
            ]

            for (var i = 0; i < post["badges"].length; i++) {
                var span = document.createElement("span");
                span.className = "material-symbols-outlined post-badge";
                span.innerHTML = badges[post["badges"][i]];
                span.title = titles[post["badges"][i]]
                // Append the span element to the container div
                container.appendChild(span);
            }
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
                    ViewPost(post["id"])
                    PostLiked(post["id"]).then((data) => {
                        liked = data["liked"]
                        if (data["liked"]) {
                            module.div.getElementsByClassName("like-button")[0].classList.add('liked')
                        }
                    })
                    module.div.getElementsByClassName("like-button")[0].onclick = function () {
                        if (liked) {
                            liked = false
                            module.div.getElementsByClassName("like-button")[0].classList.remove('liked')
                            module.div.getElementsByClassName("likes")[0].innerText = parseInt(module.div.getElementsByClassName("likes")[0].innerText) - 1
                            LikePost(post["id"])
                        } else {
                            liked = true
                            module.div.getElementsByClassName("like-button")[0].classList.add('liked')
                            module.div.getElementsByClassName("likes")[0].innerText = parseInt(module.div.getElementsByClassName("likes")[0].innerText) + 1
                            LikePost(post["id"])
                        }
                    }
                }
            }
        }
        check_scroll()
        window.addEventListener('scroll', function () {
            check_scroll()
        });
        module.div.getElementsByClassName("comment-button")[0].onclick = function () {
            router.navigateTo("/post/" + post["id"])
        }
    }

    module.on_render(on_render)
    const element = document.getElementById(post["id"]);
    if (element == null) {
        module.render()
    } else {
        return ""
    }

}

export function LivePost(router, post, parent) {

    const { Module } = require("../lib/Framework.mjs")

    const module = new Module("Post")
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
    <div id="post">
        <div id="top-container">
            <img id="post-img" class="profile-picture" class="text"></img>
            <div id="post-user" class="text username">Loading...</div>
            <div class="post-badges-container"></div>
        </div>
        <div id="post-data" class="text data">Loading...</div>
        <div id="post-meta" class="text timestamp" >BlockCoin Browser App - Loading...</div>

    </div>
    `)

    module.css(`
    .like-button {
        transition-duration: 0.5s;
        cursor:pointer;
    }
    .like-button:hover {
        font-size: 26px;
    }
    .liked {
        color:#FF0000;
        font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
    #post {
        width:100%;
        height: 100%;
        top:0;
        left:0;
        border: solid white 1px;
        border-radius: 16px
    }
    .post-badge {
        font-size: 25px;
        color: #FFFFFF;
  
      }
      #post-badges-container {
        width:20%;
        display:flex;
        flex-direction:row;
        justify-content:flex-start;
        align-items:center;
        margin:10px;
      }
    .text {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 25px;
        color:white;
    }

    #post-img {
        cursor:pointer;
        border-radius:256px;
        width: 48px;
        height: 48px;
        margin: 10px;
    }

    #post-user {
        cursor:pointer;
        margin: 10px;
        margin-left:0;
    }

    #top-container {
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

    #post-meta {
        margin: 10px;
        font-weight: 300;
        font-size: 17px;
    }
    #post-stats {
        margin: 10px;
        bottom:0;
        position:relative;
        right:0;
        text-align:right;
        font-weight: 300;
        font-size: 17px;
    }
    #post-data {
        margin: 10px;
    }
    `)
    module.parent(parent)
    function on_render() {
        let liked = false
        module.div.id = post["id"]
        module.div.getElementsByClassName("username")[0].innerText = post["user"]
        let text = post["data"]
        text = text.replace(/>/g, '')
        text = text.replace(/</g, '')
        var htmlContent = marked.parse(text);
        module.div.getElementsByClassName("data")[0].innerHTML = htmlContent;
        module.div.getElementsByClassName("timestamp")[0].innerText = `BlockCoin Browser Live - ${timeConverter(post["date"])}`
        module.div.getElementsByClassName("profile-picture")[0].src = post["profile-picture"]
        module.div.getElementsByClassName("profile-picture")[0].onclick = function () {
            router.navigateTo("/profile/" + post["user-id"])
        }
        module.div.getElementsByClassName("username")[0].onclick = function () {
            router.navigateTo("/profile/" + post["user-id"])
        }
        const container = module.div.getElementsByClassName("post-badges-container")[0];

        const badges = [
            "award_star", "verified", "shield_person", "smart_toy", "local_fire_department", "science"
        ]
        const titles = [
            "BlockCoin Admin", "Verified Account", "BlockCoin Staff", "Bot Account", "BlockCoin Premium", "Beta Tester"
        ]

        for (var i = 0; i < post["badges"].length; i++) {
            var span = document.createElement("span");
            span.className = "material-symbols-outlined post-badge";
            span.innerHTML = badges[post["badges"][i]];
            span.title = titles[post["badges"][i]]
            // Append the span element to the container div
            container.appendChild(span);
        }
    }

    module.on_render(on_render)
    const element = document.getElementById(post["id"]);
    if (element == null) {
        module.render(true)
    } else {
        return ""
    }

}

export function PreviewPost(router, post, parent) {

    const { Module } = require("../lib/Framework.mjs")
    const { ViewPost, IsLogedIn, PostLiked, LikePost } = require("../scripts/api.mjs")

    const module = new Module("Post")
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
    <div id="post">
        <div id="top-container">
            <img id="post-img" class="profile-picture" class="text"></img>
            <div id="post-user" class="text username">Loading...</div>
        </div>
        <div id="post-data" class="text data">Loading...</div>
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
    #post {
        width:100%;
        height: 100%;
        top:0;
        left:0;
        border: solid white 1px;
        border-radius: 16px
    }
    .post-badge {
        font-size: 25px;
        color: #FFFFFF;
  
      }
      #post-badges-container {
        width:20%;
        display:flex;
        flex-direction:row;
        justify-content:flex-start;
        align-items:center;
        margin:10px;
      }
    .text {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 25px;
        color:white;
    }

    #post-img {
        cursor:pointer;
        border-radius:256px;
        width: 48px;
        height: 48px;
        margin: 10px;
    }

    #post-user {
        cursor:pointer;
        margin: 10px;
        margin-left:0;
    }

    #top-container {
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

    #post-meta {
        margin: 10px;
        font-weight: 300;
        font-size: 17px;
    }
    #post-stats {
        margin: 10px;
        bottom:0;
        position:relative;
        right:0;
        text-align:right;
        font-weight: 300;
        font-size: 17px;
    }
    #post-data {
        margin: 10px;
    }
    `)
    module.parent(parent)
    function on_render() {
        let liked = false
        module.div.id = post["id"]
        module.div.getElementsByClassName("username")[0].innerText = post["user"]
        let text = post["data"]
        text = text.replace(/>/g, '')
        text = text.replace(/</g, '')
        var htmlContent = marked.parse(text);
        module.div.getElementsByClassName("data")[0].innerHTML = htmlContent;
        module.div.getElementsByClassName("profile-picture")[0].src = post["profile-picture"]
    }

    module.on_render(on_render)
    const element = document.getElementById(post["id"]);
    if (element == null) {
        module.render()
    } else {
        return ""
    }

}