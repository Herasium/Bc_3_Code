export function Redirect(router) {
    const { Page } = require("../lib/Framework.mjs")

    const page = new Page("Redirect")

    const links = {
        "/status":"https://blockcoin.betteruptime.com/",
        "/discord":"https://discord.gg/DNkyyC4hsh",
        "/api":"https://api.blockcoin.social",
        "/twitter":"https://twitter.com/blockcoin0",
        "/scratch":"https://scratch.mit.edu/projects/824613252/",
        "/docs":"https://docs.blockcoin.herasium.dev/docs/intro"
    }

    page.html(``)

    page.css('')

    function on_render() {
        window.location.replace(links[window.location.pathname])
    }

    page.on_render(on_render)

    page.render()
}