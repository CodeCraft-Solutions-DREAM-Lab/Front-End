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

    it("Navegación", () => {
        // Se consultan recomendaciones
        cy.typeDataCy("input-recomendaciones", "redes");
        cy.intercept("POST", "/chatbot").as("chatbot");
        cy.clickDataCy("button-enviar-recomendaciones");
        cy.wait("@chatbot");

        // Revisa que funcione navegación por tiempo
        const TiempoCurrentStateBefore = cy.getDataCy("titulo-recomendaciones");
        cy.wait(5010);
        const TiempoCurrentStateAfter = cy.getDataCy("titulo-recomendaciones");
        // Verifica que el objeto cypress de antes y después del periodo de tiempo sean distintos
        expect(TiempoCurrentStateBefore).not.to.equal(TiempoCurrentStateAfter);

        // Revisa que funcione navegación por flechas
        const FlechaCurrentStateBefore = cy.getDataCy("titulo-recomendaciones");
        cy.clickDataCy("flecha-derecha-recomendaciones");
        cy.wait(200);
        const FlechaCurrentStateAfter = cy.getDataCy("titulo-recomendaciones");
        // Verifica que el objeto cypress de antes y después de hacer click en la flecha sean distintos
        expect(FlechaCurrentStateBefore).not.to.equal(FlechaCurrentStateAfter);
    })

})