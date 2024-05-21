import "./SearchBar.css";
import magnifyingGlass from "src/assets/NavBar/magnifyingGlassIcon.svg";
import { Input } from "@nextui-org/react";
import { useState } from "react";

const SearchBar = ({ onSearchInputChange }) => {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (event) => {
        const text = event.target.value;
        setSearchText(text);
        onSearchInputChange(text);
    };

    return (
        <div className="searchContainer-navbar">
            <Input
                type="text"
                classNames={{
                    input: ["bg-transparent text-white text-sm"],
                    inputWrapper: ["bg-transparent border-1  h-10"],
                }}
                radius="full"
                placeholder=""
                startContent={<img src={magnifyingGlass} className="w-6" />}
                fullWidth={true}
                value={searchText}
                onChange={handleInputChange}
            ></Input>
            {/* <input type="text" className="searchBar" placeholder="" /> */}
        </div>
    );
};

export default SearchBar;
