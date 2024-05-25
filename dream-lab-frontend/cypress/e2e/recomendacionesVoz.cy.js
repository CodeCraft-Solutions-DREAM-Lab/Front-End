import "../support/commands";

describe("Pruebas de recomendaciones por voz", () => {
    beforeEach(() => {
        // Hacer login antes de cada test
        cy.visit("/login");
        cy.loginWith("test");
    });

    it.skip("Despliegue de recomendaciones", () => {
        // Se consultan recomendaciones
        cy.typeDataCy("input-recomendaciones", "redes");
        cy.intercept("POST", "/chatbot").as("chatbot");
        cy.clickDataCy("button-enviar-recomendaciones");
        cy.wait("@chatbot");

        // Revisa que se muestren 3 recomendaciones
        cy.getDataCy("container-recomendaciones")
            .children()
            .should("have.length", 3);

        // Revisa que cada recomendación tenga titulo y descripción
        cy.getDataCy("container-recomendaciones")
            .children()
            .each(($child) => {
                cy.wrap($child).children().children().should("have.length", 2);
            });
    });

    it.skip("Navegación", () => {
        // Se consultan recomendaciones
        cy.typeDataCy("input-recomendaciones", "redes");
        cy.intercept("POST", "/chatbot").as("chatbot");
        cy.clickDataCy("button-enviar-recomendaciones");
        cy.wait("@chatbot");

        // Revisa que funcione navegación por tiempo
        const tiempoCurrentStateBefore = cy.getDataCy("titulo-recomendaciones");
        cy.wait(5010);
        const tiempoCurrentStateAfter = cy.getDataCy("titulo-recomendaciones");
        // Verifica que el objeto cypress de antes y después del periodo de tiempo sean distintos
        expect(tiempoCurrentStateBefore).not.to.equal(tiempoCurrentStateAfter);

        // Revisa que funcione navegación por flechas
        const flechaCurrentStateBefore = cy.getDataCy("titulo-recomendaciones");
        cy.clickDataCy("flecha-derecha-recomendaciones");
        cy.wait(100);
        const flechaCurrentStateAfter = cy.getDataCy("titulo-recomendaciones");
        // Verifica que el objeto cypress de antes y después de hacer click en la flecha sean distintos
        expect(flechaCurrentStateBefore).not.to.equal(flechaCurrentStateAfter);

        // Revisa que funcione navegación por dots
        const dotsCurrentStateBefore = cy.getDataCy("titulo-recomendaciones");
        cy.get(".dots > :nth-child(2)").click();
        cy.wait(100);
        const dotsCurrentStateAfter = cy.getDataCy("titulo-recomendaciones");
        // Verifica que el objeto cypress de antes y después de hacer click en el dot sean distintos
        expect(dotsCurrentStateBefore).not.to.equal(dotsCurrentStateAfter);

        // Revisa que funcione navegación por click en slide
        const slideCurrentStateBefore = cy.getDataCy("titulo-recomendaciones");
        // Se hace click en la izquierda por que el centro se cubre por la slide activa del momento
        cy.get(".slide").eq(0).click("left");
        cy.wait(100);
        const slideCurrentStateAfter = cy.getDataCy("titulo-recomendaciones");
        // Verifica que el objeto cypress de antes y después de hacer click en la slide sean distintos
        expect(slideCurrentStateBefore).not.to.equal(slideCurrentStateAfter);
    });

    it.skip("Aviso Recomendaciones Inválidas", () => {
        // Se consultan recomendaciones no existentes
        cy.typeDataCy("input-recomendaciones", "clases de cocina");
        cy.intercept("POST", "/chatbot").as("chatbot");
        cy.clickDataCy("button-enviar-recomendaciones");
        cy.wait("@chatbot");

        // Revisa que se muestre el aviso de recomendaciones invalidas
        cy.checkVisible("aviso-recomendaciones-invalidas");
    });
});
