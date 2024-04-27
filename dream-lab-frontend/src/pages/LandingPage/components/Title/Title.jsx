import "./Title.css";

import logoDreamLab from "/src/assets/Logos/LogoDreamLab.png";
import arrowDown from "/src/assets/LandingPage/Vector.png";

function Title({ scroll }) {
    return (
        <div className="title-container">
            <h1 className="heading">DREAM LAB</h1>
            <img className="landing-logo" src={logoDreamLab} />
            <h2 className="sub-heading">Construye tus sueños con nosotros.</h2>
            <div className="button-container">
                <button className="button-more" onClick={scroll}>
                    Conoce más
                </button>
                <img src={arrowDown} />
            </div>
        </div>
    );
}

export default Title;
