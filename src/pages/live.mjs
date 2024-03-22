import { getCookie } from "../scripts/cookies.mjs"

export function Live(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { Post, LivePost } = require("../elements/post.mjs")
    const { IsLogedIn } = require("../scripts/api.mjs")
    const { Notification } = require("../elements/notifications.mjs")
    const { NewPostButton } = require("../elements/new_post_button.mjs")

    const page = new Page("Live")
    const display = new Display()

    page.clear(["background","navbar","fonts"])

    Fonts(router)
    Background(router)
    Navbar(router)

    page.html(`
    <div id="post-container">

    </div>
    <input class="text-input"  id="message"></input>
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
    .text-input {
      backdrop-filter: blur(${display.get("background")["blur"]});
      width:90%;
      outline:none;
      background:none;
      border:solid 1px ${display.get("text")["color"]};
      border-radius:${display.get("global")["border-radius"][1]};
      min-height:50px;
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: ${display.get("text")["font-weight"]};
      color:${display.get("text")["color"]};
      font-size: ${display.get("text")["size"][3]};
      text-align:left;
      margin-bottom:15px;
      position:fixed;
      left:5%;
      bottom:0;
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

      document.getElementById("message").addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          socket.send(JSON.stringify({'opcode':6,'type':3,'user':getCookie("v1-id"),'token':getCookie("v1-token"),'message':document.getElementById("message").value}))
        }
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
        function parsecache() {
          if (cache != null) {
            if (cache["opcode"] == 6 && cache["type"] == 2) {
              for (const [key, value] of Object.entries(cache["data"])) {
                try {
                  const post = value
                  let post_data  = post["data"]
                  post_data["user-id"] = post["profile"]["id"]
                  post_data["user"] = post["profile"]["display"]
                  post_data["profile-picture"] = post["profile"]["profile-picture"]
                  post_data["badges"] = post["profile"]["badges"]
                  const new_post = new LivePost(router,post_data,document.getElementById("post-container"))
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
          socket.send(JSON.stringify({'opcode':6,'type':1,'user':getCookie("v1-id"),'token':getCookie("v1-token")}))
          waitForNonNullCache()
          .then((value) => {
              parsecache()
          });
        })
    };
    



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
      socket.send(JSON.stringify({'opcode':6,'type':4,'user':getCookie("v1-id"),'token':getCookie("v1-token")}))
      socket.close()
    }

    page.on_delete(on_delete)

    page.on_render(on_render)
    page.render()
}