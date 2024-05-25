import "../support/commands";

describe("Probando pantalla de selector de sala", () => {
    beforeEach(() => {
        cy.loginWith("test");

        cy.intercept("GET", "salas/nameFromExperienceId/**", {
            body: {
                nombre: "Nombre de Sala",
            },
        }).as("getSalaNameFromExperienceId");

        cy.intercept("GET", "salas/1", {
            body: [
                {
                    nombre: "Nombre de Sala",
                },
            ],
        }).as("getSala");

        cy.intercept("GET", "experiencias/**", {
            body: [
                {
                    nombre: "Nombre de Experiencia",
                },
            ],
        }).as("getExperiencia");

        cy.intercept("GET", "mesas/1", {
            body: {
                maxCupos: 10,
            },
        }).as("getMaxCupos");

        cy.intercept("POST", "salas/horasLibres", {
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

        cy.intercept("POST", "**/materiales", {}).as("postMateriales");
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

        cy.containsDataCy("nombre-experiencia", "Nombre de Experiencia");
        cy.containsDataCy("nombre-sala-chico", "Nombre de Sala");

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

        cy.checkExist("nombre-sala-grande");
        cy.containsDataCy("nombre-sala-grande", "Nombre de Sala");
        cy.getDataCy("nombre-sala-chico").should("not.exist");
        cy.getDataCy("nombre-experiencia").should("not.exist");
    });

    it("Probando Date Picker", () => {
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

        cy.containsDataCy("selector-fecha", "09/09/2060");

        cy.get("[data-cy=selector-fecha] button").type("{rightarrow}{enter}", {
            delay: 600,
        });

        cy.containsDataCy("selector-fecha", "10/09/2060");
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

        cy.clickDataCy("selector-hora-inicio");
        cy.clickDataCy("hora-0");

        cy.containsDataCy("selector-hora-inicio", "9 AM");

        cy.clickDataCy("selector-hora-inicio");
        cy.clickDataCy("hora-2");

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

        cy.clickDataCy("selector-duracion");
        cy.clickDataCy("duracion-1");

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

        cy.clickDataCy("selector-hora-inicio");
        cy.clickDataCy("hora-1");
        cy.clickDataCy("selector-duracion");
        cy.clickDataCy("duracion-2");

        cy.containsDataCy("texto-fecha", "Jueves - 09 de Septiembre");
        cy.containsDataCy("texto-fecha", "10 AM - 1 PM");

        cy.getDataCy("primer-recordatorio-sala").should("not.exist");
        cy.getDataCy("boton-aceptar-sala").click({ force: true });

        cy.checkVisible("primer-recordatorio-sala");

        cy.clickDataCy("primer-recordatorio-ok");
        cy.wait(["@postMateriales"]);

        cy.urlContains("/reservacion/material");
    });
});
