import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const ProductDetail = () => {
    const { id } = useParams()
    const [veri, setVeri] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:56156/api/Product/GetProductById/${id}`)
            .then(response => setVeri(response.data.message))
    }, [])

    return (
        <div>
            <h1>Product Detail {id} </h1>
            <h1>{veri.productName}</h1>
        </div>
    )
}

export default ProductDetail
