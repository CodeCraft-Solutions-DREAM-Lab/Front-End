import { useContext } from "react";
import { AuthContext } from "./useAuth";

export const useAuth = () => {
    return useContext(AuthContext);
};
