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

        cy.visit("/admin");
    });

    it("Crear una reservación de admin", () => {
        cy.wait("@getSalas");
        cy.clickSpeedDial("Agregar reservación");
    });
});
