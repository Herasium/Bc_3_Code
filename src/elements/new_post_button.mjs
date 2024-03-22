export function NewPostButton(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { IsLogedIn } = require("../scripts/api.mjs")

    const page = new Page("NewPostButton")
    const display = new Display()

    page.html(`
        <span class="material-symbols-outlined" id="new_button">add</span>
    `)
    
    page.css(`
    #new_button {
      transition-duration: 0.5s;
      z-index:10000;
      width: 94px;
      height: 94px;
      border-radius:256px;
      background-color:${display.get("new")["background"][4]};
      position:fixed;
      bottom:25px;
      right:25px;
      color: ${display.get("new")["color"][4]};
      text-align: center;
      vertical-align: middle;
      line-height: 94px;
      cursor:pointer;
      font-size: 72px;
      border:${display.get("new")["border"][4]};
    }
    #new_button:hover {
        width: 100px;
        height: 100px;
        font-size: 78px;
        line-height: 100px;
    }
    
    `)

    function on_render() {
        if (IsLogedIn() == false) {
            document.getElementById("new_button").remove()
          } else {
            document.getElementById("new_button").onclick= function(){
              router.navigateTo("/new")
            }
          }
    }

    page.on_render(on_render)

    page.render()
}