//grab and add eventlistener to submit 

document.addEventListener("DOMContentLoaded", (e) => {


    const submitForm = document.getElementById('github-form');
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let username = document.getElementById('search').value;
        handleSubmit(username);
        document.getElementById('search').value = '';
    });

    function handleSubmit(username) {
        fetch (`https://api.github.com/search/users?q=${username}`)
        .then(res => res.json())
        .then(userNames => {
            //console.log(userNames.items);
            //console.log(Array.from(userNames.items));
            removeAllChildNodes(document.querySelector("#user-list"));
            for(user of userNames.items) {
                //console.log(user);
                let usersObj = {
                    image:user.avatar_url,
                    name:user.login,
                    link:user.html_url
                }
                //console.log(usersObj);
                renderUsers(usersObj);
            }
        })
    }   

    function renderUsers(userNamesObj) {
        //console.log(userNamesObj);
        //make cards for each user with username, avatar, and link
        let card = document.createElement('li');
        card.setAttribute('id', 'card');
        card.innerHTML = 
        `
            <img src = "${userNamesObj.image}">
            <div class="${userNamesObj.name}_content">
                <h2>${userNamesObj.name}</h2>
                <h4> ${userNamesObj.link} </h4>
            </div>
            </div>
                <button class='${userNamesObj.name}_button'> Check out my Repos </button>
            </div>
        ` 
        document.querySelector("#user-list").appendChild(card);

        const reposButton = document.getElementsByClassName(`${userNamesObj.name}_button`)[0];
        let buttonClicked = false;
        //console.log(reposButton);
        reposButton.addEventListener('click', (e) => {
            //console.log(reposButton);
            let user = userNamesObj.name;
            //console.log(user);
            if(!buttonClicked){
                showRepos(user);
                buttonClicked = !buttonClicked;
                reposButton.innerText = 'Click to remove Repos';
            }
            else {
                removeAllChildNodes(document.getElementsByClassName(`${user}_content`)[0]); 
                buttonClicked = !buttonClicked;
                reposButton.innerText = "Check out my Repos";
            }
        });
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function showRepos(user) {
        //console.log(user);
        fetch(`https://api.github.com/users/${user}/repos`)
        .then(res => res.json())
        .then(allRepos => {
            //console.log(allRepos);
            for (repo of allRepos){
                let reposObj = {
                    repoName:repo.name,
                    repoUrl:repo.html_url
                }
            //console.log(reposObj);
            renderRepos(reposObj, user);
            }
        })
    }

    function renderRepos(repoObj, user){
        let repoCard = document.createElement('li');
        repoCard.setAttribute('id', 'repo_card');
        repoCard.innerHTML = 
        `
            <a href=${repoObj.repoUrl}>${repoObj.repoName}</a>
        `
        let button = document.getElementsByClassName(`${user}_content`)[0];
        button.appendChild(repoCard);
        //console.log(repoCard);
    }
});




