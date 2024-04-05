import { useContext } from "react";
import { UserContext } from "../Global/Context/UserContext";

function LandingPage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Landing Page</h1>
      <p>
        <strong>User: </strong>
        {user}
      </p>
    </>
  );
}

export default LandingPage;
