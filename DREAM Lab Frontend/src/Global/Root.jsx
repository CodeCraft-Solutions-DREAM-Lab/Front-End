import { Outlet } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./Context/UserContext";

function Root() {
  const { setUser } = useContext(UserContext);

  return (
    <>
      {setUser(localStorage.getItem("user"))}

      {/*Agregar aqui elementos que se necesiten repetir en todas las pantallas (por ejemplo, el navbar)*/}
      <Outlet />
    </>
  );
}

export default Root;
