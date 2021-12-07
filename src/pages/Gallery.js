import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
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
            <h1>Galeri</h1>
            <MyTable data={veri}

            />

        </Container>
    )
}

export default Gallery
