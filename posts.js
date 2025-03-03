// USER POSTS A REVIEW
const postReviewForm = document.getElementById('postReview')
const gameInput = document.getElementById('userGameInput')
const reviewInput = document.getElementById('userReviewInput')


postReviewForm.addEventListener('submit', (e) => {
    (e).preventDefault()
    if (!gameInput || !reviewInput || !screenshot.files[0]){
        alert('Make sure to add a review or game title')
        return
    }
    const formData = new FormData();
    formData.append("user", localStorage.getItem("user"));
    formData.append("gameTitle", gameInput.value);
    formData.append("userReview", reviewInput.value);
    formData.append("screenshot", screenshot.files[0]); 

    fetch("http://localhost:3001/userpost", {
        method: "POST",
        body: formData,
    }).then(res => res.text())
    .then(data => console.log(data))

    getPosts()
})

// CHANGE PROFILE IMG
const profileImage = document.getElementById('profile-pic-img')

function changePP() {
    if (localStorage.getItem('profileImg')) {
        profileImage.src = localStorage.getItem('profileImg')
    }
}

changePP()

// USERS PREVIOUS POSTS
const postsArea = document.getElementById('posts-area')

function getPosts() {
    fetch("http://localhost:3001/posts", {
        method: "POST",
        body: JSON.stringify({
            "username": localStorage.getItem('user')
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => res.json())
    .then(data => pushPosts(data))
}   

function pushPosts(data) {
    postsArea.innerHTML = ""
    const postArray = data.map((p) => {
        console.log(p)
        const {game, review, screenshot} = p 
        const postReview = document.createElement('div')
        postReview.classList.add('post')
        postReview.innerHTML = `
        <div class="post-left">
            <img class="post-left-img" src="http://localhost:3001${screenshot}" alt="">
        </div>
        <div class="post-right">
            <h4>GAME: ${game}</h4>
            <p>${review}</p>
        </div>
        </div>
        `
        postsArea.appendChild(postReview)
    })
}

getPosts()