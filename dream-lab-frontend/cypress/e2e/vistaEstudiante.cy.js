describe("Pruebas de la vista de estudiante", () => {
    beforeEach(() => {
        cy.loginWith("admin", "Admin");

        cy.intercept("GET", "/reservaciones/cronograma").as(
            "getReservacionesCronograma"
        );
        cy.intercept("GET", "/estatus").as("getEstatus");
        cy.intercept("GET", "/salas").as("getSalas");
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

    it("Activar vista de estudiante", () => {
        // Entrar a vista de estudiante
        cy.clickDataCy("student-view-button");
        // Comprobar que exista el titulo y botones de la vista
        cy.containsDataCy("vista-estudiante-title", "Vista de estudiante");
        cy.getDataCy("vista-estudiante-toggle-button").should("exist");
        cy.getDataCy("vista-estudiante-exit-button").should("exist");
        // Esconder la barra de vista de estudiante
        cy.clickDataCy("vista-estudiante-toggle-button");
        // Comprobar que los elementos se escondieron
        cy.getDataCy("vista-estudiante-title").should("not.exist");
        cy.getDataCy("vista-estudiante-exit-button").should("not.exist");
        // Mostrar la barra de vista de estudiante nuevamente
        cy.clickDataCy("vista-estudiante-toggle-button");
        // Salir de la vista de estudiante
        cy.clickDataCy("vista-estudiante-exit-button");
        // Comprobar que se salio de la vista de estudiante
        cy.getDataCy("student-view-button").should("exist");
    });
});
