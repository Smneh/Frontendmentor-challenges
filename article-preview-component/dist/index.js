document.body.addEventListener('click', (e) => {
    const linksContainer = document.querySelector(".social-links");

    if (e.target.classList.contains("fa-share") || e.target.classList.contains("share-btn")) {
        linksContainer.classList.toggle("show");
        document.querySelectorAll(".share-btn").forEach(btn => btn.classList.toggle("dark"));
    }
    else {
        if (linksContainer.classList.contains("show")) {
            linksContainer.classList.remove("show");
            document.querySelectorAll(".share-btn").forEach(btn => btn.classList.remove("dark"));
        }
    }
});