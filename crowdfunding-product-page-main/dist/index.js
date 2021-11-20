const bookmarkEl = document.getElementById("bookmark")
const backProjectButton = document.getElementById("back-project")
const modal = document.getElementById("modal")
const closeModalButton = document.querySelector(".close-modal")
const modalBoxTitles = document.body.querySelectorAll(".modal .title h4")
const pledgeInputs = document.body.querySelectorAll(".pledge input[type='number']")
const continueButtons = document.querySelectorAll(".pledge button")
const completedButton = document.querySelector(".modal .box-completed button")
const menuIcon = document.querySelector('.hamburger-menu-icon')
const navbar = document.querySelector('.navbar')
const closeMenuIcon = document.body.querySelector(".close-menu-icon")

bookmarkEl.addEventListener("click", () => bookmarkEl.classList.toggle('selected'))

backProjectButton.addEventListener('click', showModal)

closeModalButton.addEventListener("click", hideModal)

modalBoxTitles.forEach(modalBoxTitle => modalBoxTitle.addEventListener('click', selectBox))

continueButtons.forEach(continueButton => continueButton.addEventListener("click", showCompleted))

completedButton.addEventListener("click", hideModal)

menuIcon.addEventListener('click', showMobileMenu)

pledgeInputs.forEach(pledgeInput => pledgeInput.addEventListener('click', (e) => {
    e.target.closest(".input").classList.add('focused')
}))

function selectBox(e) {
    if (e.target.closest('.box-inner').classList.contains('disabled'))
        return

    deselectBoxesAndInputs()
    e.target.closest('.box-inner').classList.add('selected')
}

function deselectBoxesAndInputs() {
    if (document.body.querySelector(".box-inner.selected"))
        document.body.querySelector(".box-inner.selected").classList.remove('selected')
    pledgeInputs.forEach(pledgeInput => pledgeInput.closest('.input').classList.remove("focused"))
}

function showModal() {
    modal.classList.add("show")
    modal.style.height = document.body.scrollHeight + 'px'
    modal.style.width = document.body.scrollWidth + 'px'

    document.querySelector(".modal .box-completed").classList.remove('show')
    document.querySelector(".modal .box-modal").classList.remove('hide')
}

function hideModal() {
    modal.classList.remove('show')
    deselectBoxesAndInputs()
}

function showCompleted() {
    document.querySelector(".modal .box-completed").classList.add('show')
    document.querySelector(".modal .box-modal").classList.add('hide')
}

function showMobileMenu() {
    document.body.querySelector('.menu').classList.add("show")
    navbar.classList.add("mobile-modal")
    navbar.style.height = document.body.scrollHeight + 'px'
    navbar.style.width = document.body.scrollWidth + 'px'

    menuIcon.classList.add('hide')
    closeMenuIcon.style.display = "block"
    closeMenuIcon.addEventListener("click", hideMobileMenu)
}

function hideMobileMenu() {
    document.body.querySelector('.menu').classList.remove("show")
    navbar.classList.remove("mobile-modal")
    navbar.style.height = 'unset'
    navbar.style.width = 'unset'

    menuIcon.classList.remove('hide')
    closeMenuIcon.style.display = "none"
}