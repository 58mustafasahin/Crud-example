import React, { useEffect, useState } from 'react'
import { Container, Table } from 'reactstrap'
import MyTable from '../components/MyTable'


const Gallery = () => {
    const [veri, setVeri] = useState([])

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/todos')
        fetch('http://localhost:56156/api/Category/GetListCategory')
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(data => setVeri(data.message))
            .catch(err => alert(err))
    }, [])
    console.log("ads", veri)
    return (
        <Container>
            Galeri
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>userId</th>
                        <th>Title</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {veri.map((item) => (
                        // <MyTable key={item.id} id={item.id} userId={item.userId} title={item.title} completed={item.completed.toString()} />
                        <MyTable key={item.categoryId} id={item.categoryId} userId={item.categoryName} title={item.description} />
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Gallery
