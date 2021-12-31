import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Badge, Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row, UncontrolledDropdown } from 'reactstrap';
import MyModal from '../../components/MyModal';
import { BsInfoCircleFill, BsPencilFill, BsPlusSquareFill, BsTrashFill } from "react-icons/bs";
import { confirm } from '../../utils/SweetAlert';

const Product = () => {
    const [veri, setVeri] = useState([])
    const [veriCategory, setVeriCategory] = useState([])
    const [open, setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [change, setChange] = useState(false)
    const [selectedData, setSelectedData] = useState([])
    const [check, setCheck] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:56156/api/Product/GetProductList')
            .then(response => setVeri(response.data.message))

        axios.get('http://localhost:56156/api/Category/GetListCategory')
            .then(response => setVeriCategory(response.data.message))
    }, [change])

    const AddData = (data) => {
        return axios.post('http://localhost:56156/api/Product/AddProduct', data)
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        data.discontinued = data.discontinued === "true" ? true : false;
        confirm(
            {
                title: "Onay",
                text: "Kaydı Eklemek istediğinize emin misiniz?",
            },
            async () => {
                return AddData(data)
            },
            async () => {
                return setOpen(!open), setChange(!change)
            }, async () => {
                return null
            }
        );
    }

    const UpdateData = (data) => {
        return axios.put(`http://localhost:56156/api/Product/UpdateProduct`, data)
    }
    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate } } = useForm();
    const onSubmitUpdate = (data) => {
        data.discontinued = data.discontinued === "true" ? true : false;
        confirm(
            {
                title: "Onay",
                text: "Kaydı Güncellemek istediğinize emin misiniz?",
            },
            async () => {
                return UpdateData(data)
            },
            async () => {
                return setUpdateOpen(!updateOpen), setChange(!change)
            }, async () => {
                return null
            }
        );
    }

    const DeleteteData = (data) => {
        confirm(
            {
                title: "Onay",
                text: "Kaydı Silmek istediğinize emin misiniz?",
            },
            async () => {
                return axios.delete(`http://localhost:56156/api/Product/DeleteProduct/${data.productId}`)
            },
            async () => {
                return setChange(!change)
            }, async () => {
                return null
            }
        );
    }
    const conditionalRowStyles = [
        {
            //when: row => row.unitsInStock > 10,
            // style: row => ({
            //     backgroundColor: row.unitsInStock > 10 ? 'green' : 'red',
            //     // color: 'white',
            //     // '&:hover': {
            //     //     cursor: 'pointer',
            //     // },
            // }),
        }
    ];
    const columns = [
        {
            name: <h6>Product Id</h6>,
            selector: row => row.productId,
            maxWidth: '10%',
        },
        {
            name: <h6>Product Name</h6>,
            selector: row => row.productName,
        },
        {
            name: <h6>Category Id</h6>,
            selector: row => row.categoryId,
            maxWidth: '11%',
        },
        {
            name: <h6>Category Name</h6>,
            selector: row => row.categoryName,
        },
        {
            name: <h6>Supplier Id</h6>,
            selector: row => row.supplierId,
            maxWidth: '11%',
        },
        {
            name: <h6>Suplier Name</h6>,
            selector: row => row.supplierName,
        },
        {
            name: <h6>Units in Stock</h6>,
            selector: row => row.unitsInStock,
            maxWidth: '12%',
            // conditionalCellStyles: [
            //     {
            //         when: row => row.unitsInStock < 10,
            //         style: {
            //             backgroundColor: 'red',
            //             color: 'white',
            //             '&:hover': {
            //                 cursor: 'not-allowed',
            //             },
            //         },
            //     },
            //     {
            //         when: row => row.unitsInStock >= 10,
            //         style: {
            //             backgroundColor: 'green',
            //             color: 'white',
            //             '&:hover': {
            //                 cursor: 'pointer',
            //             },
            //         },
            //     },
            // ],
            cell: (row) => row.unitsInStock < 10
                ? <Badge pill color="danger">{row.unitsInStock}</Badge>
                : <Badge pill color="success">{row.unitsInStock}</Badge>
        },
        {
            name: <h6>Actions</h6>,
            cell: (row) => {
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle caret >
                            Action
                        </DropdownToggle>
                        <DropdownMenu style={{ minWidth: 'auto' }}>
                            <DropdownItem className='d-flex align-items-center' >
                                <Link to={`/ProductDetail/${row.productId}`} style={{ color: 'black', textDecoration: 'none' }}>
                                    <BsInfoCircleFill /> <span className='m-1'>Detail</span>
                                </Link>
                            </DropdownItem>
                            <DropdownItem className='d-flex align-items-center' onClick={() => { setSelectedData(row); setUpdateOpen(!updateOpen); setCheck(row.discontinued) }}>
                                <BsPencilFill /> <span className='m-1'>Update</span>
                                {/* <Button color={"warning"} onClick={() => { setSelectedData(row); setUpdateOpen(!updateOpen) }} >Update</Button> */}
                            </DropdownItem>
                            <DropdownItem className='d-flex align-items-center' onClick={() => DeleteteData(row)}>
                                <BsTrashFill /> <span className='m-1'>Delete</span>
                                {/* <Button color={"danger"} onClick={() => DeleteteData(row)}>Delete</Button> */}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }
        },

    ];

    return (
        <div>
            <Container>
                <h1>Product</h1>
                <Button className='d-flex align-items-center' color={"primary"} onClick={() => setOpen(true)} ><BsPlusSquareFill /> <span className='m-1'>Add</span></Button>
                <br />
                <DataTable
                    striped
                    pagination
                    columns={columns}
                    data={veri}
                // conditionalRowStyles={conditionalRowStyles}
                />

                <MyModal
                    open={open}
                    setOpen={setOpen}
                    title='Add Product'
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
                    title='Update Product'
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
                                    defaultValue={selectedData.discontinued === false}
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
        </div>
    )
}

export default Product
