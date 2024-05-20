import "./Title.css";
import Logo from "src/assets/Logos/LogoDreamLab.webp";
import DownArrow from "src/assets/LandingPage/Vector.webp";

function Title({ scroll }) {
    return (
        <div className="title-container">
            <h1 className="heading">DREAM LAB</h1>
            <img className="landing-logo" src={Logo} />
            <h2 className="sub-heading">Construye tus sueños con nosotros.</h2>
            <div className="button-container-landing-page">
                <button
                    data-cy="learn-more"
                    className="button-more"
                    onClick={scroll}
                >
                    Conoce más
                </button>
                <img
                    className="landing-down-arrow"
                    src={DownArrow}
                    onClick={scroll}
                />
            </div>
        </div>
    );
}

export default Title;
