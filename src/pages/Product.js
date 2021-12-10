import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import MyModal from '../components/MyModal'
import MyTable from '../components/MyTable'

const Product = () => {
    const [veri, setVeri] = useState([])
    const [veriCategory, setVeriCategory] = useState([])
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)

    const selectOption = [
        {
            label: "Film",
            value: 1
        },
        {
            label: "Tiyatro",
            value: 2
        }
    ]

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

        fetch('http://localhost:56156/api/Category/GetListCategory')
            .then(response => response.json())
            .then(data => setVeriCategory(data.message))
            .catch(err => alert(err))

    }, [change])

    const AddData = (data) => {
        fetch('http://localhost:56156/api/Product/AddProduct', {
            method: 'POST',
            body: JSON.stringify({
                productName: data.productName,
                supplierId: parseInt(data.supplierId),
                categoryId: parseInt(data.categoryId),
                quantityPerUnit: data.quantityPerUnit,
                unitPrice: data.unitPrice,
                unitsInStock: data.unitsInStock,
                unitsOnOrder: data.unitsOnOrder,
                reorderLevel: data.reorderLevel,
                discontinued: data.discontinued == "true" ? true : false
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
                        <Label for="productName">Product Name</Label>
                        <Input
                            type="text"
                            id="productName"
                            name="productName"
                            innerRef={register({ required: "Product name is required" })}
                            placeholder="ProductName"
                        />
                        <div>
                            {
                                errors.productName?.message
                            }
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label for="supplierId">
                            Supplier
                        </Label>
                        <Input
                            id="supplierId"
                            name="supplierId"
                            type="select"
                            innerRef={register({ required: "Supplier is required" })}
                        >
                            <option value="">Select</option>
                            <option value="1">Exotic Liquids</option>
                            <option value="2">New Orleans Cajun Delights</option>
                            <option value="3">Grandma Kelly's Homestead</option>
                        </Input>
                        <div>
                            {
                                errors.supplierId?.message
                            }
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label for="categoryId">
                            Category
                        </Label>
                        <Input
                            id="categoryId"
                            name="categoryId"
                            type="select"
                            innerRef={register({ required: "Category is required" })}
                        >
                            <option value="">Select</option>
                            {veriCategory.map((item, key) => (
                                <option key={key} value={item.categoryId}>{item.categoryName}</option>
                            ))}
                        </Input>
                        <div>
                            {
                                errors.categoryId?.message
                            }
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="quantityPerUnit">Quantity Per Unit</Label>
                                <Input
                                    type="text"
                                    id="quantityPerUnit"
                                    name="quantityPerUnit"
                                    innerRef={register({ required: "Quantity Per Unit is required" })}
                                    placeholder="Quantity Per Unit"
                                />
                                <div>
                                    {
                                        errors.quantityPerUnit?.message
                                    }
                                </div>
                            </Col>
                            <Col>
                                <Label for="unitPrice">Unit Price</Label>
                                <Input
                                    type="number"
                                    id="unitPrice"
                                    name="unitPrice"
                                    innerRef={register({ required: "Unit Price is required" })}
                                    placeholder="Unit Price"
                                />
                                <div>
                                    {
                                        errors.unitPrice?.message
                                    }
                                </div>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="unitsInStock">Units In Stock</Label>
                                <Input
                                    type="number"
                                    id="unitsInStock"
                                    name="unitsInStock"
                                    innerRef={register({ required: "Units In Stock is required" })}
                                    placeholder="Units In Stock"
                                />
                                <div>
                                    {
                                        errors.unitsInStock?.message
                                    }
                                </div>
                            </Col>
                            <Col>
                                <Label for="unitsOnOrder">Units On Order</Label>
                                <Input
                                    type="number"
                                    id="unitsOnOrder"
                                    name="unitsOnOrder"
                                    innerRef={register({ required: "Units On Order is required" })}
                                    placeholder="Units On Order"
                                />
                                <div>
                                    {
                                        errors.unitsOnOrder?.message
                                    }
                                </div>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Label for="reorderLevel">Reorder Level</Label>
                        <Input
                            type="number"
                            id="reorderLevel"
                            name="reorderLevel"
                            innerRef={register({ required: "Reorder Level is required" })}
                            placeholder="Reorder Level"
                        />
                        <div>
                            {
                                errors.reorderLevel?.message
                            }
                        </div>
                    </FormGroup>

                    <FormGroup>
                        Discontinued
                        <FormGroup>
                            <Input
                                name="discontinued"
                                type="radio"
                                innerRef={register({ required: "Discontinued is required" })}
                                value={true}
                            />
                            {' '}
                            <Label >
                                True
                            </Label>
                            {' '}

                            <Input
                                name="discontinued"
                                type="radio"
                                innerRef={register({ required: "Discontinued is required" })}
                                value={false}

                            />
                            {' '}
                            <Label>
                                False
                            </Label>
                            <div>
                                {
                                    errors.discontinued?.message
                                }
                            </div>
                        </FormGroup>
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
