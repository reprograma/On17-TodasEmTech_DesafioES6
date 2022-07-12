import User from "./assets/user.js"
import HTMLHelper from "./assets/htmlHelpers.js"

const mainHTML = document.getElementsByTagName('main')[0]
const searchButton = document.getElementById('searchButton')
const searchBar = document.getElementById('searchBar')

function cleanUp() {
    mainHTML.innerHTML = `
        <section id="userInfo"></section>
        <section id="reposInfo"></section>
    `
}

function getInput() {
    return searchBar.value
}

async function renderGithubUser() {
    cleanUp()
    let userSection = document.getElementById('userInfo')
    let reposSection = document.getElementById('reposInfo')
    let input = getInput()
    let response = await new User(input)
    if (response.data.message == "Not Found") {
        HTMLHelper.notFound(mainHTML)
        return;
    }
    let user = response.data
    let repos = response.repos

    HTMLHelper.userInfo(user, userSection)
    HTMLHelper.reposInfo(repos, reposSection)
}

function setup() {
    cleanUp()
    searchButton.addEventListener("click", renderGithubUser)
}

setup()