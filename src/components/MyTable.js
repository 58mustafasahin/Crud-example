import React from 'react'
import { Button, Col, Row, Table } from 'reactstrap'

const MyTable = ({ data, func1,func2 }) => {


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Category Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => (
                        <tr key={key}>
                            <td>{item.categoryId}</td>
                            <td>{item.categoryName}</td>
                            <td>{item.description}</td>
                            {item.completed == null ? null : <td>{item.completed}</td>}
                            <td>
                                <Row>
                                    <Col>
                                        <Button onClick={() => func1(item)}>Güncelle</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => func2(item.categoryId)}>Sil</Button>
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
