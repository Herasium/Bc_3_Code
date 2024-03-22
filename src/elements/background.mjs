export function Background(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    
    const display = new Display()
    const page = new Page("Background")
    

    const wave1 = page.image("wave1.svg")
    const wave2 = page.image("wave2.svg")

    page.html(`
        <div id="blur"></div>
        <div class="elipse" id="e-1"></div>
        <div class="elipse" id="e-2"></div>
    `)
    console.log(display.get("background"))
    page.css(`
        body {
            background-color: ${display.get("background").color};
        }
        #blur {
            backdrop-filter: blur(${display.get("background")["blur"]});
            z-index: -5;
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
        }
        
        .elipse {
            border-radius: 458px;
            width: 458px;
            height: 458px;
            z-index: -6;
            position: fixed;
        }
        
        #e-1 {
            background: ${display.get("background")["elipse-color"][0]};
            top:0;
            left:0;
        }
        
        #e-2 {
            background:${display.get("background")["elipse-color"][1]};
            bottom: 0;
            right:0;
        }
        @media screen and (max-width: 1270px){
            #blur {
              height: 100%;
            }
            .elipse {
              height: 48vw;
              width: 48vw;
            }
          }
    `)


    page.render()
}