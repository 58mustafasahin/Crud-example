import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import MyModal from '../components/MyModal'
import MyTable from '../components/MyTable'

const Product = () => {
    const [veri, setVeri] = useState([])
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("data", data)
        AddData(data)
        setOpen(!open)
    }

    useEffect(() => {
        fetch('http://localhost:56156/api/Product/GetProductList')
            .then(response => response.json())
            .then(data => setVeri(data.message))
            .catch(err => alert(err))
    }, [change])

    const AddData = (data) => {
        fetch('http://localhost:56156/api/Product/AddProduct', {
            method: 'POST',
            body: JSON.stringify({
                productName: "string",
                supplierId: 0,
                categoryId: 0,
                quantityPerUnit: "string",
                unitPrice: 0,
                unitsInStock: 0,
                unitsOnOrder: 0,
                reorderLevel: 0,
                discontinued: true
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .finally(() => setChange(!change));
    }

    return (
        <Container>
            <h1>Product</h1>
            <Button color={"primary"} onClick={() => setOpen(true)}>Ekle</Button>
            <MyTable data={veri} change={change} setChange={setChange}

            />
            <MyModal
                open={open}
                setOpen={setOpen}
                title='Ekle'
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label for="categoryName">Category Name</Label>
                        <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            innerRef={register({ required: "Category is required" })}
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
        </Container>
    )
}

export default Product
