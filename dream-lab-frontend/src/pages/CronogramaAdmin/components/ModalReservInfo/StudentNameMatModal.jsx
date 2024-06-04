import { useState } from "react";
import { Skeleton } from "@nextui-org/react";
import propTypes from "prop-types";
import "./StudentNameMatModal.css";
import CopyIcon from "../../../../assets/Icons/CopyIcon";
import CheckIcon from "../../../../assets/Icons/CheckIcon";

const StudentNameMatModal = ({ studentName, studentMat, isLoading }) => {

    const [iconSVG, setIconSVG] = useState("CopyIcon");

    const handleClick = () => {
        navigator.clipboard.writeText(studentMat);
        setIconSVG("CopyIconRed");
        setTimeout(() => {
            setIconSVG("CopyIcon");
        }, 2000);
    }

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
            <div
                className="ReservItemModal-student-mat"
                onClick={handleClick}
            >
                <span className="ReservItemModal-student-mat-text">{studentMat}</span>
                {iconSVG === "CopyIcon" ? (
                    <CopyIcon className="ReservItemModal-icon" />
                ) : (
                    <CheckIcon className="ReservItemModal-icon" color="#17c964" />
                )}
            </div>

        </div>
    )
}

StudentNameMatModal.propTypes = {
    studentName: propTypes.string,
    studentMat: propTypes.string,
    isLoading: propTypes.bool
}

export default StudentNameMatModal