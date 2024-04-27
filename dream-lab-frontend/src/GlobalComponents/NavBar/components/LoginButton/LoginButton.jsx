import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

const SearchBar = () => {
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/login/`);
    }
    return (
        <div className="searchContainer">
            <button onClick={handleClick}>Login</button>
        </div>
    );
};

export default SearchBar;
