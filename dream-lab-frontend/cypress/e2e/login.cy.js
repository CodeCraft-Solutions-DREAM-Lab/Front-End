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
        cy.isTypeDataCy("login-password", "text");
        cy.clickDataCy("login-password-visibility");
        cy.isTypeDataCy("login-password", "password");
    });

    it("Usuario y contraseña incorrectos", () => {
        cy.typeDataCy("login-user", "usuario");
        cy.typeDataCy("login-password", "contraseña");
        cy.intercept("POST", "auth/usuario").as("authUsuario");
        cy.clickDataCy("login-button");
        // Verificar que ya se haya verificado las credenciales
        cy.wait("@authUsuario");
        cy.containsDataCy("login-error", "Usuario o contraseña incorrectos");
    });

    it("Usuario y contraseña correctos", () => {
        cy.typeDataCy("login-user", "test");
        cy.typeDataCy("login-password", "test");
        cy.intercept("POST", "auth/usuario").as("authUsuario");
        cy.intercept("POST", "auth/token").as("getToken");
        cy.clickDataCy("login-button");
        // Verificar que ya se haya verificado las credenciales
        cy.wait("@authUsuario");
        cy.wait("@getToken");
        // Verificar que se haya redirigido a la página de Home
        cy.urlContains("/home");
        cy.containsDataCy("navbar", "DREAM LAB");
    });
});
