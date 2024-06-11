describe("Pruebas de disponibilidad de salas", () => {
	beforeEach(() => {
        cy.loginWith("admin", "Admin");

        cy.intercept("GET", "/reservaciones/cronograma", {
            body: [],
        }).as("getReservacionesCronograma");
        cy.intercept("GET", "/estatus", {
            body: [],
        }).as("getEstatus");
        cy.intercept("GET", "/salas", {
            body: [
                {
                    idSala: 1,
                    nombre: "Electric Garage",
                    bloqueada: false
                },
                {
                    idSala: 2,
                    nombre: "Dimension Forge",
                    bloqueada: false
                },
                {
                    idSala: 3,
                    nombre: "New Horizons",
                    bloqueada: true
                },
                {
                    idSala: 4,
                    nombre: "Deep Net",
                    bloqueada: true
                },
            ],
        }).as("getSalas");
        cy.intercept("GET", "/salas/cronograma", {
            body: [],
        }).as("getSalasCronograma");
        cy.intercept("GET", "/experiencias", {
            body: [],
        }).as("getExperiencias");
        cy.intercept("GET", "/experiencias/autodirigidas", {
            body: [],
        }).as("getExperienciasAutodirigidas");
        cy.intercept("POST", "/reservaciones/ultimas", {
            body: [],
        }).as("postReservacionesUltimas");
        cy.intercept("POST", "/experiencias/UFs", {
            body: [],
        }).as("postExperienciasUFs");
        cy.intercept("PUT", "salas/cambiarEstadoSalas", {
            body: [],
        }).as("putCambiarEstadoSalas");
        cy.intercept("GET", "/salas/1", {
            body: [],
        }).as("getSala1");
        cy.intercept("GET", "/mesas/1", {
            body: [],
        }).as("getMesas1");

        cy.visit("/admin");
    });

    it("Mostrar salas acorde al estado", () => {
        cy.wait("@getSalas");
        // Presionar a boton para configurar salas
        cy.clickSpeedDial("Configurar Salas");

        // Revisa que se muestren las 4 salas
        cy.get('.MuiGrid-container')
        .children()
        .should("have.length", 4);

        // Revisa que la sala "Electric Garage" este disponible
        cy.get(':nth-child(1) > .z-0')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(27, 172, 85)');

        // Revisa que la sala "New Horizons" se encuentre bloqueada 
        cy.get(':nth-child(3) > .z-0')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(169, 169, 169)');
    });

    it("Desactivar sala", () => {
        cy.wait("@getSalas");
        // Presionar a boton para configurar salas
        cy.clickSpeedDial("Configurar Salas");

        // Cambiar estado de sala "Electric Garage"
        cy.get(':nth-child(1) > .z-0').click();

        // Revisar que la sala ahora se encuentre bloqueada
        cy.get(':nth-child(1) > .z-0')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(169, 169, 169)');

        // Revisar que se muestre el borde para cambios
        cy.get(':nth-child(1) > .z-0')
        .should('have.css', 'border')
        .and('eq', '4px solid rgb(128, 135, 242)');

        // Guardar configuración y cerrar modales
        cy.contains("GUARDAR").click();
        cy.getDataCy("boton-guardar-disponibilidad").click(); 
        cy.getDataCy("boton-cerrar-confirmacion-disponibilidad").click();

        // Presionar a boton para configurar salas
        cy.clickSpeedDial("Configurar Salas");

        // Revisar que ahora se encuentre bloqueada
        cy.get(':nth-child(1) > .z-0')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(27, 172, 85)');
    });

    it("Activar sala", () => {
        cy.wait("@getSalas");
        // Presionar a boton para configurar salas
        cy.clickSpeedDial("Configurar Salas");

        // Cambiar estado de sala "Electric Garage"
        cy.get(':nth-child(3) > .z-0').click();

        // Revisar que la sala ahora se encuentre disponible
        cy.get(':nth-child(3) > .z-0')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(27, 172, 85)');

        // Revisar que se muestre el borde para cambios
        cy.get(':nth-child(3) > .z-0')
        .should('have.css', 'border')
        .and('eq', '4px solid rgb(128, 135, 242)');

        // Guardar configuración y cerrar modales
        cy.contains("GUARDAR").click();
        cy.getDataCy("boton-guardar-disponibilidad").click(); 
        cy.getDataCy("boton-cerrar-confirmacion-disponibilidad").click();

        // Presionar a boton para configurar salas
        cy.clickSpeedDial("Configurar Salas");

        // Revisar que ahora se encuentre activada
        cy.get(':nth-child(3) > .z-0')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(169, 169, 169)');
    });

});