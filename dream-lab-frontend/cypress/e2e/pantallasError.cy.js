
describe('Pruebas de las pantallas de error', () => {
  beforeEach(() => {
    cy.loginWith("test");
  });

  it('Despliegue de pantalla: Página caída', () => {

    // Acceso a la pantalla de error
    //cy.visit('/error');

    // Generacion de error en la pantalla
    cy.visit('/profile');

    // Verificación de elementos en la pantalla
    cy.getDataCy("titulo-pantalla-caida").should("exist");
    cy.getDataCy("subtitulo-pantalla-caida").should("exist");
    cy.getDataCy("subtitulo-2-pantalla-caida").should("exist");

    // Verificación de contenido en la pantalla
    cy.containsDataCy(
        'titulo-pantalla-caida',
        'Página caída'
    );

    cy.containsDataCy(
        'subtitulo-pantalla-caida',
        'Lo sentimos, el sitio web del D.R.E.A.M. Lab no se encuentra disponible por el momento, intenta más tarde.'
    );

    cy.containsDataCy(
        'subtitulo-2-pantalla-caida',
        'Por favor, verifica la URL ingresada y/o intenta cambiar de navegador. Si el problema persiste, acude al D.R.E.A.M. Lab por ayuda.'
    );
  });

  it('Despliegue de pantalla: Página no encontrada', () => {

    // Acceso a la pantalla de "no encontrado"
    cy.visit('/tutorialesComida');

    // Verificación de elementos en la pantalla
    cy.getDataCy("titulo-pagina-no-encontrada").should("exist");
    cy.getDataCy("subtitulo-pagina-no-encontrada").should("exist");
    cy.getDataCy("subtitulo-2-pagina-no-encontrada").should("exist");

    // Verificación de contenido en la pantalla
    cy.containsDataCy(
        'titulo-pagina-no-encontrada',
        '404 - Página no encontrada'
    );

    cy.containsDataCy(
        'subtitulo-pagina-no-encontrada',
        'Lo sentimos, la página que estás buscando no existe o no se encuentra disponible en este momento.'
    );

    cy.containsDataCy(
        'subtitulo-2-pagina-no-encontrada',
        'Por favor, verifica la URL e intenta nuevamente. Si el problema persiste, acude al D.R.E.A.M. Lab por ayuda.'
    );
    
  });
});
