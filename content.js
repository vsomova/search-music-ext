function createPopup(selectedText) {
    const popup = document.createElement('div')
    popup.id = 'popupEl'

    popup.style.position = 'fixed'
    popup.style.backgroundColor = '#150726'
    popup.style.borderRadius = '6px'
    popup.style.padding = '0px 2px 2px 2px'
    popup.style.zIndex = '100' // make sure the window appears in front of everything else

    // create a button for copying the selected text
    const copyBtn = document.createElement("button")
    copyBtn.id = "copy-btn"
    copyBtn.innerText = 'Copy'

    // button styles
    copyBtn.style.backgroundColor = "black"
    copyBtn.style.border = "1px solid white"
    copyBtn.style.borderRadius = "8px"
    copyBtn.style.boxSizing = "border-box"
    copyBtn.style.color = "white"
    copyBtn.style.fontFamily = "Phantomsans, sans-serif"
    copyBtn.style.fontSize = "10px"
    copyBtn.style.padding = "3px"
    copyBtn.style.cursor = "pointer"
    copyBtn.style.margin = "1px"

    copyBtn.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(selectedText);
            copyBtn.innerText = 'Copied'
        } catch (err) {
            console.error('Failed to copy text to clipboard:', err);
        }
    })

    popup.appendChild(copyBtn)


    // create a button for searching the music with selected text
    const musicBtn = document.createElement("button")
    musicBtn.id = "music-btn"
    musicBtn.innerText = 'Search music'

    // button styles
    musicBtn.style.backgroundColor = "black"
    musicBtn.style.border = "1px solid white"
    musicBtn.style.borderRadius = "8px"
    musicBtn.style.boxSizing = "border-box"
    musicBtn.style.color = "white"
    musicBtn.style.fontFamily = "Phantomsans, sans-serif"
    musicBtn.style.fontSize = "10px"
    musicBtn.style.padding = "3px"
    musicBtn.style.cursor = "pointer"
    musicBtn.style.margin = "1px"

    musicBtn.addEventListener('click', function(event) {
        // replace the current popup with the new one
        removeExistingPopup()
        const musicPopup = createMusicPopup(selectedText)
        musicPopup.style.left = `${event.clientX + 10}px` // where does the window pop up horizontally
        musicPopup.style.top = `${event.clientY + 10}px`
        document.body.appendChild(musicPopup)
    })

    popup.appendChild(musicBtn)

    // further down we have a function for when the user clicks anywhere on the page, the popup
    // disappears. however, we should make an exception for when clicked on the popup itself,
    // therefore stop the event propagation so that it doesnt reach further to the document and
    // the window doesnt close
    popup.addEventListener('mousedown', function (event) {
        event.stopPropagation()
    })
    popup.addEventListener('mouseup', function (event) {
        event.stopPropagation()
    })

    return popup
}

function createMusicPopup(selectedText) {
    const popup = document.createElement('div')
    popup.id = 'musicPopupEl'

    popup.style.position = 'fixed'
    popup.style.backgroundColor = '#150726'
    popup.style.borderRadius = '6px'
    popup.style.padding = '5px'
    popup.style.zIndex = '100' // make sure the window appears in front of everything else

    popup.style.border = "5px solid transparent"
    popup.style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)"
    popup.style.borderImageSlice = "1"

    const listenOnImgWidth = 150

    popup.appendChild(listenOnSpotify(selectedText, listenOnImgWidth))
    popup.appendChild(listenOnApple(selectedText, listenOnImgWidth))
    popup.appendChild(listenOnAmazon(selectedText, listenOnImgWidth))

    // further down we have a function for when the user clicks anywhere on the page, the popup
    // disappears. however, we should make an exception for when clicked on the popup itself,
    // therefore stop the event propagation so that it doesnt reach further to the document and
    // the window doesnt close
    popup.addEventListener('mousedown', function (event) {
        event.stopPropagation()
    })

    popup.addEventListener('mouseup', function (event) {
        event.stopPropagation()
    })

    return popup
}

function removeExistingPopup() {
    const existingPopup = document.getElementById('popupEl')
    const existingMusicPopup = document.getElementById('musicPopupEl')
    if (existingPopup) {
        existingPopup.remove()
    }
    if (existingMusicPopup) {
        existingMusicPopup.remove()
    }
}

document.addEventListener('mouseup', function (event) {
    removeExistingPopup() // in case if old popup exists

    const selectedText = window.getSelection().toString().trim()

    if (selectedText.length > 0) {
        const popup = createPopup(selectedText)
        popup.style.left = `${event.clientX - 30}px` // where does the window pop up horizontally
        popup.style.top = `${event.clientY - 40}px`
        document.body.appendChild(popup)
    }
})

// if user clicks somewhere else to get rid of the popup
document.addEventListener('mousedown', function () {
    removeExistingPopup()
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
    img.src = chrome.runtime.getURL("images/spotify-logo.png")
    img.width = imgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    p.style.margin = "2px"

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
    img.src = chrome.runtime.getURL("images/applemusic-logo.png")
    img.width = imgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    p.style.margin = "2px"

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
    img.src = chrome.runtime.getURL("images/amazonmusic-logo.png")
    img.width = imgWidth

    // append image to the link
    a.appendChild(img)

    // append link to p tag
    p.appendChild(a)

    p.style.margin = "2px"

    return p
}