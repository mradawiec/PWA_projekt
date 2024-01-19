$(document).ready(function () {
    // Funkcja do ukrywania informacji o zalogowanym użytkowniku i przycisku "Wyloguj się"
    function hideLoggedInUser() {
        var loggedInUserElement = $("#loggedInUser");
        var logoutButton = $("#logoutButton");
        var hideLoggedInUserButton = $("#hideLoggedInUserButton");

        if (loggedInUserElement && logoutButton && hideLoggedInUserButton) {
            loggedInUserElement.hide();
            logoutButton.hide();
            hideLoggedInUserButton.hide();

            // Usunięcie informacji o zalogowanym użytkowniku z localStorage
            localStorage.removeItem("loggedInUser");

            // Usunięcie ciasteczka po ukryciu zalogowanego użytkownika
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }

    // Funkcja do wyświetlania informacji o zalogowanym użytkowniku i przycisku "Wyloguj się"
    function displayLoggedInUser(username) {
        var loggedInUserElement = $("#loggedInUser");
        var logoutButton = $("#logoutButton");
        var hideLoggedInUserButton = $("#hideLoggedInUserButton");

        if (loggedInUserElement && logoutButton && hideLoggedInUserButton) {
            loggedInUserElement.html("Zalogowany użytkownik: " + username);
            loggedInUserElement.show();
            logoutButton.show();
            hideLoggedInUserButton.show();
        }
    }

    // Funkcja do obsługi przekierowania po wylogowaniu
    function handleLogout() {
        // Usunięcie informacji o zalogowanym użytkowniku z localStorage
        localStorage.removeItem("loggedInUser");

        // Usunięcie ciasteczka z nazwą użytkownika
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Ukrycie informacji o zalogowanym użytkowniku i przycisku "Wyloguj się"
        hideLoggedInUser();

        // Przekierowanie użytkownika na stronę "index.html" w folderze wyżej
        window.location.href = "../../index.html";
    }

    // Dodawanie testowego konta do danych logowania
    var testAccounts = [
        { username: "testowy", password: "haslotestowe" }
        // Możesz dodać więcej kont testowych w tej tablicy
    ];

    // Funkcja do obsługi przekierowania po zalogowaniu
    function handleLoginRedirect() {
        // Przekierowanie użytkownika na inną stronę po zalogowaniu
        window.location.href = "api/pogoda.html";
    }

    // Funkcja do obsługi kliknięcia przycisku "Wyloguj się"
    $("#logoutButton").click(function () {
        // Obsługa wylogowania
        handleLogout();
    });

    // Funkcja do obsługi kliknięcia przycisku "Zaloguj"
    $("#loginSubmitButton").click(function () {
        var login = $("#loginInput").val();
        var password = $("#passwordInput").val();

        var isValidLogin = testAccounts.some(function (account) {
            return account.username === login && account.password === password;
        });

        if (isValidLogin) {
            // Zapisanie informacji o zalogowanym użytkowniku w localStorage
            localStorage.setItem("loggedInUser", login);

            // Obsługa przekierowania po zalogowaniu
            handleLoginRedirect();
        } else {
            // Tutaj możesz obsłużyć przypadek błędnego logowania
            alert("Błędne dane logowania. Spróbuj ponownie.");
        }
    });

    // Dodanie przycisku "Ukryj zalogowanego użytkownika" i obsługi jego kliknięcia
    $("#hideLoggedInUserButton").click(function () {
        hideLoggedInUser();
    });

    // Odczytanie informacji o zalogowanym użytkowniku przy ładowaniu strony
    var savedUsername = localStorage.getItem("loggedInUser");
    if (savedUsername) {
        // Wyświetlenie informacji o zalogowanym użytkowniku i przycisku "Wyloguj się"
        displayLoggedInUser(savedUsername);
    } else {
        // Dodatkowo, gdy nie ma zapisanego zalogowanego użytkownika, ukrycie przycisku "Ukryj zalogowanego użytkownika"
        hideLoggedInUser();
    }
});