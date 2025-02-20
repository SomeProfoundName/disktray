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
        const {GAME, review} = p 
        const postReview = document.createElement('div')
        postReview.innerHTML = `
        <h4>GAME: ${GAME}</h4>
        <p>${review}</p>
        `
        postsArea.appendChild(postReview)
    })
}

getPosts()