import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsPlusSquareFill } from 'react-icons/bs'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import MyModal from '../components/MyModal'
import MyTable from '../components/MyTable'

const Category = () => {
    const [veri, setVeri] = useState([])
    const [change, setChange] = useState(false)
    const [open, setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)

    const [selectedData, setSelectedData] = useState([])
    const GetSelectedData = (data) => {
        console.log('selectedData', data)
        setSelectedData(data)
        setUpdateOpen(true)
    }

    useEffect(() => {
        fetch('http://localhost:56156/api/Category/GetListCategory')
            .then(response => response.json())
            .then(data => setVeri(data.message))
            .catch(err => alert(err))
    }, [change])

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
            .then(() => setOpen(!open))
            .finally(() => setChange(!change));
    }
    const { register, handleSubmit, formState: { errors } } = useForm({});
    const onSubmit = (data) => {
        AddData(data)
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
            .then(() => setUpdateOpen(!updateOpen))
            .finally(() => setChange(!change));
    }
    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate } } = useForm();
    const onSubmitUpdate = (data) => {
        UpdateData(data)
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
            <Button className='d-flex align-items-center' color={"primary"} onClick={() => setOpen(true)}><BsPlusSquareFill /> <span className='m-1'>Add</span></Button>
            <br />
            <MyTable data={veri}
                func1={GetSelectedData}
                func2={DeleteData}
            />
            <MyModal
                open={open}
                setOpen={setOpen}
                title='Add Category'
                buttontext='Add'
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label for="categoryName">Category Name</Label>
                        <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            innerRef={register({ required: "Category name is required", minLength: { value: 2, message: "Category must have at least 2 characters" } })}
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
                            innerRef={register({ required: "Description is required" })}
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
                                    Add
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
                title='Update Category'
                buttontext='Update'
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
                            innerRef={registerUpdate({ required: "Category name is required" })}
                            placeholder="Category Name"
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
                            innerRef={registerUpdate({ required: "Description is required" })}
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
                                    Update
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
