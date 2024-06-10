import "cypress-localstorage-commands";

function clickSelect(
    currentCount = 0,
    maxRetryCount = 3,
    childIndex = 0,
    waitTime = 0
) {
    cy.wait(waitTime);
    cy.get(".MuiSelect-select")
        .eq(childIndex)
        .click()
        .then(() => {
            // Check if the menu is open by looking for the menu list
            cy.get("body").then(($body) => {
                // Adjust the selector to match your menu's structure
                if ($body.find(".MuiMenu-list").length === 0) {
                    if (currentCount < maxRetryCount) {
                        // Retry up to 3 times
                        clickSelect(
                            currentCount + 1,
                            maxRetryCount,
                            childIndex,
                            waitTime
                        );
                    } else {
                        throw new Error(
                            "Failed to open the menu after multiple attempts."
                        );
                    }
                }
            });
        });
}

describe("Admin Page Tests", () => {
    beforeEach(() => {
        cy.loginWith("admin", "admin");

        cy.intercept("GET", "/salas", {
            fixture: "cronogramaAdmin_ModalInfo/salas.json",
        }).as("getSalas");
        cy.intercept("GET", "/salas/cronograma", {
            fixture: "cronogramaAdmin_ModalInfo/salas_cronograma.json",
        }).as("getSalasCronograma");
        cy.intercept("GET", "/reservaciones/cronograma", {
            fixture: "cronogramaAdmin_ModalInfo/reservaciones_cronograma.json",
        }).as("getReservacionesCronograma");
        cy.intercept("GET", "/mesas", {
            fixture: "cronogramaAdmin_ModalInfo/mesas.json",
        }).as("getMesas");
        cy.intercept("GET", "/estatus", {
            fixture: "cronogramaAdmin_ModalInfo/estatus.json",
        }).as("getEstatus");

        cy.visit("/admin");

        // cy.wait([
        //     "@getReservacionesCronograma",
        //     "@getSalasCronograma",
        //     "@getMesas",
        //     "@getEstatus",
        //     "@getSalas",
        // ]);
    });

    it("Despliegue de reservaciones y grupos", () => {
        cy.wait([
            "@getReservacionesCronograma",
            "@getSalasCronograma",
            "@getMesas",
            "@getEstatus",
            "@getSalas",
        ]);
        cy.checkExist("timeline-container-cronograma-admin");
        cy.get('[data-cy="group-row"]').should("have.length", 55);
    });

    it("Funcionamiento de filtro de sala", () => {
        cy.wait(["@getSalas"]);
        cy.get(".MuiSelect-select").contains(
            "Electric Garage, Dimension Forge, New Horizons, Deep Net, Graveyard, PCB Factory, Hack-Battlefield, Testing Land, War Headquarters, Biometrics Flexible Hall, Beyond-Digits"
        );
        clickSelect(0, 50, 0, 0);
        cy.get(".MuiMenu-list").should("exist");
        cy.get(".MuiMenu-list").children().should("have.length", 13);
        cy.get('[data-value="Dimension Forge"]').click({ force: true });
    });

    it("Funcionamiento de filtro de estatus", () => {
        cy.wait(["@getEstatus"]);
        cy.get(".MuiSelect-select").contains(
            "Preparado, En progreso, Sin preparar"
        );
        clickSelect(0, 50, 1, 0);
        cy.get(".MuiMenu-list").should("exist", { timeout: 10000 });
        cy.get(".MuiMenu-list").children().should("have.length", 3);
        cy.get('[data-value="Preparado"]').click({ force: true });
    });

    it("Funcionamiento de switches", () => {
        cy.wait(["@getSalasCronograma", "@getMesas", "@getSalas"]);
        // Assuming that the first group has a toggle switch
        cy.get(".MuiSwitch-root").first().click();
    });

    it("Despliegue de fecha en español", () => {
        cy.get(".header-interval").each(($el) => {
            expect($el.text()).to.match(/\d{1,2} \w+ \d{4}/); // Matches format like "1 Enero 2022"
        });
    });
});
