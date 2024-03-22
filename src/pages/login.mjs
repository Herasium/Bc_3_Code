export function Login(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { Footer } = require("../elements/footer.mjs")
    const { Login } = require("../scripts/api.mjs")
    const { Notification } = require("../elements/notifications.mjs")

    const page = new Page("Login")
    const display = new Display()

    const blank_logo = page.image("logo_blank.svg")
    const login_button = page.image("login_button.svg")

    page.clear(["background","navbar","fonts","footer"])

    Fonts(router)
    Background(router)
    Navbar(router)
    Footer(router)

    page.html(`
    <script src="https://www.google.com/recaptcha/api.js?render=6Lf1n4IoAAAAAEXFEel1BfkxHrcuzJUJNfPiFA3q"></script>
    <div class="container">
        <img src="${blank_logo}" alt="A white version of the blockcoin logo."></img>
        <div class="text">Write, Post, Earn.</div>
    </div>
    <div class="container-2">
        <div class="text small">Login</div>
        <div class="form">
            <span class="material-symbols-outlined">account_circle</span>
            <input placeholder="Username" id="username" type="text"></input>
        </div>
        <div class="form">
            <span class="material-symbols-outlined">password</span>
            <input placeholder="Password" id="password" type="password"></input>
        </div>
        <img src="${login_button}" alt="The login button" id="Login"></img>
        <button id="Register">Or Register</button>
        
        <div class="text very-small">This site is protected by reCAPTCHA. <br>The Google
        <a href="https://policies.google.com/privacy" class="g-link">Privacy Policy</a> and
        <a href="https://policies.google.com/terms" class="g-link">Terms of Service</a> apply.</div>
    </div>
    `)
    page.css(`
    .g-link {
      color: ${display.get("text")["color"]};
    } 

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
      
      .very-small {
        margin:1%;
        text-align: center;
        font-size: 15px;
        font-weight: ${display.get("text")["font-weight-light"]};
        color: ${display.get("text")["color"]};
      }
      
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        top:0;
        left:0;
        height: 100%;
        width: 50%;
        position: absolute;
        z-index: 4;
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
        font-size: ${display.get("text")["size"][3]};
        background: url(border.svg);
        border: none;
        box-shadow: none;
        cursor: pointer;
        width: 360px;
        height: 70px;
      }
      .form {
        width: 375px;
        height: 55px;
        border-bottom: 1px solid ${display.get("text")["color"]};
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .form span{
        color: ${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][3]};
      }
      
      .form input{
        background: none;
        text-align: right;
        color: ${display.get("text")["color"]};
        height: 100%;
        border: none;
        font-size: ${display.get("text")["size"][0]};
        width: 80%;
      }
      
      .form input:focus {
        outline:none!important;
      }
      
      ::placeholder {
        color: ${display.get("text")["color"]};
      }
      
      p{color:${display.get("text")["color"]}}
      
      #Login {
        cursor: pointer;
        margin-top: 30px;
        border: none;
        width: 330px;
        height: 53px;
      }
      
      #Register {
        cursor: pointer;
        background: none;
        border: none;
        font-family: '${display.get("text")["font"]}', sans-serif;
        font-weight: ${display.get("text")["font-weight-light"]};
        color:${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][1]};
        margin-top: 5px;
      }
      @media screen and (max-width: 1270px){
        #mockup {
          content: url(MockupFront.png);
        }
        .container {
          display: none;
          width: 100%; 
          height: 100%;
        }
        .container-2 {
          width:100%;
        }
        footer {
          position:absolute;
          top:150%;
        }
        #copy {
          top:100%
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
        document.getElementById("Register").onclick= function(){
            router.navigateTo("/register")
        }
        document.getElementById("Login").onclick= function(){
          grecaptcha.ready(function() {
            grecaptcha.execute('6Lf1n4IoAAAAAEXFEel1BfkxHrcuzJUJNfPiFA3q', {action: 'submit'}).then(function(token) {
              Login(document.getElementById('username').value,document.getElementById('password').value,token)
              .then(success => {
                if (success == true) {
                    router.navigateTo("/explore")
                } else {
                    Notification(1,success)
                }
            })
            .catch(error => {
                console.error("Error during login:", error);
            });
            });
          });
        }
    }

    page.on_render(on_render)

    page.render()
}