const input = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const divCard = document.querySelector(".card-principal");


button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim();
    if (userName) {
        getGitHubData(userName);
    } else {
        alert('Digite algum usuário!');
    }
    input.value = '';
});


const getGitHubData = async (user) => {
    const url = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            divCard.innerHTML = createCard(data);
            //chamar aqui a funcao createRepo, utilizando a mesma logica
        } else {
            alert("s");
            throw new Error();
            
        }
    }
    catch (err) {
        console.error("a requisição não foi bem-sucedida", err);
    }
};

function createCard(user) {
    const { name, avatar_url, bio, public_repos, login, followers } = user;
    return `
    <img class="img-github" src="${avatar_url}" alt="minha foto do github" />
    <h2 class="name">Nome: ${name}</h2>
    <h3 class="login">Login: ${login}</h3>
    <p class="bio">Bio: ${bio ? bio : ''}</p>
    <div class="caixa-icone-numeros">
    <img class="icone1" src="./imagem/people.png"/>
        <p class="public-repos">${public_repos}</p>
     </div>
     <div class="caixa-icone-numeros">
        <img class="icone2" src="./imagem/book.png"/>
         <p class="followers">${followers}</p> 
     </div>
   `
};


const getRepositoryList = async (user, data) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${user}/repos?type=public_repo`
      );
      const userRepository = await response.json();
  
      userRepository.length === 0
        ? noPublicRepositorys(data.name)
        : renderRepositoryList(userRepository);
    } catch (err) {
      alert("Erro ao carregar informações");
    }
  };