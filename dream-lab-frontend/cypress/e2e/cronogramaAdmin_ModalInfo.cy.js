import "cypress-localstorage-commands";

describe('Admin Page ModalInfo Tests', () => {
    beforeEach(() => {
        cy.intercept(
            'GET',
            "/salas",
            { fixture: '/salas.json' }
        )
            .as('getSalas');

        cy.intercept(
            'GET',
            "/salas/cronograma"
            , { fixture: '/salas_cronograma.json' }
        )
            .as('getSalasCronograma');

        cy.intercept(
            'GET',
            "/reservaciones/cronograma"
            , { fixture: '/reservaciones_cronograma.json' }
        )
            .as('getReservacionesCronograma');

        cy.intercept(
            'GET',
            "/mesas",
            { fixture: '/mesas.json' }
        )
            .as('getMesas');

        cy.intercept(
            'GET',
            "/estatus",
            { fixture: '/estatus.json' }
        )
            .as('getEstatus');

        cy.intercept(
            'GET',
            "/reservaciones/cronograma/1",
            { fixture: '/reservaciones_cronograma_1.json' }
        )
            .as('getReservacion1');

        cy.intercept(
            'GET',
            "/reservaciones/cronograma/2",
            { fixture: '/reservaciones_cronograma_2.json' }
        )
            .as('getReservacion2');

        cy.intercept(
            'POST',
            "/reservaciones-materiales/changeEstatus",
            {}
        )
            .as('changeEstatus');

        cy.intercept(
            'GET',
            "/reservaciones/cronogramaSingle/2",
            { fixture: '/reservaciones_cronograma_single_2.json' }
        )
            .as('getReservacionSingle1');

        cy.intercept(
            'POST',
            "/reservaciones/cancelar",
            {}
        )
            .as('cancelarReservacion');

        cy.intercept(
            'POST',
            "/usuarios/cambiarPrioridad",
            {}
        )
            .as('cambiarPrioridad');

        const now = new Date(2024, 5, 7, 12, 0, 0);
        cy.clock(now.getTime(), ['Date']);

        cy.loginWith("admin", "admin");
        cy.visit('/admin');
    });

    it('Despliegue de reservaciones', () => {
        cy.wait(['@getReservacionesCronograma', '@getSalasCronograma', '@getMesas', '@getEstatus', '@getSalas']);

        // Sí aparecen los items
        cy.get('[data-cy="item-cronograma"]').should('have.length', 2);

        // Los items tienen el color correcto
        const verde = 'rgb(23, 201, 100)';
        cy.get('[data-cy="item-cronograma-1"]').should('have.css', 'background-color', verde);
        const gris = 'rgb(172, 172, 172)';
        cy.get('[data-cy="item-cronograma-2"]').should('have.css', 'background-color', gris);

        // Tienen el texto correcto
        cy.get('[data-cy="item-cronograma-1"]').contains('Christopher');
        cy.get('[data-cy="item-cronograma-2"]').contains('Roberto');
    });

    describe('Modal de información', () => {
        beforeEach(() => {
            cy.wait(['@getReservacionesCronograma', '@getSalasCronograma', '@getMesas', '@getEstatus', '@getSalas']);
        })

        it('Revisar información del primer modal', () => {
            cy.getDataCy("item-cronograma-1").click();
            cy.wait('@getReservacion1');
            cy.getDataCy("modal-reserv-info").within(() => {
                cy.contains('Christopher Gabriel Pedraza Pohlenz');
                cy.contains('A01177767');
                cy.contains('No se han solicitado materiales');
                cy.contains('Electric Garage - Mesa 1');
                cy.contains('Viernes, 7 de Junio');
                cy.contains('12:00 a 14:00');
            }, { timeout: 10000 });
            cy.get('body').click({ force: true });
            cy.getDataCy("modal-reserv-info").should('not.exist');
        })

        it('Revisar información del segundo modal', () => {
            cy.getDataCy("item-cronograma-2").click();
            cy.wait('@getReservacion2');
            cy.getDataCy("modal-reserv-info").should('be.visible');
            cy.getDataCy("modal-reserv-info").within(() => {
                cy.contains('Roberto González Reyes');
                cy.contains('A00833852');
                cy.contains('Electric Garage - Mesa 2');
                cy.contains('Viernes, 7 de Junio');
                cy.contains('9:00 a 10:00');
                cy.contains('2 - Laptop Gamer');
                cy.contains('1 - Surface Pro');
                cy.contains('0/2');
            }, { timeout: 10000 })
        });
    });

    describe('Modificar material solicitado', () => {
        beforeEach(() => {
            cy.wait(['@getReservacionesCronograma', '@getSalasCronograma', '@getMesas', '@getEstatus', '@getSalas']);
        })

        it('Marcar algunos materiales como preparados', () => {
            cy.getDataCy("item-cronograma-2").click();
            cy.wait('@getReservacion2');
            cy.getDataCy("modal-reserv-info").should('be.visible');
            cy.getDataCy("modal-reserv-info").contains("2 - Laptop Gamer").click();
            cy.wait('@changeEstatus');
            cy.getDataCy("modal-reserv-info").contains("1/2");
            cy.wait('@getReservacionSingle1');

            const azul = 'rgb(96, 161, 220)';
            cy.getDataCy("item-cronograma-2").should('have.css', 'background-color', azul);
        });

        it('Marcar todos los materiales como preparados', () => {
            cy.getDataCy("item-cronograma-2").click();
            cy.wait('@getReservacion2');
            cy.getDataCy("modal-reserv-info").should('be.visible');
            cy.getDataCy("modal-reserv-info").within(() => {
                cy.contains("2 - Laptop Gamer").click()
                cy.contains("1 - Surface Pro").click()
            });

            cy.wait('@changeEstatus');
            cy.getDataCy("modal-reserv-info").contains("2/2");
            cy.wait('@getReservacionSingle1');
            // TODO poder revisar el color verde
        });
    });

    describe("Cancelar reservación", () => {
        beforeEach(() => {
            cy.wait(['@getReservacionesCronograma', '@getSalasCronograma', '@getMesas', '@getEstatus', '@getSalas']);
        });

        it("Cancelar reservación pero siempre no", () => {
            cy.getDataCy("item-cronograma-2").click();
            cy.wait('@getReservacion2');
            cy.getDataCy("modal-reserv-info").should('be.visible');
            cy.getDataCy("cancelar-reserva-btn").click();
            cy.getDataCy("modal-cancelar-reserv").should("be.visible");
            cy.getDataCy("no-cancelar-reserva-btn").click();
            cy.getDataCy("modal-cancelar-reserv").should("not.exist");
            cy.getDataCy("modal-reserv-info").should("be.visible");
        });

        it("Cancelar reservación", () => {
            cy.getDataCy("item-cronograma-2").click();
            cy.wait('@getReservacion2');
            cy.getDataCy("modal-reserv-info").should('be.visible');

            cy.getDataCy("cancelar-reserva-btn").click();
            cy.getDataCy("modal-cancelar-reserv").should("be.visible");

            cy.getDataCy("confirmar-cancelar-reserva-btn").click();
            cy.wait('@cancelarReservacion');

            cy.getDataCy("modal-reserv-info").should('not.exist');
            cy.getDataCy("modal-cancelar-reserv").should("not.exist");
            cy.getDataCy("item-cronograma-2").should("not.exist");
        });
    });

    describe("Penalizar reservación", () => {
        beforeEach(() => {
            cy.wait(['@getReservacionesCronograma', '@getSalasCronograma', '@getMesas', '@getEstatus', '@getSalas']);
        });

        it("Penalizar pero siempre no", () => {
            cy.getDataCy("item-cronograma-2").click();
            cy.wait('@getReservacion2');
            cy.getDataCy("modal-reserv-info").should('be.visible');

            cy.getDataCy("penalizar-btn").click();
            cy.getDataCy("modal-penalizar").should("be.visible");

            cy.getDataCy("no-penalizar-btn").click();
            cy.getDataCy("modal-penalizar").should("not.exist");
            cy.getDataCy("modal-reserv-info").should("be.visible");
        })

        it("Penalizar con y sin motivo", () => {
            cy.getDataCy("item-cronograma-2").click();
            cy.wait('@getReservacion2');
            cy.getDataCy("modal-reserv-info").should('be.visible');

            cy.getDataCy("penalizar-btn").click();
            cy.getDataCy("modal-penalizar").should("be.visible");

            cy.getDataCy("confirmar-penalizar-btn").should("be.disabled");

            cy.getDataCy("select-motivo").click();
            cy.getDataCy("motivo-item-1").click();
            cy.getDataCy("modal-penalizar").contains("Daño a equipo");

            cy.getDataCy("confirmar-penalizar-btn").should("not.be.disabled");
            cy.getDataCy("confirmar-penalizar-btn").click();
            cy.wait('@cambiarPrioridad');
            cy.getDataCy("modal-penalizar").should("not.exist");
        })
    });
});
