import { useRouteError } from "react-router-dom";

function ErrorPage() {
    let error = useRouteError();
    console.error(error);

    return (
        <div className="h-screen w-screen centered-container">
            <h1 className="text-9xl text-white text-center">MURIÓ :C</h1>
        </div>
    );
}

export default ErrorPage;
