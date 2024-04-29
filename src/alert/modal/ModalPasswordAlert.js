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

export default function ModalPasswordAlert({getModalPasswordAlert, getModalPasswordAlertInLogin}) {
    const [basicModal, setBasicModal] = useState(true);

    const toggleOpen = () => {
        setBasicModal(basicModal);
    };

    const toggleClose = () => {
        setBasicModal(!basicModal);
    };

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
                                The password should:
                            </p>
                            <p style={{textAlign: "justify"}}>
                                <i className="fa-solid fa-check fa-1x fa-border" style={{color: "#79589f", marginLeft: 20, marginRight: 5}}/>
                                    <span className="ml-1">Have eight characters or more</span>
                            </p>
                            <p style={{textAlign: "justify"}}>
                                <i className="fa-solid fa-check fa-1x fa-border" style={{color: "#79589f", marginLeft: 20, marginRight: 5}}/>
                                <span className="ml-1">Include a capital letter</span>
                            </p>
                            <p style={{textAlign: "justify"}}>
                                <i className="fa-solid fa-check fa-1x fa-border" style={{color: "#79589f", marginLeft: 20, marginRight: 5}}/>
                                <span className="ml-1">Use at least one lowercase letter</span>
                            </p>
                            <p style={{textAlign: "justify"}}>
                                <i className="fa-solid fa-check fa-1x fa-border" style={{color: "#79589f", marginLeft: 20, marginRight: 5}}/>
                                <span className="ml-1">Consists of at least one digit</span>
                            </p>
                            <p style={{textAlign: "justify"}}>
                                <i className="fa-solid fa-check fa-1x fa-border" style={{color: "#79589f", marginLeft: 20, marginRight: 5}}/>
                                <span className="ml-1">Need to have one special symbol (i.e., @, #, $, %, etc.)</span>
                            </p>
                            <p style={{textAlign: "justify"}}>
                                <i className="fa-solid fa-check fa-1x fa-border" style={{color: "#79589f", marginLeft: 20, marginRight: 5}}/>
                                <span className="ml-1">Doesn’t contain space, tab, etc.</span>
                            </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn className='button-modal' color='none'
                                    onClick={() => getModalPasswordAlert(true) ? () => getModalPasswordAlertInLogin(true) : toggleClose()}
                            >
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}