describe('Logowanie i wylogowanie użytkownika', () => {
  it('Powinien zalogować użytkownika i sprawdzić przekierowanie', () => {
    // Otwarcie strony internetowej z formularzem logowania
    cy.visit('./index.html');
    // Kliknięcie przycisku Zaloguj się
    cy.get('#loginButton').click();

    // Wprowadzenie poprawnej nazwy użytkownika i hasła, a następnie kliknięcie przycisku "Zaloguj się"
    cy.get('#loginInput').type('testowy');
    cy.get('#passwordInput').type('haslotestowe');
    cy.get('#loginSubmitButton').click();

    // Sprawdzenie czy użytkownik jest przekierowany na odpowiednią stronę po zalogowaniu
    cy.url().should('include', '/api/pogoda.html');

    // Wylogowanie użytkownika (jeśli istnieje taka funkcjonalność)
    cy.get('#hideLoggedInUserButton').click();

    // Sprawdzenie, czy użytkownik zostaje przekierowany na stronę logowania
    cy.url().should('include', 'index.html');
  });
});