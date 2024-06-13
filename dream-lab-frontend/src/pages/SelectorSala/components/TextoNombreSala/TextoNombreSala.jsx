import { useEffect, useState } from "react";
import { getFromSessionStorage, saveToSessionStorage } from "src/utils/Storage";
import { get } from "src/utils/ApiRequests";

const TextoNombreSala = () => {
    let id;
    let type = getFromSessionStorage("reservType");
    const [nombreSala, setNombreSala] = useState("");
    const [nombreExperiencia, setNombreExperiencia] = useState("");

    const bigTextFormat =
        "text-white text-4xl font-medium uppercase font-['Karla'] text-center p-2";
    const smallTextFormat = "text-2xl text-[#D1D1D1]";

    if (type == "sala") {
        id = getFromSessionStorage("idSala");
    } else {
        id = getFromSessionStorage("idExperiencia");
    }

    useEffect(() => {
        if (type === "sala") {
            get(`salas/${id}`)
                .then((result) => {
                    setNombreSala(result[0].nombre);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        } else {
            get(`experiencias/${id}`)
                .then((result) => {
                    setNombreExperiencia(result[0].nombre);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });

            get(`salas/nameFromExperienceId/${id}`)
                .then((result) => {
                    setNombreSala(result.nombre);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        }
    }, []);

    useEffect(() => {
        if (type === "sala") {
            saveToSessionStorage("nameSalaExperiencia", nombreSala);
        } else {
            saveToSessionStorage("nameSalaExperiencia", nombreExperiencia);
        }
    }, [nombreSala, nombreExperiencia]);

    return (
        <>
            {type === "sala" ? (
                <>
                    <div data-cy="nombre-sala-grande" className={bigTextFormat}>
                        <h1>{nombreSala}</h1>
                    </div>
                </>
            ) : (
                <>
                    <div data-cy="nombre-experiencia" className={bigTextFormat}>
                        <h1>{nombreExperiencia}</h1>
                    </div>

                    <div
                        data-cy="nombre-sala-chico"
                        className={smallTextFormat}
                    >
                        <h1>{nombreSala}</h1>
                    </div>
                </>
            )}
        </>
    );
};

export default TextoNombreSala;
