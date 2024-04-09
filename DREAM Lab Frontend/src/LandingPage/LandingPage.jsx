// TODO: remover esto ya que es solo un bypass temporal del login
import { Button } from "@nextui-org/react";
import { saveToLocalStorage } from "../Global/Storage";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    saveToLocalStorage(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiQTAxMTc3NzY3IiwiaWF0IjoxNzEyNjMzMjU2fQ.-ky8LBLfLFCRmENvP0QetksCFuN9D5R0OGC9NiN2WD0"
    );
    dispatch(setAuth(true));
    navigate("home");
  };

  return (
    <>
      <h1>Landing Page</h1>
      <Button
        onClick={handleClick}
        className="bg-orange-400 text-white font-bold"
      >
        <p className="text-4xl ">Go to Home</p>
      </Button>
    </>
  );
}

export default LandingPage;
