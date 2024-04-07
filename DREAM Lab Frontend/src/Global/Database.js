// Función para hacer una petición POST a una API
// Recibe el url de la API, los datos a enviar, una función de éxito y una de
// error para especificarle qué hacer en cada caso
export async function postData(
  url,
  data,
  successActions = () => {},
  errorActions = () => {}
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    successActions();
    return json;
  } catch (error) {
    errorActions();
  }
}

// Función para hacer una petición GET a una API
// Recibe el url de la API, una función de éxito y una de error para
// especificarle qué hacer en cada caso
export async function getData(
  url,
  successActions = () => {},
  errorActions = () => {}
) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    successActions();
    return json;
  } catch (error) {
    errorActions();
  }
}

// Función para hacer una petición DELETE a una API
// Recibe el url de la API, una función de éxito y una de error para
// especificarle qué hacer en cada caso
export async function deleteData(
  url,
  successActions = () => {},
  errorActions = () => {}
) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    successActions();
    return json;
  } catch (error) {
    errorActions();
  }
}

// Función para hacer una petición PUT a una API
// Recibe el url de la API, los datos a enviar, una función de éxito y una de
// error para especificarle qué hacer en cada caso
export async function putData(
  url,
  data,
  successActions = () => {},
  errorActions = () => {}
) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    successActions();
    return json;
  } catch (error) {
    errorActions();
  }
}
