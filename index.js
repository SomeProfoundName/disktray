// IMAGES

const imageArea = document.getElementById('imageArea')

function getCoverImages() {
    return fetch('http://localhost:3001/images')
        .then(res => res.json())
}

function appendCoverImages(data) {
    imageArea.innerHTML = ""
    const imageArray = getCoverImages().then(image => {
        image.map(element => {
            const gameImage = document.createElement('img')
            gameImage.src = element.cover.url
            gameImage.classList.add('top-games-image')
            gameImage.alt = element.name
            imageArea.appendChild(gameImage)
        })
    })
}

appendCoverImages()

// GET STARTED BUTTON
const getStartedBtn = document.getElementById('get-started')


getStartedBtn.addEventListener('click', (e) => {
    if (localStorage.getItem('loggedIn')) {
        window.location.href = 'contact.html'
    } else {
        showSignInCont.classList.remove('hidden')
        usernameInput.classList.remove('hidden')
        repeatPasswordInput.classList.remove('hidden')
        returningUser = false
    }
})

// TOP USER REVIEW AREA
const userReviewArea = document.getElementById('user-review-area')

function getTopUserReviews() {
    return fetch("http://localhost:3001/topreviews")
        .then(res => res.json())
}

function appendTopReviews() {
    userReviewArea.innerHTML = ""
    const topUserReviews = getTopUserReviews().then(reviews => {
        reviews.map(r => {
            const { game, review, screenshot, likes, username, profileImg } = r
            
            const userReview = document.createElement('div')
            userReview.classList.add('user-review')

            userReview.innerHTML = `
            <img class="user-review-img" src="http://localhost:3001${screenshot}" alt="">
            <div class="user">
                <div class="user-review-title">
                    <p>${game}</p>
                </div>
                <div class="user-info">
                    <img class="user-info-img" src="http://localhost:3001${profileImg}" alt="">
                    <p class="user">${username}</p>
                    <p class="likes">👍: ${likes}</p>
                </div>
                <div class="user-text">
                    <p>${review}</p>
                </div>
            </div>
            `
            userReviewArea.appendChild(userReview)
        })
    })
}
appendTopReviews()


// TOP USERS
const topUserArea = document.getElementById('top-users')

function topThreeUsers() {
    return fetch('http://localhost:3001/topthree')
        .then(res => res.json())
}

function appendtopThreeUsers() {
    topUserArea.innerHTML = ""
    const topThree = topThreeUsers().then(users => {
        users.map(user => {
            console.log(user)
            const { username, profileImg, total_likes } = user
            const userProfile = document.createElement('div')
            userProfile.classList.add('top-user')
            userProfile.innerHTML = `
            <div class="tu-left">
                        <img class="tu-img" src="http://localhost:3001${profileImg}" alt="">
                    </div>
                    <div class="tu-right">
                        <p>${username}</p>
                        <p>👍: ${total_likes}</p>
                    </div>
            </div>
            `
            topUserArea.appendChild(userProfile)
        })
    })
}

appendtopThreeUsers()