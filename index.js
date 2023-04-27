const listenOnImgWidth = 200
const inputBtn = document.getElementById("input-btn")

inputBtn.addEventListener("click", function() {
    document.getElementById("search").innerHTML = "" // clean up from prev search
    expr = document.getElementById("expr").value //user's input
    if (expr) { // if user input not empty
        listenOnSpotify(expr)
        listenOnApple(expr)
        listenOnAmazon(expr)
    }
})

function listenOnSpotify() {
    // create a p tag
    let p = document.createElement("p")

    // create a link tag
    let a = document.createElement("a")
    a.id = "spotify-link"
    a.title = "Search with Spotify"
    a.href = `https://open.spotify.com/search/${expr}`
    a.target = "_blank" // new tab

    // create an image tag
    let img = document.createElement("img")
    img.src = "images/spotify-logo.png"
    img.width = listenOnImgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    // append to the document
    document.getElementById("search").appendChild(p);
}

function listenOnApple() {
    // create a p tag
    let p = document.createElement("p")

    // create a link tag
    let a = document.createElement("a")
    a.id = "applemusic-link"
    a.title = "Search with Apple Music"
    a.href = `https://music.apple.com/us/search?term=${expr}`
    a.target = "_blank" // new tab

    // create an image tag
    let img = document.createElement("img")
    img.src = "images/applemusic-logo.png"
    img.width = listenOnImgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    // append to the document
    document.getElementById("search").appendChild(p);
}

function listenOnAmazon() {
    // create a p tag
    let p = document.createElement("p")

    // create a link tag
    let a = document.createElement("a")
    a.id = "amazonmusic-link"
    a.title = "Search with Amazon Music"
    a.href = `https://music.amazon.com/search/${expr}?filter=IsLibrary%7Cfalse&sc=none`
    a.target = "_blank" // new tab

    // create an image tag
    let img = document.createElement("img")
    img.src = "images/amazonmusic-logo.png"
    img.width = listenOnImgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    // append to the document
    document.getElementById("search").appendChild(p);
}