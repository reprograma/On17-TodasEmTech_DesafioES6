

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
    <h2 class="name">Name: ${name}</h2>
    <h3 class="login">Login: ${login}</h3>
    <p class="bio">Bio: ${bio ? bio : ''}</p>
    <h4 class="login">Public repos: ${public_repos}</h4>
    <h5 class="login">Followers: ${followers}</h5>
  
   `
};
    