describe('Błędny login i hasło', () => {
  it('Powinien sprawdzić czy występuje komunikat po błędnych danych logowania', () => {
    // Otwarcie strony internetowej z formularzem logowania
    cy.visit('./index.html');
    // Kliknięcie przycisku Zaloguj się
    cy.get('#loginButton').click();

    // Wprowadzenie błędnej nazwy użytkownika i hasła, a następnie kliknięcie przycisku "Zaloguj się"
    cy.get('#loginInput').type('blednylogin');
    cy.get('#passwordInput').type('blednehaslo');
    cy.get('#loginSubmitButton').click();

    // Przechwytywanie alertu oraz jego nazwy
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Błędne dane logowania. Spróbuj ponownie.');
    });

  });
});