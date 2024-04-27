import "./SearchBar.css";

import magnifyingGlass from "src/assets/NavBar/magnifyingGlassIcon.svg";
import { Input } from "@nextui-org/react";

const SearchBar = () => {
    return (
        <div className="searchContainer">
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
            ></Input>
            {/* <input type="text" className="searchBar" placeholder="" /> */}
        </div>
    );
};

export default SearchBar;
