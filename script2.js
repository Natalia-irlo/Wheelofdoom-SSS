let users = []
const icons = ["M", "D", "P"]
const images = ["./assets/mario-unscreen.gif", "./assets/daisy.gif", "./assets/peach.gif"]
const audio = document.getElementById("myAudio");
const usersList = document.getElementById(`usersList`);
const usersImagesParent = document.getElementById(`usersImagesParent`); 
const userInput = document.getElementById(`userInput`);
const createUserBtn = document.getElementById(`createUserBtn`);
const resetButton = document.getElementById(`resetButton`);
const attackButton = document.getElementById(`attackButton`);
createUserBtn.addEventListener(`click`, function(){ createUser(userInput.value)}, false);
attackButton.addEventListener(`click`, function(){ randomPosition()}, false);
resetButton.addEventListener(`click`, function(){ restartGame()}, false);

function createUser(userName)
{ 
    if (userName.length === 0) {
        changePlaceholderValue('Try with a non empty value')
        return
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].name === userName) {
            changePlaceholderValue('This user is already on the list')
            return
        }
    }

    let user = {name:userName, icon:icons[0], image:images[0]};
    users.push(user);
        
    let divUser = document.createElement('div')
    let iconUserItem = document.createElement('h3')
    let userNameItem = document.createElement('h3')
    let userGifItem = document.createElement('img') 
    let userGifDivItem = document.createElement('div')
    let deleteUserButton = document.createElement('button')
    let changeIconButton = document.createElement('button')
        
    userGifItem.src = user.image
    userGifItem.className = user.icon
    userGifDivItem.textContent = user.name

    divUser.className = user.name
    iconUserItem.textContent = user.icon
    iconUserItem.className = user.icon
    userNameItem.textContent = user.name
    deleteUserButton.textContent = 'Delete'
    deleteUserButton.addEventListener('click', function(){ deleteUser(user.name)}, false);
    changeIconButton.textContent = 'Change Icon'
    changeIconButton.addEventListener('click', function(){ changeIcon(user.name)}, false);
        
    divUser.append(iconUserItem,userNameItem,deleteUserButton,changeIconButton)
    usersList.appendChild(divUser)

    userGifDivItem.append(userGifItem)
    usersImagesParent.appendChild(userGifDivItem)
}

function deleteUser(userName, attack = null)
{
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === userName) {
            users.splice(i,1)
            for (const childDiv of usersList.children) {
                if (childDiv.className === userName) {
                    childDiv.remove()
                    for (const childImagesDiv of usersImagesParent.children) {
                        if (childImagesDiv.textContent === userName) {
                            childImagesDiv.remove()
                            return
                        }
                    }
                    console.log(users[i])
                    if (users.length <= 0 && attack) {
                        alert('GAME OVER')
                        return
                    } else if (attack) {
                        alert(userName + ' was sacrified')
                        return
                    } else {
                        return
                    }
                }
            }
        }
    }
}
 
function changeIcon (userName)
{
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === userName) {
            let user = users[i]
            for (let j = 0; j < icons.length; j++) {
                if (icons[j] === user.icon) {
                    console.log('before icon', user.icon)
                    console.log('before image', user.image)
                    if(j < (icons.length -1)) {
                        j++
                        user.icon = icons[j]
                        user.icon.className = icons[j]

                        user.image = images[j]
                        user.image.className = icons[j]
                        user.image.src = images[j]

                    } else if (j === (icons.length -1)) {
                        user.icon = icons[0]
                        user.icon.className = icons[0]

                        user.image = images[0]
                        user.image.className = icons[0]
                        user.image.src = images[0]
                    }

                    for (const childIconDiv of usersList.children) {
                        if (childIconDiv.className === userName) {
                            for (const childIcon of childIconDiv.children) {
                                childIcon.firstChild.textContent = user.icon
                                console.log('after icon',user.icon)
                                break
                            }
                        }
                    }

                    for (const childImageDiv of usersImagesParent.children) {
                        if (childImageDiv.textContent === userName) {
                            for (const childImage of usersImagesParent.children) {
                                childImage.firstChild.src = user.image
                                console.log('after image',user.image)
                                return
                            }
                        }
                    }
                }
            }
        }
    }
}

function randomPosition ()
{
    let random = Math.floor(Math.random() * users.length)
    return deleteUser(users[random].name, true)
}

function restartGame ()
{
    changePlaceholderValue('Insert a Name')

    users = []
    while (usersList.firstChild) {
        usersList.removeChild(usersList.firstChild);
    }

    while (usersImagesParent.firstChild) {
        usersImagesParent.removeChild(usersImagesParent.firstChild);
    }
}

function changePlaceholderValue (phrase)
{
    userInput.value = ''
    userInput.placeholder = phrase
    return
}

function playAudio() {
    setTimeout(function(){
        audio.play();

        setTimeout(function(){
            audio.pause();
            audio.currentTime = 0;
        }, 2000);
    });
}