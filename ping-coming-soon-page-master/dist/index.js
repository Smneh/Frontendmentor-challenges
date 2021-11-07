const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputEmail = form.querySelector("#email-input");
    const errorText = form.querySelector(".error-text");

    if (inputEmail.value.trim() === '' || !validateEmail(inputEmail.value)) {
        errorText.style.visibility = 'visible';
        inputEmail.classList.add('invalid');
    } else {
        errorText.style.visibility = 'hidden';
        inputEmail.classList.remove('invalid');
    }
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}