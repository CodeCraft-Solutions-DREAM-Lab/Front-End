import "cypress-localstorage-commands";

describe('Admin Page ModalInfo Tests', () => {
  beforeEach(() => {
    cy.loginWith("admin", "admin");

    cy.intercept('GET', "/salas", { fixture: 'cronogramaAdmin_ModalInfo/salas.json' }).as('getSalas');
    cy.intercept('GET', "/salas/cronograma", { fixture: 'cronogramaAdmin_ModalInfo/salas_cronograma.json' }).as('getSalasCronograma');
    cy.intercept('GET', "/reservaciones/cronograma", { fixture: 'cronogramaAdmin_ModalInfo/reservaciones_cronograma.json' }).as('getReservacionesCronograma');
    cy.intercept('GET', "/mesas", { fixture: 'cronogramaAdmin_ModalInfo/mesas.json' }).as('getMesas');
    cy.intercept('GET', "/estatus", { fixture: 'cronogramaAdmin_ModalInfo/estatus.json' }).as('getEstatus');

    cy.visit('/admin');
  });

  it.only('Despliegue de reservaciones y grupos', () => {
    cy.wait(['@getReservacionesCronograma', '@getSalasCronograma', '@getMesas', '@getEstatus', '@getSalas']);
    
    cy.checkExist('timeline-container-cronograma-admin');
    cy.get('[data-cy="group-row"]').should('have.length', 55);
  });

});
