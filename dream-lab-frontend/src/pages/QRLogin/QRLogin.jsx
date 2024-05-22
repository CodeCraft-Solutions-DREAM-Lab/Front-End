import QRCode from "react-qr-code";

import { useState } from "react";

import { post } from "src/utils/ApiRequests";

function QRLogin() {
    const [idUsuario, setIdUsuario] = useState("");
    const [qr, setQR] = useState("");

    const createQR = (e) => {
        e.preventDefault();
        post("auth/usuario", { usuario: idUsuario, origen: "qr" })
            .then((response) => {
                const jwt = response.jwt;
                if (jwt) {
                    setQR(`https://www.dreamlab.world/login/?jwt=${jwt}`);
                } else {
                    setQR(`https://www.dreamlab.world/login`);
                }
            })
            .catch(() => {
                setQR(`https://www.dreamlab.world/login`);
            });
    };

    return (
        <div>
            <form onSubmit={createQR}>
                <input
                    type="text"
                    placeholder="ID Usuario"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                />
                <button type="submit">Generar QR</button>
            </form>
            <QRCode value={qr} />
        </div>
    );
}

export default QRLogin;
