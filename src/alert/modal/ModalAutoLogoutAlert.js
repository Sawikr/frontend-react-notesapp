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

export default function ModalAutoLogoutAlert({getAutoLogoutAlert, getRemainingTime, timeout, promptBeforeIdle}) {
    const [basicModal, setBasicModal] = useState(true);
    const [remaining, setRemaining] = useState(timeout);

    const toggleOpen = () => {
        setBasicModal(basicModal);
    };

    const toggleClose = () => {
        setBasicModal(!basicModal);
    };

    useEffect(() => {
        toggleOpen();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)

        return () => {
            clearInterval(interval)
        }
    });

    const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0);
    const seconds = timeTillPrompt > 1 ? 'seconds' : 'second';

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
                            <p className="mt-2" style={{textAlign: "center", fontSize: 20, marginBottom: 10, color: "#79589f"}}>
                                Are you still here?
                            </p>
                            {timeTillPrompt > 10 && timeTillPrompt <= 57 && (
                                <p style={{textAlign: "center"}}>
                                    If not, you will be logged out in a minute!
                                </p>
                            )}
                            {timeTillPrompt > 0 && timeTillPrompt <= 10 && (
                                <p style={{textAlign: "center"}}>
                                    Logging out in {remaining} {seconds}!
                                </p>
                            )}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn className='button-modal' color='none'
                                    onClick={() => getAutoLogoutAlert(true) ? () => getAutoLogoutAlert(true) : toggleClose()}
                            >
                                Yes
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}