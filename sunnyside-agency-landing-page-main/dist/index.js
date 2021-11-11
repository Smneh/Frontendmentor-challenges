const toggleBtn = document.getElementById("toggle-menu");

toggleBtn.addEventListener("click", () => {
    const mainMenu = document.getElementById("main-menu")
    mainMenu.classList.toggle("show")
})