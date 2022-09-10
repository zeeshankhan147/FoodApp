import { GET_ALL_ORDERS, PLACED_ORDER } from "../Actions/types"

const INIT_STATE = {
    myOrders: [],
}

export default function cartReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case PLACED_ORDER: {
            let order = [...state.myOrders, action.data]
            return {
                ...state,
                myOrders: order
            }
        }
        case GET_ALL_ORDERS: {
            return {
                ...state,
                myOrders: action.data
            }
        }

        default:
            return state
    }

}