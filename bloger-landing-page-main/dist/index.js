const menuICon = document.getElementById("hamburger-menu-icon")
const mainNav = document.getElementById("main-navigation")

menuICon.addEventListener("click", () => {
    mainNav.classList.toggle("show")
    if (mainNav.classList.contains('show'))
        menuICon.src = './img/icon-close.svg'
    else
        menuICon.src = './img/icon-hamburger.svg'

})