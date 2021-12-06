import React, { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const MyModal = ({ open, setOpen, method, title, setAddData, change, setChange }) => {
    // const [open, setOpen] = useState(false)
    const [categoryName, setCategoryname] = useState("")
    const [desc, setDesc] = useState("")


    const AddData = () => {
        fetch('http://localhost:56156/api/Category/AddCategory', {
            method: 'POST',
            body: JSON.stringify({
                categoryName: categoryName,
                description: desc,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .then(() => setChange(!change));
    }

    const UpdateData = (selectedId) => {
        fetch('http://localhost:56156/api/Category/UpdateCategory', {
            method: 'PUT',
            body: JSON.stringify({
                categoryId: selectedId,
                categoryName: categoryName,
                description: desc,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .then(() => setChange(!change));
    }

    return (
        <div>
            {/* <Button color="danger" onClick={() => setOpen(true)}>
                Click Me
            </Button> */}
            <Modal isOpen={open} toggle={function noRefCheck() { }}>
                <ModalHeader toggle={() => setOpen(!open)}>{title}</ModalHeader>
                <ModalBody>
                    <Input onChange={(e) => setCategoryname(e.target.value)}></Input>
                    <Input onChange={(e) => setDesc(e.target.value)}></Input>
                </ModalBody>
                <ModalFooter>
                    {method == "Update" ? (
                        <Button color="primary" onClick={() => UpdateData()}>
                            Güncelle
                        </Button>
                    ) : <Button color="primary" onClick={() => setAddData(AddData())}>
                        Ekle
                    </Button>}{" "}
                    {/* <Button onClick={() => setOpen(!open)}>Cancel</Button> */}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default MyModal;
