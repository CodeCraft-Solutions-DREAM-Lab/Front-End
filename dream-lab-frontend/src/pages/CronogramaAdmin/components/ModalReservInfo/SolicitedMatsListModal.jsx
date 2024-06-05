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
import { post, get } from "../../../../utils/ApiRequests";

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

            console.log("newItem: ", newItem);

            const newItemsArray = [...items];
            const replaceIndx1 = newItemsArray.findIndex((it) => it.id == newItem.id);
            newItemsArray[replaceIndx1].estatusMateriales = newItem.estatusMateriales;
            // newItemsArray[replaceIndx1].key = newItem.id+100;
            console.log("newItemsArray: ", newItemsArray);
            setItems(newItemsArray);

            const newFilteredItemsArray = [...filteredItems];
            const replaceIndx2 = newFilteredItemsArray.findIndex((it) => it.id == newItem.id);
            newFilteredItemsArray[replaceIndx2].estatusMateriales = newItem.estatusMateriales;
            // newItemsArray[replaceIndx2].key = newItem.id+100;
            console.log("newFilteredItemsArray: ", newFilteredItemsArray);
            setFilteredItems(newFilteredItemsArray);

            // const newFilteredItemsArray = filteredItems.map((it) => {
            //     if (it.id == newItem.id) {
            //         return {
            //             ...it,
            //             estatusMateriales: newItem.estatusMateriales
            //         };
            //     }
            //     return it;
            // });
            // setFilteredItems(newFilteredItemsArray);

            setClickedItem(null);
        };

        makeCalls();

        // if (!clickedItem) return;
        // console.log("Selected items: ", selectedItems);
        // console.log("Clicked: ", clickedItem);

        // const isItemSelected = selectedItems.includes(clickedItem.name);
        // console.log("Is item selected: ", isItemSelected);

        // const res = post("reservaciones-materiales/changeEstatus",
        //     {
        //         idReservacion: clickedItem.idReservacion,
        //         idMaterial: clickedItem.idMaterial,
        //         estatus: isItemSelected ? 1 : 7
        //     });

        // console.log(res);

        // const newItem = get("reservaciones/cronogramaSingle/" + clickedItem.idReservacion);
        // console.log(newItem);

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
        console.log(item);
        console.log(selectedItems);
        // console.log("item:");
        // console.log(item);
        // console.log("selectedItems:");
        // console.log(selectedItems);

        // const isItemSelected = selectedItems.includes(item.name);

        // const res = await post("reservaciones-materiales/changeEstatus",
        //     {
        //         idReservacion: item.idReservacion,
        //         idMaterial: item.idMaterial,
        //         estatus: isItemSelected ? 1 : 7
        //     });

        // console.log(res);

        // const newItem = await get("reservaciones/cronogramaSingle/" + item.idReservacion);
        // console.log(newItem);
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