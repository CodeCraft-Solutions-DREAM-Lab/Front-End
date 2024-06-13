import { useEffect, useState } from "react";
import {
    CheckboxGroup,
    Checkbox,
    Progress,
    Skeleton
} from "@nextui-org/react";
import propTypes from "prop-types";
import "./ReservItemModal.css";
import "./SolicitedMatsListModal.css";
import { post, get } from "src/utils/ApiRequests";

const SolicitedMatsListModal = ({
    reservItems,
    selectedItems,
    setSelectedItems,
    isLoading,
    items,
    setItems,
    filteredItems,
    setFilteredItems
}) => {

    const [clickedItem, setClickedItem] = useState(null);

    useEffect(() => {

        const makeCalls = async () => {
            if (!clickedItem) return;

            const isItemSelected = selectedItems.includes(clickedItem.name);

            await post("reservaciones-materiales/changeEstatus",
                {
                    idReservacion: clickedItem.idReservacion,
                    idMaterial: clickedItem.idMaterial,
                    idEstatus: isItemSelected ? 1 : 7
                });

            const newItem = await get("reservaciones/cronogramaSingle/" + clickedItem.idReservacion);

            const newItemsArray = [...items];
            const replaceIndx1 = newItemsArray.findIndex((it) => it.id == newItem.id);
            newItemsArray[replaceIndx1].estatusMateriales = newItem.estatusMateriales;
            setItems(newItemsArray);

            const newFilteredItemsArray = [...filteredItems];
            const replaceIndx2 = newFilteredItemsArray.findIndex((it) => it.id == newItem.id);
            newFilteredItemsArray[replaceIndx2].estatusMateriales = newItem.estatusMateriales;
            setFilteredItems(newFilteredItemsArray);

            setClickedItem(null);
        };

        makeCalls();

    }, [selectedItems]);

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

    if (reservItems.length === 0) {
        return (
            <span className="ReservItemModal-no-materials">
                No se han solicitado materiales
            </span>
        )
    }

    const handleCheckboxClick = async (item) => {
        setClickedItem(item);
    };

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
                            onClick={() => {
                                handleCheckboxClick(item);
                            }}
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
    items: propTypes.array,
    setItems: propTypes.func,
    filteredItems: propTypes.array,
    setFilteredItems: propTypes.func,
}

export default SolicitedMatsListModal