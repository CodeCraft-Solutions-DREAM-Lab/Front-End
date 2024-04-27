import "./Title.css";

function Title({ scroll }) {
    return (
        <div className="title-container">
            <h1 className="heading">DREAM LAB</h1>
            <img className="landing-logo" src="src/images/LogoDreamLab.png"/>
            <h2 className="sub-heading">Construye tus sueños con nosotros.</h2>
            <div className="button-container">
                <button className="button-more" onClick={scroll}>Conoce más</button>
                <img src="src/pages/LandingPage/assets/images/Vector.png"/>
            </div>
        </div>
    )
}

export default Title;