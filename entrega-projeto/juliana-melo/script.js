const input = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const divCard = document.querySelector(".card-principal");
const divCard2 = document.querySelector(".card-secundario");

button.addEventListener("click", (e)=> {
    e.preventDefault();
    const userName = input.value.trim();
    if(userName){
        getGitHubData(userName);
        
    } else {
        alert('digite algum usuário');
    }
});

const getGitHubData = async (user) => {
    const url = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            divCard.innerHTML = createCard(data);
            divCard2.innerHTML = createReposList(user);
        }else {
            alert("esta usuária não existe no github");
            throw new Error();
        }
    }
    catch (err){
        console.error("a requisição não foi concluída", err);
    }
};

function createCard(user) {
    const { name, avatar_url, bio, public_repos, login, followers } = user;
    return `
    <img class="img-github" src="${avatar_url}" alt="minha foto do github" />
    <h2 class="name">name: ${name}</h2>
    <h3 class="login">login: ${login}</h3>
    <p class="bio">bio: ${bio ? bio : ''}</p>
    <div class="caixa-icone-numeros">
        <img class="icone1" src="../../images/people_outline.png"/>
        <p class="public-repos">${public_repos}</p>
     </div>
     <div class="caixa-icone-numeros">
        <img class="icone2" src="../../images/Vector.png"/>
         <p class="followers">${followers}</p> 
     </div>
   `
};

    
const createReposList = async (user) => {

    const urlRepos = `https://api.github.com/users/${user}/repos`;
    
    try{
        const response = await fetch(urlRepos);
        console.log(response)
        if(response.ok){ 
            const repositories = await response.json();
            console.log(repositories)
            repositories.map((cards) => {
                const content = document.createElement('h3');
                content.innerText = cards.name;
                divCard2.appendChild(content);
        
                const repositoriesContainer = document.createElement('div');
                repositoriesContainer.setAttribute("class", "repositories-container");
                divCard2.appendChild(repositoriesContainer);
        
                const repoName = document.createElement('h3');
                repoName.setAttribute("class", "repo-name");
                repoName.innerText = `${cards.name}`;
                repositoriesContainer.appendChild(repoName)
        
                const description = document.createElement('p')
                description.setAttribute('class', 'description')
                description.innerText = cards.description
                repositoriesContainer.appendChild(description)
            })
            
        }else {
            alert("esta usuária não existe no github");
            throw new Error();
        }

    }
    catch(error){
        console.error("Esta usuária não possui repositórios", error)
    }

}
