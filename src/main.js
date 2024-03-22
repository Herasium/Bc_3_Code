const { Router,Theme,Display } = require("./lib/Framework.mjs")

const { Landing } = require("./pages/landing.mjs")
const { Login } = require("./pages/login.mjs")
const { Register } = require("./pages/register.mjs")
const { NotFound } = require("./pages/errors.mjs")
const { Redirect } = require("./pages/redirect.mjs")
const { Trending } = require("./pages/trending.mjs")
const { Feed } = require("./pages/feed.mjs")
const { NewPost } = require("./pages/new_post.mjs")
const { NewComment } = require("./pages/new_comment.mjs")
const { Profile } = require("./pages/profile.mjs")
const { Dashboard } = require("./pages/dashboard.mjs")
const { Settings } = require("./pages/settings.mjs")
const { Explore } = require("./pages/explore.mjs")
const { Live } = require("./pages/live.mjs")
const { Maintenance } = require("./pages/maintenance.mjs")
const { Buy } = require("./pages/buy.mjs")
const { VerifyToken,IsLogedIn } = require("./scripts/api.mjs")
const { setCookie, getCookie, checkCookie } = require("./scripts/cookies.mjs")
const { Post } = require("./pages/post.mjs")

const router = new Router()

const maintenance = false

if (maintenance == false) {
    //Pages
    router.registerRoute("",[Landing])
    router.registerRoute("login",[Login])
    router.registerRoute("register",[Register])
    router.registerRoute("trending",[Trending])
    router.registerRoute("feed",[Feed])
    router.registerRoute("new",[NewPost])
    router.registerRoute("profile",[Profile])
    router.registerRoute("dashboard",[Dashboard])
    router.registerRoute("settings",[Settings])
    router.registerRoute("explore",[Explore])
    router.registerRoute("live",[Live])
    router.registerRoute("buy",[Buy])
    router.registerRoute("post",[Post])
    router.registerRoute("comment",[NewComment])

    //Errors
    router.registerError(404,[NotFound])

    //Redirections
    router.registerRoute("status",[Redirect])
    router.registerRoute("twitter",[Redirect])
    router.registerRoute("discord",[Redirect])
    router.registerRoute("scratch",[Redirect])
    router.registerRoute("api",[Redirect])
    router.registerRoute("docs",[Redirect])
} else {
    router.registerRoute("",[Maintenance])
    router.registerError(404,[Maintenance])
    router.registerRoute("discord",[Redirect])
}

const defaultTheme = new Theme("default")

var defaultJson = require('./themes/default.json');

defaultTheme.parse(defaultJson)

defaultTheme.register()

const display = new Display()

if (getCookie("v1-theme")) {
    var parsedData = JSON.parse(getCookie("v1-theme"));
    const customTheme = new Theme("custom")
    customTheme.parse(parsedData)
    customTheme.register()
    display.set_theme("custom")
} else {
    display.set_theme("default")
}

router.start()

if (IsLogedIn()) {
    VerifyToken().then(function(value){
        if (value != true) {
            setCookie("v1-user","")
            setCookie("v1-id","")
            setCookie("v1-token","")
            setCookie("v1-profile-picture","")
            router.navigateTo("/")
        }
    })
}