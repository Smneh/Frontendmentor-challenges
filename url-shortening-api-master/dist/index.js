const shortenBtn = document.getElementById("shorten-btn")
const inputLinkContainer = document.querySelector(".link-input")
const shortenedLinksContainer = document.querySelector(".shortened-links")
const hamburgerMenuIcon = document.getElementById("hamburger-menu-icon")
const mainNavigation = document.getElementById("main-navigation")

inputLinkContainer.addEventListener("submit", (e) => shortenHandler(e))
shortenBtn.addEventListener("click", (e) => shortenHandler(e))
hamburgerMenuIcon.addEventListener("click", (e) => mainNavigation.classList.toggle("show"))

const APIUrl = 'https://api.shrtco.de/v2/shorten?url='
let shortenedLinks = JSON.parse(localStorage.getItem('shortened-links')) || [];

if (shortenedLinks)
    shortenedLinks.forEach(link => addLinkToDOM(link.original, link.shortened));

async function shorten(originalLink) {
    try {
        const response = await fetch(APIUrl + encodeURIComponent(originalLink))
        const responseData = await response.json()
        const shortLink = responseData.result.full_short_link

        addLinkToDOM(originalLink, shortLink)
        updateLocalStorage(originalLink, shortLink)
    } catch (error) {
        alert(error.message);
    }
}

function shortenHandler(e) {
    e.preventDefault()
    const input = inputLinkContainer.querySelector("input")

    if (input.value.trim() === '')
        input.classList.add("empty")

    else {
        input.classList.remove("empty")
        shorten(input.value)
    }
}

function addLinkToDOM(originalLink, shortLink) {
    const shortenedElement = document.createElement("div")
    shortenedElement.classList.add("shortened-component")
    shortenedElement.innerHTML =
        `
            <a class="original-link" href='${originalLink}' target="_blank">${originalLink}</a>
            <a class="shortened-link" href='${shortLink}' target="_blank">${shortLink}</a>
            <button class="btn-primary" id="copy-btn">Copy</button>
        `
    shortenedLinksContainer.appendChild(shortenedElement)
    shortenedElement.addEventListener("click", (e) => triggerCopy(e))
}

function triggerCopy(e) {
    const target = e.target
    if (target.classList.contains('btn-primary')) {
        navigator.clipboard.writeText(e.target.previousElementSibling.textContent)
        target.classList.add("copied")
        target.textContent = 'Copied!'
    }
}

function updateLocalStorage(originalLink, shortLink) {
    shortenedLinks.push({
        original: originalLink,
        shortened: shortLink
    })
    localStorage.setItem('shortened-links', JSON.stringify(shortenedLinks));
}