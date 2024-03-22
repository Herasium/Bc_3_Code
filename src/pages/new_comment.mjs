export function NewComment(router) {
  const { Page,Display } = require("../lib/Framework.mjs")
  const { Fonts } = require("../elements/fonts.mjs")
  const { Background } = require("../elements/background.mjs")
  const { Navbar } = require("../elements/navbar.mjs")
  const { IsLogedIn, CreateComment } = require("../scripts/api.mjs")
  const { Notification } = require("../elements/notifications.mjs")

  if (IsLogedIn() == false) {
    Notification(1, "You need to be logged in to create a comment.")
    router.navigateTo("/explore")
    return ""
  }

  const display = new Display()
  const page = new Page("NewComment")

  page.clear(["background", "navbar", "fonts"])

  Fonts(router)
  Background(router)
  Navbar(router)

  const post_button = page.image("new_comment.svg")

  page.html(`
      <div id="container">
        <div id="new-container">
          <div id="new-input" >
            <div id="char-count">0/250</div>
            <p contenteditable="true" maxlength=249 placeholder="Enter text here..." id="new-input-para"></p>
          </div>
          <div id="button-container">
            <img id="post-button" src="${post_button}" />
          </div>
        </div>
      </div>
    `)

    page.css(`
    #post-button {
        cursor: pointer;
    }
    .option-bg {
        border-radius: ${display.get("global")["border-radius"][0]};
        border: ${display.get("global")["border"]};
        height: 30%;
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1%;
        background: ${display.get("global")["background"]};
    }
    .option-input {
        border-bottom: 2px solid ${display.get("text")["color"]};
        border-top: none;
        border-right: none;
        border-left: none;
        margin: 5%;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        background: none;
        color: ${display.get("text")["color"]};
        text-align: left;
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-size: ${display.get("text")["size"][1]};
        font-style: normal;
        font-weight: ${display.get("text")["font-weight"]};
        line-height: normal;
    }
    .option-title {
        margin: 5%;
        color: ${display.get("text")["color"]};
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-size: ${display.get("text")["size"][2]};
        font-style: normal;
        font-weight: ${display.get("text")["font-weight"]};
        line-height: normal;
    }
    #char-count {
        color: ${display.get("text")["color"]};
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-size: ${display.get("text")["size"][0]};
        font-style: normal;
        font-weight: ${display.get("text")["font-weight"]};
        line-height: normal;
        width: 100%;
        text-align: center;
    }
    #option-container {
        height: 30%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: ${display.get("global")["background"]};
    }
    #container {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .switch {
        margin: 5%;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }
    
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${display.get("global")["background"]};
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: ${display.get("text")["color"]};
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    input:checked + .slider {
        background-color: #2196F3;
    }
    
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
    
    .slider.round {
        border-radius: ${display.get("global")["border-radius"][2]};
    }
    
    .slider.round:before {
        border-radius: ${display.get("global")["border-radius"][2]};
    }

    #new-container {
        width: 60%;
        height: 70%;
        border-radius: ${display.get("global")["border-radius"][0]};
        border: ${display.get("global")["border"]};
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: ${display.get("global")["background"]};
    }

    #new-input {
        width: 80%;
        height: 30%;
        border-radius: ${display.get("global")["border-radius"][1]};
        border: ${display.get("global")["border"]};
        background: none;
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
        margin: 4%;
        overflow: auto;
    }

    [contenteditable=true]:empty:before {
        content: attr(placeholder);
        pointer-events: none;
        display: block; /* For Firefox */
    }

    #new-input-para {
        width: 100%;
        outline: none;
        vertical-align: top;
        text-align: center;
        color: ${display.get("text")["color"]};
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-size: ${display.get("text")["size"][2]};
        font-style: normal;
        font-weight: ${display.get("text")["font-weight"]};
        line-height: normal;
    }

    ::placeholder {
        color: ${display.get("text")["color"]};
    }

    #button-container {
        margin: 4%;
        width: 80%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`);


  function on_render() {

    const editableDiv = document.getElementById('new-input-para');
    var maxLength = parseInt(editableDiv.getAttribute('maxlength'));
    const post_id = window.location.pathname.split("/")[2]
    let parent = window.location.pathname.split("/")[3]
    if (parent == undefined) {
      parent = "/"
    }
    document.getElementById("post-button").onclick = function () {
      grecaptcha.ready(function () {
        grecaptcha.execute('6Lf1n4IoAAAAAEXFEel1BfkxHrcuzJUJNfPiFA3q', { action: 'submit' }).then(function (token) {
          CreateComment(editableDiv.innerText, post_id, parent, token).then(success => {
            if (success) {
              router.navigateTo("/post/" + post_id)
            } else {
              console.log("Create Post failed.");
            }
          })
        })
      })
    }

    editableDiv.addEventListener('input', function (event) {
      var text = this.innerText;
      var cursorPosition = getCaretPosition(this);
      document.getElementById("char-count").innerText = text.length + "/250"
      if (text.length > maxLength) {
        event.preventDefault();
        var truncatedText = text.substring(0, maxLength);
        this.innerText = truncatedText;
        setCaretPosition(this, Math.min(cursorPosition, maxLength));

      }
    });


    function getCaretPosition(element) {
      var sel = window.getSelection();
      return sel.anchorOffset;
    }

    function setCaretPosition(element, position) {
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(element.childNodes[0], position);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

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
  page.on_render(on_render)
  page.render()
}