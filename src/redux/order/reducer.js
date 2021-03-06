const initalState = {
    getListOrder: [],
    getOrderListByEmployeeId: [],
    getOrderById: {},
}
const OrderReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'GET_LIST_ORDER':
            return {
                ...state,
                getListOrder: action.getListOrder
            }
        case 'GET_ORDER_LIST_BY_EMPLOYEE_ID':
            return {
                ...state,
                getOrderListByEmployeeId: action.getOrderListByEmployeeId
            }
        case 'GET_ORDER_BY_ID':
            return {
                ...state,
                getOrderById: action.getOrderById
            }
        default:
            return state
    }
}

export default OrderReducer