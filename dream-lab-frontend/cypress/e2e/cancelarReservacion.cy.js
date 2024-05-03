describe("Cancelación exitosa de una reservación.", () => {
    beforeEach(() => {
        cy.loginWithTest();
        cy.intercept("GET", "perfil/test").as("getPerfil");
    });

    // Variables: Almacenan la cantidad inicial y final de reservaciones
    let valorInicial;

    it.only("Eliminar reservacion satiafactoriamente.", () => {
        cy.visit("/profile");
        cy.wait("@getPerfil");

        // Almacenar la cantidad inicial de puntos de prioridad
        cy.get(
            '.esfera-div > .div-esfera-out > .div-informacion > [data-cy="numero-puntos-prioridad"]'
        ).then(($elemento) => {
            // Obtenemos el valor inicial del elemento
            valorInicial = parseInt($elemento.text());
            cy.log("Valor inicial: " + valorInicial);
        });

        // Al existir reservaciones, se procede a eliminar la primera
        // Verificar si hay reservaciones activas en la respuesta
        cy.get("@getPerfil").then((response) => {
            try {
                const perfilData = response.body;
                const reservacionesActivas =
                    perfilData.recordsets[1].length > 0;
                if (reservacionesActivas) {
                    cy.get(
                        ':nth-child(1) > .first-section-reservacion-card > .clic-tarjeta-reservacion > [data-cy="trash-icon"]'
                    ).click();
                    // ¿Quierés cancelar? Presionar botón "Cancelar reservación"
                    cy.clickDataCy("boton-cancelar-modal-cancelacion");

                    // ¿Seguro? Presionar botón "Sí"
                    cy.clickDataCy("boton-cancelar-final-modal-cancelacion");
                    cy.wait(3000);

                    // Reserva cancelada: Despliegue de mensaje de cancelación exitosa
                    cy.checkVisible("boton-aceptar-modal-cancelacion");
                    cy.containsDataCy(
                        "titulo-cancelacion",
                        "Cancelación exitosa"
                    );
                    cy.clickDataCy("boton-aceptar-modal-cancelacion");
                    cy.wait(5000);

                    // Actualización de los puntos de prioridad del usuario (penalización)
                    cy.get(
                        '.esfera-div > .div-esfera-out > .div-informacion > [data-cy="numero-puntos-prioridad"]'
                    ).then(($elemento) => {
                        const valorActual = parseInt($elemento.text());
                        expect(parseInt(valorActual)).to.equal(
                            parseInt(valorInicial) - 5
                        );
                    });
                }
            } catch (error) {
                console.error("Error accessing response data:", error);
            }
        });
    });

    it("Arrepentimiento al eliminar reservacion.", () => {
        // Iniciar sesión
        cy.login("test", "test");

        // Hacer clic en el icono de usuario
        cy.clickDataCy("userIconNavBar");
        cy.intercept("GET", "perfil/test").as("getPerfil");
        //cy.wait(3000);
        cy.wait("@getPerfil");
        // Al existir reservaciones, se procede a eliminar la primera
        cy.get("@getPerfil").then((response) => {
            try {
                const perfilData = response.body;
                const reservacionesActivas =
                    perfilData.recordsets[1].length > 0;
                if (reservacionesActivas) {
                    cy.get(
                        ':nth-child(1) > .first-section-reservacion-card > .clic-tarjeta-reservacion > [data-cy="trash-icon"]'
                    ).click();
                    // ¿Quierés cancelar? Presionar botón "Cancelar reservación"
                    cy.clickDataCy("boton-cancelar-modal-cancelacion");

                    // ¿Seguro? Presionar botón "No"
                    cy.clickDataCy("boton-aceptar-modal-cancelacion");
                    cy.wait(3000);
                }
            } catch (error) {
                console.error("Error accessing response data:", error);
            }
        });
    });

    it("Despliegue de mensaje al no existir reservaciones activas.", () => {
        // Iniciar sesión
        cy.login("a01177767", "123");

        // Hacer clic en el icono de usuario
        cy.clickDataCy("userIconNavBar");

        // Interceptar la solicitud GET a "perfil/a01177767"
        cy.intercept("GET", "perfil/a01177767").as("getPerfil");

        // Esperar a que la solicitud se complete
        cy.wait("@getPerfil");

        // Verificar si hay reservaciones activas en la respuesta
        cy.get("@getPerfil").then((response) => {
            try {
                const perfilData = response.body;
                const reservacionesActivas =
                    perfilData.recordsets[1].length > 0;
                if (!reservacionesActivas) {
                    cy.checkVisible("anuncio-sin-reservas");
                }
            } catch (error) {
                console.error("Error accessing response data:", error);
            }
        });
    });
});
