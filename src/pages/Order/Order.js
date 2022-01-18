import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetListOrder } from 'redux/order/action'
import OrderService from 'configs/services/OrderService'
import { confirm } from 'utils/SweetAlert';
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row, UncontrolledDropdown } from 'reactstrap';
import MyModal from 'components/MyModal';
import { BsInfoCircleFill, BsPlusSquareFill, BsTrashFill } from "react-icons/bs";

const Order = () => {
    const dispatch = useDispatch()
    const { getListOrder } = useSelector(state => state.order)
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)


    useEffect(() => {
        dispatch(GetListOrder())
    }, [dispatch, change])


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        data.freight = parseFloat(data.freight)
        data.shipVia = parseInt(data.shipVia)
        data.employeeId = parseInt(data.employeeId)
        confirm(
            {
                title: "Onay",
                text: "Kaydı Eklemek istediğinize emin misiniz?",
            },
            async () => {
                return OrderService.AddOrder(data)
            },
            async () => {
                return setOpen(!open), setChange(!change)
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
                return OrderService.DeleteOrder(data.orderId)
            },
            async () => {
                return setChange(!change)
            }, async () => {
                return null
            }
        );
    }

    const columns = [
        {
            name: <h6>Order Id</h6>,
            selector: row => row.orderId,
            maxWidth: '8%',
        },
        {
            name: <h6>Employee Id</h6>,
            selector: row => row.employeeId,
            maxWidth: '11%',
        },
        {
            name: <h6>Employee Name</h6>,
            selector: row => row.employeeFullName,
            maxWidth: '14%',
        },
        {
            name: <h6>Customer Id</h6>,
            selector: row => row.customerId,
            maxWidth: '11%',
        },
        {
            name: <h6>Order Date</h6>,
            selector: row => row.orderDate.split('T')[0],
            maxWidth: '11%',
        },
        {
            name: <h6>Freight</h6>,
            selector: row => row.freight,
            maxWidth: '8%',
        },
        {
            name: <h6>Required Date</h6>,
            selector: row => row.requiredDate.split('T')[0],
            maxWidth: '11%',
        },
        {
            name: <h6>Ship Name</h6>,
            selector: row => row.shipName,
            // maxWidth: '17%',
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
                                <Link to={`/OrderDetail/${row.orderId}`} style={{ color: 'black', textDecoration: 'none' }}>
                                    <BsInfoCircleFill /> <span className='m-1'>Detail</span>
                                </Link>
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
                <h1>Order</h1>
                <Button className='d-flex align-items-center' color={"primary"} onClick={() => setOpen(true)} ><BsPlusSquareFill /> <span className='m-1'>Add</span></Button>
                <br />
                <DataTable
                    striped
                    pagination
                    columns={columns}
                    data={getListOrder}
                // conditionalRowStyles={conditionalRowStyles}
                />

                <MyModal
                    open={open}
                    setOpen={setOpen}
                    title='Add Order'
                >
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="employeeId">
                                        Employee Name
                                    </Label>
                                    <Input
                                        id="employeeId"
                                        name="employeeId"
                                        type="select"
                                        innerRef={register({ required: "Employee is required" })}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Steven Buchanan</option>
                                        <option value="2">Micheal Suyama</option>
                                        <option value="3">Janet Leverling</option>
                                    </Input>
                                    <div>
                                        {
                                            errors.employeeId?.message
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <Label for="customerId">
                                        Customer Id
                                    </Label>
                                    <Input
                                        id="customerId"
                                        name="customerId"
                                        type="select"
                                        innerRef={register({ required: "Customer Id is required" })}
                                    >
                                        <option value="">Select</option>
                                        <option value="VINET">VINET</option>
                                        <option value="HANAR">HANAR</option>
                                        <option value="CHOPS">CHOPS</option>
                                        <option value="HILAA">HILAA</option>
                                    </Input>
                                    <div>
                                        {
                                            errors.customerId?.message
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="orderDate">
                                        Order Date
                                    </Label>
                                    <Input
                                        id="orderDate"
                                        name="orderDate"
                                        type="date"
                                        innerRef={register({ required: "Order Date is required" })}
                                    >
                                    </Input>
                                    <div>
                                        {
                                            errors.orderDate?.message
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <Label for="requiredDate">
                                        Required Date
                                    </Label>
                                    <Input
                                        id="requiredDate"
                                        name="requiredDate"
                                        type="date"
                                        innerRef={register({ required: "Required Date is required" })}
                                    >
                                    </Input>
                                    <div>
                                        {
                                            errors.requiredDate?.message
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Label for="freight">Freight</Label>
                            <Input
                                type="text"
                                id="freight"
                                name="freight"
                                innerRef={register({ required: "Freight is required" })}
                                placeholder="Freight"
                            />
                            <div>
                                {
                                    errors.freight?.message
                                }
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="shipVia">
                                        Ship Via
                                    </Label>
                                    <Input
                                        id="shipVia"
                                        name="shipVia"
                                        type="select"
                                        innerRef={register({ required: "Ship Via is required" })}
                                        placeholder='Ship Via'
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Input>
                                    <div>
                                        {
                                            errors.shipVia?.message
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <Label for="shippedDate">
                                        Shipped Date
                                    </Label>
                                    <Input
                                        id="shippedDate"
                                        name="shippedDate"
                                        type="date"
                                        innerRef={register({ required: "Shipped Date is required" })}
                                    >
                                    </Input>
                                    <div>
                                        {
                                            errors.shippedDate?.message
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="shipName">Ship Name</Label>
                                    <Input
                                        type="text"
                                        id="shipName"
                                        name="shipName"
                                        innerRef={register({ required: "Ship Name is required" })}
                                        placeholder="Ship Name"
                                    />
                                    <div>
                                        {
                                            errors.shipName?.message
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <Label for="shipAddress">Ship Address</Label>
                                    <Input
                                        type="text"
                                        id="shipAddress"
                                        name="shipAddress"
                                        innerRef={register({ required: "Ship Address is required" })}
                                        placeholder="Ship Address"
                                    />
                                    <div>
                                        {
                                            errors.shipAddress?.message
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="shipCity">Ship City</Label>
                                    <Input
                                        type="text"
                                        id="shipCity"
                                        name="shipCity"
                                        innerRef={register({ required: "Ship City is required" })}
                                        placeholder="Ship City"
                                    />
                                    <div>
                                        {
                                            errors.shipCity?.message
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <Label for="shipCountry">Ship Country</Label>
                                    <Input
                                        type="text"
                                        id="shipCountry"
                                        name="shipCountry"
                                        innerRef={register({ required: "Ship Country is required" })}
                                        placeholder="Ship Country"
                                    />
                                    <div>
                                        {
                                            errors.shipCountry?.message
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="shipPostalCode">Ship Postal Code</Label>
                                    <Input
                                        type="text"
                                        id="shipPostalCode"
                                        name="shipPostalCode"
                                        innerRef={register({ required: "Ship Postal Code is required" })}
                                        placeholder="Ship Postal Code"
                                    />
                                    <div>
                                        {
                                            errors.shipPostalCode?.message
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <Label for="shipRegion">Ship Region</Label>
                                    <Input
                                        type="text"
                                        id="shipRegion"
                                        name="shipRegion"
                                        innerRef={register({ required: "Ship Region is required" })}
                                        placeholder="Ship Region"
                                    />
                                    <div>
                                        {
                                            errors.shipRegion?.message
                                        }
                                    </div>
                                </Col>
                            </Row>
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
            </Container>
        </div>
    )
}

export default Order
