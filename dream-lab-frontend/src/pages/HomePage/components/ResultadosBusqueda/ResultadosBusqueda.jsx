import React from "react";
import { useState } from "react";
import {Spacer} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setSelectedItem } from "src/redux/Slices/selectedItemSlice";
import "./ResultadosBusqueda.css";
import ResultadosCard from "./components/ResultadosCard";
import { Result } from "postcss";


function ResultadosBusqueda(props) {
  const dispatch = useDispatch();
  const { mostrarDetalles } = props;

  function handleClick(idExperiencia, tipo) {

    console.log("click con id:", idExperiencia, "y tipo:", tipo);

    // Determinar el tipo de imagen (sala o experiencia) según el valor de setImageType
    const isSalaImage = tipo === "salas";
    
    if (isSalaImage) {
        dispatch(
            setSelectedItem({
                id: idExperiencia,
                type: "sala",
            })
        );
  
    } else {
        dispatch(
            setSelectedItem({
                id: idExperiencia,
                type: "experiencia",
            })
        );
    }
  
    mostrarDetalles();
    // dispatch(setExperiencia(idExperiencia));
    // saveToSessionStorage("experiencia", idExperiencia);
    props.onImageClick(idExperiencia - 1); // pasa el ID de la imagen al componente padre
  
    // // Determinar el tipo de imagen (sala o experiencia) según el valor de setImageType
    // const isSalaImage = props.setImageType === "salas";
  
    // Llamar a setIsSalaClicked con el valor correspondiente
    props.setIsSalaClicked(isSalaImage);
  }

  return (
    <div className="centeredContainer">
      <div className="search-results-container">
      {props.results.map((result, index) => {
        const id = result.idExperiencia || result.idSala;
        const tipo = result.idExperiencia ? "experiencias" : "salas";
        return(
          <React.Fragment key={index}>
            <ResultadosCard
              id={id}
              title={result.nombre}
              image={result.fotoURL || result.portadaURL}
              onClick={() => handleClick(id, tipo)}
            />
            <Spacer x={6} />
          </React.Fragment>
        )
        
      })}  
      </div>
    </div>
    
  );
}

export default ResultadosBusqueda;
