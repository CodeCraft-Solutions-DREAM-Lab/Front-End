describe("Despliegue correcto del componente 'Detalles'", () => {
    beforeEach(() => {
        cy.loginWith("test");
        cy.visit("/home");

        cy.intercept("GET", "/experiencias", {
            body: [
                {
                    idExperiencia: 1,
                    idUF: null,
                    idSala: 3,
                    nombre: "Hackers Event",
                    descripcion: "Descripción de Hackers Event 1",
                    esAutoDirigida: true,
                    esExclusivaUF: false,
                    portadaURL:
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    fechaInicio: "2024-01-01T00:00:00.000Z",
                    fechaFin: "2024-01-07T00:00:00.000Z",
                    horaFin: "1970-01-01T18:00:00.000Z",
                },
            ],
        }).as("getExperiencias");

        cy.intercept("GET", "/salas", {
            body: [
                {
                    idSala: 1,
                    nombre: "Electric Garage",
                    cantidadMesas: 8,
                    descripcion: "Descripción de Electric Garage",
                    fotoURL:
                        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    detallesURL:
                        "https://dreamlabstorage.blob.core.windows.net/archivos/electric-garage.png",
                },
            ],
        }).as("getSalas");
        cy.intercept("GET", "/experiencias/autodirigidas", {
            body: [
                {
                    idExperiencia: 1,
                    idUF: null,
                    idSala: 3,
                    nombre: "Hackers Event",
                    descripcion: "Descripción de Hackers Event 2",
                    esAutoDirigida: true,
                    esExclusivaUF: false,
                    portadaURL:
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    fechaInicio: "2024-01-01T00:00:00.000Z",
                    fechaFin: "2024-01-07T00:00:00.000Z",
                    horaFin: "1970-01-01T18:00:00.000Z",
                },
            ],
        }).as("getExperienciasAutodirigidas");
        cy.intercept("POST", "/experiencias/UFs", {
            body: [
                {
                    idExperiencia: 8,
                    idUF: 1,
                    idSala: 1,
                    nombre: "Seguridad en la Red",
                    descripcion:
                        "Aprende los conceptos básicos y avanzados de la seguridad en redes en nuestro taller interactivo. Desde la configuración de firewalls hasta la detección de intrusiones, este evento te preparará para proteger eficazmente tu red contra amenazas cibernéticas.",
                    esAutoDirigida: false,
                    esExclusivaUF: true,
                    portadaURL:
                        "https://images.unsplash.com/photo-1604090898152-3003bd1ae6df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    fechaInicio: "2024-01-10T00:00:00.000Z",
                    fechaFin: "2024-01-14T00:00:00.000Z",
                    horaFin: "1970-01-01T16:00:00.000Z",
                },
            ],
        }).as("getUFs");

        cy.intercept("GET", "salas/nameFromExperienceId/**", {
            body: {
                nombre: "New Horizons",
            },
        }).as("getSalaNameFromExperienceId");

        cy.intercept("GET", "salas/1", {
            body: [
                {
                    nombre: "Electric Garage",
                },
            ],
        }).as("getSala");

        cy.intercept("GET", "experiencias/1", {
            body: [
                {
                    nombre: "Hackers Event",
                },
            ],
        }).as("getExperiencia");

        cy.intercept("GET", "mesas/1", {
            body: {
                maxCupos: 0,
            },
        }).as("getMaxCupos");
        cy.intercept("POST", "salas/horasLibres", { body: [] }).as(
            "getHorasLibres"
        );
    });

    it("Despliegue de detalles de una sala.", () => {
        // Información de la sala a probar
        const nombreSala = "Electric Garage";
        const descripcionSala = "Descripción de Electric Garage";

        cy.wait([
            "@getExperiencias",
            "@getSalas",
            "@getExperienciasAutodirigidas",
            "@getUFs",
        ]);

        // Hacer clic sobre tarjeta de "Sala: Electric Garage"
        cy.get(
            ':nth-child(4) > .embla > .embla__viewport > .embla__container > :nth-child(1) > .embla__parallax > .embla__parallax__layer > [data-cy="imagen-experiencia"]'
        ).click();

        // Comparación 1: Nombre de la experiencia coincide con la tarjeta presionada
        cy.containsDataCy("nombre-experiencia-detalles", nombreSala);

        // Comparacion 2: Descripción de la experiencia coincide con la tarjeta presionada
        cy.containsDataCy("descripcion-experiencia-detalles", descripcionSala);

        // Presionar botón "Solicitar" sala
        cy.clickDataCy("boton-solicitar-detalles");

        cy.wait(["@getHorasLibres", "@getSala", "@getMaxCupos"]);

        // Comparación 3: Nombre de la sala en pantalla "Reserva de espacio" coincide con la tarjeta presionada
        cy.containsDataCy("nombre-sala-grande", nombreSala);
    });

    it("Despleigue de detalles de una experiencia.", () => {
        // Información de la sala a probar
        const nombreExp = "Hackers Event";
        const nombreSala = "New Horizons";
        const descripcionExp = "Descripción de Hackers Event 1";

        cy.wait([
            "@getExperiencias",
            "@getSalas",
            "@getExperienciasAutodirigidas",
            "@getUFs",
        ]);

        // Hacer clic sobre tarjeta de "Sala: Electric Garage"
        cy.get(
            ':nth-child(5) > .embla > .embla__viewport > .embla__container > :nth-child(1) > .embla__parallax > .embla__parallax__layer > [data-cy="imagen-experiencia"]'
        ).click();

        // Comparación 1: Nombre de la experiencia coincide con la tarjeta presionada
        cy.containsDataCy("nombre-experiencia-detalles", nombreExp);

        // Comparacion 2: Descripción de la experiencia coincide con la tarjeta presionada
        cy.containsDataCy("descripcion-experiencia-detalles", descripcionExp);

        // Verificar si las etiquetas de la sala están presentes
        cy.containsDataCy("etiqueta-sala-experiencia", "Autodirigido");

        // Presionar botón "Solicitar" sala
        cy.clickDataCy("boton-solicitar-detalles");

        cy.wait([
            "@getExperiencia",
            "@getSalaNameFromExperienceId",
            "@getHorasLibres",
        ]);

        // Comparación 3: Nombre de la sala en pantalla "Reserva de espacio" coincide con la tarjeta presionada
        cy.containsDataCy("nombre-experiencia", nombreExp);
        cy.containsDataCy("nombre-sala-chico", nombreSala);
    });
});
