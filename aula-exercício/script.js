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
});


const getGitHubData = async (user) => {
    const url = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        divCard.innerHTML = createCard(data);
       
    }
    catch (err) {
        console.error("a requisição não foi bem-sucedida", err);
    }
};

function createCard(user){
   const {name, avatar_url } = user;
   return`
   <img src+
   <p>${name}</p>
   `
};
