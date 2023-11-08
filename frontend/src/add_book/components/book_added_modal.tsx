import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BookAddedModal ({bookTitle, show, onClickOK}: {bookTitle: string, show: boolean, onClickOK: () => any}) {
    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Book Added</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>You added the book {bookTitle}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={onClickOK}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}