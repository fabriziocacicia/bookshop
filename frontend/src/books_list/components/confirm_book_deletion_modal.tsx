import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmBookDeletionModal({bookTitle, show, onHide, onClickCancel, onClickDelete}: {bookTitle: string, show: boolean, onHide: () => any, onClickCancel: () => any, onClickDelete: () => any}) {
    const [deleting, setDeleting] = useState<boolean>(false);

    const handleClickDelete = () => {
        setDeleting(true);
        onClickDelete()
    }

    return (
        <Modal show={show} onHide={() => onHide()}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the book {bookTitle}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClickCancel()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleClickDelete()}>
                    {deleting? "Deleting..." : "Delete"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}