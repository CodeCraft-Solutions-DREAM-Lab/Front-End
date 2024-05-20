import "./Footer.css";

import tecLogo from "src/assets/LandingPage/tecnologico-de-monterrey-white.webp";

function Footer() {
    return (
        <div className="footer-container">
            <img className="tec-logo" src={tecLogo} />
        </div>
    );
}

export default Footer;
