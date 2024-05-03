describe("Despliegue correcto del componente 'Detalles'", () => {
    beforeEach(() => {
      cy.visit("/login");
    });
  
    it("Despliegue de detalles de una sala.", () => {
      
      // Información de la sala a probar
      const nombreSala = "Electric Garage";
      const descripcionSala ="Este espacio dinámico y versátil es un sueño hecho realidad para los entusiastas de la electrónica. Equipado con las últimas herramientas y tecnologías, es el lugar ideal para dar vida a tus proyectos más ambiciosos.";
  
      // Iniciar sesión
      cy.login("test", "test");
      cy.wait(3000);
  
      // Hacer clic sobre tarjeta de "Sala: Electric Garage"
      cy.get(
        ':nth-child(4) > .embla > .embla__viewport > .embla__container > :nth-child(1) > .embla__parallax > .embla__parallax__layer > [data-cy="imagen-experiencia"]',
      ).click();
  
      // Comparación 1: Nombre de la experiencia coincide con la tarjeta presionada
      cy.containsDataCy_Alt("nombre-experiencia-detalles", nombreSala);
  
      // Comparacion 2: Descripción de la experiencia coincide con la tarjeta presionada
      cy.containsDataCy_Alt("descripcion-experiencia-detalles", descripcionSala);
  
      // Presionar botón "Solicitar" sala
      cy.clickDataCy("boton-solicitar-detalles");
  
      // Comparación 3: Nombre de la sala en pantalla "Reserva de espacio" coincide con la tarjeta presionada
      cy.wait(3000);
      cy.containsDataCy_Alt("nombre-sala-grande", nombreSala);
    });
  
    it("Despleigue de detalles de una experiencia.", () => {
      
      // Información de la sala a probar
      const nombreExp = "Hackers Event";
      const nombreSala = "New Horizons";
      const descripcionExp ="Únete a nosotros para explorar los últimos avances en ciberseguridad y pruebas de software en nuestro evento exclusivo. Aprende de expertos de la industria y participa en debates interactivos sobre técnicas y herramientas de hacking ético.";
  
      // Iniciar sesión
      cy.login("test", "test");
      cy.wait(3000);
  
      // Hacer clic sobre tarjeta de "Sala: Electric Garage"
      cy.get(':nth-child(5) > .embla > .embla__viewport > .embla__container > :nth-child(1) > .embla__parallax > .embla__parallax__layer > [data-cy="imagen-experiencia"]').click()
        
      // Comparación 1: Nombre de la experiencia coincide con la tarjeta presionada
      cy.containsDataCy_Alt("nombre-experiencia-detalles", nombreExp); 
  
      // Comparacion 2: Descripción de la experiencia coincide con la tarjeta presionada
      cy.containsDataCy_Alt("descripcion-experiencia-detalles", descripcionExp);
  
      // Verificar si las etiquetas de la sala están presentes
      cy.containsDataCy("etiqueta-sala-experiencia", "Autodirigido");
  
      // Presionar botón "Solicitar" sala
      cy.clickDataCy("boton-solicitar-detalles");
  
      // Comparación 3: Nombre de la sala en pantalla "Reserva de espacio" coincide con la tarjeta presionada
      cy.wait(3000);
      cy.containsDataCy_Alt("nombre-experiencia", nombreExp);
      cy.containsDataCy_Alt("nombre-sala-chico", nombreSala)
    });
    
  });
  
  
  
  