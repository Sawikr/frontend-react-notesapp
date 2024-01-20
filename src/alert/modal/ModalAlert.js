import React, {useState, useEffect} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function ModalAlert() {
    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);

    useEffect(() => {
        toggleOpen();
    }, []);

    return (
        <>
            <MDBModal
                staticBackdrop
                open={basicModal}
                setOpen={setBasicModal}
                tabIndex='1'
            >
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Note</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            As of January 2024, the Replit platform has changed its hosting policies. The repl.co domains have been moved to replit.dev and will only be available when using the editor. This means that the server does not start automatically after logging in to the application.
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn className='button' color='none' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}