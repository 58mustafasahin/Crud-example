import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const MyModal = ({ open, setOpen, title, buttontext, children,func1 }) => {

    return (
        <div>
            <Modal isOpen={open} toggle={function noRefCheck() { }}>
                <ModalHeader toggle={() => setOpen(!open)}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary" onClick={() => func1()}>
                        {buttontext}
                    </Button>
                    <Button onClick={() => setOpen(!open)}>Cancel</Button>
                </ModalFooter> */}
            </Modal>
        </div>
    );
};

export default MyModal;
