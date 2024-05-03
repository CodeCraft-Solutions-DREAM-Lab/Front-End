describe("Pruebas de recomendaciones por voz", () => {
	beforeEach(() => {
        // Hacer login antes de cada test
		cy.visit("/login");
        cy.login("test", "test");
	});

    it("Despliegue de recomendaciones", () => {
        // Se consultan recomendaciones
        cy.typeDataCy("input-recomendaciones", "redes");
        cy.intercept("POST", "/chatbot").as("chatbot");
        cy.clickDataCy("button-enviar-recomendaciones");
        cy.wait("@chatbot");

        // Revisa que se muestren 3 recomendaciones
        cy.getDataCy("container-recomendaciones").children().should('have.length', 3);

        // Revisa que cada recomendación tenga titulo y descripción
        cy.getDataCy("container-recomendaciones").children().each(($child) => {
            cy.wrap($child).children().children().should('have.length', 2);
          });

    })

})