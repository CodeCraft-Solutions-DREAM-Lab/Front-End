import "../support/commands";

describe("Interacción correcta en landing page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Botón de 'CONOCE MÁS' hace scroll a detalles", () => {
        cy.clickDataCy("learn-more");
        cy.checkVisible("landing-detail-card");
    });
    
    it("Botón de 'INICIAR SESIÓN' redirige a login", () => {
        cy.clickDataCy("landing-login-button");
        cy.urlContains("/login");
    });
    
    it("Arrastrar el carrusel para cambiar carta", () => {
        cy.get('[aria-label="Go to slide 2"]').click();
      
        // Select the Swiper slide you want to interact with (e.g., the first slide)
        cy.getDataCy('landing-carousel-card').eq(0).as('firstSlide');
      
        cy.get('@firstSlide').trigger('mousedown', { button: 0, force: true });
        cy.get('@firstSlide').trigger('mousemove', { clientX: -100, force: true });
        cy.get('@firstSlide').trigger('mouseup', { force: true });

        // Wait for the Swiper animation to complete
        cy.wait(500); // Adjust the wait time as needed

        // Trigger mouse events on the selected slide to swipe right
        cy.get('@firstSlide').trigger('mousedown', { button: 0, force: true });
        cy.get('@firstSlide').trigger('mousemove', { clientX: 100, force: true });
        cy.get('@firstSlide').trigger('mouseup', { force: true });
      
        // Add assertions to verify the expected result
        cy.containsDataCy("landing-carousel-lab-name", "Lego Room");
    });

    it("Verificar autoplay de carrusel", () => {
        // Scroll down to the carousel
        cy.getDataCy("landing-lab-carousel").scrollIntoView();
      
        const currentStateBefore = cy.getDataCy("landing-carousel-lab-name");
      
        // Wait for a certain amount of time
        cy.wait(5000); // Adjust the wait time as needed
      
        // Capture the state of the carousel after waiting
        const currentStateAfter = cy.getDataCy("landing-carousel-lab-name");;
      
        // Assert that the carousel has automatically slid
        expect(currentStateBefore).not.to.equal(currentStateAfter);
    });  
    
    it("Flecha derecha en carrusel", () => {
        cy.get('[aria-label="Go to slide 1"]').click();
        cy.get('.swiper-button-next').click();
        cy.containsDataCy("landing-carousel-lab-name", "Lego Room");
    });
    
    it("Flecha izquierda en carrusel", () => {
        cy.get('[aria-label="Go to slide 1"]').click();
        cy.get('.swiper-button-prev').click();
        cy.containsDataCy("landing-carousel-lab-name", "Graveyard");
    });
    
    it("Circulos de páginas debajo de carrusel", () => {
        cy.get('[aria-label="Go to slide 2"]').click();
        cy.get('[aria-label="Go to slide 4"]').click();
        cy.containsDataCy("landing-carousel-lab-name", "Dimension Forge");
    });

});
