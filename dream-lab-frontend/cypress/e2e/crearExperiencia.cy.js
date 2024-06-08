import "cypress-file-upload";

describe("Crear Experiencia", () => {
	beforeEach(() => {
		cy.loginWith("admin", "Admin");
		cy.visit("/crearExperiencia");
		cy.intercept("GET", "salas", {
			body: [
				{
					idSala: 1,
					nombre: "Electric Garage",
					cantidadMesas: 8,
					descripcion:
						"Este espacio dinámico y versátil es un sueño hecho realidad para los entusiastas de la electrónica. Equipado con las últimas herramientas y tecnologías, es el lugar ideal para dar vida a tus proyectos más ambiciosos.",
					fotoURL:
						"https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/electric-garage.webp",
					bloqueada: true,
				},

				{
					idSala: 2,
					nombre: "Dimension Forge",
					cantidadMesas: 6,
					descripcion:
						"Un laboratorio de vanguardia donde la creatividad se fusiona con la tecnología. Aquí, los innovadores pueden explorar libremente nuevas ideas y experimentar con las últimas herramientas de diseño y fabricación.",
					fotoURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/vr-lede.webp",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/dimension-forge.webp",
					bloqueada: false,
				},
				{
					idSala: 3,
					nombre: "New Horizons",
					cantidadMesas: 7,
					descripcion:
						"Inspirado por la curiosidad y el deseo de explorar lo desconocido, New Horizons es un lugar donde los límites de la tecnología se desdibujan. Desde la inteligencia artificial hasta la exploración espacial, aquí se dan los primeros pasos hacia el futuro.",
					fotoURL:
						"https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/new-horizons.webp",
					bloqueada: false,
				},
				{
					idSala: 4,
					nombre: "Deep Net",
					cantidadMesas: 5,
					descripcion:
						"Sumérgete en las profundidades de la seguridad informática y las redes con Deep Net. Equipado con tecnología de última generación y expertos en el campo, es el lugar perfecto para poner a prueba tus habilidades y descubrir nuevos horizontes en el ciberespacio.",
					fotoURL:
						"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/deep-net.webp",
					bloqueada: false,
				},
				{
					idSala: 5,
					nombre: "Graveyard",
					cantidadMesas: 9,
					descripcion:
						"No es un lugar de descanso, sino de reinvención. Graveyard es donde las ideas obsoletas encuentran una nueva vida y las tecnologías pasadas se transforman en innovaciones futuras. Es el punto de partida para los visionarios y los revolucionarios.",
					fotoURL:
						"https://images.unsplash.com/photo-1540829917886-91ab031b1764?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/graveyard.webp",
					bloqueada: true,
				},
				{
					idSala: 6,
					nombre: "PCB Factory",
					cantidadMesas: 10,
					descripcion:
						"Desde prototipos hasta producción en masa, PCB Factory ofrece un entorno especializado para el diseño y la fabricación de placas de circuito impreso. Con equipos de alta precisión y experiencia técnica, cada proyecto encuentra su camino hacia el éxito.",
					fotoURL:
						"https://images.unsplash.com/photo-1631376178637-392efc9e356b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/pcb-factory.webp",
					bloqueada: false,
				},
				{
					idSala: 7,
					nombre: "Hack-Battlefield",
					cantidadMesas: 6,
					descripcion:
						"Adéntrate en un campo de pruebas donde la habilidad y la estrategia son tus armas. Hack-Battlefield es el lugar donde los expertos en seguridad informática se enfrentan para poner a prueba sus habilidades y proteger los sistemas de mañana.",
					fotoURL:
						"https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/hack-battlefield.webp",
					bloqueada: false,
				},
				{
					idSala: 8,
					nombre: "Testing Land",
					cantidadMesas: 8,
					descripcion:
						"Un terreno fértil para la innovación y el desarrollo tecnológico. Aquí, los proyectos toman forma y se someten a rigurosas pruebas para garantizar su calidad y fiabilidad. Es el punto de partida para las soluciones del futuro.",
					fotoURL:
						"https://images.unsplash.com/photo-1587355760421-b9de3226a046?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/testing-land.webp",
					bloqueada: true,
				},
				{
					idSala: 9,
					nombre: "War Headquarters",
					cantidadMesas: 5,
					descripcion:
						"El corazón estratégico de las operaciones tecnológicas avanzadas. War Headquarters es donde se planifican y ejecutan los proyectos más ambiciosos, donde la creatividad se encuentra con la ingeniería para dar forma al futuro de la tecnología.",
					fotoURL:
						"https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/war-headquarters.webp",
					bloqueada: true,
				},
				{
					idSala: 10,
					nombre: "Biometrics Flexible Hall",
					cantidadMesas: 7,
					descripcion:
						"En un mundo donde la identidad es fundamental, Biometrics Flexible Hall ofrece un entorno adaptable para la investigación y el desarrollo de sistemas biométricos. Desde el reconocimiento facial hasta la autenticación de voz, aquí se están construyendo las soluciones de seguridad del mañana.",
					fotoURL:
						"https://images.unsplash.com/photo-1667453466805-75bbf36e8707?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/biometrics.webp",
					bloqueada: true,
				},
				{
					idSala: 11,
					nombre: "Beyond-Digits",
					cantidadMesas: 9,
					descripcion:
						"Más allá de los límites convencionales de la tecnología, Beyond-Digits es donde las ideas audaces encuentran su hogar. Aquí, los innovadores exploran nuevas fronteras, desde la inteligencia artificial hasta la computación cuántica, dando forma al futuro con cada línea de código.",
					fotoURL:
						"https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/beyond-digits.webp",
					bloqueada: false,
				},
			],
		}).as("getSalas");
		cy.intercept("GET", "ufs", {
			body: [
				{
					idUF: 1,
					nombre: "Interconexión de dispositivos",
				},
				{
					idUF: 2,
					nombre: "Construcción de software y toma de decisiones",
				},
				{
					idUF: 3,
					nombre: "Análisis y diseño de algoritmos avanzados",
				},
				{
					idUF: 4,
					nombre: "Desarrollo de software",
				},
				{
					idUF: 5,
					nombre:
						"Integración de seguridad informática en redes y sistemas de software",
				},
				{
					idUF: 6,
					nombre:
						"Modelación de sistemas multiagentes con gráficas computacionales",
				},
				{
					idUF: 7,
					nombre: "Implementación de métodos computacionales",
				},
			],
		}).as("getUfs");
	});

	it("Despliegue correcto del paso 1", () => {
		cy.contains("Crea tu experiencia").should("be.visible");
	});

	it("Navegación correcta a paso 2", () => {
		// Llenar campos de la página 1
		cy.typeDataCy("input-nombre-exp", "Experiencia de prueba");
		cy.getDataCy("selector-tipo-exp").click();
		cy.getDataCy("input-tipo-exp").click();
		cy.getDataCy("subir-portada-exp").attachFile("../assets/imagenPrueba.jpg");

		// Click "CONTINUAR"
		cy.contains("CONTINUAR").click();

		// Checar si se despliega el siguiente  paso
		cy.contains("Agrega detalles").should("be.visible");
	});

	it("Navegación correcta y post de experiencia", () => {
		// Intercept the POST request
		cy.intercept("POST", "experiencias/crear", {
			statusCode: 200,
			body: {},
		}).as("createExperience");

		// Llenar campos de la página 1
		cy.typeDataCy("input-nombre-exp", "Experiencia de prueba");
		cy.getDataCy("selector-tipo-exp").click();
		cy.getDataCy("input-tipo-exp").click();
		cy.getDataCy("subir-portada-exp").attachFile("../assets/imagenPrueba.jpg");

		cy.contains("CONTINUAR").click();

		// Llenar campos de la página 2
		cy.typeDataCy("input-fecha-exp", "2024-12-01");

		cy.contains("CONTINUAR").click();

		// Llenar campos de la página 3
		cy.wait("@getSalas");

		cy.contains("PUBLICAR").click();
	});
});

describe("Crear Experiencia validaciones de datos", () => {
	beforeEach(() => {
		cy.loginWith("admin", "Admin");
		cy.visit("/crearExperiencia");

		cy.intercept("GET", "salas", {
			body: [
				{
					idSala: 1,
					nombre: "Electric Garage",
					cantidadMesas: 8,
					descripcion:
						"Este espacio dinámico y versátil es un sueño hecho realidad para los entusiastas de la electrónica. Equipado con las últimas herramientas y tecnologías, es el lugar ideal para dar vida a tus proyectos más ambiciosos.",
					fotoURL:
						"https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/electric-garage.webp",
					bloqueada: true,
				},

				{
					idSala: 2,
					nombre: "Dimension Forge",
					cantidadMesas: 6,
					descripcion:
						"Un laboratorio de vanguardia donde la creatividad se fusiona con la tecnología. Aquí, los innovadores pueden explorar libremente nuevas ideas y experimentar con las últimas herramientas de diseño y fabricación.",
					fotoURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/vr-lede.webp",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/dimension-forge.webp",
					bloqueada: false,
				},
				{
					idSala: 3,
					nombre: "New Horizons",
					cantidadMesas: 7,
					descripcion:
						"Inspirado por la curiosidad y el deseo de explorar lo desconocido, New Horizons es un lugar donde los límites de la tecnología se desdibujan. Desde la inteligencia artificial hasta la exploración espacial, aquí se dan los primeros pasos hacia el futuro.",
					fotoURL:
						"https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/new-horizons.webp",
					bloqueada: false,
				},
				{
					idSala: 4,
					nombre: "Deep Net",
					cantidadMesas: 5,
					descripcion:
						"Sumérgete en las profundidades de la seguridad informática y las redes con Deep Net. Equipado con tecnología de última generación y expertos en el campo, es el lugar perfecto para poner a prueba tus habilidades y descubrir nuevos horizontes en el ciberespacio.",
					fotoURL:
						"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/deep-net.webp",
					bloqueada: false,
				},
				{
					idSala: 5,
					nombre: "Graveyard",
					cantidadMesas: 9,
					descripcion:
						"No es un lugar de descanso, sino de reinvención. Graveyard es donde las ideas obsoletas encuentran una nueva vida y las tecnologías pasadas se transforman en innovaciones futuras. Es el punto de partida para los visionarios y los revolucionarios.",
					fotoURL:
						"https://images.unsplash.com/photo-1540829917886-91ab031b1764?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/graveyard.webp",
					bloqueada: true,
				},
				{
					idSala: 6,
					nombre: "PCB Factory",
					cantidadMesas: 10,
					descripcion:
						"Desde prototipos hasta producción en masa, PCB Factory ofrece un entorno especializado para el diseño y la fabricación de placas de circuito impreso. Con equipos de alta precisión y experiencia técnica, cada proyecto encuentra su camino hacia el éxito.",
					fotoURL:
						"https://images.unsplash.com/photo-1631376178637-392efc9e356b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/pcb-factory.webp",
					bloqueada: false,
				},
				{
					idSala: 7,
					nombre: "Hack-Battlefield",
					cantidadMesas: 6,
					descripcion:
						"Adéntrate en un campo de pruebas donde la habilidad y la estrategia son tus armas. Hack-Battlefield es el lugar donde los expertos en seguridad informática se enfrentan para poner a prueba sus habilidades y proteger los sistemas de mañana.",
					fotoURL:
						"https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/hack-battlefield.webp",
					bloqueada: false,
				},
				{
					idSala: 8,
					nombre: "Testing Land",
					cantidadMesas: 8,
					descripcion:
						"Un terreno fértil para la innovación y el desarrollo tecnológico. Aquí, los proyectos toman forma y se someten a rigurosas pruebas para garantizar su calidad y fiabilidad. Es el punto de partida para las soluciones del futuro.",
					fotoURL:
						"https://images.unsplash.com/photo-1587355760421-b9de3226a046?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/testing-land.webp",
					bloqueada: true,
				},
				{
					idSala: 9,
					nombre: "War Headquarters",
					cantidadMesas: 5,
					descripcion:
						"El corazón estratégico de las operaciones tecnológicas avanzadas. War Headquarters es donde se planifican y ejecutan los proyectos más ambiciosos, donde la creatividad se encuentra con la ingeniería para dar forma al futuro de la tecnología.",
					fotoURL:
						"https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/war-headquarters.webp",
					bloqueada: true,
				},
				{
					idSala: 10,
					nombre: "Biometrics Flexible Hall",
					cantidadMesas: 7,
					descripcion:
						"En un mundo donde la identidad es fundamental, Biometrics Flexible Hall ofrece un entorno adaptable para la investigación y el desarrollo de sistemas biométricos. Desde el reconocimiento facial hasta la autenticación de voz, aquí se están construyendo las soluciones de seguridad del mañana.",
					fotoURL:
						"https://images.unsplash.com/photo-1667453466805-75bbf36e8707?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/biometrics.webp",
					bloqueada: true,
				},
				{
					idSala: 11,
					nombre: "Beyond-Digits",
					cantidadMesas: 9,
					descripcion:
						"Más allá de los límites convencionales de la tecnología, Beyond-Digits es donde las ideas audaces encuentran su hogar. Aquí, los innovadores exploran nuevas fronteras, desde la inteligencia artificial hasta la computación cuántica, dando forma al futuro con cada línea de código.",
					fotoURL:
						"https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					detallesURL:
						"https://dreamlabstorage.blob.core.windows.net/archivos/beyond-digits.webp",
					bloqueada: false,
				},
			],
		}).as("getSalas");
		cy.intercept("GET", "ufs", {
			body: [
				{
					idUF: 1,
					nombre: "Interconexión de dispositivos",
				},
				{
					idUF: 2,
					nombre: "Construcción de software y toma de decisiones",
				},
				{
					idUF: 3,
					nombre: "Análisis y diseño de algoritmos avanzados",
				},
				{
					idUF: 4,
					nombre: "Desarrollo de software",
				},
				{
					idUF: 5,
					nombre:
						"Integración de seguridad informática en redes y sistemas de software",
				},
				{
					idUF: 6,
					nombre:
						"Modelación de sistemas multiagentes con gráficas computacionales",
				},
				{
					idUF: 7,
					nombre: "Implementación de métodos computacionales",
				},
			],
		}).as("getUfs");
	});

	it("Validación correcta página 1", () => {
		cy.contains("CONTINUAR").click();
		cy.contains("Porfavor llena los campos requeridos.").should("be.visible");

		// Llenar un campo a la vez hasta que desaparezca el mensaje de error
		cy.typeDataCy("input-nombre-exp", "Experiencia de prueba");
		cy.contains("CONTINUAR").click();
		cy.contains("Porfavor llena los campos requeridos.").should("be.visible");

		cy.getDataCy("selector-tipo-exp").click();
		cy.getDataCy("input-tipo-exp").click();
		cy.contains("CONTINUAR").click();
		cy.contains("Porfavor llena los campos requeridos.").should("be.visible");

		cy.getDataCy("subir-portada-exp").attachFile("../assets/imagenPrueba.jpg");
        cy.wait(1000); // Esperar a que cierre el snackbar
		cy.contains("CONTINUAR").click();
		cy.contains("Porfavor llena los campos requeridos.").should("not.exist");
	});

	it("Validación correcta página 2", () => {
		// Llenar campos de la página 1
		cy.typeDataCy("input-nombre-exp", "Experiencia de prueba");
		cy.getDataCy("selector-tipo-exp").click();
		cy.getDataCy("input-tipo-exp").click();
		cy.getDataCy("subir-portada-exp").attachFile("../assets/imagenPrueba.jpg");

		cy.contains("CONTINUAR").click();

		// Tratar de continuar sin llenar los campos requeridos de la página 2
		cy.contains("CONTINUAR").click();
		cy.contains("Porfavor selecciona una fecha de inicio.").should(
			"be.visible"
		);
	});
});
