import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BookEditedModal ({show, onClickOK}: {show: boolean, onClickOK: () => any}) {
    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Book Edited</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>You succesfully edited the book</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={onClickOK}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}