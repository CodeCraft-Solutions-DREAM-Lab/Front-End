import "../support/commands";

describe("Resumen de reservación", () => {
    beforeEach(() => {
        cy.loginWith("test");
    });

    it("Botón de regreso", () => {
        cy.visit("/reservacion/resumen");
        cy.clickDataCy("summmary-back-button");
        cy.urlContains("/reservacion/material");
    });

    it("Botón de confirmar", () => {
        cy.intercept("POST", "reservaciones", {
            body: {
                idUsuario: "A00123456",
                idSala: 1,
                idExperiencia: 1,
                horaInicio: 9,
                duracion: 1,
                fecha: "2024-05-23",
                idMesa: null,
                estatus: 3,
            },
        }).as("postReservacion");

        cy.visit("/reservacion/resumen");

        cy.clickDataCy("summary-submit-button");
        cy.wait("@postReservacion");

        cy.clickDataCy("summary-modal-button");
        cy.urlContains("/home");
    });

    it("Resumen de reservacion", () => {
        cy.visit("/reservacion/resumen", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem(
                    "nameSalaExperiencia",
                    "Dimension Forge"
                );
                win.sessionStorage.setItem("personas", 1);
                win.sessionStorage.setItem(
                    "formattedDate",
                    "Jueves - 23 de Mayo"
                );
                win.sessionStorage.setItem("formattedTime", "10 AM - 12 PM");
                win.sessionStorage.setItem("horaCorte", "6 pm");
                win.sessionStorage.setItem("competidores", 1);
                win.sessionStorage.setItem("cupos", 1);
            },
        });

        cy.containsDataCy("summary-lab-name", "Dimension Forge");
        cy.containsDataCy("summary-lab-people", "1");
        cy.containsDataCy("summary-lab-date", "Jueves - 23 de Mayo");
        cy.containsDataCy("summary-lab-time", "10 AM - 12 PM");
        cy.containsDataCy("summary-lab-cutoff", "6 pm");
        cy.containsDataCy("summary-lab-contestants", "1");
        cy.containsDataCy("summary-lab-spots", "1");
    });

    it("Resumen de materiales", () => {
        cy.visit("/reservacion/resumen", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem(
                    "materials",
                    '[{"materialId":11,"quantity":1},{"materialId":12,"quantity":1},{"materialId":13,"quantity":1}]'
                );
            },
        });

        // Intercept the POST request to "materiales" and stub the response with an array of materials
        cy.intercept("POST", "/materiales", {
            body: [
                {
                    id: 11,
                    name: "Material 1",
                    image: "https://example.com/image1.jpg",
                    cantidadDisponible: 10,
                },
                {
                    id: 12,
                    name: "Material 2",
                    image: "https://example.com/image2.jpg",
                    cantidadDisponible: 5,
                },
                {
                    id: 13,
                    name: "Material 3",
                    image: "https://example.com/image3.jpg",
                    cantidadDisponible: 8,
                },
            ],
        }).as("postMateriales");

        cy.wait("@postMateriales");

        cy.get(".material-summary-sm > :nth-child(1)").should("be.visible");
        cy.get(".material-summary-sm > :nth-child(2)").should("be.visible");
        cy.get(".material-summary-sm > :nth-child(3)").should("be.visible");
    });
});
