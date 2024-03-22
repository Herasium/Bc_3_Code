export function Buy(router) {
    const { Page,Display } = require("../lib/Framework.mjs")
    const { Fonts } = require("../elements/fonts.mjs")
    const { Background } = require("../elements/background.mjs")
    const { Navbar } = require("../elements/navbar.mjs")
    const { IsLogedIn, Balance, Stats,BuyPost } = require("../scripts/api.mjs")
    const { Notification } = require("../elements/notifications.mjs")
    const { setCookie, getCookie, checkCookie } = require("../scripts/cookies.mjs")
    const { PreviewPost } = require("../elements/post.mjs")

    if (IsLogedIn() == false) {
      Notification(1,"You need to be logged in to access this page.")
      router.navigateTo("/explore")
      return ""
    }

    const page = new Page("Buy")
    const display = new Display()

    page.clear(["background","navbar","fonts","new_post_button"])

    Fonts(router)
    Background(router)
    Navbar(router)

    const blank_logo = page.image("logo_blank.svg")

    page.html(`
      <div id="big-container">
        <div id="container">
          <div id="cont-1" class="container">
            <div class="title" id="title">
              Overwiew Post #Loading... by @Loading...
            </div>
          </div>
          <div id="cont-2" class="container">
            <div class="title">
              Preview
            </div>
            <div id="post-container-buy"></div>
          </div>
          <div id="cont-3" class="container">
          <div class="title">
            Stats
          </div>
          <div id="stats-container">
            <div class="stat"><span class="material-symbols-outlined" id="icon-1">favorite</span> <span id="likes">0</span> </div>
            <div class="stat"><span class="material-symbols-outlined" id="icon-2">visibility</span> <span id="views">0</span> </div>
            <div class="stat"><img src="${blank_logo}" class="a-stat-blockcoin" /> <span id="blockcoin">0</span>  </div>
          </div>
          </div>
          <div id="cont-4" class="container">
            <div id="buy">Buy Post #Loading.. ?</div>
            <div id="buy-button"><span id="buy-text">Buy - 15 </span><img src="${blank_logo}" class="a-stat-button" /></div>
          </div>
          <div id="cont-5" class="container">
            <canvas id="canva-data"></canvas>
          </div>
        </div>
      </div>
      
    `)

    page.css(`
    .a-stat-blockcoin {
      width:50px;
      height:50px;
      
    }
    .a-stat-button {
      width:37px;
      height:37px;
      margin-left:17px;
    }
    #buy {
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 500;
      font-size: ${display.get("text")["size"][1]};
      text-align:center;
      color: ${display.get("text")["color"]};
    }
    #buy-button {
      cursor:pointer;
      transition-duration: 0.5s;
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      font-size: ${display.get("text")["size"][2]};
      color: ${display.get("text")["color"]};
      border-radius: ${display.get("global")["border-radius"][0]};
      border: ${display.get("global")["border"]};
      height:auto;
      width:auto;
      text-align:center;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    #post-container-buy post {
      width:80%;
      height:fit-content;
      min-height: 5%;
    }
    #post-container-buy {
      overflow:auto;
      display: flex;
      justify-content:center;
      align-items:center;
      top:20%;
      height:80%;
      width:100%;
      left:0;
      position:absolute;
    }
    #canva-data{
      width:100%;
      height:100%;
    } 
    .link {
      cursor:pointer;
      border: ${display.get("global")["border"]};
      width: 20%;
      height: 40%;
      font-size: ${display.get("text")["size"][2]};
      color: ${display.get("text")["color"]};
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      text-align:center;
      border-radius: ${display.get("global")["border-radius"][0]};
      margin:5%;
      margin-top:0;
      margin-bottom:0;
      display: flex;
      justify-content:center;
      align-items:center;
    }
    #links-container {
      display: flex;
      flex-wrap: wrap;
      width:100%;
      height:70%;
      position:absolute;
      top:25%;
      left:0;
      justify-content:center;
      align-items:center;
    }
    #lb-container {
      display:flex;
      justify-content:space-evenly;
      position:absolute;
      left:0;
      flex-direction:row;
      width:100%;
      height:70%;
      top:20%;
      align-items:center;
    }
    .lb {
      font-size: ${display.get("text")["size"][2]};
      color: ${display.get("text")["color"]};
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      text-align:center;
    }
    .lb-big {
      font-size: ${display.get("text")["size"][4]};
    }
    #stats {
      font-size: ${display.get("text")["size"][4]};
    }
    #icon-1 {
      font-size: ${display.get("text")["size"][4]};
    }
    #icon-2 {
      font-size: ${display.get("text")["size"][4]};
    }
    #icon-3 {
      font-size: ${display.get("text")["size"][4]};
    }
    #icon-4 {
      font-size: ${display.get("text")["size"][4]};
    }
    .stat {
      font-size: ${display.get("text")["size"][4]};
      color: ${display.get("text")["color"]};
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
    }
    #stats-container {
      display:flex;
      justify-content:center;
      position:absolute;
      top:0;
      left:0;
      flex-direction:column;
      width:100%;
      height:70%;
      top:20%;
      align-items:center;
    }
    #welcome {
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      color: ${display.get("text")["color"]};
      font-size: ${display.get("text")["size"][2]};
      margin-left:5px;
    }
    #balance {
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 500;
      color: ${display.get("text")["color"]};
      font-size: ${display.get("text")["size"][4]};
      display:flex;
      justify-content:flex-end;
      align-items:center;
      margin-left:2.5%;
      margin-right:22px;
    }
    #cont-1-5 {
      position:absolute;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      top:5%;
      left:2.5%;
      width:50%;
    }
    #cont-1-8 {
      position:absolute;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    #balance img {
      width:75px;
      height:75px;
    }
    .title {
      font-family: '${display.get("text")["font"]}', sans-serif;
      font-weight: 400;
      color: ${display.get("text")["color"]};
      font-size: ${display.get("text")["size"][3]};
      text-align:center;
      position:absolute;
      top:5%;
      left:2.5%;
    }
    #big-container {
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      position:absolute;
      top:0;
      left:0;
    }
    #container {
      width:80%;
      height:80%;
    }
    .container {
      border: ${display.get("global")["border"]};
      border-radius: ${display.get("global")["border-radius"][0]};
      position:absolute;
    }
    #cont-1{
      width:80%;
      height:15%;
      top:15%;
      left:10%;
      display: flex;
      justify-content:center;
      align-items:center;
    }

    #cont-1 div{
      width:100%;
      position:static;
      margin:none;
    }

    #cont-1 img{
      width:65px;
      border-radius:256px;
      height:65px;
    }

    #cont-2{
      width:39.75%;
      height:29%;
      top:31%;
      left:10%;
    }
    #cont-3{
      width:39.75%;
      height:29%;
      top:31%;
      right:10%;
    }
    #cont-4{
      width:19.75%;
      height:35%;
      right:10%;
      top:61%;
      display:flex;
      align-items:center;
      justify-content: space-around;
      flex-direction:column;
    }
    #cont-5{
      width:59.75%;
      height:35%;
      left:10%;
      top:61%;
    }
  `)

    function on_render() {
      let api_url = "wss://api.blockcoin.social"
      if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
          api_url = "ws://127.0.0.1:8080"
      }
      let socket = null;
      let cache = null
      const post_id = window.location.pathname.split("/")[2]

      socket = new WebSocket(api_url+'/post');

      socket.addEventListener('message', function (event) {
        const data = JSON.parse(event.data)
        cache = data
      });

      function waitForNonNullCache(interval = 100) {
        return new Promise((resolve) => {
            function checkVariable() {
                (cache)
                if (cache !== null) {
                    resolve(cache);
                } else {
                    setTimeout(checkVariable, interval);
                }
            }
            checkVariable();
        });
    }

    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify({'opcode':1,"id":post_id}))
    })

    waitForNonNullCache().then((value) => {
      const post = value
      if (value["success"] != true) {
        Notification(1,"Unknown Post")
        router.navigateTo("/explore")
        return ""
      }
      document.getElementById("title").innerText = "Overwiew Post #" + post["data"]["id"] + " by @"+post["profile"]["display"]
      document.getElementById("buy").innerText = "Buy post #" + post["data"]["id"] + " ?"
      document.getElementById("buy-text").innerText = "Buy - " + post["data"]["price"]
      document.getElementById("likes").innerText = post["data"]["likes"]
      document.getElementById("views").innerText = post["data"]["views"]
      document.getElementById("blockcoin").innerText = post["data"]["price"]
      document.getElementById("buy-button").onclick = function() {
        grecaptcha.ready(function() {
          grecaptcha.execute('6Lf1n4IoAAAAAEXFEel1BfkxHrcuzJUJNfPiFA3q', {action: 'submit'}).then(function(token) {
            BuyPost(post_id,token).then(function(value) {
              if (value == true) {
                Notification(0,"Post Buyed ;)")
                router.navigateTo("/explore")
                return ""
              }else {
                Notification(1,value)
              }
              
            })
        })})
      }

      if (post["data"]["isBuyable"] == false) {
        Notification(1,"This post is not to sell.")
        router.navigateTo("/explore")
        return ""
      }

      let post_data  = post["data"]
      post_data["user-id"] = post["profile"]["id"]
      post_data["user"] = post["profile"]["display"]
      post_data["profile-picture"] = post["profile"]["profile-picture"]
      post_data["badges"] = post["profile"]["badges"]
      const new_post = new PreviewPost(router,post_data,document.getElementById("post-container-buy"))

      var posts = value["data"]["chart"];
      console.log(posts)
      console.log(value)
      // Sort the posts based on the time
      posts.sort(function(a, b) {
          return a["time"] - b["time"];
      });

      // Initialize arrays for datasets
      var timeLabels = [];
      var viewPerDay = [];
      var totalViews = [];
      var likePerDay = [];
      var totalLikes = [];
      var priceChangePerDay = [];
      var totalPrice = [];

      // Calculate daily changes and total values
      if (posts.length > 1) {
        for (var i = 1; i < posts.length; i++) {
            var timeDiff = posts[i]["time"] - posts[i-1]["time"];
            timeLabels.push(new Date(posts[i]["time"] * 1000).toLocaleDateString()); // Convert time to date format
            viewPerDay.push((posts[i]["view"] - posts[i-1]["view"]) / (timeDiff / 86400)); // Calculate views per day
            totalViews.push(posts[i]["view"]); // Add total views
            likePerDay.push((posts[i]["like"] - posts[i-1]["like"]) / (timeDiff / 86400)); // Calculate likes per day
            totalLikes.push(posts[i]["like"]); // Add total likes
            priceChangePerDay.push((posts[i]["price"] - posts[i-1]["price"]) / (timeDiff / 86400)); // Calculate price change per day
            totalPrice.push(posts[i]["price"]); // Add total price
        }
    } else {
        // If there's only one timestamp, display total values without evolution
        timeLabels.push(new Date(posts[0]["time"] * 1000).toLocaleDateString());
        totalViews.push(posts[0]["view"]);
        totalLikes.push(posts[0]["like"]);
        totalPrice.push(posts[0]["price"]);
    }
      console.log(timeLabels)
      console.log(viewPerDay)
      console.log(totalViews)
      console.log(likePerDay)
      console.log(totalLikes)
      console.log(priceChangePerDay)
      console.log(totalPrice)
      // Create the chart
      var ctx = document.getElementById('canva-data').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: timeLabels,
              datasets: [{
                  label: 'Views per day',
                  data: viewPerDay,
                  borderColor: 'blue',
                  backgroundColor: 'lightblue',
             
              }, {
                  label: 'Total Views',
                  data: totalViews,
                  borderColor: 'green',
                  backgroundColor: 'lightgreen',
              
              }, {
                  label: 'Likes per day',
                  data: likePerDay,
                  borderColor: 'red',
                  backgroundColor: 'pink',
              
              }, {
                  label: 'Total Likes',
                  data: totalLikes,
                  borderColor: 'orange',
                  backgroundColor: 'yellow',
              }, {
                  label: 'Price change per day',
                  data: priceChangePerDay,
                  borderColor: 'purple',
                  backgroundColor: 'lavender',
              }, {
                  label: 'Total Price',
                  data: totalPrice,
                  borderColor: 'brown',
                  backgroundColor: 'tan',
              }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
      });
    });

  

    }

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


