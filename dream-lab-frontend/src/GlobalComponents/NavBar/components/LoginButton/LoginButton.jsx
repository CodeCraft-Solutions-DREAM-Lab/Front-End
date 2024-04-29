import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

const SearchBar = () => {
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/login/`);
    }
    return (
        <div className="landing-login-button-container">
            <button className="landing-login-button" onClick={handleClick}>INICIAR SESIÓN</button>
        </div>
    );
};

export default SearchBar;
