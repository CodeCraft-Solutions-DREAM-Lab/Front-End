/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteSelectedItem,
    selectSelectedItem,
} from "../redux/Slices/selectedItemSlice.js";
import {
    getFromSessionStorage,
    saveToSessionStorage,
} from "../Global/Storage.js";
*/
import "./SeleccionMaterial.css";
import NavBar from "../components/general/NavBar";
import SearchBar from "../components/general/SearchBar";
import RoundedButton from "../Reservaciones/components/RoundedButton";

function SeleccionMaterial() {
	const handleSubmit = async () => {
		console.log("click");
	};
	return (
		<>
			<NavBar view="soloPerfil" autoHide={false} />
			<div className="main-container">
				<div className="top-section">
					{/* Aquí irá el resumen y la search bar */}
					<div className="search-bar-container">
						<SearchBar />
					</div>
				</div>
				<div className="bottom-section">
					{/* Aquí van las tarjetas con los materiales */}
                    <div className="card-container-wrapper">
                    <div className="card-container">
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>

						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
						<div className="card">tarjeta</div>
					</div>
                    </div>
					<div className="button-container">
						<RoundedButton text="ACEPTAR" onClick={handleSubmit} />
					</div>
				</div>
			</div>
		</>
	);
}

export default SeleccionMaterial;
