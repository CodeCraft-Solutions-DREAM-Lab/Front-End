describe("Pruebas de las pantallas de error", () => {
	beforeEach(() => {
		cy.loginWith("test", "Regular");
		cy.intercept("GET", "/perfil/test", {
			body: [{}],
		}).as("getPerfil");

		cy.intercept("GET", "/perfil/logros/test", {
			body: [{}],
		}).as("getLogros");

		cy.intercept("POST", "/materiales", {
			body: [
				{
					id: 11,
					name: "Tablet Windows",
					cantidadDisponible: 1,
					cantidadRecomendada: 1,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/tablet-windows.webp",
				},
				{
					id: 12,
					name: "Cámara Digital (DSLR)",
					cantidadDisponible: 1,
					cantidadRecomendada: 2,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/camara.webp",
				},
				{
					id: 13,
					name: "Audífonos Over-Ear",
					cantidadDisponible: 0,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/audifonos.webp",
				},
				{
					id: 14,
					name: "Altavoces Bluetooth",
					cantidadDisponible: 1,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/altavoz.webp",
				},
				{
					id: 15,
					name: "Micrófono",
					cantidadDisponible: 1,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/microfono.webp",
				},
				{
					id: 16,
					name: "Router Wi-Fi",
					cantidadDisponible: 1,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/router.webp",
				},
				{
					id: 3,
					name: "Chromebook",
					cantidadDisponible: 2,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/chromebook.webp",
				},
				{
					id: 7,
					name: "Visor VR para smartphone",
					cantidadDisponible: 2,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/vr-smartphone.webp",
				},
				{
					id: 10,
					name: "Tablet iPad",
					cantidadDisponible: 2,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/ipad.webp",
				},
				{
					id: 1,
					name: "Laptop Gamer",
					cantidadDisponible: 4,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/laptop-gamer.webp",
				},
				{
					id: 6,
					name: "PlayStation VR",
					cantidadDisponible: 6,
					cantidadRecomendada: 0,
					image:
						"https://dreamlabstorage.blob.core.windows.net/materiales/playstationVR.webp",
				},
			],
		}).as("getMaterials");

		cy.intercept("POST", "reservaciones", { body: [{ rowsAffected: 1 }] }).as(
			"postReservacion"
		);

		cy.visit("/reservacion/resumen", {
			onBeforeLoad(win) {
				win.sessionStorage.setItem(
					"materials",
					'[{"materialId":11,"quantity":1},{"materialId":12,"quantity":1},{"materialId":13,"quantity":1}]'
				);
				win.sessionStorage.setItem("nameSalaExperiencia", "Dimension Forge");
				win.sessionStorage.setItem("personas", 1);
				win.sessionStorage.setItem("formattedDate", "Jueves - 23 de Mayo");
				win.sessionStorage.setItem("formattedTime", "10 AM - 12 PM");
				win.sessionStorage.setItem("horaCorte", "6 pm");
				win.sessionStorage.setItem("competidores", 1);
				win.sessionStorage.setItem("cupos", 1);
			},
		});
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
				descripcionLogro: "Reserva 50 veces algún espacio del D.R.E.A.M. Lab.",
				iconoLogro:
					"https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.webp",
				colorLogro: "#AFB7FF",
			},
		}).as("postLogro");

		// Acceso a la pantalla de error
		//cy.visit("/reservacion/resumen");

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
		cy.containsDataCy(
			"descripcion-logro-obtenido",
			"Reserva 50 veces algún espacio del D.R.E.A.M. Lab."
		);
		cy.containsDataCy(
			"puntos-ganados-logro-obtenido",
			"+50 punto(s) de prioridad"
		);
		cy.containsDataCy(
			"nuevo-total-logro-obtenido",
			"Tu nuevo total es de 350 pts."
		);

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
				descripcionLogro: "Reserva 50 veces algún espacio del D.R.E.A.M. Lab.",
				iconoLogro:
					"https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.webp",
				colorLogro: "#AFB7FF",
			},
		}).as("postLogro");

		// Acceso a la pantalla de error
		//cy.visit("/reservacion/resumen");

		// Envío de la reservación
		cy.clickDataCy("summary-submit-button");
		cy.wait("@postLogro");

		// Verificación de elementos en la pantalla
		cy.getDataCy("nombre-logro-avance-progreso").should("exist");
		cy.getDataCy("descripcion-logro-avance-progreso").should("exist");
		cy.getDataCy("fraccion-avance-progreso-logro").should("exist");

		// Verificación de contenido en la pantalla
		cy.containsDataCy("nombre-logro-avance-progreso", "Big Dreamer");
		cy.containsDataCy(
			"descripcion-logro-avance-progreso",
			"Reserva 50 veces algún espacio del D.R.E.A.M. Lab."
		);
		cy.containsDataCy("fraccion-avance-progreso-logro", "25 / 50");
	});
});
