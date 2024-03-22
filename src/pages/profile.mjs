export function Profile(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { Footer } = require("../elements/footer.mjs")
    const { Post } = require("../elements/post.mjs")
    const { GetProfile,FollowUser,FollowedUser } = require("../scripts/api.mjs")
    const { Notification } = require("../elements/notifications.mjs")
    const { NewPostButton } = require("../elements/new_post_button.mjs")
    const { setCookie, getCookie, checkCookie } = require("../scripts/cookies.mjs")

    const display = new Display()
    const page = new Page("Profile")

    page.clear(["background","navbar","fonts","new_post_button"])

    Fonts(router)
    Background(router)
    Navbar(router)
    NewPostButton(router)

    const border = page.image("border.svg")
    const mockup = page.image("Mockup.png")
    const mockupfront = page.image("MockupFront.png")

    page.html(`
      <img id="banner" />
      <div id="banner-container">
        <div class="banrr left">
          <img id="profile-pic"> </img>
          <div id="username">Loading...</div>
          <div id="badges-container"></div>
        </div>
        <div class="banrr right">
          <div id="follower-count">Followers - <span id="follower-count-int"></span></div>
          <div id="follow-button"> Follow </div>
        </div>
      </div>
      <div class="big-container">
        <div id="button-container">
          <div id="popular" class="button strong">Most Popular</div>
          <div id="buyed" class="button">Bought Posts</div>
        </div>
      </div>
      <div id="description">Loading...</div>
      <div id="post-container"></div>
    `)
    page.css(`
    #description {
      position: absolute;
      width: 60%;
      left: 20%;
      top: 35%;
      font-family: ${display.get("text")["font"]}, sans-serif;
      font-weight: ${display.get("text")["font-weight"]};
      font-size: ${display.get("text")["size"][1]}; /* Adjust font size */
      color: ${display.get("text")["color"]};
    }
    #post-container {
      top: 42%;
      position: absolute;
      min-height: 50%;
      width: 100%;
      height: fit-content;
      left: 0;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-direction: column;
    }

    #post-container post {
      width: 60%;
      height: fit-content;
      min-height: 5%;
      margin: 1%;
    }
    .big-container {
      width: 100%;
      position: absolute;
      top: 39%;
      left: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;   
    }
    #button-container {
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;  
    }
    .button {
      font-family: ${display.get("text")["font"]}, sans-serif;
      font-weight: ${display.get("text")["font-weight"]};
      font-size: ${display.get("text")["size"][1]}; /* Adjust font size */
      color: ${display.get("text")["color"]};
      margin-right: 5%;
      cursor: pointer;
    }
    .strong {
      font-weight: 600;
    }
    .badge {
      font-size: 50px;
      color: ${display.get("text")["color"]}; /* Use text color for badge */
    }
    #badges-container {
      width: 20%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: 1%;
    }
    #profile-pic {
      height: auto;
      display: block;
      width: 20%;
      object-fit: cover;
      border-radius: 256px;
    }
    .right {
      justify-content: flex-end;
      margin-right: 10.8%;
    }
    .left {
      justify-content: flex-start;
      margin-left: 10.8%;
    }
    #username {
      font-family: ${display.get("text")["font"]}, sans-serif;
      font-weight: ${display.get("text")["font-weight"]};
      font-size: ${display.get("text")["size"][3]}; /* Adjust font size */
      left: 20%;
      color: ${display.get("text")["color"]};
      margin-left: 3%;
      margin-right: 1%;
    }
    #follower-count {
      font-family: ${display.get("text")["font"]}, sans-serif;
      font-weight: ${display.get("text")["font-weight"]};
      font-size: ${display.get("text")["size"][2]}; /* Adjust font size */
      color: ${display.get("text")["color"]};
      margin: 3%;
    }
    #follow-button {
      cursor: pointer;
      transition-duration: 0.5s;
      font-family: ${display.get("text")["font"]}, sans-serif;
      font-weight: ${display.get("text")["font-weight"]};
      font-size: ${display.get("text")["size"][2]}; /* Adjust font size */
      color: ${display.get("text")["color"]};
      border-radius: ${display.get("global")["border-radius"][0]}; /* Use global border radius */
      border: ${display.get("global")["border"]}; /* Use global border */
      height: auto;
      width: auto;
      text-align: center;
    }
    #follow-button:hover {
      font-size: ${parseInt(display.get("text")["size"][2]) + 2}px; /* Increase font size on hover */
    }
    #banner {
      top: 7.5%;
      height: auto;
      width: 100%;
      max-height: 20%;
      object-fit: cover;
      left: 0;
      position: absolute;
    }
    .banrr {
      display: flex;
      width: 30%;
      flex-direction: row;
      align-items: center;
    }
    #banner-container {
      left: 0;
      position: absolute;
      top: 32%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      flex-direction: row;
      height: 0;
    }
`);


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
    let api_url = "wss://api.blockcoin.social"
    if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
        api_url = "ws://127.0.0.1:8080"
    }
    let socket = null;
    function on_render() {
        let cache = null
        let offset = 0
        let opcode = 3
        let followed = false

        const user = window.location.pathname.split("/")[2]

        if (user == getCookie("v1-id")) {
          document.getElementById("follow-button").innerText = "Edit"
          document.getElementById("follow-button").onclick = function() {
            router.navigateTo("/settings/profile")
          }
        } else {
          FollowedUser(user).then((data) => {
            followed = data["followed"]
            if (data["followed"]) {
              document.getElementById("follow-button").innerText = "Unfollow"
            }
          })
          document.getElementById("follow-button").onclick = function() {
            grecaptcha.ready(function() {
              grecaptcha.execute('6Lf1n4IoAAAAAEXFEel1BfkxHrcuzJUJNfPiFA3q', {action: 'submit'}).then(function(token) {
                FollowUser(user,token)
                if (followed) {
                  followed = false
                  document.getElementById("follow-button").innerText = "Follow"
                  document.getElementById("follower-count-int").innerText = parseInt(document.getElementById("follower-count-int").innerText)-1
                } else {
                  followed = true
                  document.getElementById("follow-button").innerText = "Unfollow"
                  document.getElementById("follower-count-int").innerText = parseInt(document.getElementById("follower-count-int").innerText)+1
                }
          })})
          }
        }

        GetProfile(user).then(profile => {
          if (profile == false) {
            Notification(1,"Unknown User.")
            router.navigateTo("/explore")
            return ""
          }
          document.getElementById("username").innerText = profile["display"]
          document.getElementById("follower-count-int").innerText = profile["followers"]
          document.getElementById("profile-pic").src = profile["profile-picture"]
          document.getElementById("banner").src = profile["banner"]
          document.getElementById("description").innerText = profile["about"]

          const container = document.getElementById("badges-container");
          
          const badges = [
            "award_star","verified","shield_person","smart_toy","local_fire_department","science",'bug_report'
          ]
          const titles = [
            "BlockCoin Admin","Verified Account","BlockCoin Staff","Bot Account","BlockCoin Premium","Beta Tester","Bug Report"
          ]

          for (var i = 0; i < profile["badges"].length; i++) {
            var span = document.createElement("span");
            span.className = "material-symbols-outlined badge";
            span.innerHTML = badges[profile["badges"][i]];
            span.title = titles[profile["badges"][i]]
            // Append the span element to the container div
            container.appendChild(span);
        }
        })


        socket = new WebSocket(api_url+'/post');

        function clearPosts() {
          document.getElementById("post-container").innerHTML = ""
        }

        function removeStrong() {
          var elements = page.document.getElementsByClassName('strong');
          var elementsArray = Array.from(elements);
          elementsArray.forEach(function(element) {
              element.classList.remove('strong');
          });
        }

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
              if (cache["opcode"] == opcode) {
                for (const [key, value] of Object.entries(cache["data"])) {
                  try {
                    const post = value
                    let post_data  = post["data"]
                    post_data["user-id"] = post["profile"]["id"]
                    post_data["user"] = post["profile"]["display"]
                    post_data["profile-picture"] = post["profile"]["profile-picture"]
                    post_data["badges"] = post["profile"]["badges"]
                    const new_post = new Post(router,post_data,document.getElementById("post-container"))
                  } catch {}
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
            socket.send(JSON.stringify({'opcode':opcode,'offset':offset,"user":user}))
            offset++
            socket.send(JSON.stringify({'opcode':opcode,'offset':offset,"user":user}))
            offset++
            waitForNonNullCache()
            .then((value) => {
                parsecache()
            });
          })
          document.getElementById("buyed").onclick= function(){
            if (opcode == 4) {return ""}
            offset = 0
            opcode = 4
            cache = null
            socket.send(JSON.stringify({'opcode':opcode,'offset':offset,"user":user}))
            offset++
            socket.send(JSON.stringify({'opcode':opcode,'offset':offset,"user":user}))
            offset++
            removeStrong()
            document.getElementById("buyed").classList.add('strong')
            waitForNonNullCache()
            .then((value) => {
                clearPosts()
                parsecache()
            });
          }
          document.getElementById("popular").onclick= function(){
            if (opcode == 3) {return ""}
            offset = 0
            opcode = 3
            cache = null
            socket.send(JSON.stringify({'opcode':opcode,'offset':offset,"user":user}))
            offset++
            socket.send(JSON.stringify({'opcode':opcode,'offset':offset,"user":user}))
            offset++
            removeStrong()
            document.getElementById("popular").classList.add('strong')
            waitForNonNullCache()
            .then((value) => {
                clearPosts()
                parsecache()
            });
          }
          window.onscroll = function() {
            var scrollHeight = document.documentElement.scrollHeight;
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var windowHeight = window.innerHeight;
            if (scrollTop + windowHeight >= scrollHeight) {
                socket.send(JSON.stringify({'opcode':opcode,'offset':offset,"user":user}))
                offset++
                parsecache()
            }
          }
    }

    page.on_render(on_render)

    page.render()
}