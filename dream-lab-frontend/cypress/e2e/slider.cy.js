import "../support/commands";

describe("Despliegue adecuado del componente 'Slider'.", () => {
    beforeEach(() => {
        // Iniciar sesión
        cy.loginWith("test");

        cy.intercept("GET", "mesas/2", {
            body: {
                maxCupos: 8,
            },
        }).as("getMaxCupos");

        cy.intercept("GET", "salas/**", {
            body: [
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
                },
            ],
        }).as("getSala");

        cy.intercept("POST", "salas/horasLibres", {
            body: [
                {
                    hora: 4,
                    cupos: 10,
                    competidores: 1,
                },
            ],
        }).as("getHorasLibres");
    });

    it("Funcionamiento adecuado del slider", () => {
        cy.visit("/reservacion/sala", {
            onBeforeLoad(win) {
                win.sessionStorage.setItem("reservType", "sala");
                win.sessionStorage.setItem("idSala", 2);
            },
        });

        cy.wait(["@getMaxCupos", "@getSala", "@getHorasLibres"]);

        // Verificar que el slider de personas está presente
        cy.checkExist("slider-container-personas");

        // Checar el valor máximo del slider
        cy.get('[data-cy="slider-container-personas"] input[type="range"]')
            .invoke("attr", "max")
            .should("equal", "8");

        // Mover el slider a la derecha
        cy.get('[data-cy="slider-container-personas"] input[type="range"]', {
            timeout: 10000,
        })
            .type("val", "5")
            .trigger("input");

        // Checar si el output del slider es igual a "4 personas"
        cy.containsDataCy("slider-output-texto", " 5 personas ");
    });
});
