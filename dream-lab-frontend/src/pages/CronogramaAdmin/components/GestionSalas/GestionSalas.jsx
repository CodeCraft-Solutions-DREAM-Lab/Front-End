import React, { useState, useEffect} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { Grid } from "@mui/material";
import "./GestionSalas.css";
import SalaCard from "./components/SalaCard";
import GuardarConfiguracion from "./components/GuardarConfiguracion";

import propTypes from "prop-types";

function GestionSalas(props) {
    // const [salas, setSalas] = useState([]);
    const [isModalGuardarOpen, setIsModalGuardarOpen] = useState(false);

    // useEffect(() => {
    //     setSalas(
    //         props.salas.map((sala) => ({
    //             ...sala,
    //             clicked: false,
    //         }))
    //     );
    // }, [props.salas]);

    const updateSalaState = (id, clicked) => {
        props.setSalas((prevSalas) => {
            const newSalas = [...prevSalas];
            newSalas[id] = { ...newSalas[id], clicked };
            return newSalas;
        });
    };

    const handleSave = () => {
        setIsModalGuardarOpen(true);
    };
    
    return (
        <>
        <GuardarConfiguracion
                salas={props.salas}
                setSalas={props.setSalas}
				isOpen={isModalGuardarOpen}
                closeAll={() => {
                    setIsModalGuardarOpen(false);
                    props.onClose();
                }}
				onClose={() => {
					setIsModalGuardarOpen(false);
				}}
                // updateSalasAfterSave={updateSalasAfterSave}
			/>
        <Modal
            size='5xl'
            isOpen={props.isOpen}
            onClose={props.onClose}
            hideCloseButton={true}
            backdrop="opaque"
        >
            <ModalContent className="p-3">
                {() => (
                    <>
                        <ModalHeader className="text-[#14247b] px-4 pt-4 pb-2 mb-4 justify-center text-3xl">
                            Administrar disponibilidad de salas
                        </ModalHeader>
                        <ModalBody>
                            <Grid container spacing={5} justifyContent={"center"} >
                                {props.salas.map((sala, index) => {

                                return(
                                    <React.Fragment key={index}>
                                    <Grid item>
                                        <SalaCard 
                                            text= {sala.nombre} 
                                            bloqueada={sala.bloqueada}
                                            id={index}
                                            updateSalaState={updateSalaState}
                                        />
                                    </Grid>
                                    </React.Fragment>
                                )
                                
                            })}
                            </Grid>
                        </ModalBody>
                        <ModalFooter className="justify-center mt-4">
                            <Button className="flex flex-wrap justify-center items-center min-w-40 w-28% h-12 mr-16 bg-white cursor-pointer border-4 border-[#ac3e1b] rounded-full font-karla font-bold text-lg text-[#ac3e1b] uppercase hover:bg-[#ac3e1b] hover:border-[#ac3e1b] hover:text-white" 
                            onClick={props.onClose}> CANCELAR </Button>
                            <Button className="flex flex-wrap justify-center items-center min-w-40 w-28% h-12 bg-white cursor-pointer border-4 border-[#1bac55] rounded-full font-karla font-bold text-lg text-[#1bac55] uppercase hover:bg-[#1bac55] hover:border-[#1bac55]  hover:text-white"
                            onClick={handleSave}> GUARDAR </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    );
}

GestionSalas.propTypes = {
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    salas: propTypes.array,
    setSalas: propTypes.func,
};

export default GestionSalas;