import { useState, useEffect } from "react";
import {
    CheckboxGroup,
    Checkbox,
    Progress,
    Skeleton
} from "@nextui-org/react";
import propTypes from "prop-types";
import "./ReservItemModal.css";
import "./SolicitedMatsListModal.css";

const SolicitedMatsListModal = ({ reservItems, setReservItems, selectedItems, setSelectedItems, isLoading }) => {

    if (isLoading) {
        return (
            <>
                <Skeleton className="SMLM-bar-skeleton" />
                <Skeleton className="SMLM-list-skeleton first" />
                <Skeleton className="SMLM-list-skeleton" />
                <Skeleton className="SMLM-list-skeleton" />
            </>
        )
    }

    return (
        <>

            <span className="ReservItemModal-material-solicitado-title">
                Material solicitado
            </span>

            <div
                className="SMLM-progress-container"
            >
                <Progress
                    aria-label="ItemsPreparedProgress"
                    size="md"
                    color="success"
                    value={(selectedItems.length / reservItems.length) * 100}
                    className="SMLM-progress-bar"
                />

                <span className="SMLM-progress-numbers">{selectedItems.length}/{reservItems.length}</span>
            </div>


            <CheckboxGroup
                color="success"
                value={selectedItems}
                onValueChange={setSelectedItems}
            >
                {reservItems.map((item, index) => {
                    return (
                        <Checkbox
                            key={index}
                            value={item.name}

                        >
                            <div className="ReservItemModal-item-text">{item.quantity} - {item.name}</div>
                        </Checkbox>
                    );
                })}
            </CheckboxGroup>
        </>
    )
}

SolicitedMatsListModal.propTypes = {
    reservItems: propTypes.array,
    setReservItems: propTypes.func,
    selectedItems: propTypes.array,
    setSelectedItems: propTypes.func,
    isLoading: propTypes.bool,
}

export default SolicitedMatsListModal