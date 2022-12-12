const form = document.querySelector('#github-form');
const inputName = document.querySelector('#search');
const userList = document.querySelector('#user-list');
const userName = document.querySelectorAll('#user-name');
const reposList = document.querySelector('#repos-list');

const searchUserName = ()=>{
    userName.forEach((userName)=>{
        userName.addEventListener('click',(event)=>{
            fetch(`https://api.github.com/users/${inputName.value}/repos`,{
                Accept: 'application/vnd.github.v3+json'
            })
            .then((response)=>response.json())
            .then((data)=>data.forEach((element)=>{
                const li = document.createElement('li');
                li.textContent = element.name;
                console.log(element.name);
                reposList.appendChild(li);
            }))
        })
    })
}
const searchUser = ()=>{
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        fetch(`https://api.github.com/search/users?q=${inputName.value}`,{
            Accept: 'application/vnd.github.v3+json'
        })
        .then(response=>response.json())
        .then(data=>{
            data.items.forEach((element)=>{
                const user = document.createElement('div');
                user.innerHTML = `<li id="user-name">${element.login}</li> <a href="${element.avatar_url}">Avatar</a>  <a href="${element.repos_url}">Repository Link</a>`
                userList.appendChild(user);
            })    
        })
    })
};

searchUser();
searchUserName();