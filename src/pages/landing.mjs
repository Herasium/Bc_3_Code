export function Landing(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { Footer } = require("../elements/footer.mjs")
    const { NewPostButton } = require("../elements/new_post_button.mjs")

    const page = new Page("Landing")
    const display = new Display()

    page.clear(["background","navbar","fonts","footer","new_post_button"])

    NewPostButton(router)
    Fonts(router)
    Background(router)
    Navbar(router)
    Footer(router)

    const border = page.image("border.svg")
    const mockup = page.image("Mockup.png")
    const mockupfront = page.image("MockupFront.png")

    page.html(`
        <div class="container" id="container">
            <div class="text big">Write, Post, Earn.</div>
            <div class="text small">Join us on a new social adventure today!</div>
            <div id="button">Sign-Up Now</div>
        </div>
        <div class="container-2" id="container-2">
            <img id="mockup" src="${mockup}" alt="Blockcoin mobile app mockup."></img>
        </div> 
    `)
    page.css(`
    .text {
        font-family: '${display.get("text")["font"]}', sans-serif;
        font-weight: ${display.get("text")["font-weight-bold"]};
        font-size: ${display.get("text")["size"][4]};
        color: ${display.get("text")["color"]};
      }
      
      
      .small {
        font-weight: ${display.get("text")["font-weight-light"]};
        font-size: ${display.get("text")["size"][1]};
      }
      
      .container {
        z-index:50;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        top:0;
        left:0;
        height: 100%;
        width: 50%;
        position: absolute;
        gap: 10px;
      }
      ::-webkit-scrollbar {
        width: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background: none;
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${display.get("background")["elipse-color"][0]};
        border-radius: 360px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: ${display.get("background")["elipse-color"][1]};
      }
      
      .container-2 {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        top:0;
        right:0;
        height: 100%;
        width: 50%;
        position: absolute;
        z-index: 4;
      }
      
      #button {
        border-radius: ${display.get("global")["border-radius"][1]};
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: '${display.get("text")["font"]}', sans-serif;
        font-weight: ${display.get("text")["font-weight-light"]};
        color:${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][2]};
        background: url(${border});
        box-shadow: none;
        cursor: pointer;
        width: 360px;
        height: 70px;
        z-index:100;
      }

    @media screen and (max-width: 1270px){
            #mockup {
              content: url(${mockupfront});
            }
            #container {
                width: 100%; 
                height: 100%;
              }
            #container-2 {
                top: 50%;
                width:100%;
            }
            footer {
              position:absolute;
              top:150%;
            }
            #copy {
              top:100%
            }
            #blur {
              height: 150%;
            }
            .elipse {
              height: 48vw;
              width: 48vw;
            }
          }
          
          @media screen and (max-width: 650px){
          
            .big {
              font-size: 10.7vw;
            }
            .small {
              font-size: 4.6vw;
            }
            
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
        document.getElementById("button").onclick= function(){
            router.navigateTo("/register")
        }
    }

    page.on_render(on_render)

    page.render()
}