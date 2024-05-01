import "cypress-localstorage-commands";
const API_URL = "http://localhost:3000/";

describe("Probando pantalla de selector de sala", () => {
    beforeEach(() => {
        cy.loginWithTest();
    });

    it("Entrar con experiencia", () => {
        cy.visit("/reservacion/sala", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "experiencia");
                win.sessionStorage.setItem("idExperiencia", 1);
            },
        });

        cy.getDataCy("nombre-experiencia").should("be.not.visible");
        cy.getDataCy("nombre-sala").should("be.not.visible");

        cy.intercept("GET", API_URL + "salas/nameFromExperienceId/**", {
            body: {
                nombre: "Electric Garage",
            },
        });

        cy.intercept("GET", API_URL + "experiencias/**", {
            body: [
                {
                    nombre: "Nombre de Experiencia",
                },
            ],
        });

        cy.intercept("POST", API_URL + "salas/horasLibres", {
            body: [
                {
                    hora: 9,
                    cupos: 3,
                    competidores: 2,
                },
            ],
        });

        cy.wait(1000);

        // cy.wait(['@getSala', '@getExperiencia', '@getHorasLibres']);

        cy.getDataCy("nombre-experiencia").should("exist");
        cy.getDataCy("nombre-sala").should("exist");
        cy.getDataCy("nombre-experiencia").contains("Nombre de Experiencia");
        cy.getDataCy("nombre-sala").contains("Electric Garage");
    });
});
