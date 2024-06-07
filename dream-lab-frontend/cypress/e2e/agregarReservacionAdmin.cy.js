describe("Pruebas de la vista de estudiante", () => {
    beforeEach(() => {
        cy.loginWith("admin", "Admin");

        cy.intercept("GET", "/reservaciones/cronograma").as(
            "getReservacionesCronograma"
        );
        cy.intercept("GET", "/estatus").as("getEstatus");
        cy.intercept("GET", "/salas", {
            body: [
                {
                    idSala: 1,
                    nombre: "Electric Garage",
                },
            ],
        }).as("getSalas");
        cy.intercept("GET", "/salas/cronograma").as("getSalasCronograma");
        cy.intercept("GET", "/experiencias").as("getExperiencias");
        cy.intercept("GET", "/experiencias/autodirigidas").as(
            "getExperienciasAutodirigidas"
        );
        cy.intercept("POST", "/reservaciones/ultimas").as(
            "postReservacionesUltimas"
        );
        cy.intercept("POST", "/experiencias/UFs").as("postExperienciasUFs");
        cy.intercept("GET", "/salas/1", {
            body: [
                {
                    idSala: 1,
                    nombre: "Electric Garage",
                    cantidadMesas: 8,
                    descripcion:
                        "Este espacio dinámico y versátil es un sueño hecho realidad para los entusiastas de la electrónica. Equipado con las últimas herramientas y tecnologías, es el lugar ideal para dar vida a tus proyectos más ambiciosos.",
                    fotoURL:
                        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    detallesURL:
                        "https://dreamlabstorage.blob.core.windows.net/archivos/electric-garage.webp",
                    bloqueada: true,
                },
            ],
        }).as("getSala1");
        cy.intercept("GET", "/mesas/1").as("getMesas1");

        cy.visit("/admin");
    });

    it("Crear una reservación de admin", () => {
        cy.wait("@getSalas");
        // Presionar a boton para agregar reservación de admin
        cy.clickSpeedDial("Agregar reservación");
        // Escribir datos para la reservación
        cy.typeDataCy("mcra-input-nombre", "Test");
        cy.clickDataCy("mcra-select-sala");
        cy.clickDataCy("mcra-selectitem-1");
        // Presionar botón de aceptar
        cy.clickDataCy("mcra-button-aceptar");
        cy.wait("@getSala1");
        // Comprobar que nos encontremos en el flujo de reservación de Electric Garage
        cy.containsDataCy("nombre-sala-grande", "Electric Garage");
    });

    it.only("Cancelar proceso de reservación de admin", () => {
        cy.wait("@getSalas");
        // Presionar a boton para agregar reservación de admin
        cy.clickSpeedDial("Agregar reservación");
        // Presionar botón de cancelar
        cy.clickDataCy("mcra-button-cancelar");
        // Comprobar que no nos encontramos en el flujo de reservación
        cy.checkNotExist("mcra-modal");
    });
});
