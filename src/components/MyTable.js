import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import MyModal from './MyModal';

const MyTable = ({ userId, id, title, completed, change, setChange, setAddData }) => {

    // const [selectedId, setSelectedId] = useState(0)
    const [open, setOpen] = useState(false)
    const [method, setMethod] = useState("")

    const DeleteData = (selectedId) => {
        fetch(`http://localhost:56156/api/Category/DeleteCategory/${selectedId}`, {
            method: 'DELETE',
        })
            .then(() => setChange(!change));;
    }

    
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{userId}</td>
                <td>{title}</td>
                {completed == null ? null : <td>{completed}</td>}
                <td>
                    <Row>
                        <Col>
                            <Button onClick={() => {setOpen(true); setMethod("Update")}}>Güncelle</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => DeleteData()}>Sil</Button>
                        </Col>
                    </Row>
                </td>
            </tr>

            <MyModal
                text="hoş geldin boş gittin"
                open={open}
                setOpen={setOpen}
                method={method}
                change={change}
                setChange={setChange}
                setAddData={setAddData}
            />
        </>
    )
}

export default MyTable
