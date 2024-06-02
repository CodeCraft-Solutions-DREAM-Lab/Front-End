import { Skeleton } from "@nextui-org/react";
import { 
    Snippet 
} from "@nextui-org/snippet";
import propTypes from "prop-types";
import "./StudentNameMatModal.css";
// import copyIcon from "src/assets/Icons/copy-icon.svg";


const StudentNameMatModal = ({ studentName, studentMat, isLoading }) => {

    if (isLoading) {
        return (
            <>
                <Skeleton className="SNMM-Name-Skeleton" />
                <Skeleton className="SNMM-Mat-Skeleton" />
            </>
        )
    }

    return (
        <div className="ReservItemModal-student-name-mat">
            <span className="ReservItemModal-student-name">{studentName}</span>
            <br />
            <Snippet className="py-1 px-3 mt-1" symbol="">{studentMat}</Snippet>
            {/* <div
                className="ReservItemModal-student-mat"
                onClick={() => navigator.clipboard.writeText(studentMat, isLoading).then(() => alert("Matrícula copiada"))}
            >
                <span className="ReservItemModal-student-mat-text">{studentMat}</span>
                <img src={copyIcon} alt="copy-icon" className="ReservItemModal-copy-icon-img" />
            </div> */}

        </div>
    )
}

StudentNameMatModal.propTypes = {
    studentName: propTypes.string,
    studentMat: propTypes.string,
    isLoading: propTypes.bool
}

export default StudentNameMatModal