import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

const SearchBar = () => {
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/login/`);
    }
    return (
        <div className="landing-login-button-container">
            <button className="landing-login-button" onClick={handleClick}>LOGIN</button>
        </div>
    );
};

export default SearchBar;
