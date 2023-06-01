const userName = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const resetButton = document.querySelector('#reset');
const sendButton = document.querySelector('#send');
const error = document.querySelector('#error');

function showOrHideErrorMessage(input, message) {

    const box = input.parentElement
    const errorMessage = box.querySelector('.error');
    errorMessage.textContent = message;

}

function checkPassword() {
    if (password.value !== password2.value) {
        showOrHideErrorMessage(password2, 'Hasła są różne');
    } else {
        showOrHideErrorMessage(password2, '');
    }
}

function checkInputLength(input, minLength) {
    if (input.value.length < minLength) {
        showOrHideErrorMessage(input, `Pole ${input.previousElementSibling.textContent.replace(':', '').toLowerCase()} powinno zawierać ${minLength} znaków`);
    } else {
        showOrHideErrorMessage(input, '');
    }
}

function checkEmail() {

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!(regex.test(email.value))) {
        showOrHideErrorMessage(email, 'Podaj poprawny adres mailowy');
    } else {
        showOrHideErrorMessage(email, '');
    }
}

resetButton.addEventListener('click', () => {
    const errors = document.querySelectorAll('.error');
    errors.forEach(er => er.textContent = '');
})

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    checkPassword();
    checkInputLength(userName, 3);
    checkInputLength(password, 8);
    checkEmail();
})