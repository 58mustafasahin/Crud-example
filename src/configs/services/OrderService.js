import { URL } from '../api'
import axios from "axios"

const GetListOrder = () => {
    return axios.get(`${URL}/Order/GetListOrder`)
}
const GetOrderListByEmployeeId = (employeeId) => {
    return axios.get(`${URL}/Order/GetOrderListByEmployeeId/${employeeId}`)
}
const GetOrderById = (id) => {
    return axios.get(`${URL}/Order/GetOrderById/${id}`)
}
const AddOrder = (data) => {
    return axios.post(`${URL}/Order/AddOrder`, data)
}
const UpdateOrder = (data) => {
    return axios.put(`${URL}/Order/UpdateOrder`, data)
}
const DeleteOrder = (id) => {
    return axios.delete(`${URL}/Order/DeleteOrder/${id}`)
}

let OrderService = {
    GetListOrder,
    GetOrderListByEmployeeId,
    GetOrderById,
    AddOrder,
    UpdateOrder,
    DeleteOrder
}

export default OrderService