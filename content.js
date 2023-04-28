function createPopup(selectedText) {
    const popup = document.createElement('div');

    popup.style.position = 'fixed';
    popup.style.backgroundColor = '#150726';
    popup.style.borderRadius = '6px';
    popup.style.padding = '5px';
    popup.style.zIndex = '100'; // make sure the window appears in front of everything else
    popup.id = 'popupEl';

    popup.style.border = "5px solid transparent"
    popup.style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    popup.style.borderImageSlice = "1";

    popup.style.width = '300px';
    popup.style.height = '400px';

    popup.appendChild(listenOnSpotify(selectedText, 200))
    popup.appendChild(listenOnApple(selectedText, 200))
    popup.appendChild(listenOnAmazon(selectedText, 200))

    return popup;
}

function removeExistingPopup() {
    const existingPopup = document.getElementById('popupEl');
    if (existingPopup) {
        existingPopup.remove();
    }
}

document.addEventListener('mouseup', function (event) {
    removeExistingPopup(); // in case if old popup exists

    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 0) {
        const popup = createPopup(selectedText);
        popup.style.left = `${event.clientX + window.scrollX + 10}px`; // where does the window pop up horizontally
        popup.style.top = `${event.clientY + window.scrollY + 10}px`;
        document.body.appendChild(popup);
    }
});

// if user clicks somewhere else to get rid of the popup
document.addEventListener('mousedown', function () {
    removeExistingPopup();
});


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

    p.style.textAlign = "center"

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

    p.style.textAlign = "center"

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

    p.style.textAlign = "center"

    return p
}