describe("Pruebas de selección de material", () => {
	beforeEach(() => {
		cy.visit("/login");
		cy.typeDataCy("login-user", "test");
		cy.typeDataCy("login-password", "test");
		cy.clickDataCy("login-button");
	});

	it("Pruebas contador", () => {
		cy.visit("/reservacion/material", {
			// Ponemos los datos iniciales antes de cargar la página de selección de material
			onBeforeLoad(win) {
				win.sessionStorage.setItem("reservType", "sala");
				win.sessionStorage.setItem("idSala", "2");
				win.sessionStorage.setItem("duration", "3");
				win.sessionStorage.setItem(
					"fechaIsoString",
					"2024-05-30T06:00:00.000Z"
				);
				win.sessionStorage.setItem("fecha", "Thu, 30 May 2024 06:00:00 GMT");
				win.sessionStorage.setItem("horaInicio", "9");
				win.sessionStorage.setItem(
					"horaInicioIsoString",
					"2024-04-30T09:00:00.000Z"
				);
			},
		});

        cy.intercept('POST', '/materiales').as('getMaterials');
        cy.wait('@getMaterials');

        cy.get('.card-container-sm > :nth-child(1)').should('exist');

		cy.get('.card-container-sm > :nth-child(1)').find('[data-cy="minus-button"]').click(); // Quitar 1
		cy.get('.card-container-sm > :nth-child(1)')
			.find(".quantity")
			.should("contain", 0); // Verificar que el contador no se va a valores negativos

		cy.get('.card-container-sm > :nth-child(1)').find('[data-cy="plus-button"]').click(); // Agregar 1
		cy.get('.card-container-sm > :nth-child(1)')
			.find(".quantity")
			.should("contain", 1); // Verificar que incrementó el contador

		cy.get('.card-container-sm > :nth-child(1)').find('[data-cy="plus-button"]').click(); // Agregar 1
		cy.get('.card-container-sm > :nth-child(1)')
			.find(".quantity")
			.should("contain", 1); // Verificar que e contador no incrementó (la cantidad disponible es 1)

		cy.get('.card-container-sm > :nth-child(1)').find('[data-cy="minus-button"]').click(); // Quitar 1
		cy.get('.card-container-sm > :nth-child(1)')
			.find(".quantity")
			.should("contain", 0); // Verificar que decrementó el contador

		cy.get('.card-container-sm > :nth-child(1)').find('[data-cy="plus-button"]').click(); // Agregar 1

		cy.reload().then(() => {
			// Recargamos la página
			// Una vez recargada la página, checamos que el valor del contador se quedó con
			// el valor asignado previamente
            cy.wait('@getMaterials');
			cy.get('.card-container-sm > :nth-child(1)')
				.find(".quantity")
				.should("contain", 1); // Verificar que el valor (1) sigue ahí 
		});
	});
});
