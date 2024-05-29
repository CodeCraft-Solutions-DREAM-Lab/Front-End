import "cypress-file-upload";

describe("Creación de anuncios para el video wall", () => {
    beforeEach(() => {
        cy.loginWith("test");
        cy.visit("/crearAnuncio");

        // Intercepta la solicitud GET para obtener la lista de anuncios y devuelve datos hardcodeados
        cy.intercept("GET", "https://readanuncios-j5zt2ysdwq-uc.a.run.app/", {
            statusCode: 200,
            body: [
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "12 de junio, 2024",
                    horaFin: "17:00",
                    horaInicio: "15:30",
                    nombreEvento: "Taller: Un vistazo al pasado",
                    nombreSala: "Graveyard",
                    personalizado: false,
                    posicion: 0,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/c4b37173-a86b-4d38-9ee4-ef55f884c74f?alt=media&token=00f9b6a5-c6b3-4673-8435-4b234e43eff0",
                    firebaseId: "9wrYH3oxJAda6ucXuan",
                },
            ],
        }).as("getAnuncios");
    });

    // Prueba para agregar un anuncio de tipo evento
    it("Agregar anuncio (evento)", () => {
        cy.wait("@getAnuncios");

        cy.intercept("POST", "https://createanuncio2-j5zt2ysdwq-uc.a.run.app", {
            statusCode: 200,
            body: [
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "5 de mayo, 2024",
                    horaInicio: "09:00",
                    horaFin: "10:00",
                    nombreEvento: "Anuncio de prueba",
                    nombreSala: "Ubicación de prueba",
                    personalizado: false,
                    posicion: 1,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/a6e3f903-26c6-4b0b-9fcf-15b2f68a1430?alt=media&token=d2e3c48c-f3b1-4602-b262-b9a4439a8272",
                    firebaseId: "9wgjdfsoxJAda6u493an",
                },
            ],
        }).as("postAnuncioEvento");

        // Simular una respuesta mock para el segundo GET con los datos actualizados
        cy.intercept("GET", "https://readanuncios-j5zt2ysdwq-uc.a.run.app/", {
            statusCode: 200,
            body: [
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "12 de junio, 2024",
                    horaFin: "17:00",
                    horaInicio: "15:30",
                    nombreEvento: "Taller: Un vistazo al pasado",
                    nombreSala: "Graveyard",
                    personalizado: false,
                    posicion: 0,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/c4b37173-a86b-4d38-9ee4-ef55f884c74f?alt=media&token=00f9b6a5-c6b3-4673-8435-4b234e43eff0",
                    firebaseId: "9wrY3foxJAda6ucXuan",
                },
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "5 de mayo, 2024",
                    horaInicio: "09:00",
                    horaFin: "10:00",
                    nombreEvento: "Anuncio de prueba",
                    nombreSala: "Ubicación de prueba",
                    personalizado: false,
                    posicion: 1,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/a6e3f903-26c6-4b0b-9fcf-15b2f68a1430?alt=media&token=d2e3c48c-f3b1-4602-b262-b9a4439a8272",
                    firebaseId: "9wgjdfsoxJAda6u493an",
                },
            ],
        }).as("getAnunciosActualizado");

        cy.typeDataCy("input-titulo-anuncio-evento", "Anuncio de prueba");
        cy.typeDataCy("input-ubicacion-anuncio-evento", "Ubicación de prueba");
        cy.typeDataCy("input-fecha-anuncio-evento", "05052024");
        cy.typeDataCy("input-hora-inicio-anuncio-evento", "09:00");
        cy.typeDataCy("input-hora-fin-anuncio-evento", "10:00");
        cy.clickDataCy("boton-agregar-anuncio");
        cy.containsDataCy(
            "mensaje-advertencia-anuncio-evento",
            "Existen campos vacíos. Por favor complete todos los campos."
        );

        cy.attachFileDataCy(
            "subir-imagen-anuncio-personalizado",
            "../assets/imagenPrueba.jpg", 15000
        );

        cy.clickDataCy("boton-agregar-anuncio");

        // Espera a que se complete la solicitud POST
        cy.wait("@postAnuncioEvento");

        // Esperar a que se complete la solicitud GET
        cy.wait("@getAnunciosActualizado");

        cy.containsDataCy(
            "mensaje-enviado-anuncio-evento",
            "¡Datos enviados correctamente!"
        );
    });

    // Prueba para agregar un anuncio de tipo personalizado
    it("Agregar anuncio (personalizado)", () => {
        cy.intercept("POST", "https://createanuncio2-j5zt2ysdwq-uc.a.run.app", {
            statusCode: 200,
            body: [
                {
                    descripcion: "Descripción",
                    encendido: true,
                    fecha: "",
                    horaInicio: "",
                    horaFin: "",
                    nombreEvento: "",
                    nombreSala: "Anuncio de prueba",
                    personalizado: true,
                    posicion: 1,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/a6e3f903-26c6-4b0b-9fcf-15b2f68a1430?alt=media&token=d2e3c48c-f3b1-4602-b262-b9a4439a8272",
                    firebaseId: "9wgjdfsoxJAda11493an",
                },
            ],
        }).as("postAnuncioPersonalizado");

        // Simular una respuesta mock para el segundo GET con los datos actualizados
        cy.intercept("GET", "https://readanuncios-j5zt2ysdwq-uc.a.run.app/", {
            statusCode: 200,
            body: [
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "12 de junio, 2024",
                    horaFin: "17:00",
                    horaInicio: "15:30",
                    nombreEvento: "Taller: Un vistazo al pasado",
                    nombreSala: "Graveyard",
                    personalizado: false,
                    posicion: 0,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/c4b37173-a86b-4d38-9ee4-ef55f884c74f?alt=media&token=00f9b6a5-c6b3-4673-8435-4b234e43eff0",
                    firebaseId: "9wrYH3foJAda6ucXuan",
                },
                {
                    descripcion: "Descripción",
                    encendido: true,
                    fecha: "",
                    horaInicio: "",
                    horaFin: "",
                    nombreEvento: "",
                    nombreSala: "Anuncio de prueba",
                    personalizado: true,
                    posicion: 1,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/a6e3f903-26c6-4b0b-9fcf-15b2f68a1430?alt=media&token=d2e3c48c-f3b1-4602-b262-b9a4439a8272",
                    firebaseId: "9wgjdfsoxJAda11493an",
                },
            ],
        }).as("getAnunciosActualizado");

        cy.clickDataCy("tipo-formulario-personalizado-boton");
        cy.typeDataCy("titulo-anuncio-personalizado", "Anuncio de prueba");
        cy.typeDataCy(
            "descripcion-anuncio-personalizado",
            "Descripción de prueba"
        );
        cy.clickDataCy("boton-agregar-anuncio");
        cy.containsDataCy(
            "mensaje-advertencia-anuncio-personalizado",
            "Existen campos vacíos. Por favor complete todos los campos."
        );
        cy.attachFileDataCy(
            "subir-imagen-anuncio-personalizado",
            "../assets/imagenPrueba.jpg", 15000
        );
        cy.clickDataCy("boton-agregar-anuncio");

        // Espera a que se complete la solicitud POST
        cy.wait("@postAnuncioPersonalizado");

        // Esperar a que se complete la solicitud GET
        cy.wait("@getAnunciosActualizado");

        cy.containsDataCy(
            "mensaje-enviado-anuncio-personalizado",
            "¡Datos enviados correctamente!"
        );
    });

    // Prueba para agregar un anuncio de tipo imagen
    it("Agregar anuncio (imagen)", () => {
        cy.intercept("POST", "https://createanuncio2-j5zt2ysdwq-uc.a.run.app", {
            statusCode: 200,
            body: [
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "",
                    horaInicio: "",
                    horaFin: "",
                    nombreEvento: "",
                    nombreSala: "",
                    personalizado: false,
                    posicion: 1,
                    soloImagen: true,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/a6e3f903-26c6-4b0b-9fcf-15b2f68a1430?alt=media&token=d2e3c48c-f3b1-4602-b262-b9a4439a8272",
                    firebaseId: "9wgjdfsoxdAda11493an",
                },
            ],
        }).as("postAnuncioSoloImagen");

        // Simular una respuesta mock para el segundo GET con los datos actualizados
        cy.intercept("GET", "https://readanuncios-j5zt2ysdwq-uc.a.run.app/", {
            statusCode: 200,
            body: [
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "12 de junio, 2024",
                    horaFin: "17:00",
                    horaInicio: "15:30",
                    nombreEvento: "Taller: Un vistazo al pasado",
                    nombreSala: "Graveyard",
                    personalizado: false,
                    posicion: 0,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/c4b37173-a86b-4d38-9ee4-ef55f884c74f?alt=media&token=00f9b6a5-c6b3-4673-8435-4b234e43eff0",
                    firebaseId: "9wrYH3foJAda6ucXuan",
                },
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "",
                    horaInicio: "",
                    horaFin: "",
                    nombreEvento: "",
                    nombreSala: "",
                    personalizado: false,
                    posicion: 1,
                    soloImagen: true,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/a6e3f903-26c6-4b0b-9fcf-15b2f68a1430?alt=media&token=d2e3c48c-f3b1-4602-b262-b9a4439a8272",
                    firebaseId: "9wgjdfsoxdAda11493an",
                },
            ],
        }).as("getAnunciosActualizado");

        cy.clickDataCy("checkbox-solo-imagen-anuncio-personalizado");
        cy.clickDataCy("boton-agregar-anuncio");
        cy.containsDataCy(
            "mensaje-advertencia-anuncio-evento",
            "Por favor adjunte una imagen."
        );
        cy.attachFileDataCy(
            "subir-imagen-anuncio-personalizado",
            "../assets/imagenPrueba.jpg", 15000
        );
        cy.clickDataCy("boton-agregar-anuncio");

        // Espera a que se complete la solicitud POST
        cy.wait("@postAnuncioSoloImagen");

        // Esperar a que se complete la solicitud GET
        cy.wait("@getAnunciosActualizado");

        cy.containsDataCy(
            "mensaje-enviado-anuncio-evento",
            "¡Datos enviados correctamente!"
        );
    });

    // Eliminar anuncio
    it("Eliminar anuncio", () => {
        // intercept delete
        cy.intercept(
            "DELETE",
            "https://deleteanuncio-j5zt2ysdwq-uc.a.run.app?id=9wrYH3oxJAda6ucXuan",
            {
                statusCode: 200,
                body: {},
            }
        ).as("deleteAnuncio");

        cy.clickDataCy("boton-eliminar-anuncio-videowall");
        cy.clickDataCy("primer-recordatorio-no-eliminar-anuncio");
        cy.clickDataCy("boton-eliminar-anuncio-videowall");
        cy.clickDataCy("primer-recordatorio-si-eliminar-anuncio");

        cy.containsDataCy(
            "anuncio-eliminado-satisfactoriamente-videowall",
            "Eliminación satisfactoria", 15000
        );
        cy.clickDataCy("segundo-recordatorio-aceptar-eliminar-anuncio");
    });

    // Presionar botón para visualizar video wall
    it("Visualizar video wall", () => {
        cy.clickDataCy("boton-visualizar-videowall");
        cy.url().should("include", "/videowall"); // Reemplaza "/videoWall" con la parte de la URL a la que esperas ser redirigido
    });

    // Subir archivo inválido
    it("Subir archivo inválido", () => {
        cy.clickDataCy("checkbox-solo-imagen-anuncio-personalizado");
        cy.attachFileDataCy(
            "subir-imagen-anuncio-personalizado",
            "../assets/archivoPrueba.pdf", 15000
        );

        cy.containsDataCy(
            "titulo-subir-foto-box-videowall",
            "Archivo inválido"
        );
        cy.clickDataCy("boton-agregar-anuncio");
        cy.containsDataCy(
            "mensaje-advertencia-anuncio-evento",
            "Por favor adjunte un archivo de imagen válido."
        );
    });

    // Ocultar anuncio
    it("Ocultar anuncio", () => {
        // intercept put
        cy.intercept(
            "PUT",
            "https://updateanuncio2-j5zt2ysdwq-uc.a.run.app?id=9wrYH3oxJAda6ucXuan",
            {
                statusCode: 200,
                body: {
                    encendido: false,
                    posicion: 0,
                },
            }
        ).as("putAnuncio");

        cy.clickDataCy("boton-ocultar-anuncio-videowall");

        cy.get('[data-cy="boton-ocultar-anuncio-videowall"]').should(
            "have.attr",
            "src",
            "/src/assets/CrearAnuncioVideowall/closedEye.png"
        );
    });

    // Reordenar anuncio
    it("Reordenar anuncio", () => {
        // Intercepta la solicitud GET para obtener la lista de anuncios y devuelve datos hardcodeados
        cy.intercept("GET", "https://readanuncios-j5zt2ysdwq-uc.a.run.app/", {
            statusCode: 200,
            body: [
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "12 de junio, 2024",
                    horaFin: "17:00",
                    horaInicio: "15:30",
                    nombreEvento: "Taller: Un vistazo al pasado",
                    nombreSala: "Graveyard",
                    personalizado: false,
                    posicion: 0,
                    soloImagen: false,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/ElectricGarage.jpg?alt=media&token=d0e7fe74-4103-4b6b-97b6-18e37172978d",
                    firebaseId: "9wrYH3oxJAda6ucXuan",
                },
                {
                    descripcion: "",
                    encendido: true,
                    fecha: "",
                    horaFin: "",
                    horaInicio: "",
                    nombreEvento: "",
                    nombreSala: "",
                    personalizado: false,
                    posicion: 1,
                    soloImagen: true,
                    urlImagen:
                        "https://firebasestorage.googleapis.com/v0/b/dream-lab-videowall.appspot.com/o/TallerDeImpresion3D.jpeg?alt=media&token=902c0779-3519-4ad6-81c7-29cfe26c0379",
                    firebaseId: "9wrYH3oxJefgda6ucXuan",
                },
            ],
        }).as("getMuchosAnuncios");

        cy.wait("@getMuchosAnuncios").then(() => {
            cy.get('[data-cy="tarjeta-anuncio-videowall"]')
                .first()
                .as("tarjeta"); // Alias para la primera tarjeta

            let initialIndex;

            // Obtener el índice inicial de la tarjeta
            cy.get("@tarjeta").then(($tarjeta) => {
                initialIndex = $tarjeta.index();
            });

            cy.get("@tarjeta").trigger("mousedown", { which: 1 }); // Emular clic izquierdo para activar el arrastre
            cy.get("@tarjeta").trigger("mousemove", {
                clientX: 0,
                clientY: 10200,
            }); // Mover el mouse hacia abajo
            cy.get("@tarjeta").trigger("mouseup", { force: true }); // Soltar la tarjeta (puedes necesitar { force: true })

            // Obtener el índice después de la acción de arrastre y suelta
            cy.get("@tarjeta").then(($tarjeta) => {
                const finalIndex = $tarjeta.index() + 1;

                // Verificar que el índice haya cambiado
                expect(finalIndex).to.not.equal(initialIndex);
            });
        });
    });
});