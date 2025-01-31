const gameURL = 'https://api.igdb.com/v4/games'

function getGameImages() {
    fetch(gameURL,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': '',
                'Authorization': ''
            },
            body: "fields *;"
        })
    .then(response => {
        console.log(response)
    }).catch(err => {
        console.error(err)
    })
}

getGameImages()