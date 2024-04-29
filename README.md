# Dream Lab Frontend

Este proyecto utiliza Vite para el desarrollo y el proceso de construcción.

## Configuración

1. Clona el repositorio utilizando Git. Si no tienes Git instalado, puedes descargarlo desde [https://git-scm.com/downloads](https://git-scm.com/downloads).

    Para clonar el repositorio, abre una terminal y ejecuta el siguiente comando:

    ```
    git clone https://github.com/ReynaldoHdz/DREAM-Lab-Frontend.git
    ```

2. Navega al directorio del proyecto:

    Usando la misma terminar con la que se clonó el repositorio, ejecuta el siguiente comando:

    ```
    cd "dream-lab-frontend\Dream Lab Frontend"
    ```

3. Instala las dependencias del proyecto:

    ```
    npm install
    ```

4. Agrega el archivo de variables de entorno:
    - Agregar en la carpeta "Dream Lab Frontend" un archivo llamada `.env`
    - Agregar dentro del archivo la linea (aquí se coloca el url desde donde se sirve el API, en un entorno local, sería `http://localhost:<PUERTO>/`, de lo contrario, incluir aquí el url a su API):
        ```
        VITE_API_URL=http://localhost:3000/
        ```

## Desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```
npm start
```

## Construcción

Para construir la aplicación para producción, ejecuta:

```
npm run build
```

## Lint

Para ejecutar ESLint en el código, ejecuta:

```
npm run lint
```

## Vista previa

Para servir la aplicación construida como si se sirviera en producción, ejecuta:

```
npm run preview
```
