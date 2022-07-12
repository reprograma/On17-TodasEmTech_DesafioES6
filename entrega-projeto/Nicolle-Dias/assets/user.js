class User {
    constructor(username) {
        this.data = "loading..."
        this.repos = "loading repos..."
        return this.init(username)
    }

    async init(username) {
        this.data = await this.getUsername(username)
        this.repos = await this.getRepos(username)
        return this
    }

    async getUsername(username) {
        let response = await fetch(`https://api.github.com/users/${username}`)
        let data = await response.json()
        return data
    }

    async getRepos(username) {
        let response = await fetch(`https://api.github.com/users/${username}/repos`)
        let data = await response.json()
        return data
    }
}

export default User