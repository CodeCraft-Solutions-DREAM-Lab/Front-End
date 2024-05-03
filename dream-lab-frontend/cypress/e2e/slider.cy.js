describe("Despliegue adecuado del componente 'Slider'.", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("Funcionamiento adecuado del slider", () => {
        // Iniciar sesión
        cy.login("test", "test");

        // Hacer clic en sala "Dimnsion Forge"
        cy.wait(3000);
        cy.get(':nth-child(4) > .embla > .embla__viewport > .embla__container > :nth-child(2) > .embla__parallax > .embla__parallax__layer > [data-cy="imagen-experiencia"]').click();

        cy.wait(3000);
        // Presionar botón "Solicitar" sala
        cy.clickDataCy("boton-solicitar-detalles");

        // Verificar que el slider de personas está presente
        cy.checkExist("slider-container-personas");

        cy.wait(3000);
        // Checar el valor máximo del slider
        cy.get('[data-cy="slider-container-personas"] input[type="range"]').invoke("attr", "max").should("equal", "8");

        // Mover el slider a la derecha
        cy.get('[data-cy="slider-container-personas"] input[type="range"]', { timeout: 10000 }).type("val", "5").trigger("input");

        // Checar si el output del slider es igual a "4 personas"
        cy.containsDataCy("slider-output-texto", " 5 personas ");
    });
});
