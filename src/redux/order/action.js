import OrderService from '../../configs/services/OrderService'

export const GetListOrder = () => {
    return dispatch => {
        // dispatch(loading(true))
        OrderService.GetListOrder().then(res => {
            dispatch({
                type: 'GET_LIST_ORDER',
                getOrderList: res.data.message
            })
        })
            .catch(err => console.log(err))
        // .finally(dispatch(loading(false)))
    }
}
export const GetOrderListByEmployeeId = (employeeId) => {
    return dispatch => {
        // dispatch(loading(true))
        OrderService.GetOrderListByEmployeeId(employeeId).then(res => {
            dispatch({
                type: 'GET_ORDER_LIST_BY_EMPLOYEE_ID',
                getOrderListByEmployeeId: res.data.message
            })
        })
            .catch(err => console.log(err))
        // .finally(dispatch(loading(false)))
    }
}
export const GetOrderById = (id) => {
    return dispatch => {
        // dispatch(loading(true))
        OrderService.GetOrderById(id).then(res => {
            dispatch({
                type: 'GET_ORDER_BY_ID',
                getOrderById: res.data.message
            })
        })
            .catch(err => console.log(err))
        // .finally(dispatch(loading(false)))
    }
}