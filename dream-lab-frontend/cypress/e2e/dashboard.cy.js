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

        cy.setDate(2024, 3, 22);

        // Iniciar sesion con test
        cy.loginWith("test");
        // Visitar el perfil
        cy.visit("/dashboard");

        cy.wait("@reservacionesByMes");
        cy.wait("@reservacionBySalaByMes");
        cy.wait("@salasDisponibles");
    });

    it("Despliega correctamente los datos de las reservaciones por mes", () => {});
});
