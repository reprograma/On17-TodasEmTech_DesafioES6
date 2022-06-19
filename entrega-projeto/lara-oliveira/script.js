const input = document.querySelector(".input")
const button = document.querySelector('.btn-submit')

const divCard = document.querySelector('.user-infos')

const reposCards = document.querySelector('.repositories-cards')



button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim();

    if(userName){
        getInfoGithub(userName)
        getRepoCards(userName)
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
            alert('Esta usuária não existe no Github')
            throw new Error() 
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
    <h2>${name}</h2>
    <h3>${login}</h3>
    <p>${bio}</p>
    <p>repositórios: ${public_repos}</p>
    <p>seguidores: ${followers}</p>
    `
}

const getRepoCards = async (user) => {
    const url = `https://api.github.com/users/${user}/repos`
    try{
        const response = await fetch(url);
        const repositories = await response.json();

        repositories.map((cards) => {
            const content = document.createElement('h3')
            content.innerText = cards.name;
            reposCards.appendChild(content)
        })
    }
    catch(err){
        console.error("Esta usuária não possui repositórios", err)
    }
}