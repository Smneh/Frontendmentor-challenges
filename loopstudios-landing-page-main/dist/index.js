const hamburgerIcon = document.getElementById("hamburger-icon")

hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.closest(".navbar.main").classList.toggle('mobile')
})