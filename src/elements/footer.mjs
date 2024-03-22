export function Footer(router) {
    const { Page,Display } = require("../lib/Framework.mjs")

    const page = new Page("Footer")
    const display = new Display()

    page.html(`
    <footer>
    <div id="copy">© BlockCoin 2024</div>
    <div class="container-4">
      <div class="container-titles">
        <div class="title">Community</div>
        <div class="title">Website</div>
        <div class="title">Services</div>
      </div>
      <div class="container-links">
        <div class="container-link">
          <a class="link" id="discord">Discord</a>
          <a class="link" id="scratch">Scratch</a>
          <a class="link" id="twitter">X (Twitter)</a>
        </div>
        <div class="container-link">
          <a class="link" id="login">Login</a>
          <a class="link" id="register">Register</a>
          <a class="link" id="dashboard">Dashboard</a>
        </div>
        <div class="container-link">
          <a class="link" id="status">Status</a>
          <a class="link" id="api">Api</a>
          <a class="link" id="docs">Docs</a>
        </div>
      </div>
    </div>
    </footer>
    `)

    page.css(`
    footer {
        backdrop-filter: blur(${display.get("navbar")["blur"]});
        z-index:1000;
        position: fixed;
        left: 0;
        width: 100%;
        bottom: 0;
        background: ${display.get("navbar")["background"]};
      }
      
      .container-4 {
        width:100%;
        height:10%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;
      }
      
      .container-titles {
        margin-bottom: 10px;
        width:50%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction:row;
      }
      
      .title {
        width: 150px;
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        color:${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][1]};
        text-align: center;
      }
      
      .container-links {
        margin-bottom: 30px;
        width:50%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction:row;
      }
      
      .container-link {
        width: 150px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;
      }
      
      .link {
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight-light"]};
        color:${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][0]};
        cursor:pointer;
      }
      
      #copy {
        position:absolute;
        font-family:  ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        color:${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][0]};
        bottom: 0;
        left:0;
        margin:10px;
      }

      p{color:${display.get("text")["color"]}}

      @media screen and (max-width: 1270px){
        footer {
          position:absolute;
          top:100%;
        }
        #copy {
          top:100%
        }
      }
      
      
      @media screen and (max-width: 550px){
        footer: {
          display:none;
        }

        #copy {
          margin: 0;
          top:0;
          width:100%;
          left:0;
          text-align: center;
        }
        .container-links {
          width: 100%;
          margin-bottom: 0px;
        }
        .container-titles {
          width: 100%;
          margin-bottom: 0px;
        }
        footer {
          overflow: hidden;
          height: 20%;
        }
        .container-4{
          position: absolute;
          bottom: 30%;
        }
      }
  }
      `)

    function on_render() {
        const buttons = page.document.getElementsByClassName("link");
        const buttonPressed = e => {
            router.navigateTo("/"+e.target.id)
        }
        for (let button of buttons) {
            button.addEventListener("click", buttonPressed);
        }
    }

    page.on_render(on_render)

    page.render()
}


