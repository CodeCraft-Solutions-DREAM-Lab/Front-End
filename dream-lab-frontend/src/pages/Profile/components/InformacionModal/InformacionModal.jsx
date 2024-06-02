import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    RadioGroup,
    Radio,
} from "@nextui-org/react";
import "./InformacionModal.css";
import LogroEjemplo from "src/assets/Profile/logroEjemplo.png";

export default function InformacionModal(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure(false);
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");

    return (
        <div className="flex flex-col gap-2">
            <RadioGroup
                orientation="horizontal"
                value="inside"
                onValueChange={setScrollBehavior}
            ></RadioGroup>
            <Modal
                isOpen={props.isOpen}
                onClose={props.closeModal}
                onOpenChange={onOpenChange}
                scrollBehavior={scrollBehavior}
                backdrop="opaque"
            >
                <ModalContent style={{ width: '1500px', height: '500px' }}>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 titulo-principal-modal-info-puntos-prioridad">
                                Información adicional
                            </ModalHeader>
                            <ModalBody>
                                <h1 className="titulo-modal-informacion-puntos-prioridad">
                                    <b>1. ¿Qué son los puntos de prioridad?</b>
                                </h1>
                                <p className="respuesta-modal-informacion-puntos-prioridad">
                                    Las reservaciones se asignan según la
                                    prioridad de los usuarios, por lo que tener
                                    más puntos de prioridad te da una ventaja
                                    competitiva al buscar reservar un espacio a
                                    un horario específico.
                                </p>

                                <h1 className="titulo-modal-informacion-puntos-prioridad">                                    <b>
                                        2. ¿Cómo puedo obtener puntos de
                                        prioridad?
                                    </b>
                                </h1>
                                <p>Puedes obtener puntos de prioridad <b>desbloqueando logros</b> en el sitio web del D.R.E.A.M. Lab.</p>
                                <p>Estos logros muchas veces involucran el hacer reservaciones, asistir a eventos, así como explorar las funcionalidades de esta página web.</p>
                                <img src={LogroEjemplo} alt="Logro de ejemplo" className="imagen-logro-ejemplo" />

                                <h1 className="titulo-modal-informacion-puntos-prioridad">                                    <b>
                                        3. ¿Cómo puedo perder puntos de
                                        prioridad?
                                    </b>
                                </h1>
                                <p>La prioridad de tus puntos se verá reducida <b>si cancelas tus reservaciones</b> previamente realizadas o si no asistes a las mismas. Además, podrías perder puntos si el administrador del lugar te reporta por <b>daño al equipo prestado, a las instalaciones</b> o por comportamiento inadecuado.</p>

                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
