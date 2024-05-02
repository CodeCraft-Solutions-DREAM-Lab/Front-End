describe("Cancelación exitosa de una reservación.", () => {
    beforeEach(() => {
      // Ingresar a la página del D.R.E.A.M. Lab
      cy.visit("http://localhost:5173/login");
    });
  
    // Variables: Almacenan la cantidad inicial y final de reservaciones
    let valorInicial;
  
    it("Eliminar reservacion satiafactoriamente.", () => {
      // Iniciar sesión
      cy.login("test", "test");
  
      // Hacer clic en el icono de usuario
      cy.clickDataCy("userIconNavBar");
      cy.wait(3000);

      // Almacenar la cantidad inicial de puntos de prioridad
     
      cy.get('.esfera-div > .div-esfera-out > .div-informacion > [data-cy="numero-puntos-prioridad"]').then($elemento => {
        // Obtenemos el valor inicial del elemento
        valorInicial = parseInt($elemento.text());
        cy.log("Valor inicial: " + valorInicial)
      });
  
      // Al existir reservaciones, se procede a eliminar la primera
      cy.get(
        ':nth-child(1) > .first-section-reservacion-card > .clic-tarjeta-reservacion > [data-cy="trash-icon"]',
      )
        .click()
        .then(() => {
          // ¿Quierés cancelar? Presionar botón "Cancelar reservación"
          cy.clickDataCy("boton-cancelar-modal-cancelacion");
  
          // ¿Seguro? Presionar botón "Sí"
          cy.clickDataCy("boton-cancelar-final-modal-cancelacion");
          cy.wait(3000);
  
          // Reserva cancelada: Despliegue de mensaje de cancelación exitosa
          cy.checkVisible("boton-aceptar-modal-cancelacion");
          cy.containsDataCy("titulo-cancelacion", "Cancelación exitosa");
          cy.clickDataCy("boton-aceptar-modal-cancelacion");
          cy.wait(5000);

          // Actualización de los puntos de prioridad del usuario (penalización)
          cy.get('.esfera-div > .div-esfera-out > .div-informacion > [data-cy="numero-puntos-prioridad"]').then($elemento => {
            const valorActual = parseInt($elemento.text());
            expect(parseInt(valorActual)).to.equal(parseInt(valorInicial) - 5);
          });
          
        });
  
    });
  
  
    it("Arrepentimiento al eliminar reservacion.", () => {
      // Iniciar sesión
      cy.login("test", "test");
  
      // Hacer clic en el icono de usuario
      cy.clickDataCy("userIconNavBar");
      cy.wait(3000);
  
      cy.wait(3000);
      // Al existir reservaciones, se procede a eliminar la primera
      cy.get(':nth-child(1) > .first-section-reservacion-card > .clic-tarjeta-reservacion > [data-cy="trash-icon"]',)
        .click()
        .then(() => {
          // ¿Quierés cancelar? Presionar botón "Cancelar reservación"
          cy.clickDataCy("boton-cancelar-modal-cancelacion");
  
          // ¿Seguro? Presionar botón "No"
          cy.clickDataCy("boton-aceptar-modal-cancelacion");
          cy.wait(3000);
        });
    });
  
  
    it("Despliegue de mensaje al no existir reservaciones activas.", () => {
      // Iniciar sesión
      cy.login("a01177767", "123");
  
      // Hacer clic en el icono de usuario
      cy.clickDataCy("userIconNavBar");
      cy.wait(3000);
  
      // Si no hay reservaciones, se marca la prueba como exitosa
      cy.checkVisible("anuncio-sin-reservas");
          
    });
  });
  
  
  
  