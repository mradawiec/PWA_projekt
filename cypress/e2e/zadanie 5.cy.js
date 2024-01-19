describe('Formularz logowania', () => {
  beforeEach(() => {
    // Przejdź do strony logowania przed każdym testem
    cy.visit('index.html');
  });

  it('Powinien zalogować użytkownika poprawnymi danymi', () => {
    // Kliknięcie przycisku Zaloguj się
    cy.get('#loginButton').click();
    // Wprowadź dane do formularza
    cy.get('#loginInput').type('testowy');
    cy.get('#passwordInput').type('haslotestowe');

    // Kliknij przycisk "Zaloguj"
    cy.get('#loginSubmitButton').click();

    // Sprawdź, czy użytkownik został zalogowany poprzez podejrzenie div który wyświetla się po poprawnym zalogowaniu
    cy.get('#loggedInUser').should('be.visible').and('contain', 'Zalogowany użytkownik: testowy');

    // Sprawdź, czy przycisk "Wyloguj się" jest widoczny
    cy.get('#hideLoggedInUserButton').should('be.visible');
  });

  it('Powinien wyświetlić komunikat o błędnych danych logowania', () => {
    // Kliknięcie przycisku Zaloguj się
    cy.get('#loginButton').click();
    // Wprowadź błędne dane do formularza
    cy.get('#loginInput').type('niepoprawny');
    cy.get('#passwordInput').type('nieprawidlowe_haslo');

    // Kliknij przycisk "Zaloguj"
    cy.get('#loginSubmitButton').click();

    // Przechwytywanie alertu oraz jego nazwy
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Błędne dane logowania. Spróbuj ponownie.');
    });
  });
});
