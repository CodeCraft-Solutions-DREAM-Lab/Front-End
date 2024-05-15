describe("Pruebas de personalización de los logros", () => {
    beforeEach(() => {
        cy.intercept("GET", "perfil/test", {
            body: {
                recordsets: [
                    [
                        {
                            prioridad: 55,
                            nombre: "test",
                            apellidoP: "test",
                            apellidoM: "test",
                            apodo: "Ancient Soul",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.webp",
                        },
                    ],
                    [
                        {
                            idReservacion: 6,
                            idSala: 1,
                            idExperiencia: 2,
                            idMesa: 2,
                            estatus: 4,
                            horaInicio: "1970-01-01T12:00:00.000Z",
                            duracion: 3,
                            fecha: "2024-01-05T00:00:00.000Z",
                            numPersonas: 3,
                            nombre_experiencia: "Cisco Experience",
                            nombre_sala: "Electric Garage",
                        },
                        {
                            idReservacion: 7,
                            idSala: 2,
                            idExperiencia: 3,
                            idMesa: 3,
                            estatus: 4,
                            horaInicio: "1970-01-01T09:00:00.000Z",
                            duracion: 2,
                            fecha: "2024-02-10T00:00:00.000Z",
                            numPersonas: 4,
                            nombre_experiencia: "Game jam event",
                            nombre_sala: "Dimension Forge",
                        },
                        {
                            idReservacion: 8,
                            idSala: 3,
                            idExperiencia: 1,
                            idMesa: 4,
                            estatus: 4,
                            horaInicio: "1970-01-01T15:00:00.000Z",
                            duracion: 1,
                            fecha: "2024-03-15T00:00:00.000Z",
                            numPersonas: 5,
                            nombre_experiencia: "Hackers Event",
                            nombre_sala: "New Horizons",
                        },
                        {
                            idReservacion: 9,
                            idSala: 2,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 4,
                            horaInicio: "1970-01-01T11:00:00.000Z",
                            duracion: 3,
                            fecha: "2024-05-03T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Dimension Forge",
                        },
                        {
                            idReservacion: 10,
                            idSala: 11,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 4,
                            horaInicio: "1970-01-01T12:00:00.000Z",
                            duracion: 2,
                            fecha: "2024-05-14T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Beyond-Digits",
                        },
                        {
                            idReservacion: 11,
                            idSala: 11,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 4,
                            horaInicio: "1970-01-01T11:00:00.000Z",
                            duracion: 2,
                            fecha: "2024-05-14T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Beyond-Digits",
                        },
                        {
                            idReservacion: 12,
                            idSala: 10,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 4,
                            horaInicio: "1970-01-01T12:00:00.000Z",
                            duracion: 3,
                            fecha: "2024-05-19T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Biometrics Flexible Hall",
                        },
                        {
                            idReservacion: 13,
                            idSala: 4,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 4,
                            horaInicio: "1970-01-01T12:00:00.000Z",
                            duracion: 1,
                            fecha: "2024-05-29T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Deep Net",
                        },
                        {
                            idReservacion: 14,
                            idSala: 9,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 4,
                            horaInicio: "1970-01-01T10:00:00.000Z",
                            duracion: 1,
                            fecha: "2024-05-23T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "War Headquarters",
                        },
                        {
                            idReservacion: 15,
                            idSala: 1,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 3,
                            horaInicio: "1970-01-01T13:00:00.000Z",
                            duracion: 3,
                            fecha: "2024-05-16T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Electric Garage",
                        },
                        {
                            idReservacion: 16,
                            idSala: 7,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 3,
                            horaInicio: "1970-01-01T13:00:00.000Z",
                            duracion: 2,
                            fecha: "2024-05-16T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Hack-Battlefield",
                        },
                        {
                            idReservacion: 17,
                            idSala: 1,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 3,
                            horaInicio: "1970-01-01T14:00:00.000Z",
                            duracion: 2,
                            fecha: "2024-05-06T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Electric Garage",
                        },
                        {
                            idReservacion: 18,
                            idSala: 4,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 3,
                            horaInicio: "1970-01-01T10:00:00.000Z",
                            duracion: 2,
                            fecha: "0002-05-03T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Deep Net",
                        },
                        {
                            idReservacion: 19,
                            idSala: 7,
                            idExperiencia: null,
                            idMesa: null,
                            estatus: 3,
                            horaInicio: "1970-01-01T11:00:00.000Z",
                            duracion: 3,
                            fecha: "2024-05-03T00:00:00.000Z",
                            numPersonas: null,
                            nombre_experiencia: null,
                            nombre_sala: "Hack-Battlefield",
                        },
                    ],
                    [
                        {
                            idLogro: 1,
                            nombre: "Big Dreamer",
                            descripcion:
                                "Reserva 50 veces algún espacio del D.R.E.A.M. Lab.",
                            prioridadOtorgada: 1,
                            color: "#AFB7FF",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.webp",
                            valorMax: 50,
                        },
                        {
                            idLogro: 2,
                            nombre: "Independent Learner",
                            descripcion:
                                "Completa 20 experiencias autodirigidas.",
                            prioridadOtorgada: 1,
                            color: "#C0A2FF",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/IndependentLearner.webp",
                            valorMax: 20,
                        },
                        {
                            idLogro: 3,
                            nombre: "Robot Expert",
                            descripcion:
                                "Asiste a 5 eventos dentro del “Electric Garage”.",
                            prioridadOtorgada: 1,
                            color: "#78C2F8",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/RobotExpert.webp",
                            valorMax: 5,
                        },
                        {
                            idLogro: 4,
                            nombre: "Testing Champion",
                            descripcion:
                                "Reserva y asiste 5 veces a la sala “Testing Land”.",
                            prioridadOtorgada: 1,
                            color: "#FF87E5",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/TestingChampion.webp",
                            valorMax: 5,
                        },
                        {
                            idLogro: 5,
                            nombre: "Ancient Soul",
                            descripcion:
                                "Reserva y asiste 3 veces a la sala “Graveyard”.",
                            prioridadOtorgada: 1,
                            color: "#98A6B6",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.webp",
                            valorMax: 3,
                        },
                        {
                            idLogro: 6,
                            nombre: "Visionary",
                            descripcion:
                                "Reserva y asiste 2 veces a la “Sala VR”.",
                            prioridadOtorgada: 1,
                            color: "#FF6073",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/Visionary.webp",
                            valorMax: 2,
                        },
                        {
                            idLogro: 7,
                            nombre: "Priority Achiever",
                            descripcion:
                                "Alcanza un puntaje de prioridad de al menos 500 puntos en una ocasión.",
                            prioridadOtorgada: 1,
                            color: "#F8E478",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/PriorityAchiever.webp",
                            valorMax: 500,
                        },
                        {
                            idLogro: 8,
                            nombre: "Five-Star Player",
                            descripcion:
                                "Forma parte del top 5 de usuarios con mayor prioridad.",
                            prioridadOtorgada: 1,
                            color: "#A0DE83",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/Trustworthy.webp",
                            valorMax: 1,
                        },
                        {
                            idLogro: 9,
                            nombre: "Communicator",
                            descripcion:
                                "Utiliza 1 vez el sistema de recomendaciones por voz.",
                            prioridadOtorgada: 1,
                            color: "#FEA767",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/Communicator.webp",
                            valorMax: 1,
                        },
                        {
                            idLogro: 10,
                            nombre: "Artistic Alchemist",
                            descripcion:
                                "Cambia tu icono de perfil por primera vez.",
                            prioridadOtorgada: 1,
                            color: "#FFCCCC",
                            iconoURL:
                                "https://dreamlabstorage.blob.core.windows.net/logros/ArtisticAlchemist.webp",
                            valorMax: 1,
                        },
                    ],
                    [
                        { idLogro: 1, valorActual: 0, obtenido: false },
                        { idLogro: 2, valorActual: 5, obtenido: false },
                        { idLogro: 3, valorActual: 5, obtenido: true },
                        { idLogro: 4, valorActual: 3, obtenido: false },
                        { idLogro: 5, valorActual: 3, obtenido: true },
                        { idLogro: 6, valorActual: 1, obtenido: false },
                        { idLogro: 7, valorActual: 367, obtenido: false },
                        { idLogro: 8, valorActual: 1, obtenido: true },
                        { idLogro: 9, valorActual: 0, obtenido: false },
                        { idLogro: 10, valorActual: 1, obtenido: true },
                    ],
                ],
                recordset: [
                    {
                        prioridad: 55,
                        nombre: "test",
                        apellidoP: "test",
                        apellidoM: "test",
                        apodo: "Ancient Soul",
                        iconoURL:
                            "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.webp",
                    },
                ],
                output: {},
                rowsAffected: [],
            },
        }).as("getPerfil");

        cy.intercept("GET", "perfil/logros/test", {
            logros: [
                {
                    idLogro: 1,
                    nombre: "Big Dreamer",
                    iconoURL:
                        "https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.webp",
                },
                {
                    idLogro: 3,
                    nombre: "Robot Expert",
                    iconoURL:
                        "https://dreamlabstorage.blob.core.windows.net/logros/RobotExpert.webp",
                },
                {
                    idLogro: 5,
                    nombre: "Ancient Soul",
                    iconoURL:
                        "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.webp",
                },
                {
                    idLogro: 8,
                    nombre: "Five-Star Player",
                    iconoURL:
                        "https://dreamlabstorage.blob.core.windows.net/logros/Trustworthy.webp",
                },
                {
                    idLogro: 10,
                    nombre: "Artistic Alchemist",
                    iconoURL:
                        "https://dreamlabstorage.blob.core.windows.net/logros/ArtisticAlchemist.webp",
                },
            ],
            configuracionLogro: [
                {
                    idLogro: 5,
                    nombre: "Ancient Soul",
                    iconoURL:
                        "https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.webp",
                    colorPreferido: "#FF6073",
                },
            ],
        }).as("getLogros");

        cy.loginWith("test");
        cy.visit("/profile");
    });

    it("Modificar icono y color de logro", () => {
        cy.wait("@getPerfil");
        cy.wait("@getLogros");
    });
});
