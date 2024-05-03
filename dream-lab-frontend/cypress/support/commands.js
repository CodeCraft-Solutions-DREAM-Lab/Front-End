import "cypress-localstorage-commands";
import { warning } from "framer-motion";
const API_URL = Cypress.env("API_URL");

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Obtiene un elemento por el atributo data-cy
Cypress.Commands.add("getDataCy", (name) => {
    return cy.get(`[data-cy=${name}]`);
});

// Hace click en un elemento por el atributo data-cy
Cypress.Commands.add("clickDataCy", (name) => {
    return cy.getDataCy(name).click();
});

// Escribe en un elemento por el atributo data-cy
Cypress.Commands.add("typeDataCy", (name, text) => {
    return cy.getDataCy(name).type(text);
});

// Checa si un elemento con el atributo data-cy contiene un texto específico
Cypress.Commands.add("containsDataCy", (name, text) => {
    return cy.getDataCy(name).contains(text);
});

// Verifica si un elemento tiene un atributo con un valor específico
Cypress.Commands.add(
    "hasAttribute",
    { prevSubject: "element" },
    (subject, attr, value) => {
        return cy.wrap(subject).should("have.attr", attr, value);
    }
);

// Checa si un elemento con el atributo data-cy contiene un texto específico
Cypress.Commands.add("containsDataCy_Alt", (name, text) => {
    return cy.getDataCy(name).then(($elemento) => {
        const texto = $elemento.text();
        expect(texto).to.equal(text);
    });
});

// Iniciar sesión con usuario y contraseña
Cypress.Commands.add("login", (user, password) => {
    cy.typeDataCy("login-user", user);
    cy.typeDataCy("login-password", password);
    cy.clickDataCy("login-button");
});

// Evita parar la prueba por errores no controlados
Cypress.on("uncaught:exception", (err, runnable) => {
    // Evita que Cypress falle la prueba cuando se produce un error no controlado
    return false;
});

// Checa si un elemento con el atributo data-cy es visible
Cypress.Commands.add("checkVisible", (name) => {
    return cy.getDataCy(name).should("be.visible");
});

// Checa si un elemento con el atributo data-cy existe
Cypress.Commands.add("checkExist", (name) => {
    return cy.getDataCy(name).should("exist");
});

// Checa la cantidad de elementos hijos de un elemento con el atributo data-cy
Cypress.Commands.add("getLength", (name) => {
    return cy
        .getDataCy(name)
        .children()
        .then((children) => {
            return children.length;
        });
});

Cypress.Commands.add("loginWith", (user) => {
    cy.intercept("POST", API_URL + "auth/token", {
        data: "token",
    }).as("login");

    cy.setLocalStorage(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiQTAxMTc3NzY3IiwiaWF0IjoxNzEyNjMzMjU2fQ.-ky8LBLfLFCRmENvP0QetksCFuN9D5R0OGC9NiN2WD0"
    );
    cy.setLocalStorage("user", user);
});

Cypress.Commands.add("urlContains", (url) => {
    cy.url().should("include", url);
});

Cypress.Commands.add("isTypeDataCy", (name, type) => {
    return cy.getDataCy(name).hasAttribute("type", type);
});
