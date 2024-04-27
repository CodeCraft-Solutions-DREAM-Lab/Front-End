describe("Pruebas de login", () => {
    beforeEach(() => {
        cy.visit("/login");
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

    it("Modificar visibilidad de contraseña", () => {
        cy.get("[data-cy=login-user]").type("test");
        cy.get("[data-cy=login-password]").type("test");
        cy.get("[data-cy=login-password-visibility]").click();
        cy.get("[data-cy=login-password]").should("have.attr", "type", "text");
        cy.get("[data-cy=login-password-visibility]").click();
        cy.get("[data-cy=login-password]").should(
            "have.attr",
            "type",
            "password"
        );
    });

    it("Usuario y contraseña incorrectos", () => {
        cy.get("[data-cy=login-user]").type("usuario");
        cy.get("[data-cy=login-password]").type("contraseña");
        cy.get("[data-cy=login-button]").click();
        cy.get("[data-cy=login-error]").contains(
            "Usuario o contraseña incorrectos"
        );
    });

    it("Usuario y contraseña correctos", () => {
        cy.get("[data-cy=login-user]").type("test");
        cy.get("[data-cy=login-password]").type("test");
        cy.get("[data-cy=login-button]").click();
        cy.get(".navbar").contains("DREAM LAB");
    });
});
