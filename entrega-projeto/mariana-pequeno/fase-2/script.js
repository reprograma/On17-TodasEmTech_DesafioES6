const input = document.querySelector(".input");
const button = document.querySelector(".btn");
const containerCard = document.querySelector(".container-card");

const card1 = document.querySelector(".card-1");
const infosProfile = document.querySelector(".infos-profile");
const imgGithubUser = document.querySelector(".img-github");
const nameUser = document.querySelector(".name");
const loginUser = document.querySelector(".login");
const bioUser = document.querySelector(".bio");
const publicReposUser = document.querySelector(".public-repos");
const followersUser = document.querySelector(".followers");

const cardRepo = document.querySelector(".card-repos");

const card2 = document.querySelector(".card-2");
const notFoundUser = document.querySelector(".not-found-profile")
const title2 = document.querySelector(".title-2");
const pSearch = document.querySelector(".paragraph-search");

const notFoundRepos = document.querySelector(".not-found-repos");
const pNotRepos = document.querySelector(".p-not-repos");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const userName = input.value.trim();
  if (userName) {
    getGitHubData(userName);
  } else {
    alert("Digite algum usuário!");
  }
  
  input.value = "";
});

const getGitHubData = async (user) => {
  const urlUser = `https://api.github.com/users/${user}`; //Usuário
  const urlRepos = `https://api.github.com/users/${user}/repos`; //Repositórios  
  try {
    const responseUser = await fetch(urlUser);
    const responseRepos = await fetch(urlRepos);
    const dataUser = await responseUser.json();
    const dataRepos = await responseRepos.json();
    if(!dataUser.id){ //user not found test: @0545mml
      card1.classList.replace("ativo", "inativo");
      cardRepo.classList.replace("ativo", "inativo")
      card2.classList.replace("inativo", "ativo");  
      notFoundUser.classList.replace("inativo", "ativo")
      notFoundRepos.classList.replace("ativo", "inativo");
    } else if(!!dataUser.id && dataRepos.length===0){ //User not repos test: @Raptor117spect
      card1.classList.replace("inativo", "ativo");
      cardRepo.classList.replace("ativo", "inativo")
      card2.classList.replace("inativo", "ativo");
      notFoundUser.classList.replace("ativo", "inativo")
      notFoundRepos.classList.replace("inativo", "ativo");
      creatElements(dataUser)
    } else { 
      card1.classList.replace("inativo", "ativo");
      cardRepo.classList.replace("inativo", "ativo");
      card2.classList.replace("ativo","inativo");
      notFoundUser.classList.replace("ativo","inativo");
      notFoundRepos.classList.replace("ativo","inativo");
      creatElements(dataUser)
      cardRepos(dataRepos);
    }
  } catch (err) {
    console.error("a requisição não foi bem-sucedida", err);
  }
}

function creatElements(user){
  const { name, avatar_url, bio, public_repos, login, followers, html_url } = user;
  imgGithubUser.src = `${avatar_url}`;
  nameUser.innerText = `${name ? name : ""}`;
  loginUser.innerText = `@${login}`;
  loginUser.href = `${html_url}`
  bioUser.innerText = `${bio ? bio : ""}`;
  publicReposUser.innerText = `${public_repos}`;
  followersUser.innerText = `${followers}`;
}

function cardRepos(user){
  const containerReposCards = document.querySelector(".container-repos-cards")
  user.map(item => {
    const {name, description, language, stargazers_count} = item;
    return containerReposCards.innerHTML += `
      <div class="repos">
        <h2 class="name-repos">${name}</h2>
        <p class="description-repos">${description}</p>
        <div class="spans-tags">
          <span class="language">${language}</span>
          <span class="stars">${stargazers_count}</span>
        </div>
      </div>`
  })
}