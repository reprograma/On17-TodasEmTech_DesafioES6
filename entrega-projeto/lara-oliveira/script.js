const input = document.querySelector(".input")
const button = document.querySelector('.btn-submit')

const divCard = document.querySelector('.user-infos')

const reposCards = document.querySelector('.repositories-cards')

const main = document.querySelector(".main");


button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim();

    if(userName){
        getInfoGithub(userName)
        getRepoCards()
    } else {
        alert("Digite algum usuário!")
    }
    input.value = '';
})

const getInfoGithub = async (user) => {
    const url = `https://api.github.com/users/${user}`
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            divCard.innerHTML = createCard(data);
        }
        else{
                const noUserContainer = document.createElement("div");
                noUserContainer.setAttribute("class", "no-user-container")

                const noUserH1 = document.createElement("h1")
                noUserH1.setAttribute("class", "no-user-h1")
                noUserH1.innerText = "Usuário não encontrado :("

                const noUserH2 = document.createElement("h2")
                noUserH2.setAttribute("class", "no-user-h2")
                noUserH2.innerText = "Pesquise novamente"
    
                const noUser = document.createElement("img");
                noUser.setAttribute("src", "../../images/not-found.svg")
                noUser.setAttribute("class", "no-user-img")
    
                main.appendChild(noUserContainer)
                noUserContainer.appendChild(noUserH1)
                noUserContainer.appendChild(noUserH2)
                noUserContainer.appendChild(noUser)

                divCard.remove()
        }
    }
    catch(error){
        console.log("A requisição não foi bem sucedida", err);
    }
}

function createCard(user){
    const { name, avatar_url, bio, login, public_repos, followers } = user;
    return `
    <img class="user-img" src="${avatar_url}" alt="minha foto do github" />
    <h2 class="user-name">${name}</h2>
    <h3 class="user-login">${login}</h3>
    <p class="user-bio">${bio}</p>
    <div class="icons-container">
    <p class="p-icons followers"><img src="../../images/people_outline.png" class="img-icons"/> ${followers}</p>
    <p class="p-icons"><img src="../../images/Vector.png" class="img-icons"/> ${public_repos}</p>
    </div>
    `
}

const getRepoCards = async (user) => {
    const url = `https://api.github.com/users/${user}/repos`
    try{
        const response = await fetch(url);
        const repositories = await response.json();

        repositories.map((cards) => {

            const repoContainer = document.createElement('div')
            repoContainer.setAttribute("class", "repo-container")
            reposCards.appendChild(repoContainer)
            
            const repoName = document.createElement('h3')
            repoName.setAttribute('class', 'repo-name')
            repoName.innerText = `${cards.name}`;
            repoContainer.appendChild(repoName)

            const description = document.createElement('p')
            description.setAttribute('class', 'description')
            description.innerText = cards.description
            repoContainer.appendChild(description)
        })
    }
    catch(err){
        console.error("Esta usuária não possui repositórios", err)
    }
}