const input = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const sectionCard = document.querySelector("#section-card");

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

const getGitHubData = async (user) => {
  const url = `https://api.github.com/users/${user}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      const cardPrincipal = document.createElement("div");
      cardPrincipal.setAttribute("class", "card-principal");
      cardPrincipal.innerHTML = createCard(data);
      sectionCard.innerHTML = " ";
      sectionCard.appendChild(cardPrincipal);
    } else {
      alert("Este usuária não existe no github");
      throw new Error();
    }
  } catch (err) {
    console.error("a requisição não foi bem-sucedida", err);
  }
};

//getGitHubData();

function createCard(user) {
  const { name, avatar_url, bio, public_repos, login, followers } = user; // const name=user.name
  return `
  <h2 class= "nome" >Name: ${name}</h2>
  <img class= "img-github" src="${avatar_url}" alt="foto usuário"/>
  <h3 class= "login" >Login: ${login}</h3>
  <p class= "bio" > Bio: ${bio ? bio : ""}</p>
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


