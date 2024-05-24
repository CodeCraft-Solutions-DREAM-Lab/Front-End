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

    it("Validar despliegue correcto de reservaciones totales", () => {
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-valor")
            .contains("7");
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-cambio")
            .contains("-46.2%");
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_down.svg"
            );
    });

    it("Validar despliegue correcto de reservaciones activas", () => {
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-valor")
            .contains("2");
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-cambio")
            .contains("-75.0%");
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_down.svg"
            );
    });

    it("Validar despliegue correcto de penalizaciones", () => {
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-valor")
            .contains("13");
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-cambio")
            .contains("0%");
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_no_change.svg"
            );
    });

    it.only("Validar despliegue correcto de cancelaciones", () => {
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-valor")
            .contains("13");
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-cambio")
            .contains("+116.7%");
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_up.svg"
            );
    });
});
