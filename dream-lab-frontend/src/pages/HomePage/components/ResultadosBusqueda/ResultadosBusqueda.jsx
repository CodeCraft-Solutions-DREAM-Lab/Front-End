import React from "react";
import {Spacer} from "@nextui-org/react";
import "./ResultadosBusqueda.css";
import ResultadosCard from "./components/ResultadosCard";
import { useState } from "react";

const IMAGES = [
    {
        id: "8",
        url: "/HomePage/ImagenCursoSwift.webp",
        title: "Curso de Swift",
    },
    {
        id: "9",
        url: "/HomePage/ImagenConnections.webp",
        title: "Deep Net",
    },
    {
        id: "10",
        url: "/HomePage/ImagenCursoSwift.webp",
        title: "Curso de Swift",
    },
    {
        id: "11",
        url: "/HomePage/ImagenConnections.webp",
        title: "Deep Net",
    },
];

function ResultadosBusqueda({ results }) {
  return (
    <div className="centeredContainer">
      <div className="search-results-container">
      {results.map((result, index) => (
        <React.Fragment key={index}>
          <ResultadosCard
             title={result.nombre}
             image={result.fotoURL || result.portadaURL}
          />
          <Spacer x={6} />
        </React.Fragment>
      ))}  
      </div>
    </div>
    
  );
}

export default ResultadosBusqueda;
