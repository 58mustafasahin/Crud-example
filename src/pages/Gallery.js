import React, { useEffect, useState } from 'react'
import { Container, Table } from 'reactstrap'
import MyTable from '../components/MyTable'


const Gallery = () => {
    const [veri, setVeri] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(data => setVeri(data))
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
                        <MyTable key={item.id} id={item.id} userId={item.userId} title={item.title} completed={item.completed.toString()} />
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Gallery
