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

function ResultadosBusqueda() {
  return (
    <div className="search-results-container">
      <ResultadosCard 
        key={1}
        title={"Sala VR"}
        image={"/HomePage/ImagenSalaVR.webp"}/>
      <Spacer x={6} />
      <ResultadosCard 
        key={2}
        title={"Deep Net"}
        image={"/HomePage/ImagenUsoRouters.webp"}/>
      <Spacer x={6} />
      <ResultadosCard 
        key={3}
        title={"Testing Land"}
        image={"/HomePage/ImagenExpGoogle.webp"}/>
      <Spacer x={6} />
      <ResultadosCard 
        key={4}
        title={"Deep Net"}
        image={"/HomePage/ImagenUsoRouters.webp"}/>
      <Spacer x={6} />
      <ResultadosCard 
        key={5}
        title={"Curso de Swift"}
        image={"/HomePage/ImagenCursoSwift.webp"}/>
      <Spacer x={6} />
      <ResultadosCard 
        key={6}
        title={"Deep Net"}
        image={"/HomePage/ImagenUsoRouters.webp"}/>
      <Spacer x={6} />
      <ResultadosCard 
        key={7}
        title={"Curso de Swift"}
        image={"/HomePage/ImagenCursoSwift.webp"}/>
      <Spacer x={6} />
    </div>
  );
}

export default ResultadosBusqueda;
