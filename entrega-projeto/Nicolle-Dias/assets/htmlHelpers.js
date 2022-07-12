class HTMLHelper {
    static userInfo(user, parent){
        console.log(user)
        parent.innerHTML = `
        <h2>${user.login}</h2>
        <p>${user.bio}</p>
        <img class="profilePicture" src="${user.avatar_url}" />
        `
    }

    static reposInfo(repos, parent){
        parent.innerHTML = repos.reduce((acc, cur, ind) => {
            return acc.concat(`<p>${ind + 1}: ${cur.name}</p>\n`)
        }, `\n`)
    }

    static notFound(parent) {
        parent.innerHTML = `
        <p>Not Found!</p>
        `
    }
}

export default HTMLHelper