const form = document.querySelector(".sign-up-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        const inputContainer = input.closest(".input-container");
        const errorEl = inputContainer.querySelector("p");
        const errorIcon = inputContainer.querySelector("img");

        if (input.value.trim() === '') {
            errorEl.textContent = `${input.placeholder} cannot be empty`;
            errorIcon.style.display = 'block';
            input.classList.add("invalid");
        }
        else if (input.value.trim !== '' && input.id === 'email' && !validateEmail(input.value)) {
            errorEl.textContent = 'Looks like this is not an email';
            errorIcon.style.display = 'block';
            input.classList.add("invalid");
        }
        else {
            errorIcon.style.display = 'none';
            errorEl.textContent = '';
            input.classList.remove("invalid");
        }
    });
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}