describe("Pruebas de login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/login");
    });

    it("Dejar todos los campos en blanco", () => {
        cy.get("[data-cy=login-button]").click();
        cy.get("[data-cy=login-error]").contains("Introduce un usuario");
    });

    it("Dejar el campo de usuario en blanco", () => {
        cy.get("[data-cy=login-password]").type("test");
        cy.get("[data-cy=login-button]").click();
        cy.get("[data-cy=login-error]").contains("Introduce un usuario");
    });

    it("Dejar el campo de contraseña en blanco", () => {
        cy.get("[data-cy=login-user]").type("test");
        cy.get("[data-cy=login-button]").click();
        cy.get("[data-cy=login-error]").contains("Introduce una contraseña");
    });
});
