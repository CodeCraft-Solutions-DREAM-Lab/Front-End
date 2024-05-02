import "cypress-localstorage-commands";
const API_URL = Cypress.env("API_URL");

describe("Probando pantalla de selector de sala", () => {

    beforeEach(() => {
        cy.loginWithTest();

        cy.intercept("GET", API_URL + "salas/nameFromExperienceId/**", {
            body: {
                nombre: "Nombre de Sala",
            },
        }).as("getSalaNameFromExperienceId");

        cy.intercept("GET", API_URL + "salas/1", {
            body: [
                {
                    nombre: "Nombre de Sala",
                },
            ],
        }).as("getSala");

        cy.intercept("GET", API_URL + "experiencias/**", {
            body: [
                {
                    nombre: "Nombre de Experiencia",
                },
            ],
        }).as("getExperiencia");

        cy.intercept("GET", API_URL + "mesas/1", {
            body: {
                maxCupos: 10,
            },
        }).as("getMaxCupos");

        cy.intercept("POST", API_URL + "salas/horasLibres", {
            body: [
                {
                    hora: 9,
                    cupos: 3,
                    competidores: 2,
                },
                {
                    hora: 10,
                    cupos: 1,
                    competidores: 4,
                },
                {
                    hora: 13,
                    cupos: 7,
                    competidores: 1,
                },
            ],
        }).as("getHorasLibres");
    });

    it("Probando nombre entrando con experiencia", () => {
        cy.visit("/reservacion/sala", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "experiencia");
                win.sessionStorage.setItem("idExperiencia", 1);
            },
        });

        cy.wait([
            "@getSalaNameFromExperienceId",
            "@getExperiencia",
            "@getHorasLibres",
        ]);

        cy.getDataCy("nombre-experiencia").should(
            "contain.text",
            "Nombre de Experiencia"
        );
        cy.getDataCy("nombre-sala-chico").should(
            "contain.text",
            "Nombre de Sala"
        );
        cy.getDataCy("nombre-sala-grande").should("not.exist");
    });

    it("Probando nombre entrando con sala", () => {
        cy.visit("/reservacion/sala", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", 1);
            },
        });

        cy.wait(["@getHorasLibres", "@getSala", "@getMaxCupos"]);

        cy.getDataCy("nombre-sala-grande").should("exist");
        cy.getDataCy("nombre-sala-grande").contains("Nombre de Sala");
        cy.getDataCy("nombre-sala-chico").should("not.exist");
        cy.getDataCy("nombre-experiencia").should("not.exist");
    });

    it.only("Probando Date Picker", () => {
        cy.visit("/reservacion/sala", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", 1);
            },
        });

        cy.wait(["@getHorasLibres", "@getSala", "@getMaxCupos"]);

        cy.get(
            "[data-cy=selector-fecha] > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)"
        ).type("09092060");

        cy.getDataCy("selector-fecha").should("contain.text", "09/09/2060");

        // cy.get("[data-cy=selector-fecha] button").click();
        cy.get("[data-cy=selector-fecha] button").type(
            "{rightarrow}{enter}",
            { delay: 600 }
        );

        cy.getDataCy("selector-fecha").should("contain.text", "10/09/2060");

        cy.getDataCy("boton-aceptar-sala").click({ force: true });
        cy.getDataCy("primer-recordatorio-sala").should("not.exist");
    });

    it("Probando Autocomplete Hora de Inicio", () => {
        cy.visit("/reservacion/sala", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", 1);
            },
        });

        cy.wait(["@getHorasLibres", "@getSala", "@getMaxCupos"]);

        cy.getDataCy("selector-hora-inicio").click();
        cy.getDataCy("hora-0").click();

        cy.containsDataCy("selector-hora-inicio", "9 AM");

        cy.getDataCy("selector-hora-inicio").click();
        cy.getDataCy("hora-2").click();

        cy.containsDataCy("selector-hora-inicio", "1 PM");

        cy.getDataCy("boton-aceptar-sala").click({ force: true });
        cy.getDataCy("primer-recordatorio-sala").should("not.exist");
    });

    it("Probando Autocomplete de Duracion", () => {
        cy.visit("/reservacion/sala", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", 1);
            },
        });

        cy.wait(["@getHorasLibres", "@getSala", "@getMaxCupos"]);

        cy.getDataCy("selector-duracion").click();
        cy.getDataCy("duracion-1").click();

        cy.containsDataCy("selector-duracion", "2 horas");

        cy.getDataCy("boton-aceptar-sala").click({ force: true });
        cy.getDataCy("primer-recordatorio-sala").should("not.exist");
    });

    it("Happy Path", () => {
        cy.visit("/reservacion/sala", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", 1);
            },
        });

        cy.wait(["@getHorasLibres", "@getSala", "@getMaxCupos"]);

        cy.get(
            "[data-cy=selector-fecha] > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)"
        ).type("09092060");

        cy.getDataCy("selector-hora-inicio").click();
        cy.getDataCy("hora-1").click();

        cy.getDataCy("selector-duracion").click();
        cy.getDataCy("duracion-2").click();
        
        cy.containsDataCy("texto-fecha", "Jueves - 09 de Septiembre");
        cy.containsDataCy("texto-fecha", "10 AM - 1 PM");

        cy.getDataCy("primer-recordatorio-sala").should("not.exist");

        cy.getDataCy("boton-aceptar-sala").click({ force: true });

        cy.getDataCy("primer-recordatorio-sala").should("be.visible");

        cy.clickDataCy("primer-recordatorio-ok");

        cy.url().should("include", "/reservacion/material");
    });
});
