export function Settings(router) {
  const { Page, Display } = require("../lib/Framework.mjs")
  const { Fonts } = require("../elements/fonts.mjs")
  const { Background } = require("../elements/background.mjs")
  const { Navbar } = require("../elements/navbar.mjs")
  const { Post } = require("../elements/post.mjs")
  const { IsLogedIn, UpdateAbout, UpdateBanner, UpdateDisplay, UpdateEmail, UpdatePassword, UpdateProfilePicture, GetProfile } = require("../scripts/api.mjs")
  const { Notification } = require("../elements/notifications.mjs")
  const { NewPostButton } = require("../elements/new_post_button.mjs")
  const { setCookie, getCookie, checkCookie } = require("../scripts/cookies.mjs")

  if (IsLogedIn() == false) {
    Notification(1, "You need to be logged in to access this page.")
    router.navigateTo("/explore")
    return ""
  }
  const display = new Display()
  const page = new Page("Settings")

  page.clear(["background", "navbar", "fonts", "new_post_button"])

  Fonts(router)
  Background(router)
  Navbar(router)
  NewPostButton(router)

  page.html(`
      <div id="settings-container">
        <div class="title">Profile</div>
        <div class="text-settings">
          <div class="settings-name text-name">Display Name</div>
          <input class="text-input"  id="display" ></input>
          <div class="settings-button" id="display-change" >Save</div>
        </div>
        <div class="text-settings">
          <div class="settings-name text-name">About Me</div>
          <input class="text-input"  id="about" ></input>
          <div class="settings-button"  id="about-change"  >Save</div>
        </div>
        <div class="image-settings">
          <div class="img-txt">
            <div class="settings-name img-name">Profile Picture</div>
            <div class="settings-button"  id="icon-change"  >Change</div>
            <input type="file" id="fileInput" accept=".png,.jpg,.jpeg,.webp" style="display: none;">
          </div>
          <div class="img-img">
            <img class="settings-img" id="pp" src="https://blockcoin.social/assets/logo.png" />
          </div>
        </div>
        <div class="image-settings">
        <div class="img-txt">
          <div class="settings-name img-name">Banner</div>
          <div class="settings-button"  id="banner-change"  >Change</div>
          <input type="file" id="banner-fileInput" accept=".png,.jpg,.jpeg,.webp" style="display: none;">
        </div>
        <div class="img-img">
          <img class="settings-img" id="banner" src="https://blockcoin.social/assets/default_banner.png" />
        </div>
        </div>
        <div class="text-settings">
          <div class="settings-name text-name">Theme</div>
          <input class="text-input"  id="theme" ></input>
          <div class="settings-button"  id="theme-change"  >Save</div>
        </div>
        <div class="title">Security</div>
        <div class="text-settings">
          <div class="settings-name text-name">Email</div>
          <input class="text-input"  id="email"  type="email"></input>
          <div class="settings-button"  id="email-change"  >Save</div>
        </div>
        <div class="text-settings">
          <div class="settings-name text-name">Password Change</div>
          <input class="text-input" id="new-password" type="password" placeholder="New Password"></input>
          <input class="text-input" type="password" id="password" placeholder="Current Password"></input>
          <div class="settings-button" id="password-change" >Save</div>
        </div>
        <div class="image-settings">
        <div class="img-txt">
          <div class="settings-button" id="disconnect">Disconnect</div>
          <div class="settings-button" id="delete">Delete Request</div>
        </div>
      </div>
      </div>
    `)

  page.css(`
    #delete {
        margin-bottom: 10px; /* Adjust margin */
    }
    
    #disconnect {
        margin-bottom:  10px; /* Adjust margin */
    }
    
    .img-name {
        width:auto;
    }
    
    .image-settings {
        width: 90%;
        margin-top: 25px; /* Adjust margin */
    }
    
    .img-txt {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        width: 100%;
    }
    
    .img-img {
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
    }
    
    .settings-button {
        cursor: pointer;
        transition-duration: 0.5s;
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        font-size: ${display.get("text")["size"][2]}; /* Adjust font size */
        color: ${display.get("text")["color"]};
        border-radius: ${display.get("global")["border-radius"][2]}; /* Adjust border radius */
        border: ${display.get("global")["border"]}; /* Adjust border color */
        height: auto;
        width: auto;
        text-align: center;
    }
    
    .settings-button:hover {
        font-size: ${display.get("text")["size"][4]}; /* Adjust font size */
    }
    
    .text-input {
        padding: 0px 3%;
        width: 94%;
        outline: none;
        background: none;
        border: ${display.get("global")["border"]}; /* Adjust border color */
        border-radius: ${display.get("global")["border-radius"][2]}; /* Adjust border radius */
        min-height:50px; /* Adjust min height */
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        color: ${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][2]}; /* Adjust font size */
        text-align: left;
        margin-bottom: 15px; /* Adjust margin */
    }
    
    #settings-container {
        margin-bottom: 10px; /* Adjust margin */
        width: 60%;
        position: absolute;
        height: auto;
        top: 20%;
        left: 20%;
        border: ${display.get("global")["border"]}; /* Adjust border */
        display: flex;
        border-radius: ${display.get("global")["border-radius"][2]}; /* Adjust border radius */
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }
    
    .title {
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        color: ${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][4]}; /* Adjust font size */
        text-align: left;
        margin-top: 25px; /* Adjust margin */
        width: 90%;
    }
    
    .text-settings {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex-direction: column;
        width: 90%;
        margin-top: 25px; /* Adjust margin */
    }
    
    .settings-name {
        font-family: ${display.get("text")["font"]}, sans-serif;
        font-weight: ${display.get("text")["font-weight"]};
        color: ${display.get("text")["color"]};
        font-size: ${display.get("text")["size"][1]}; /* Adjust font size */
    }
    
    .text-name {
        text-align: left;
        width: 100%;
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
    function refresh_data() {
      GetProfile(getCookie("v1-id")).then((data) => {
        document.getElementById("display").placeholder = data["display"]
        document.getElementById("theme").placeholder = "Copy and paste your favorite theme json's here !"
        document.getElementById("about").placeholder = data["about"]
        document.getElementById("banner").src = data["banner"]
        document.getElementById("pp").src = data["profile-picture"]
        document.getElementById("email").placeholder = "you@email.bc"
      })
    }
    refresh_data()
    document.getElementById("icon-change").onclick = selectFileIcon;

    function selectFileIcon() {
      var fileInput = document.getElementById('fileInput');
      fileInput.click();
      fileInput.addEventListener('change', handleFileSelectIcon);
    }

    function handleFileSelectIcon(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const fileContentBase64 = reader.result.split(',')[1];
        UpdateProfilePicture(fileContentBase64).then((data) => {
          if (data == false) {
            Notification(1, "An unknown error happened. Please retry later.");
          } else {
            Notification(0, data);
            setCookie("v1-profile-picture", "");
            refresh_data();
          }
        });
      };

      reader.readAsDataURL(file);
    }

    document.getElementById("banner-change").onclick = selectFileBanner;

    function selectFileBanner() {
      var fileInput = document.getElementById('banner-fileInput');
      fileInput.click();
      fileInput.addEventListener('change', handleBannerFileSelect);
    }

    function handleBannerFileSelect(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const fileContentBase64 = reader.result.split(',')[1];
        UpdateBanner(fileContentBase64).then((data) => {
          if (data == false) {
            Notification(1, "An unknown error happened. Please retry later.");
          } else {
            Notification(0, data);
            refresh_data();
          }
        });
      };

      reader.readAsDataURL(file);
    }

    document.getElementById("theme-change").onclick = function () {
      setCookie("v1-theme", document.getElementById("theme").value)
      location.reload()
    }

    document.getElementById("display-change").onclick = function () {
      UpdateDisplay(document.getElementById("display").value).then((data) => {
        if (data == false) {
          Notification(1, "An unknown error happend. Please retry later.")
        } else {
          Notification(0, data)
          refresh_data()
        }
      })
    }
    document.getElementById("about-change").onclick = function () {
      UpdateAbout(document.getElementById("about").value).then((data) => {
        if (data == false) {
          Notification(1, "An unknown error happend. Please retry later.")
        } else {
          Notification(0, data)
          refresh_data()
        }
      })
    }
    document.getElementById("email-change").onclick = function () {
      UpdateEmail(document.getElementById("email").value).then((data) => {
        if (data == false) {
          Notification(1, "An unknown error happend. Please retry later.")
        } else {
          Notification(0, data)
          refresh_data()
        }
      })
    }
    document.getElementById("password-change").onclick = function () {
      UpdatePassword(document.getElementById("password").value, document.getElementById("new-password").value).then((data) => {
        if (data == false) {
          Notification(1, "An unknown error happend. (Is it really the right password ?)")
        } else {
          Notification(0, data)
          refresh_data()
        }
      })
    }
    document.getElementById("disconnect").onclick = function () {
      setCookie("v1-user", "")
      setCookie("v1-id", "")
      setCookie("v1-token", "")
      setCookie("v1-profile-picture", "")
      router.navigateTo("/")
    }
  }

  page.on_render(on_render)
  page.render()
}