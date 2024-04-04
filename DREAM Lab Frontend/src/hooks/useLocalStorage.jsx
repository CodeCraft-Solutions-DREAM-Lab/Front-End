import { useState } from "react";

// useAuth utiliza este hook para almacenar el usuario que ha iniciado sesión
// para que el estado de autenticación persista entre recargas de la página.
export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Intentamos obtener el valor de localStorage
            const value = window.localStorage.getItem(keyName);

            // Si el valor existe, lo parseamos y lo devolvemos
            if (value) {
                return JSON.parse(value);
            } else {
                // Si el valor no existe, almacenamos el valor por defecto en
                // localStorage y lo devolvemos
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue)
                );
                return defaultValue;
            }
        } catch (err) {
            // Si ocurre un error (por ejemplo, si localStorage no está
            // disponible), devolvemos el valor por defecto
            return defaultValue;
        }
    });

    // Permite actualizar el valor en el estado y en localStorage
    const setValue = (newValue) => {
        try {
            // Intentamos actualizar el valor en localStorage
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            console.log(err);
        }

        // Actualizamos el valor en el estado
        setStoredValue(newValue);
    };

    // Devolvemos el valor almacenado y la función para actualizarlo
    return [storedValue, setValue];
};
