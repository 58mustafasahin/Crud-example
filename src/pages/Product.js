import React, { useEffect, useState } from 'react'
import { Button, Container } from 'reactstrap'
import MyModal from '../components/MyModal'
import MyTable from '../components/MyTable'

const Product = () => {
    const [veri, setVeri] = useState([])
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)

    useEffect(() => {
        fetch('http://localhost:56156/api/Product/GetProductList')
            .then(response => response.json())
            .then(data => setVeri(data.message))
            .catch(err => alert(err))
    }, [change])

    return (
        <Container>
            <h1>Product</h1>
            <Button  color={"primary"}  onClick={() => setOpen(true)}>Ekle</Button>
            <MyTable data={veri} change={change} setChange={setChange}
            
            />
            <MyModal
                open={open}
                setOpen={setOpen}
                title='Ekle'
            >
                
            </MyModal>
        </Container>
    )
}

export default Product
