describe("Resumen de reservación", () => {
    beforeEach(() => {
        cy.loginWith("test", "Regular");
    });

    it("Botón de regreso", () => {
        cy.visit("/reservacion/resumen");
        cy.clickDataCy("summmary-back-button");
        cy.urlContains("/reservacion/material");
    });

    it("Botón de confirmar", () => {
        cy.visit("/reservacion/resumen", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem(
                    "materials",
                    '[{"materialId":11,"quantity":1},{"materialId":12,"quantity":1},{"materialId":13,"quantity":1}]'
                );
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

        cy.intercept("POST", "/materiales", {
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

        cy.intercept("POST", "reservaciones", {body: [{rowsAffected: 1}]}).as("postReservacion");

        cy.visit("/reservacion/resumen");
        cy.wait("@getMaterials");


        cy.clickDataCy("summary-submit-button");
        cy.wait("@postReservacion");

        cy.clickDataCy("summary-modal-button");
        cy.urlContains("/home");
    });

    it("Resumen de reservacion", () => {
        cy.visit("/reservacion/resumen", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem(
                    "materials",
                    '[{"materialId":11,"quantity":1},{"materialId":12,"quantity":1},{"materialId":13,"quantity":1}]'
                );
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
