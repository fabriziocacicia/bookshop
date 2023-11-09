import { SyntheticEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function AISearchModal({show, onHide, onSubmit}: {show: boolean, onHide: () => void, onSubmit: (searchQuery: string) => void}) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searching, setSearching] = useState<boolean>(false);

    function handleSearchQueryChange(event: any): void {
        setSearchQuery(event.target.value);
    }

    function handleOnSubmit(event: SyntheticEvent) {
        event.preventDefault();

        setSearching(true);

        onSubmit(searchQuery);
    }

    function resetModal() {
        setSearchQuery("");
        setSearching(false);
    }
    
    return (
        <Modal show={show} onHide={onHide} onExited={resetModal}>
            <Modal.Header closeButton>
            <Modal.Title>AI Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event: SyntheticEvent) => handleOnSubmit(event)}>
                    <Form.Group className="mb-3" controlId="searchform.query">
                        <Form.Label>Ask me what books you want to see</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={searching}>
                        {searching? "Searching..." : "Search"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}