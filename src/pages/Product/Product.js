import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row, UncontrolledDropdown } from 'reactstrap';
import MyModal from '../../components/MyModal';

const Product = () => {
    const [veri, setVeri] = useState([])
    const [veriCategory, setVeriCategory] = useState([])
    const [open, setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [change, setChange] = useState(false)
    const [selectedData, setSelectedData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:56156/api/Product/GetProductList')
            .then(response => setVeri(response.data.message))

        axios.get('http://localhost:56156/api/Category/GetListCategory')
            .then(response => setVeriCategory(response.data.message))
    }, [change])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        data.discontinued = data.discontinued == "true" ? true : false;
        console.log("data", data)
        AddData(data)
    }
    const AddData = (data) => {
        axios.post('http://localhost:56156/api/Product/AddProduct', data)
            .then((response) => console.log('sonuc', response.data))
            .then(() => setOpen(!open))
            .finally(() => setChange(!change));
    }

    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate } } = useForm();
    const onSubmitUpdate = (data) => {
        data.discontinued = data.discontinued == "true" ? true : false;
        console.log("data", data)
        UpdateData(data)
    }
    const UpdateData = (data) => {
        axios.put(`http://localhost:56156/api/Product/UpdateProduct`, data)
            .then((response) => console.log('sonuc', response.data))
            .then(() => setUpdateOpen(!updateOpen))
            .finally(() => setChange(!change))
    }

    const DeleteteData = (data) => {
        axios.delete(`http://localhost:56156/api/Product/DeleteProduct/${data.productId}`)
            .then((response) => console.log('sonuc', response.data))
            .finally(() => setChange(!change))
    }

    const columns = [
        {
            name: 'Product Id',
            selector: row => row.productId,
        },
        {
            name: 'Product Name',
            selector: row => row.productName,
        },
        {
            name: 'Category Id',
            selector: row => row.categoryId,
        },
        {
            name: 'Supplier Id',
            selector: row => row.supplierId
        },
        {
            name: 'İşlemler',
            cell: (row) => {
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            İşlem
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                <Link to={`/ProductDetail/${row.productId}`}><Button color={"info"}>Detay</Button></Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Button color={"warning"} onClick={() => { setSelectedData(row); setUpdateOpen(!updateOpen) }}>Güncelle</Button>
                            </DropdownItem>
                            <DropdownItem>
                                <Button color={"danger"} onClick={() => DeleteteData(row)}>Sil</Button>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }
        },

    ];

    return (
        <Container>
            <h1>About</h1>
            <Button color={"primary"} onClick={() => setOpen(true)}>Ekle</Button>
            <DataTable
                striped
                pagination
                columns={columns}
                data={veri}
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

            <MyModal
                open={updateOpen}
                setOpen={setUpdateOpen}
                title='Ekle'
            >
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
                            <option value="">Select</option>
                            <option value="1">Exotic Liquids</option>
                            <option value="2">New Orleans Cajun Delights</option>
                            <option value="3">Grandma Kelly's Homestead</option>
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
                            <option value="">Select</option>
                            {veriCategory.map((item, key) => (
                                <option key={key} value={item.categoryId}>{item.categoryName}</option>
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
                                checked={selectedData.discontinued === true}
                                innerRef={registerUpdate({ required: "Discontinued is required" })}
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
                                checked={selectedData.discontinued === false}
                                innerRef={registerUpdate({ required: "Discontinued is required" })}
                                value={false}
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
            </MyModal>

        </Container>
    )
}

export default Product
