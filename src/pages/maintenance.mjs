export function Maintenance(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { Footer } = require("../elements/footer.mjs")


    const page = new Page("Maintenance")
    const display = new Display()

    page.clear(["background","fonts"])

    Fonts(router)
    Background(router)
    
    page.html(`<div id="center-contain">
        <div id="error-code"> 🤫 </div>
        <h3>BlockCoin is currently under maintenance, we are sorry for the inconvenience.</h3>
        <a class="button" id="main-menu">Check the discord for news.</a>
    </div>`)
    page.css(`
    #center-contain {
        z-index: ${display.get("global")["z-index"][0]};
        width: 100%;
        height: 100%;
        position:absolute;
        top:0;
        left:0;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction: column;
    }

    #error-code {
        text-align: center;
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-size: ${display.get("text")["size"][5]};
        font-style: normal;
        font-weight: ${display.get("text")["font-weight-bold"]};
        line-height: normal;
        background: linear-gradient(149deg, ${display.get("background")["elipse-color"][0]} 0%, ${display.get("background")["elipse-color"][1]} 100%);
        -webkit-background-clip: text;
        color: transparent;
    }

    h3 {
        font-family: ${display.get("text")["font"]}, sans-serif;
        color: ${display.get("text")["color"]};
        text-align: center;
        font-weight: ${display.get("text")["font-weight"]};
    }

    .button {
      position:relative;
      cursor:pointer;
      color: ${display.get("text")["color"]};
      font-family: ${display.get("text")["font"]}, sans-serif;
      font-size: ${display.get("text")["size"][3]};
      font-weight: ${display.get("text")["font-weight"]};
      z-index: ${display.get("global")["z-index"][1]};
      text-decoration: ${display.get("text")["button-decoration"]};
    }

    #main-menu {
      position:relative;
      cursor:pointer;
      color: ${display.get("text")["color"]};
      font-family: ${display.get("text")["font"]}, sans-serif;
      font-size: ${display.get("text")["size"][3]};
      font-weight: ${display.get("text")["font-weight"]};
      z-index: ${display.get("global")["z-index"][1]};
    }

    a {
        cursor: ${display.get("text")["link-cursor"]};
        text-decoration: ${display.get("text")["link-decoration"]};
    }
`)



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

    function on_render() {
        document.getElementById("main-menu").onclick= function(){
            router.navigateTo("/discord")
        }
    }

    page.on_render(on_render)

    page.render()
}