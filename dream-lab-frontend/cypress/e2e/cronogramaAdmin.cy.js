import "cypress-localstorage-commands";
const API_URL = Cypress.env("API_URL");

describe('Admin Page Tests', () => {
  beforeEach(() => {
    const reservaciones = [
      {
        id: 1,
        group: 1,
        title: "Event 1",
        start_time: "2024-05-23T08:00:00Z",
        end_time: "2024-05-23T10:00:00Z"
      },
      {
        id: 2,
        group: 2,
        title: "Event 2",
        start_time: "2024-05-23T10:00:00Z",
        end_time: "2024-05-23T12:00:00Z"
      }
    ];

    const salas = [
      {
        id: 1,
        title: "Sala 1",
        sala: true
      },
      {
        id: 2,
        title: "Sala 2",
        sala: true
      },
      {
        id: 3,
        title: "Sala 3",
        sala: false
      }
    ];
    cy.loginWith("admin");

    cy.intercept('GET', `${API_URL}/reservaciones/cronograma`, { body: reservaciones }).as('getReservaciones');
    cy.intercept('GET', `${API_URL}/salas/cronograma`, { body: salas }).as('getSalas');
    cy.visit('/admin');
  });

  it('Despliegue de reservaciones y grupos', () => {
    cy.wait('@getReservaciones');
    cy.wait('@getSalas');
    
    cy.checkExist('timeline-container-cronograma-admin');
    cy.get('[data-cy="group-row"]').should('have.length', 3);
  });

  it('Funcionamiento de dropdowns y selects', () => {
    cy.wait('@getReservaciones');
    cy.wait('@getSalas');

    // Check Area Dropdown
    cy.getDataCy('Áreas').click();
    cy.contains('Sala VR').click();
    cy.get('body').click(); // Close the dropdown
    cy.containsDataCy('Áreas', 'Sala VR').should('exist');

    // Check State Dropdown
    cy.getDataCy('Estado').click();
    cy.contains('Preparado').click();
    cy.get('body').click(); // Close the dropdown
    cy.containsDataCy('Estado', 'Preparado').should('exist');
  });

  it('Funcionamiento de switches', () => {
    cy.wait('@getReservaciones');
    cy.wait('@getSalas');

    // Assuming that the first group has a toggle switch
    cy.get('.MuiSwitch-root').first().click();
  });

  it('Despliegue de fecha en español', () => {
    cy.wait('@getReservaciones');
    cy.wait('@getSalas');

    cy.get('.header-interval').each(($el) => {
      expect($el.text()).to.match(/\d{1,2} \w+ \d{4}/); // Matches format like "1 Enero 2022"
    });
  });
});
