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
    const [basicModal, setBasicModal] = useState(true);

    function toggleOpen() {
        setBasicModal(basicModal);
    }

    function toggleClose() {
        setBasicModal(!basicModal);
    }

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
                            <p className="mt-2" style={{textAlign: "justify"}}>
                                As of January 2024, the Replit platform has changed its hosting policies. For this reason, NotesApp is currently hosted on the Heroku platform.
                            </p>
                            <p style={{textAlign: "justify"}}>
                                In order to log in to the application, you need a username and password. In both cases, enter the word "user". After logging in, wait a while for the server to load.
                            </p>
                            <p style={{marginBottom: 10, textAlign: "justify"}}>
                                If you entered your login details incorrectly, you will be able to reset your password. After clicking on the phrase "Forgot password?" and entering the email, the user saved in the database will receive an email with the option to reset the application password.
                            </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn className='button-modal' color='none' onClick={toggleClose}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}