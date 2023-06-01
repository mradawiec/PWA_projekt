
document.getElementById("loginSubmitButton").addEventListener("click", function () {
    var loginInput = document.getElementById("loginInput");
    var loginButton = document.getElementById("loginButton");

    if (loginInput.value.trim() !== "") {
        loginButton.innerText = "Witaj! " + loginInput.value;
        loginInput.value = "";
        var modal = document.getElementById("loginModal");
        if (modal) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = "0";
            var modalBackdrops = document.getElementsByClassName("modal-backdrop");
            if (modalBackdrops.length > 0) {
                modalBackdrops[0].parentNode.removeChild(modalBackdrops[0]);
            }
        }
    }
});