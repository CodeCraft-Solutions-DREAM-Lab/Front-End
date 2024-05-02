import React from "react";
import "./Checkbox.css";

function Checkbox(props) {

    return (
        <label>
            <div className="checkbox-div-exterior">
                <input 
                    className="checkbox-input"
                    type="checkbox"
                    checked={props.isChecked}
                    onChange={props.handleCheckboxChange}
                />

                <div className="titulo-checkbox">{props.label}</div>
            </div>
        </label>
    );
}

export default Checkbox;