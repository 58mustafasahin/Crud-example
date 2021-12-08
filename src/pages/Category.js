import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import MyModal from '../components/MyModal'
import MyTable from '../components/MyTable'

const Category = () => {
    const [veri, setVeri] = useState([])
    const [change, setChange] = useState(false)
    const [open, setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)

    const [selectedData, setSelectedData] = useState([])
    const getSelectedData = (selectedData) => {
        console.log('selectedData', selectedData)
        setSelectedData(selectedData)
        setUpdateOpen(true)
        setChange(!change)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        // defaultValues: {
        //     categoryName: selectedData?.categoryName,
        //     description: selectedData?.description
        // }
    });

    const onSubmit = (data) => {
        console.log("data", data)
        AddData(data)
        setOpen(!open)
    }

    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate } } = useForm();

    const onSubmitUpdate = (data) => {
        console.log("dataUpdate", data)
        UpdateData(data)
        setUpdateOpen(!updateOpen)
    }

    useEffect(() => {
        fetch('http://localhost:56156/api/Category/GetListCategory')
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(data => setVeri(data.message))
            .catch(err => alert(err))
    }, [change])
    console.log("ads", veri)

    const AddData = (data) => {
        fetch('http://localhost:56156/api/Category/AddCategory', {
            method: 'POST',
            body: JSON.stringify({
                categoryName: data.categoryName,
                description: data.description
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .finally(() => setChange(!change));
    }

    const UpdateData = (data) => {
        fetch(`http://localhost:56156/api/Category/UpdateCategory`, {
            method: 'PUT',
            body: JSON.stringify({
                categoryId: data.categoryId,
                categoryName: data.categoryName,
                description: data.description,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .finally(() => setChange(!change));
    }

    const DeleteData = (selectedId) => {
        fetch(`http://localhost:56156/api/Category/DeleteCategory/${selectedId}`, {
            method: 'DELETE',
        })
            .then(() => setChange(!change));;
    }

    return (
        <Container>
            <h1>Category</h1> {" "}
            <Button color={"primary"} onClick={() => setOpen(true)}>Ekle</Button>
            <MyTable data={veri} change={change} setChange={setChange}
                func1={getSelectedData}
                func2={DeleteData}
            />
            <MyModal
                open={open}
                setOpen={setOpen}
                title='Ekle'
                func1={AddData}
                buttontext='Ekle'
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label for="categoryName">Category Name</Label>
                        <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            innerRef={register({ required: "Category Boş Olamaz" })}
                            placeholder="CategoryName"
                        />
                        <div>
                            {
                                errors.categoryName?.message
                            }
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            id="description"
                            name="description"
                            innerRef={register({ required: "Description Boş Olamaz" })}
                            placeholder="Description"
                        />
                        <div>
                            {
                                errors.description?.message
                            }
                        </div>
                    </FormGroup>
                    <Row>
                        <Col >
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <Button className="w-25 btn-sm" type="submit" color='success' >
                                    Kaydet
                                </Button>
                                {/* <Button className="w-25 btn-sm" type="button" color="danger" onClick={() => {setOpen(!open); console.log("sss")}}>
                                    İptal
                                </Button> */}
                            </div>
                        </Col>
                    </Row>
                </Form>
            </MyModal>
            <MyModal
                open={updateOpen}
                setOpen={setUpdateOpen}
                title='Güncelle'
                func1={UpdateData}
                buttontext='Güncelle'
            >
                <Form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
                    <Input type="text"
                        id="categoryId"
                        name="categoryId"
                        hidden
                        defaultValue={selectedData.categoryId}
                        innerRef={registerUpdate()}
                    />
                    <FormGroup>
                        <Label for="categoryName">Category Name</Label>
                        <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            defaultValue={selectedData.categoryName}
                            innerRef={registerUpdate({ required: "Category Boş Olamaz" })}
                            placeholder="CategoryName"
                        />
                        <div>
                            {
                                errorsUpdate.categoryName?.message
                            }
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            id="description"
                            name="description"
                            defaultValue={selectedData.description}
                            innerRef={registerUpdate({ required: "Description Boş Olamaz" })}
                            placeholder="Description"
                        />
                        <div>
                            {
                                errorsUpdate.description?.message
                            }
                        </div>
                    </FormGroup>
                    <Row>
                        <Col >
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <Button className="w-25 btn-sm" type="submit" color='success' >
                                    Güncelle
                                </Button>
                                {/* <Button className="w-25 btn-sm" type="button" color="danger" onClick={() => {setOpen(!open); console.log("sss")}}>
                                    İptal
                                </Button> */}
                            </div>
                        </Col>
                    </Row>
                </Form>
            </MyModal>
        </Container>
    )
}

export default Category
