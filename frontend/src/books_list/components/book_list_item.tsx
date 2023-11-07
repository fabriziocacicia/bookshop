import { useState } from "react";
import ConfirmBookDeletionModal from "./confirm_book_deletion_modal";
import DeleteButton from "./delete_button";
import EditButton from "./edit_button";

export default function BookListItem({id, title, author, year, price, onClickEdit, onClickDelete }: {id: string, title: string, author: string, year: number, price: number, onClickEdit: () => any, onClickDelete: () => any}) {
    const [confirmBookDeletionModalShowState, setConfirmBookDeletionModalShowState] = useState<boolean>(false);
    
    const handleCloseConfirmBookDeletionModal = () => setConfirmBookDeletionModalShowState(false);
    const handleShowConfirmBookDeletionModal = () => {
        setConfirmBookDeletionModalShowState(true);
    };

    return (
        <>
            <ConfirmBookDeletionModal bookTitle={title} show={confirmBookDeletionModalShowState} onHide={handleCloseConfirmBookDeletionModal} onClickCancel={handleCloseConfirmBookDeletionModal} onClickDelete={()=> onClickDelete()}/>
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>{author}</td>
                <td>{year}</td>
                <td>{price}€</td>
                <td>
                    <EditButton onClick={() => onClickEdit()} />
                </td>
                <td>
                    <DeleteButton onClick={() => handleShowConfirmBookDeletionModal()} />
                </td>
            </tr> 
        </>
    );
}