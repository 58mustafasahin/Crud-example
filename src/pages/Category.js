import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'reactstrap'
import MyTable from '../components/MyTable'

const Category = () => {
    const [veri, setVeri] = useState([])
    const [change, setChange] = useState(false)

    useEffect(() => {
        fetch('http://localhost:56156/api/Category/GetListCategory')
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(data => setVeri(data.message))
            .catch(err => alert(err))
    }, [change])
    console.log("ads", veri)

    const AddData = () => {
        fetch('http://localhost:56156/api/Category/AddCategory', {
            method: 'POST',
            body: JSON.stringify({
                categoryName: 'bilişim',
                description: 'teknolojik araçlar bulunur.',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .then(() => setChange(!change));
    }

    return (
        <Container>
            Category
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Category Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {veri.map((item) => (
                        <MyTable key={item.categoryId} id={item.categoryId} userId={item.categoryName} title={item.description} change={change} setChange={setChange} />
                    ))}
                </tbody>
            </Table>
            <Button onClick={() => AddData()}>Ekle</Button>
        </Container>
    )
}

export default Category
