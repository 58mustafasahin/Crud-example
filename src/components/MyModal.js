import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const MyModal = ({ open, setOpen, title, children }) => {

    return (
        <div>
            <Modal isOpen={open} toggle={()=>setOpen(!open)}>
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
