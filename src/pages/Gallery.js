import React, { useEffect, useState } from 'react'


const Gallery = () => {
    const [veri, setVeri] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(data=>setVeri(data))
    }, [])
console.log("ads",veri)
    return (
        <div>
            Galeri
        </div>
    )
}

export default Gallery
