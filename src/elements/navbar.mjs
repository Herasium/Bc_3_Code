export function Navbar(router) {
  const { Page, Display } = require("../lib/Framework.mjs")
  const { IsLogedIn, GetProfile } = require("../scripts/api.mjs")
  const { setCookie, getCookie, checkCookie } = require("../scripts/cookies.mjs")

  const page = new Page("Navbar")
  const display = new Display()

  const logo = page.image("logo.svg")
  

  page.html(`
      <div id="navbar">
          <img src="${display.get("logo")["url"]}" id="logo" alt="Blockcoin's logo, in the form of a coin."></img>
          <div class="container-3 not-logged">
            <div class="trans-button" id="register">Register</div>
            <div class="trans-button" id="login">Login</div>
            <div class="trans-button" id="explore-1">Trending</div>
          </div>
          <div class="container-3 logged">
            <div class="trans-button" id="feed">Feed</div>
            <div class="trans-button" id="explore-2">Trending</div>
            <div class="trans-button" id="random">Explore</div>
          </div>
          <img src="${logo}" id="profile" class="logged"alt="User's profile picture"></img>
      </div>
      `)

  page.css(`
      #navbar {
          backdrop-filter: blur(${display.get("navbar")["blur"]});
          z-index:100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:7.5%;
          background:${display.get("navbar")["background"]}
        }
        
        #logo {
          margin-left:2.5%;
          width: auto;
          height: 85%;
          display:block;
          cursor:pointer;
          object-fit: cover;
          z-index:100;
        }
        
        #profile {
          border-radius:256px;
          object-fit: cover;
          margin-right:2.5%;
          position:relative;
          width: auto;
          height: 85%;
          display:block;
          cursor:pointer;
          z-index:100;
        }

        .trans-button {
          position:relative;
          cursor:pointer;
          color: ${display.get("text")["color"]};
          font-family: ${display.get("text")["font"]};
          font-size: ${display.get("text")["size"][1]};
          font-weight: ${display.get("text")["font-weight"]};
          z-index:100;
        }
        .not-logged {
          margin-left:2.5%;
        }
        .container-3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap:30px
        }
      
        @media screen and (max-width: 550px){
          
          #navbar {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            flex-direction: column;
            margin-top: 20px;
          }
          .container-3 {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
          }
          .trans-button {
            width: 30%;
            text-align: center;
          }
        }
    }
      `)

  function on_render() {
    if (IsLogedIn()) {
      var elements = document.getElementsByClassName('not-logged');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }
      if (checkCookie("v1-profile-picture") == false) {
        GetProfile(getCookie("v1-id")).then(data => {
          console.log(data)
          setCookie("v1-profile-picture", data["profile-picture"], 365)
          document.getElementById("profile").src = getCookie("v1-profile-picture")
        })
      } else {
        document.getElementById("profile").src = getCookie("v1-profile-picture")
      }
      document.getElementById("profile").onclick = function () {
        router.navigateTo("/dashboard")
      }
      document.getElementById("feed").onclick = function () {
        router.navigateTo("/feed")
      }
    } else {
      document.getElementById("register").onclick = function () {
        router.navigateTo("/register")
      }
      document.getElementById("login").onclick = function () {
        router.navigateTo("/login")
      }
      var elements = document.getElementsByClassName('logged');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }


    }

    document.getElementById("explore-1").onclick = function () {
      router.navigateTo("/trending")
    }

    document.getElementById("explore-2").onclick = function () {
      router.navigateTo("/trending")
    }
    document.getElementById("random").onclick = function () {
      router.navigateTo("/explore")
    }
    document.getElementById("logo").onclick = function () {
      router.navigateTo("/")
    }

  }

  page.on_render(on_render)


  page.render()
}