export function Dashboard(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { IsLogedIn, Balance, Stats } = require("../scripts/api.mjs")
    const { Notification } = require("../elements/notifications.mjs")
    const { setCookie, getCookie, checkCookie } = require("../scripts/cookies.mjs")

    if (IsLogedIn() == false) {
      Notification(1,"You need to be logged in to access this page.")
      router.navigateTo("/explore")
      return ""
    }

    const page = new Page("Dashboard")
    const display = new Display()

    page.clear(["background","navbar","fonts","new_post_button"])

    Fonts(router)
    Background(router)
    Navbar(router)

    const blank_logo = page.image("logo_blank.svg")

    page.html(`
      <div id="big-container">
        <div id="container">
          <div id="cont-1" class="container">
            <div id="cont-1-5">
              <img id="dash-profile-picture" />
              <div id="welcome"> Welcome back Loading.</div>
            </div>
            <div id="cont-1-8">
              <div id="balance">Balance: 0</div> 
              <img src="${blank_logo}" alt="A white version of the blockcoin logo." id="currency"/>
            </div>
          </div>
          <div id="cont-2" class="container">
            <div id="stats" class="title">Stats</div>
            <div id="stats-container">
              <div class="stat"><span class="material-symbols-outlined" id="icon-1">favorite</span> <span id="likes">0</span> </div>
              <div class="stat"><span class="material-symbols-outlined" id="icon-2">visibility</span> <span id="views">0</span> </div>
              <div class="stat"><span class="material-symbols-outlined" id="icon-3">comment</span> <span id="comments">0</span> </div>
              <div class="stat"><span class="material-symbols-outlined" id="icon-4">sync</span> <span id="reposts">0</span> </div>
            </div>
          </div>
          <div id="cont-3" class="container">
            <div class="title">Leaderboards</div>
            <div id="lb-container">
              <div class="lb"><span id="lb-balance" class="lb-big">#0</span><br>Total Balance</div>
              <div class="lb"><span id="lb-views" class="lb-big">#0</span><br>Total Views</div>
              <div class="lb"><span id="lb-likes" class="lb-big">#0</span><br>Total Likes</div>
            </div>
          </div>
          <div id="cont-4" class="container">
            <div class="title">Quick Links</div>  
            <div id="links-container">
              <div class="link" id="link-settings"><p>Settings</p></div>
              <div class="link" id="link-explore"><p>Explore</p></div>
              <div class="link" id="link-feed"><p>Feed</p></div>
              <div class="link" id="link-profile"><p>Profile</p></div>
              <div class="link" id="link-status"><p>Status</p></div>
              <div class="link" id="link-landing"><p>Landing</p></div>
            </div>
          </div>
        </div>
      </div>
    `)

    page.css(`
    .link {
      cursor:pointer;
      border: ${display.get("global")["border"]};
      width: 20%;
      height: 40%;
      font-size: ${display.get("text")["size"][1]};
      color: ${display.get("text")["color"]};
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      text-align:center;
      border-radius: ${display.get("global")["border-radius"][0]};
      margin:5%;
      margin-top:0;
      margin-bottom:0;
      display: flex;
      justify-content:center;
      align-items:center;
    }
    #links-container {
      display: flex;
      flex-wrap: wrap;
      width:100%;
      height:70%;
      position:absolute;
      top:25%;
      left:0;
      justify-content:center;
      align-items:center;
    }
    #lb-container {
      display:flex;
      justify-content:space-evenly;
      position:absolute;
      left:0;
      flex-direction:row;
      width:100%;
      height:70%;
      top:20%;
      align-items:center;
    }
    .lb {
      font-size: ${display.get("text")["size"][1]};
      color: ${display.get("text")["color"]};
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      text-align:center;
    }
    .lb-big {
      font-size: ${display.get("text")["size"][3]};
    }
    #stats {
      font-size: ${display.get("text")["size"][3]};
    }
    #icon-1 {
      font-size: ${display.get("text")["size"][3]};
    }
    #icon-2 {
      font-size: ${display.get("text")["size"][3]};
    }
    #icon-3 {
      font-size: ${display.get("text")["size"][3]};
    }
    #icon-4 {
      font-size: ${display.get("text")["size"][3]};
    }
    .stat {
      font-size: ${display.get("text")["size"][3]};
      color: ${display.get("text")["color"]};
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
    }
    #stats-container {
      display:flex;
      justify-content:center;
      position:absolute;
      top:0;
      left:0;
      flex-direction:column;
      width:100%;
      height:70%;
      top:20%;
      align-items:center;
    }
    #welcome {
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      color: ${display.get("text")["color"]};
      font-size: ${display.get("text")["size"][2]};
      margin-left:5px;
    }
    #balance {
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 500;
      color: ${display.get("text")["color"]};
      font-size: ${display.get("text")["size"][4]};
      display:flex;
      justify-content:flex-end;
      align-items:center;
      margin-left:2.5%;
      margin-right:22px;
    }
    #cont-1-5 {
      position:absolute;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      top:5%;
      left:2.5%;
      width:50%;
    }
    #cont-1-8 {
      position:absolute;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    #balance img {
      width:75px;
      height:75px;
    }
    .title {
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      color: ${display.get("text")["color"]};
      font-size: ${display.get("text")["size"][2]};
      position:absolute;
      top:5%;
      left:2.5%;
    }
    #big-container {
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      position:absolute;
      top:0;
      left:0;
    }
    #container {
      width:80%;
      height:80%;
    }
    .container {
      border: ${display.get("global")["border"]};
      border-radius: ${display.get("global")["border-radius"][1]};
      position:absolute;
    }
    #cont-1{
      width:80%;
      height:39%;
      top:10%;
      left:10%;
    }

    #cont-1 img{
      width:65px;
      border-radius:256px;
      height:65px;
    }

    #cont-2{
      width:39.75%;
      height:39%;
      top:50%;
      left:10%;
    }
    #cont-3{
      width:39.75%;
      height:19%;
      right:10%;
      top:50%;
    }
    #cont-4{
      width:39.75%;
      height:19%;
      right:10%;
      top:70%;
    }
  `)


    function on_render() {
      document.getElementById("welcome").innerText = "Welcome back "+getCookie("v1-user") +"."
      document.getElementById("dash-profile-picture").src = getCookie("v1-profile-picture")
      document.getElementById("link-settings").onclick = function(){
        router.navigateTo("/settings")
      }
      document.getElementById("link-profile").onclick = function(){
        router.navigateTo("/profile/"+getCookie("v1-id"))
      }
      document.getElementById("link-status").onclick = function(){
        router.navigateTo("/status")
      }
      document.getElementById("link-landing").onclick = function(){
        router.navigateTo("/")
      }
      document.getElementById("link-feed").onclick = function(){
        router.navigateTo("/feed")
      }
      document.getElementById("link-explore").onclick = function(){
        router.navigateTo("/explore")
      }
      Balance(getCookie("v1-id")).then(balance => {
        if (balance === false) {
          Notification(1,"An error occured. Code: u404d ")
          router.navigateTo("/explore")
          return ""
        }
        document.getElementById("balance").innerText = "Balance: "+Math.floor(balance)
      })
      Stats(getCookie("v1-id")).then(data => {
        if (data === false) {
          Notification(1,"An error occured. Code: u404d ")
          router.navigateTo("/explore")
          return ""
        }
        document.getElementById("likes").innerText = data["likes"]
        document.getElementById("views").innerText = data["views"]
      })
    }

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

    page.on_render(on_render)

    page.render()
}


