import "./Title.css";

function Title({ scroll }) {
  return (
    <div className="title-container">
      <h1 className="heading">DREAM LAB</h1>
      <img className="landing-logo" src="src/assets/Logos/LogoDreamLab.png" />
      <h2 className="sub-heading">Construye tus sueños con nosotros.</h2>
      <div className="button-container-landing-page">
        <button className="button-more" onClick={scroll}>
          Conoce más
        </button>
        <img className="landing-down-arrow" src="src/assets/LandingPage/Vector.png" onClick={scroll}/>
      </div>
    </div>
  );
}

export default Title;
