describe("Pruebas de despliegue de datos en el dashboard", () => {
    beforeEach(() => {
        cy.intercept("GET", "dashboard/reservacionesByMes", {
            body: [
                {
                    year: 2024,
                    month: 5,
                    reservacionesTotales: 13,
                    reservacionesConfirmadas: 8,
                    reservacionesCanceladas: 6,
                    reservacionesEnEspera: 2,
                    reservacionesDenegadas: 15,
                },
                {
                    year: 2024,
                    month: 4,
                    reservacionesTotales: 7,
                    reservacionesConfirmadas: 2,
                    reservacionesCanceladas: 13,
                    reservacionesEnEspera: 4,
                    reservacionesDenegadas: 12,
                },
                {
                    year: 2024,
                    month: 3,
                    reservacionesTotales: 13,
                    reservacionesConfirmadas: 8,
                    reservacionesCanceladas: 6,
                    reservacionesEnEspera: 2,
                    reservacionesDenegadas: 15,
                },
            ],
        }).as("reservacionesByMes");

        cy.intercept("GET", "dashboard/reservacionesBySalaByMes", {
            body: [
                {
                    year: 2024,
                    month: 5,
                    salas: [
                        {
                            name: "Dimension Forge",
                            value: 3,
                        },
                    ],
                },
                {
                    year: 2024,
                    month: 4,
                    salas: [
                        {
                            name: "Electric Garage",
                            value: 5,
                        },
                    ],
                },
                {
                    year: 2024,
                    month: 3,
                    salas: [
                        {
                            name: "Graveyard",
                            value: 2,
                        },
                    ],
                },
            ],
        }).as("reservacionBySalaByMes");

        cy.intercept("GET", "dashboard/salasDisponibles", {
            body: [
                {
                    sala: "Electric Garage",
                    bloqueada: false,
                },
                {
                    sala: "Dimension Forge",
                    bloqueada: false,
                },
                {
                    sala: "New Horizons",
                    bloqueada: false,
                },
                {
                    sala: "Deep Net",
                    bloqueada: false,
                },
                {
                    sala: "Graveyard",
                    bloqueada: false,
                },
                {
                    sala: "PCB Factory",
                    bloqueada: false,
                },
                {
                    sala: "Hack-Battlefield",
                    bloqueada: false,
                },
                {
                    sala: "Testing Land",
                    bloqueada: false,
                },
                {
                    sala: "War Headquarters",
                    bloqueada: false,
                },
                {
                    sala: "Biometrics Flexible Hall",
                    bloqueada: false,
                },
                {
                    sala: "Beyond-Digits",
                    bloqueada: false,
                },
            ],
        }).as("salasDisponibles");

        cy.intercept("GET", "dashboard/usoMaterialByMes", {
            body: [
                {
                    year: 2024,
                    month: 5,
                    materiales: [
                        {
                            material: "Laptop",
                            uso: 5,
                        },
                        {
                            material: "Cable VGA",
                            uso: 13,
                        },
                        {
                            material: "Cable HDMI",
                            uso: 2,
                        },
                        {
                            material: "Cable Ethernet",
                            uso: 6,
                        },
                        {
                            material: "Proyector",
                            uso: 1,
                        },
                        {
                            material: "Monitor",
                            uso: 8,
                        },
                    ],
                },
                {
                    year: 2024,
                    month: 4,
                    materiales: [
                        {
                            material: "Laptop",
                            uso: 3,
                        },
                        {
                            material: "Cable VGA",
                            uso: 7,
                        },
                        {
                            material: "Cable HDMI",
                            uso: 5,
                        },
                        {
                            material: "Cable Ethernet",
                            uso: 2,
                        },
                        {
                            material: "Proyector",
                            uso: 5,
                        },
                        {
                            material: "Monitor",
                            uso: 4,
                        },
                    ],
                },
                {
                    year: 2024,
                    month: 3,
                    materiales: [
                        {
                            material: "Laptop",
                            uso: 5,
                        },
                        {
                            material: "Cable VGA",
                            uso: 13,
                        },
                        {
                            material: "Cable HDMI",
                            uso: 2,
                        },
                        {
                            material: "Cable Ethernet",
                            uso: 6,
                        },
                        {
                            material: "Proyector",
                            uso: 1,
                        },
                        {
                            material: "Monitor",
                            uso: 8,
                        },
                    ],
                },
            ],
        }).as("usoMaterialByMes");

        cy.intercept("GET", "dashboard/penalizacionesByMes", {
            body: [
                {
                    year: 2024,
                    month: 5,
                    penalizaciones: 8,
                },
                {
                    year: 2024,
                    month: 4,
                    penalizaciones: 13,
                },
                {
                    year: 2024,
                    month: 3,
                    penalizaciones: 13,
                },
            ],
        }).as("penalizacionesByMes");

        // Asignar una fecha especifica para que las pruebas sean consistentes
        cy.setDate(2024, 3, 22);

        // Iniciar sesion con test
        cy.loginWith("test");
        // Visitar el perfil
        cy.visit("/dashboard");

        // Esperar a que las solicitudes se completen
        cy.wait("@reservacionesByMes");
        cy.wait("@reservacionBySalaByMes");
        cy.wait("@salasDisponibles");
        cy.wait("@usoMaterialByMes");
        cy.wait("@penalizacionesByMes");
    });

    it("Despliegue de reservaciones totales", () => {
        // Checar el valor
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-valor")
            .contains("7");
        // Checar el porcentaje de cambio
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-cambio")
            .contains("-46.2%");
        // Checar el icono
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_down.svg"
            );
    });

    it("Despliegue de reservaciones activas", () => {
        // Checar el valor
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-valor")
            .contains("2");
        // Checar el porcentaje de cambio
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-cambio")
            .contains("-75.0%");
        // Checar el icono
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_down.svg"
            );
    });

    it("Despliegue de penalizaciones", () => {
        // Checar el valor
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-valor")
            .contains("13");
        // Checar el porcentaje de cambio
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-cambio")
            .contains("0%");
        // Checar el icono
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_no_change.svg"
            );
    });

    it("Despliegue de cancelaciones", () => {
        // Checar el valor
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-valor")
            .contains("13");
        // Checar el porcentaje de cambio
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-cambio")
            .contains("+116.7%");
        // Checar el icono
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_up.svg"
            );
    });

    it("Despliegue de gráfica de pie de materiales más utilizados", () => {
        // Comprobar las leyendas de la gráfica
        cy.getDataCy("gp-legend").should("exist");
        cy.containsDataCy("gp-legend", "Laptop");
        cy.containsDataCy("gp-legend", "Cable VGA");
        cy.containsDataCy("gp-legend", "Cable HDMI");
        cy.containsDataCy("gp-legend", "Proyector");
        cy.containsDataCy("gp-legend", "Monitor");
        cy.containsDataCy("gp-legend", "Otros");

        // Comprobar la gráfica de pie y el valor del contador de materiales
        cy.getDataCy("gp-chart").should("exist");
        cy.containsDataCy("gp-chart", "26");
        cy.get(".recharts-pie-sector", { force: true }).eq(0).click();
        cy.containsDataCy("gp-chart", "7");
    });

    it.only("Despliegue de la gráfica de línea de reservaciones por mes", () => {
        cy.getDataCy("gl-chart").should("exist");

        // Checar que el y-axis llegue hasta 16
        cy.getDataCy("gl-chart")
            .find(".recharts-cartesian-axis-ticks")
            .contains("16");

        // Checar que el x-axis contenga los 3 meses
        cy.getDataCy("gl-chart")
            .find(".recharts-cartesian-axis-ticks")
            .contains("Mar");
        cy.getDataCy("gl-chart")
            .find(".recharts-cartesian-axis-ticks")
            .contains("Abr");
        cy.getDataCy("gl-chart")
            .find(".recharts-cartesian-axis-ticks")
            .contains("May");
    });
});
