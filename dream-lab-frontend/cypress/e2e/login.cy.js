describe("Pruebas de login", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("Dejar todos los campos en blanco", () => {
        cy.clickDataCy("login-button");
        cy.containsDataCy("login-error", "Introduce un usuario");
    });

    it("Dejar el campo de usuario en blanco", () => {
        cy.typeDataCy("login-password", "test");
        cy.clickDataCy("login-button");
        cy.containsDataCy("login-error", "Introduce un usuario");
    });

    it("Dejar el campo de contraseña en blanco", () => {
        cy.typeDataCy("login-user", "test");
        cy.clickDataCy("login-button");
        cy.containsDataCy("login-error", "Introduce una contraseña");
    });

    it("Modificar visibilidad de contraseña", () => {
        cy.typeDataCy("login-user", "test");
        cy.typeDataCy("login-password", "test");
        cy.clickDataCy("login-password-visibility");
        cy.getDataCy("login-password").hasAttribute("type", "text");
        cy.clickDataCy("login-password-visibility");
        cy.getDataCy("login-password").hasAttribute("type", "password");
    });

    it("Usuario y contraseña incorrectos", () => {
        cy.typeDataCy("login-user", "usuario");
        cy.typeDataCy("login-password", "contraseña");
        cy.clickDataCy("login-button");
        cy.containsDataCy("login-error", "Usuario o contraseña incorrectos");
    });

    it("Usuario y contraseña correctos", () => {
        cy.typeDataCy("login-user", "test");
        cy.typeDataCy("login-password", "test");
        cy.clickDataCy("login-button");
        cy.containsDataCy("navbar", "DREAM LAB");
    });
});
