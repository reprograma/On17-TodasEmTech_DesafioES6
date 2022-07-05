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
        } else {
            alert("esta usuária não existe no github!");
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

const repositoriesLink = document.querySelector(".repositories-link");

repositoriesLink.addEventListener("click", (event) => {
  getRepositories(login);
});


function handleUserNotFound() {
return (section.innerHTML = `
<img class="not-found-img" src="./images/9.png">
`);
}

async function getRepositories(login) {
const url = `https://api.github.com/users/${login}/repos`;
try {
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    createRepositoriesCards(data);
  } else {
    handleNotFoundRepositories(login);
  }
} catch (err) {
  console.error("Request was not successful", err);
}
}

async function createRepositoriesCards(repositories) {
const { name, description, language, stargazers_count } = repositories;
const repositoriesList = document.createElement("div");

repositoriesList.setAttribute("class", "repositories-list");
section.appendChild(repositoriesList);

repositories.map((repository) => {
  return (repositoriesList.innerHTML += `
  <div class="repository">
  <h2 class="title-git">${repository.name}</h2>
  <h3 class="repository-description">${
    repository.description ? repository.description : ""
  }</h3>
  <div class="informations">
  <p>${repository.language}</p>
  <p><img src="./images/star_border.png"> ${repository.stargazers_count}</p>
  </div>
  </div>
  `);
});
}

function handleNotFoundRepositories(login) {
section.innerHTML += `<img class="not-found-img" src="./images/9.png">
`;
}