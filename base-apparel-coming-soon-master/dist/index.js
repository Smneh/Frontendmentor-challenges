const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputEmail = document.getElementById("email-input");
    const inputContainer = document.querySelector('.input-container');
    const errorText = document.querySelector(".error-text");
    const errorIcon = document.querySelector(".error-icon");

    if (inputEmail.value.trim() === '' || !validateEmail(inputEmail.value)) {
        errorText.textContent = 'Please provide a valid email';
        errorIcon.style.visibility = 'visible';
        inputContainer.classList.add("invalid");
    }
    else {
        errorText.innerHTML = '&nbsp;';
        errorIcon.style.visibility = 'hidden';
        inputContainer.classList.remove("invalid");
    }
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}