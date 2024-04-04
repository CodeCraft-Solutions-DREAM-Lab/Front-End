function SendButton() {
    const onClick = () => {
        // Acción al hacer clic en el botón de la imagen
    }

    return (
        <button className="send-button" onClick={onClick}>
            <img src="/simboloEnviar.png" alt="Enviar" />
        </button>
    );
}

export default SendButton;
