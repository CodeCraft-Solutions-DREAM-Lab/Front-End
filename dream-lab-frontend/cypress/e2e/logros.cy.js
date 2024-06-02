describe("Pruebas de las pantallas de error", () => {
    beforeEach(() => {
        cy.loginWith("test");

        cy.intercept("POST", "reservaciones", {
            body: {
                idUsuario: "A00123456",
                idSala: 1,
                idExperiencia: 1,
                horaInicio: 9,
                duracion: 1,
                fecha: "2024-05-23",
                idMesa: null,
                estatus: 3,
            },
        }).as("postReservacion");
    
    });
   
    it("Pruebas de aviso: Logro obtenido", () => {

        cy.intercept("POST", "logros/progresoLogro/test/1", {
            body: {
                valorActual: 50,
                valorMax: 50,
                obtenido: true,
                nuevaPrioridad: 350,
                prioridadOtorgada: 50,
                obtenidoPreviamente: false,
                nombreLogro: "Big Dreamer",
                descripcionLogro:
                    "Reserva 50 veces algún espacio del D.R.E.A.M. Lab.",
                iconoLogro:
                    "https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.webp",
                colorLogro: "#AFB7FF",
            },
        }).as("postLogro");

        // Acceso a la pantalla de error
        cy.visit("/reservacion/resumen");

        // Envío de la reservación
        cy.clickDataCy("summary-submit-button");
        cy.wait("@postLogro");

        // Verificación de elementos en la pantalla
        cy.getDataCy("nombre-logro-obtenido").should("exist");
        cy.getDataCy("descripcion-logro-obtenido").should("exist");
        cy.getDataCy("puntos-ganados-logro-obtenido").should("exist");
        cy.getDataCy("nuevo-total-logro-obtenido").should("exist");
        cy.getDataCy("ver-logro-boton-anuncio-generico").should("exist");

        // Verificación de contenido en la pantalla
        cy.containsDataCy("nombre-logro-obtenido", "Big Dreamer"); 
        cy.containsDataCy("descripcion-logro-obtenido", "Reserva 50 veces algún espacio del D.R.E.A.M. Lab.");
        cy.containsDataCy("puntos-ganados-logro-obtenido", "+50 punto(s) de prioridad");
        cy.containsDataCy("nuevo-total-logro-obtenido", "Tu nuevo total es de 350 pts.");

        // Botón "Ver logro"
        cy.clickDataCy("ver-logro-boton-anuncio-generico");

        // Verificación de redirección
        cy.urlContains("/profile");

    });

    it("Pruebas de aviso: Avance en logro", () => {
        cy.intercept("POST", "logros/progresoLogro/test/1", {
            body: {
                valorActual: 25,
                valorMax: 50,
                obtenido: false,
                nuevaPrioridad: null,
                prioridadOtorgada: 50,
                obtenidoPreviamente: false,
                nombreLogro: "Big Dreamer",
                descripcionLogro:
                    "Reserva 50 veces algún espacio del D.R.E.A.M. Lab.",
                iconoLogro:
                    "https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.webp",
                colorLogro: "#AFB7FF",
            },
        }).as("postLogro");

        // Acceso a la pantalla de error
        cy.visit("/reservacion/resumen");

        // Envío de la reservación
        cy.clickDataCy("summary-submit-button");
        cy.wait("@postLogro");

        // Verificación de elementos en la pantalla
        cy.getDataCy("nombre-logro-avance-progreso").should("exist");
        cy.getDataCy("descripcion-logro-avance-progreso").should("exist");
        cy.getDataCy("fraccion-avance-progreso-logro").should("exist");     

        // Verificación de contenido en la pantalla
        cy.containsDataCy("nombre-logro-avance-progreso", "Big Dreamer");
        cy.containsDataCy("descripcion-logro-avance-progreso", "Reserva 50 veces algún espacio del D.R.E.A.M. Lab.");
        cy.containsDataCy("fraccion-avance-progreso-logro", "25 / 50");
      
    });
});
