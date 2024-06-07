describe("Pruebas de selección de material", () => {
    beforeEach(() => {
        cy.loginWith("test", "Regular");

        cy.intercept("POST", "/materiales/recomendados", {
            body: [
                {
                    id: 11,
                    name: "Tablet Windows",
                    cantidadDisponible: 1,
                    cantidadRecomendada: 1,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/tablet-windows.webp",
                },
                {
                    id: 12,
                    name: "Cámara Digital (DSLR)",
                    cantidadDisponible: 1,
                    cantidadRecomendada: 2,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/camara.webp",
                },
                {
                    id: 13,
                    name: "Audífonos Over-Ear",
                    cantidadDisponible: 0,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/audifonos.webp",
                },
                {
                    id: 14,
                    name: "Altavoces Bluetooth",
                    cantidadDisponible: 1,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/altavoz.webp",
                },
                {
                    id: 15,
                    name: "Micrófono",
                    cantidadDisponible: 1,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/microfono.webp",
                },
                {
                    id: 16,
                    name: "Router Wi-Fi",
                    cantidadDisponible: 1,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/router.webp",
                },
                {
                    id: 3,
                    name: "Chromebook",
                    cantidadDisponible: 2,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/chromebook.webp",
                },
                {
                    id: 7,
                    name: "Visor VR para smartphone",
                    cantidadDisponible: 2,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/vr-smartphone.webp",
                },
                {
                    id: 10,
                    name: "Tablet iPad",
                    cantidadDisponible: 2,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/ipad.webp",
                },
                {
                    id: 1,
                    name: "Laptop Gamer",
                    cantidadDisponible: 4,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/laptop-gamer.webp",
                },
                {
                    id: 6,
                    name: "PlayStation VR",
                    cantidadDisponible: 6,
                    cantidadRecomendada: 0,
                    image: "https://dreamlabstorage.blob.core.windows.net/materiales/playstationVR.webp",
                },
            ],
        }).as("getMaterials");
    });

    it("Pruebas contador", () => {
        cy.visit("/reservacion/material", {
            // Ponemos los datos iniciales antes de cargar la página de selección de material
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.get(".card-container-sm > :nth-child(1)").should("exist");

        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="minus-button"]')
            .click(); // Quitar 1
        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="quantity"]')
            .should("contain", 0); // Verificar que el contador no se va a valores negativos

        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="plus-button"]')
            .click(); // Agregar 1
        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="quantity"]')
            .should("contain", 1); // Verificar que incrementó el contador

        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="plus-button"]')
            .click(); // Agregar 1
        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="quantity"]')
            .should("contain", 1); // Verificar que e contador no incrementó (la cantidad disponible es 1)

        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="minus-button"]')
            .click(); // Quitar 1
        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="quantity"]')
            .should("contain", 0); // Verificar que decrementó el contador

        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="plus-button"]')
            .click(); // Agregar 1

        cy.reload().then(() => {
            // Recargamos la página
            // Una vez recargada la página, checamos que el valor del contador se quedó con
            // el valor asignado previamente
            cy.wait("@getMaterials");
            cy.get(".card-container-sm > :nth-child(1)")
                .find('[data-cy="quantity"]')
                .should("contain", 1); // Verificar que el valor (1) sigue ahí
        });

        cy.get('[data-cy="search-bar-material"]').type("router"); // Hacemos una búsqueda
        cy.get(".card-container-sm > :nth-child(1)") // Verificar resultado
            .find('[data-cy="material-name"]')
            .should("contain", "Router");
    });

    it("Agregar materiales a resumen de materiales", () => {
        cy.visit("/reservacion/material", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="plus-button"]')
            .click(); // Agregar 1
        cy.get(
            '.material-resumen-container > :nth-child(1) > [data-cy="badge"]'
        ).should("contain", "1");
    });

    it("Quitar material de resumen cuando el contador es 0", () => {
        cy.visit("/reservacion/material", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="plus-button"]')
            .click(); // Agregar 1
        cy.get(
            '.material-resumen-container > :nth-child(1) > [data-cy="badge"]'
        ).should("contain", "1");

        cy.get(".card-container-sm > :nth-child(1)")
            .find('[data-cy="minus-button"]')
            .click(); // Quitar 1
        cy.get(
            '.material-resumen-container > :nth-child(1) > [data-cy="badge"]'
        ).should("not.exist"); // Should be removed
    });
    
    it("Mostrar material recomendado con suficiente disponibilidad", () => {
        cy.visit("/reservacion/material", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.get('.recommended-material').should('exist');
    });
    
    it("Mostrar material recomendado con insuficiente disponibilidad", () => {
        cy.visit("/reservacion/material", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.get('.not-enough-availability').should('exist');
    });
    
    it("Mostrar material recomendado sin disponibilidad", () => {
        cy.visit("/reservacion/material", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.get('.greyed-out').should('exist');
    });
    
    it("Mostrar modal de aviso de que no se seleccionó el material recomendado", () => {
        cy.visit("/reservacion/material", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.clickDataCy("select-material-accept-btn");
        cy.checkVisible("recommended-material-missing-warning");
    });

    it("Botón modal 'No, regresar'", () => {
        cy.visit("/reservacion/material", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.clickDataCy("select-material-accept-btn");
        cy.clickDataCy("btn-no-regresar");

        cy.urlContains("/material");
    });

    it("Botón modal 'Sí, continuar'", () => {
        cy.visit("/reservacion/material", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", "2");
                win.sessionStorage.setItem("duration", "3");
                win.sessionStorage.setItem(
                    "fechaIsoString",
                    "2024-05-30T06:00:00.000Z"
                );
                win.sessionStorage.setItem(
                    "fecha",
                    "Thu, 30 May 2024 06:00:00 GMT"
                );
                win.sessionStorage.setItem("horaInicio", "9");
                win.sessionStorage.setItem(
                    "horaInicioIsoString",
                    "2024-04-30T09:00:00.000Z"
                );
            },
        });

        cy.wait("@getMaterials");

        cy.clickDataCy("select-material-accept-btn");
        cy.clickDataCy("btn-si-continuar");

        cy.urlContains("/resumen");
    });
});
