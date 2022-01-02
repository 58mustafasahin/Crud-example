import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderById } from '../../redux/order/action'
import OrderService from '../../configs/services/OrderService'


const Order = () => {
    const {getOrderById} = useSelector(state => state.order)
    const dispatch = useDispatch()
    let id=1
    useEffect(() => {
        dispatch(GetOrderById(id))
    }, [])
console.log("degeee",getOrderById)
    return (
        <div>
            <h1>Order</h1>
        </div>
    )
}

export default Order
