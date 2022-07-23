const input = document.querySelector(".input-search");
const button = document.querySelector(".input-img-container");
const card = document.querySelector(".card-principal");

button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim(); // metodo trim tira tudo de espaço da função
    if (userName) {
        getGitHubData(userName);
    } else {
        alert('Digite um nome de pessoa usuária válido');
    }
});


const getGitHubData = async (user) => {

    const url = 'https://api.github.com/users/${user}';
    // tenta buscar esses dados pela variavel url e armazena num json
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            card.innerHTML = (createCard(data));
        } else {
            alert("esta não é uma pessoa usuária valida");
            throw new Error();
        }

    }
    catch (err) { // se der erro me avisa
        console.err("a requisição não foi bem sucedida", err);
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


