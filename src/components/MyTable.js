import React from 'react'
import { BsPencilFill, BsTrashFill } from 'react-icons/bs'
import { Button, Col, Row, Table } from 'reactstrap'

const MyTable = ({ data, func1, func2 }) => {

    // { console.log("keeee", data.length === 0 ? null : Object.keys(data[0])) }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {data.length === 0 ? null : Object.keys(data[0]).map((item, key) => (
                            <th key={key}>
                                {(item.charAt(0).toUpperCase()+item.slice(1)).replace(/([A-Z]+)/g, " $1").trim()}
                            </th>
                        ))}
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => (
                        <tr key={key}>
                            {Object.keys(item).map((obj, key2) => (
                                <td key={key2}>
                                    {/* {console.log(obj)} */}
                                    {item[obj].toString()}
                                </td>
                            ))
                            }
                            <td>
                                <Row>
                                    <Col>
                                        <Button  className='d-flex align-items-center' color={"warning"} onClick={() => func1(item)}><BsPencilFill /><span className='m-1'> Update</span></Button>
                                    </Col>
                                    <Col>
                                        <Button  className='d-flex align-items-center' color={"danger"} onClick={() => func2(item.categoryId)}><BsTrashFill /><span className='m-1'> Delete</span></Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default MyTable
