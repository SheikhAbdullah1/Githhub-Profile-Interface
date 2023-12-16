//// User Info Card references
let userInfoCard = document.querySelector('#userInfo')
let userAvatar = document.querySelector('#profileAvatar')
let userName = document.querySelector('#userName')
let userBio = document.querySelector('#userBio')
let userLocation = document.querySelector('#userLocation')
let userFollowers = document.querySelector('#userFollowers')
let userFollowings = document.querySelector('#userFollowings')
let userRepos = document.querySelector('#userRepos')
// let publicContributions = document.querySelector('#publicContributions')
let visitProfileBtn = document.querySelector('#visitProfileBtn')

// search user references
let inputUser = document.querySelector('#inputUser')
let searchUserBtn = document.querySelector('#searchUserBtn')

//display error
const displayErrorUserNotFound = function () {
  Swal.fire({
    title: 'User not found',
    text: 'User Not Found',
    icon: 'error',
    confirmButtonText: 'Okay',
  })
}
const displayErrorInput = function () {
  Swal.fire({
    text: 'Fill the input field',
    icon: 'error',
    confirmButtonText: 'Okay',
  })
}

// display user data
let getUserData = function () {
  return fetch(`https://api.github.com/users/${inputUser.value}`)
}
const displayUserData = function (userObj) {
  if (userObj.message != 'User Not Found') {
    // console.log('enter')
    userInfoCard.classList.remove('d-none')
    // console.log(userInfoCard)
    userAvatar.src = userObj.avatar_url
    userName.textContent = userObj.name
    userBio.textContent = userObj.bio
    userLocation.textContent = userObj.location
    userFollowers.textContent = userObj.followers
    userFollowings.textContent = userObj.following
    userRepos.textContent = userObj.public_repos

    visitProfileBtn.href = userObj.html_url
  } else {
    displayErrorUserNotFound()
  }
  inputUser.value = ''
}
searchUserBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (inputUser.value == '') {
    displayErrorInput()
    return 0
  }
  userInfoCard.classList.add('d-none')
  getUserData()
    .then((data) => {
      //   console.log(data)
      return data.json()
    })
    .then((object) => {
      //   console.log(object)
      displayUserData(object)
    })
    .catch((error) => {
      console.log(error)
    })
})
