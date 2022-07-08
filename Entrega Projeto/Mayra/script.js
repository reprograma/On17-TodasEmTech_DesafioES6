const input = document.querySelector('.input');
const button = document.querySelector('.button');
const divCard = document.querySelector('.card-principal');

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
            alert('Usuária não encontrada no GitHub');
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
    <h2>Name: ${name}</h2>
    <h3>Login: ${login}</h3>
    <p>Bio: ${bio}</p>
    <p>Public repos: ${public_repos}</p>
    <p>Followers: ${followers}</p>
    `
};