import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'

const MyTable = ({ userId, id, title, completed, change, setChange }) => {
    
    // const [selectedId, setSelectedId] = useState(0)

    const UpdateData = (selectedId) => {
        fetch('http://localhost:56156/api/Category/UpdateCategory', {
            method: 'PUT',
            body: JSON.stringify({
                categoryId: selectedId,
                categoryName: 'elektronik',
                description: 'elektronik araçlar bulunur.',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .then(() => setChange(!change));
    }

    const DeleteData = (selectedId) => {
        fetch(`http://localhost:56156/api/Category/DeleteCategory/${selectedId}`, {
            method: 'DELETE',
        })
        .then(() => setChange(!change));;
    }

    return (

        <tr>
            <td>{id}</td>
            <td>{userId}</td>
            <td>{title}</td>
            {completed == null ? null : <td>{completed}</td>}
            <td>
                <Row>
                    <Col>
                        <Button onClick={() => UpdateData(id)}>Güncelle</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => DeleteData(id)}>Sil</Button>
                    </Col>
                </Row>
            </td>
        </tr>

    )
}

export default MyTable
