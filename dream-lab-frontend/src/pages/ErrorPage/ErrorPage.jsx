import { useRouteError } from "react-router-dom";
import ErrorImage from "src/assets/ErrorPage/errorPage3.gif"
import "./ErrorPage.css"

function ErrorPage() {
    let error = useRouteError();
    console.error(error);

     return (
        <div className="div-exterior-fatal-error">

            <div className="background-image-container-fatal">
            </div>

            <div className="textos-fatal-error-div">
                <h1 className="título-fatal-error">Página caída</h1>
                <h2 className="subtitulo-fatal-error">
                    Lo sentimos, el sitio web del D.R.E.A.M. Lab no se encuentra disponible por el momento, intenta más tarde.{" "}
                </h2>
                <div className="linea-fatal-error"></div>

                <div className="seccion-final-fatal-error-div">
                    <h3 className="subtitulo-2-fatal-error">
                        Por favor, verifica la URL ingresada y/o intenta cambiar de navegador. <br></br>Si el
                        problema persiste, acude al D.R.E.A.M. Lab por ayuda.
                    </h3>
                </div>
                
            </div>
            <div className="fatal-error-image">
                <img src={ErrorImage} alt="Página no encontrada" />
            </div>
            
        </div>
    );
}

export default ErrorPage;
