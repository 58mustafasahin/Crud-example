import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderById } from 'redux/order/action'
import OrderService from 'configs/services/OrderService'
import { confirm } from 'utils/SweetAlert';
import { Button, Card, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form';

const OrderDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { getOrderById } = useSelector(state => state.order)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(GetOrderById(id))
    }, [id])
    console.log('asd',getOrderById)

    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate } } = useForm();
    const onSubmitUpdate = (data) => {
        data.freight = parseFloat(data.freight)
        data.shipVia = parseInt(data.shipVia)
        data.employeeId = parseInt(data.employeeId)
        confirm(
            {
                title: "Onay",
                text: "Kaydı Güncellemek istediğinize emin misiniz?",
            },
            async () => {
                return OrderService.UpdateOrder(data)
            },
            async () => {
                return navigate('/Order')//history push navigate v6
            }, async () => {
                return null
            }
        );
    }


    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <Col lg='6'>
                        <Card className='p-3'>
                            <Form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
                                <FormGroup>
                                    <Input type="text"
                                        id="orderId"
                                        name="orderId"
                                        hidden
                                        defaultValue={id}
                                        innerRef={registerUpdate()}
                                    />
                                    <Row>
                                        <Col>
                                            <Label for="employeeId">
                                                Employee Name
                                            </Label>
                                            <Input
                                                id="employeeId"
                                                name="employeeId"
                                                type="select"
                                                defaultValue={getOrderById.employeeId}
                                                innerRef={registerUpdate({ required: "Employee is required" })}
                                            >
                                                <option value="">Select</option>
                                                <option value="5" selected={getOrderById.employeeId === 5}>Steven Buchanan</option>
                                                <option value="6" selected={getOrderById.employeeId === 6}>Micheal Suyama</option>
                                                <option value="3" selected={getOrderById.employeeId === 3}>Janet Leverling</option>
                                            </Input>
                                            <div>
                                                {
                                                    errorsUpdate.employeeId?.message
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
                                                defaultValue={getOrderById.customerId}
                                                innerRef={registerUpdate({ required: "Customer Id is required" })}
                                            >
                                                <option value="">Select</option>
                                                <option value="VINET" selected={getOrderById.customerId === "VINET"}>VINET</option>
                                                <option value="HANAR" selected={getOrderById.customerId === "HANAR"}>HANAR</option>
                                                <option value="CHOPS" selected={getOrderById.customerId === "CHOPS"}>CHOPS</option>
                                                <option value="HILAA" selected={getOrderById.customerId === "HILAA"}>HILAA</option>
                                            </Input>
                                            <div>
                                                {
                                                    errorsUpdate.customerId?.message
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
                                                defaultValue={getOrderById.orderDate.split('T')[0]}
                                                innerRef={registerUpdate({ required: "Order Date is required" })}
                                                >
                                            </Input>
                                            <div>
                                                {
                                                    errorsUpdate.orderDate?.message
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
                                                defaultValue={getOrderById.requiredDate.split('T')[0]}
                                                innerRef={registerUpdate({ required: "Required Date is required" })}
                                            >
                                            </Input>
                                            <div>
                                                {
                                                    errorsUpdate.requiredDate?.message
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
                                        defaultValue={getOrderById.freight}
                                        innerRef={registerUpdate({ required: "Freight is required" })}
                                        placeholder="Freight"
                                    />
                                    <div>
                                        {
                                            errorsUpdate.freight?.message
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
                                                defaultValue={getOrderById.shipVia}
                                                innerRef={registerUpdate({ required: "Ship Via is required" })}
                                                placeholder='Ship Via'
                                            >
                                                <option value="">Select</option>
                                                <option value="1" selected={getOrderById.shipVia === 1}>1</option>
                                                <option value="2" selected={getOrderById.shipVia === 2}>2</option>
                                                <option value="3" selected={getOrderById.shipVia === 3}>3</option>
                                            </Input>
                                            <div>
                                                {
                                                    errorsUpdate.shipVia?.message
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
                                                defaultValue={getOrderById.shippedDate.split('T')[0]}
                                                innerRef={registerUpdate({ required: "Shipped Date is required" })}
                                            >
                                            </Input>
                                            <div>
                                                {
                                                    errorsUpdate.shippedDate?.message
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
                                                defaultValue={getOrderById.shipName}
                                                innerRef={registerUpdate({ required: "Ship Name is required" })}
                                                placeholder="Ship Name"
                                                />
                                            <div>
                                                {
                                                    errorsUpdate.shipName?.message
                                                }
                                            </div>
                                        </Col>
                                        <Col>
                                            <Label for="shipAddress">Ship Address</Label>
                                            <Input
                                                type="text"
                                                id="shipAddress"
                                                name="shipAddress"
                                                defaultValue={getOrderById.shipAddress}
                                                innerRef={registerUpdate({ required: "Ship Address is required" })}
                                                placeholder="Ship Address"
                                            />
                                            <div>
                                                {
                                                    errorsUpdate.shipAddress?.message
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
                                                defaultValue={getOrderById.shipCity}
                                                innerRef={registerUpdate({ required: "Ship City is required" })}
                                                placeholder="Ship City"
                                                />
                                            <div>
                                                {
                                                    errorsUpdate.shipCity?.message
                                                }
                                            </div>
                                        </Col>
                                        <Col>
                                            <Label for="shipCountry">Ship Country</Label>
                                            <Input
                                                type="text"
                                                id="shipCountry"
                                                name="shipCountry"
                                                defaultValue={getOrderById.shipCountry}
                                                innerRef={registerUpdate({ required: "Ship Country is required" })}
                                                placeholder="Ship Country"
                                            />
                                            <div>
                                                {
                                                    errorsUpdate.shipCountry?.message
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
                                                defaultValue={getOrderById.shipPostalCode}
                                                innerRef={registerUpdate({ required: "Ship Postal Code is required" })}
                                                placeholder="Ship Postal Code"
                                                />
                                            <div>
                                                {
                                                    errorsUpdate.shipPostalCode?.message
                                                }
                                            </div>
                                        </Col>
                                        <Col>
                                            <Label for="shipRegion">Ship Region</Label>
                                            <Input
                                                type="text"
                                                id="shipRegion"
                                                name="shipRegion"
                                                defaultValue={getOrderById.shipRegion===null&&'null'}
                                                innerRef={registerUpdate({ required: "Ship Region is required" })}
                                                placeholder="Ship Region"
                                            />
                                            <div>
                                                {
                                                    errorsUpdate.shipRegion?.message
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

export default OrderDetail
