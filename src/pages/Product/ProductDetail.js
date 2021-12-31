import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form';
const product = axios.create({ baseURL: "http://localhost:56156/api/Product" })
const category = axios.create({ baseURL: "http://localhost:56156/api/Category" })

const ProductDetail = () => {
    const { id } = useParams()
    const [veriCategory, setVeriCategory] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const [check, setCheck] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        product.get(`/GetProductById/${id}`)
            .then(response => {
                setSelectedData(response.data.message)
                setCheck(response.data.message.discontinued)
            })

        category.get('/GetListCategory')
            .then(response => setVeriCategory(response.data.message))
    }, [id])

    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate } } = useForm();
    const onSubmitUpdate = (data) => {
        data.discontinued = data.discontinued === "true" ? true : false;
        console.log("data", data)
        UpdateData(data)
    }
    const UpdateData = (data) => {
        product.put(`/UpdateProduct`, data)
            .then((response) => console.log('sonuc', response.data))
            .finally(() => navigate('/Product'))//history push navigate v6
    }
    console.log('dat', selectedData)
    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <Col lg="6" >
                        <Card className='p-3' >
                            <Form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
                                <Input type="text"
                                    id="productId"
                                    name="productId"
                                    hidden
                                    defaultValue={selectedData.productId}
                                    innerRef={registerUpdate()}
                                />
                                <FormGroup>
                                    <Label for="productName">Product Name</Label>
                                    <Input
                                        type="text"
                                        id="productName"
                                        name="productName"
                                        defaultValue={selectedData.productName}
                                        innerRef={registerUpdate({ required: "Product name is required" })}
                                        placeholder="ProductName"
                                    />
                                    <div>
                                        {
                                            errorsUpdate.productName?.message
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
                                        defaultValue={selectedData.supplierId}
                                        innerRef={registerUpdate({ required: "Supplier is required" })}
                                    >
                                        <option value="1" selected={selectedData.supplierId === "1"}>Exotic Liquids</option>
                                        <option value="2" selected={selectedData.supplierId === "2"}>New Orleans Cajun Delights</option>
                                        <option value="3" selected={selectedData.supplierId === "3"}>Grandma Kelly's Homestead</option>
                                    </Input>
                                    <div>
                                        {
                                            errorsUpdate.supplierId?.message
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
                                        defaultValue={selectedData.categoryId}
                                        innerRef={registerUpdate({ required: "Category is required" })}
                                    >
                                        {veriCategory.map((item, key) => (
                                            <option selected={item.categoryId === selectedData.categoryId} key={key} value={item.categoryId}>{item.categoryName}</option>
                                        ))}
                                    </Input>
                                    <div>
                                        {
                                            errorsUpdate.categoryId?.message
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
                                                defaultValue={selectedData.quantityPerUnit}
                                                innerRef={registerUpdate({ required: "Quantity Per Unit is required" })}
                                                placeholder="Quantity Per Unit"
                                            />
                                            <div>
                                                {
                                                    errorsUpdate.quantityPerUnit?.message
                                                }
                                            </div>
                                        </Col>
                                        <Col>
                                            <Label for="unitPrice">Unit Price</Label>
                                            <Input
                                                type="number"
                                                id="unitPrice"
                                                name="unitPrice"
                                                defaultValue={selectedData.unitPrice}
                                                innerRef={registerUpdate({ required: "Unit Price is required" })}
                                                placeholder="Unit Price"
                                            />
                                            <div>
                                                {
                                                    errorsUpdate.unitPrice?.message
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
                                                defaultValue={selectedData.unitsInStock}
                                                innerRef={registerUpdate({ required: "Units In Stock is required" })}
                                                placeholder="Units In Stock"
                                            />
                                            <div>
                                                {
                                                    errorsUpdate.unitsInStock?.message
                                                }
                                            </div>
                                        </Col>
                                        <Col>
                                            <Label for="unitsOnOrder">Units On Order</Label>
                                            <Input
                                                type="number"
                                                id="unitsOnOrder"
                                                name="unitsOnOrder"
                                                defaultValue={selectedData.unitsOnOrder}
                                                innerRef={registerUpdate({ required: "Units On Order is required" })}
                                                placeholder="Units On Order"
                                            />
                                            <div>
                                                {
                                                    errorsUpdate.unitsOnOrder?.message
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
                                        defaultValue={selectedData.reorderLevel}
                                        innerRef={registerUpdate({ required: "Reorder Level is required" })}
                                        placeholder="Reorder Level"
                                    />
                                    <div>
                                        {
                                            errorsUpdate.reorderLevel?.message
                                        }
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    Discontinued
                                    <FormGroup>
                                        <Input
                                            name="discontinued"
                                            type="radio"
                                            value={true}
                                            defaultValue={selectedData.discontinued}
                                            innerRef={registerUpdate({ required: "Discontinued is required" })}
                                            checked={check === true}
                                            onChange={() => setCheck(true)}
                                        />
                                        {' '}
                                        <Label >
                                            True
                                        </Label>
                                        {' '}

                                        <Input
                                            name="discontinued"
                                            type="radio"
                                            value={false}
                                            defaultValue={selectedData.discontinued}
                                            innerRef={registerUpdate({ required: "Discontinued is required" })}
                                            checked={check === false}
                                            onChange={() => setCheck(false)}
                                        />
                                        {' '}
                                        <Label>
                                            False
                                        </Label>
                                        <div>
                                            {
                                                errorsUpdate.discontinued?.message
                                            }
                                        </div>
                                    </FormGroup>
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
                        </Card>

                    </Col>
                    <Col lg="6">
                        <Card className='h-100'>
                            <img className='d-block w-100 h-100' src='https://source.unsplash.com/random/250x250?sig=1' />
                        </Card>
                    </Col>

                </Row>


            </Container>
        </div>
    )
}

export default ProductDetail
