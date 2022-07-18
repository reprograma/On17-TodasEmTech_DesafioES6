const input = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const sectionCard = document.querySelector("#section-card");
const sectionRepositorios = document.querySelector("#section-repositorios");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const userName = input.value.trim();
  if (userName) {
    getGitHubData(userName);
  } else {
    alert("Digite algum usuário!");
  }
  input.value = " ";
});

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

const getGitHubData = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await fetch(url);
    const responseRepos = await fetch(url + "/repos");
    if (response.ok) {
      const user = await response.json();
      const repos = await responseRepos.json();

      sectionCard.innerHTML = " ";
      const cardPrincipal = document.createElement("div");
      cardPrincipal.setAttribute("class", "card-principal");
      cardPrincipal.innerHTML = createCard(user);
      sectionCard.appendChild(cardPrincipal);

      sectionRepositorios.innerHTML = " ";
      repos.forEach((repo) => {
        const repoElement = document.createElement("div");
        repoElement.setAttribute("class", "div-repo");
        repoElement.innerHTML = createRepo(repo);
        sectionRepositorios.appendChild(repoElement);
      });
    } else {
      alert("Usuário não encontrado");
      throw new Error();
    }
  } catch (err) {
    console.error("a requisição não foi bem-sucedida", err);
  }
};

function createCard(user) {
  const { name, avatar_url, bio, public_repos, login, followers } = user; // const name=user.name
  return `
  <h2 class= "nome" >Name: ${name}</h2>
  <img class= "img-github" src="${avatar_url}" alt="foto usuário"/>
  <h3 class= "login" >Login: ${login}</h3>
  <p class= "bio" > Bio: ${bio ?? ""}</p>
  <div class="caixa-icone-numeros">
    <img  class="icone-repositorio" src="./people_outline.jpg"/>
    <p class= "./public-repos"> ${public_repos}</p>
  </div>
  <div class="caixa-icone-numeros">
    <img class="icone-seguidores" src="./Vector.jpg"/>
    <p class= "followers">${followers}</p>
  </div>
  `;
}

function createRepo(repo) {
  const { name, description, language, stargazers_count } = repo;
  return `
    <h2 class= "nome-repo"> ${name}</h2>
    <p class= "description-repo">${description ?? "Sem descrição"}</p>
    <p class= "language-repo">${language ?? "Sem linguagem definida"}</p>
    <p class= "stargazers-count">⭐${stargazers_count}</p>
    `;
}
