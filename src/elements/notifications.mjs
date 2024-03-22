export function Notification(type,text) {
    const { Page,Module,Display } = require("../lib/Framework.mjs")

    const display = new Display()

    let page = undefined
    const element = document.getElementById('notif-container');
    if (element === null) {
        page = new Page("Notification")

        page.html(`
            <div id="notif-container"></div>
        `)
        page.css(`
            #notif-container {
                position:fixed;
                width:100%;
                height:90%;
                display:flex;
                align-items:center;
                justify-content:start;
                flex-direction:column;
                position:absolute;
                top:7.5%;
                left:0;
                z-index:100;
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
        page.render()
    }

    const module = new Module("Notification", document.getElementById('notif-container'))
    
    module.html(`
        <div id="new-notif">
            <span class="material-symbols-outlined type" id="type">more_horiz</span>
            <div id="text" class="notif-text">Loading...</div>
        </div>
    `)

    module.css(`
        #new-notif {
            backdrop-filter: blur(10px);
            border: solid white 1px;
            border-radius: 32px;
            display:flex;
            align-items:center;
            justify-content:start;
            flex-direction: row;
            height:auto;
            width:auto;
            position:relative;
            margin:10px;
            z-index:10000;
        }
        #type {
            color:${display.get("notification")["icon-color"]};
            font-weight: ${display.get("text")["size"][4]};
            margin-left:10px;
        }
        #text {
            color:${display.get("text")["color"]};
            font-family: ${display.get("text")["font"]};
            font-size: ${display.get("text")["size"][3]};
            font-style: normal;
            font-weight: ${display.get("text")["font-weight"]};
            line-height: normal;
            width:auto;
            text-align:center;
            margin-right:20px;
            z-index:10000;
          }
    `)

    const types = [
        "check","close","info","help"
    ]

    function on_render() {
      try {
        module.div.getElementsByClassName("notif-text")[0].innerText  = text
        module.div.getElementsByClassName("type")[0].innerText  = types[type]
        setTimeout(function () {
            module.delete()
            const element = document.getElementById('notif-container');
              if (element !== null) {
                element.remove()
                document.getElementsByTagName("notification")[0].remove()
              }
            
           
        }, 6000);
      } catch {
        module.delete()
        const element = document.getElementById('notif-container');
        if (element !== null) {
            element.remove()
            document.getElementsByTagName("notification")[0].remove()
          
        }
      }
    }
    module.delete_animation(`
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
    module.spawn_animation(`
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
    module.on_render(on_render)

    module.render()

}