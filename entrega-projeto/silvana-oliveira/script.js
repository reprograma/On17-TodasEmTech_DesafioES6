const input = document.querySelector('.input');
const button = document.querySelector('.button');
const divCard = document.querySelector('.card-principal');
const divCardNull = document.querySelector(".card-principal-nulo");

button.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = input.value.trim();
    if (userName) {
        getGithubData(userName);
    } else {
        alert('Digite algum usuário!');
    }
    input.value = '';
});

const getGithubData = async (user) => {
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);
        if (response.status == '200') {
            const data = await response.json();
            divCard.innerHTML = createCard(data);
        } else {
            divCard.remove()
            divCardNull.innerHTML = createCardNull();
            throw new Error();
        }
    }
    catch (err) {
        console.error('a requisição não foi bem sucedida', err);
    }
};

function createCard(user) {
    const { name, avatar_url,bio,public_repos, login, followers } = user;
    return `
    <img src="${avatar_url}= "minha foto do github"/>
    <h2>${name}</h2>
    <h3>${login}</h3>
    <p class="bio">${bio}</p>
    <div>
        <p class="p1"><span class="material-icons md-14">people_outline</span>${followers}</p>
        <p class="p2"><span><img src="./img/Vector.png" ></span>${public_repos}</p>
    <div/>
    `
};

const createCardNull = () => {
    return `
    <h2>Página não encontrada :(</h2>
    <h3>Pesquise novamente!</h3>
    <img src="./img/notfound.png" alt="Imagem de usuário não encontrado.">
    `
};