const inputBtn = document.getElementById("input-btn")

inputBtn.addEventListener("click", function() {
    const listenOnImgWidth = 200 // width for the image
    document.getElementById("search").innerHTML = "" // clean up from prev search
    const songQuery = document.getElementById("expr").value //user's input
    if (songQuery) { // if user input not empty
        // append "listen on spotify" etc images
        document.getElementById("search").appendChild(listenOnSpotify(songQuery, listenOnImgWidth))
        document.getElementById("search").appendChild(listenOnApple(songQuery, listenOnImgWidth))
        document.getElementById("search").appendChild(listenOnAmazon(songQuery, listenOnImgWidth))
    }
})

function listenOnSpotify(songQuery, imgWidth) {
    // create a p tag
    let p = document.createElement("p")

    // create a link tag
    let a = document.createElement("a")
    a.id = "spotify-link"
    a.title = "Search with Spotify"
    a.href = `https://open.spotify.com/search/${songQuery}`
    a.target = "_blank" // new tab

    // create an image tag
    let img = document.createElement("img")
    img.src = "images/spotify-logo.png"
    img.width = imgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    return p
}

function listenOnApple(songQuery, imgWidth) {
    // create a p tag
    let p = document.createElement("p")

    // create a link tag
    let a = document.createElement("a")
    a.id = "applemusic-link"
    a.title = "Search with Apple Music"
    a.href = `https://music.apple.com/us/search?term=${songQuery}`
    a.target = "_blank" // new tab

    // create an image tag
    let img = document.createElement("img")
    img.src = "images/applemusic-logo.png"
    img.width = imgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    return p
}

function listenOnAmazon(songQuery, imgWidth) {
    // create a p tag
    let p = document.createElement("p")

    // create a link tag
    let a = document.createElement("a")
    a.id = "amazonmusic-link"
    a.title = "Search with Amazon Music"
    a.href = `https://music.amazon.com/search/${songQuery}?filter=IsLibrary%7Cfalse&sc=none`
    a.target = "_blank" // new tab

    // create an image tag
    let img = document.createElement("img")
    img.src = "images/amazonmusic-logo.png"
    img.width = imgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    return p
}