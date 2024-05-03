import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

const SearchBar = () => {
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/login/`);
    }
    return (
        <div className="landing-login-button-container">
            <button data-cy="landing-login-button" className="landing-login-button" onClick={handleClick}>INICIAR SESIÓN</button>
        </div>
    );
};

export default SearchBar;
