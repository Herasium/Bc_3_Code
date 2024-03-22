export function Register(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { Footer } = require("../elements/footer.mjs")
    const { Register } = require("../scripts/api.mjs")
    const { Notification } = require("../elements/notifications.mjs")

    const display = new Display()
    const page = new Page("Register")

    const blank_logo = page.image("logo_blank.svg")
    const register_button = page.image("register_button.svg")

    page.clear(["background","navbar","fonts","footer"])

    Fonts(router)
    Background(router)
    Navbar(router)
    Footer(router)

    page.html(`
    <div class="container">
        <img src="${blank_logo}" alt="A white version of the blockcoin logo"></img>
        <div class="text">Write, Post, Earn.</div>
    </div>
    <div class="container-2">
        <div class="text small">Register</div>
        <div class="form">
            <span class="material-symbols-outlined">account_circle</span>
            <input placeholder="Username" id="username" type="text"></input>
        </div>
        <div class="form">
            <span class="material-symbols-outlined">mail</span>
            <input placeholder="E-Mail" id="contact" type="email"></input>
        </div>
        <div class="form">
            <span class="material-symbols-outlined">password</span>
            <input placeholder="Password" id="password" type="password"></input>
        </div>
        <img src="${register_button}" alt="The register button" id="Register"></img>
        <button id="Login">Or Login</button>
        <div class="text very-small">By clicking 'Register', you agree with BlockCoin's
        <a id="policy" class="g-link">Privacy Policy</a> and
        <a id="tos" class="g-link">Terms of Service</a>.</div>
        <div class="text very-small">This site is protected by reCAPTCHA. <br>The Google
        <a href="https://policies.google.com/privacy" class="g-link">Privacy Policy</a> and
        <a href="https://policies.google.com/terms" class="g-link">Terms of Service</a> apply.</div>
    </div>
    `)
    page.css(`
    .g-link {
        color: ${display.get("text")["color"]};
        text-decoration: underline ${display.get("text")["color"]};
        cursor:pointer;
    } 

    .text {
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight-bold"]};
        font-size: ${display.get("text")["size"][4]}; /* Adjust font size */
        color: ${display.get("text")["color"]};
    }
    
    .small {
        font-weight: ${display.get("text")["font-weight-light"]};
        font-size: ${display.get("text")["size"][1]};
    }
    
    .very-small {
        margin:1%;
        text-align: center;
        font-size: ${display.get("text")["size"][0]};
        font-weight: ${display.get("text")["font-weight-light"]};
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
        z-index: ${display.get("global")["z-index"][0]}; /* Adjust z-index */
        gap: 10px;
    }
    
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: none;
    }
    
    ::-webkit-scrollbar-thumb {
        background: ${display.get("text")["color"]}; /* Adjust scrollbar color */
        border-radius: 360px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
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
        z-index: ${display.get("global")["z-index"][0]}; /* Adjust z-index */
    }
    
    #button {
        border-radius: ${display.get("global")["border-radius"][2]}; /* Adjust border radius */
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        color: ${display.get("text")["color"]};
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
        border-bottom: 1px solid ${display.get("text")["color"]}; /* Adjust border color */
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
        font-size: ${display.get("text")["size"][1]};
        width: 80%;
    }
    
    .form input:focus {
        outline:none!important;
    }
    
    ::placeholder {
        color: ${display.get("text")["color"]};
    }
    
    p{
        color: ${display.get("text")["color"]};
    }
    
    #Register {
        cursor: pointer;
        margin-top: 30px;
        border: none;
        width: 330px;
        height: 53px;
    }
    
    #Login {
        cursor: pointer;
        background: none;
        border: none;
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        color: ${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][2]};
        margin-top: 5px;
    }
    
    #mockup {
        content: url(Mockup3.png);
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
`);



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
        document.getElementById("Login").onclick= function(){
            router.navigateTo("/login")
        }
        document.getElementById("policy").onclick= function(){
          router.navigateTo("/legal/policy")
        }
        document.getElementById("tos").onclick= function(){
          router.navigateTo("/legal/tos")
        }
        document.getElementById("Register").onclick= function(){
          grecaptcha.ready(function() {
            grecaptcha.execute('6Lf1n4IoAAAAAEXFEel1BfkxHrcuzJUJNfPiFA3q', {action: 'submit'}).then(function(token) {
              Register(document.getElementById('username').value,document.getElementById('contact').value,document.getElementById('password').value,token)
              .then(success => {
                if (success == true) {
                    router.navigateTo("/explore")
                } else {
                    Notification(1,success)
                }
            })
            .catch(error => {
                console.error("Error during registration:", error);
            });
            });
          });
        }
    }

    page.on_render(on_render)

    page.render()
}