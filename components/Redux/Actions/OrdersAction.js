
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_ALL_ORDERS, PLACED_ORDER } from "./types";

export const orderPlaced = (orders) => {
    let data = []
    return (dispatch) => {
        dispatch({
            type: PLACED_ORDER,
            data: orders
        })

        AsyncStorage.getItem('@ALL_ORDERS').then((val) => {
            data = JSON.parse(val);
            if (data) {
                data.push(orders)
            } else {
                data = [orders]
            }

            AsyncStorage.setItem('@ALL_ORDERS', JSON.stringify(data))
        })

    }
}

export const getAllOrders = () => {
    return (dispatch) => {
        AsyncStorage.getItem('@ALL_ORDERS').then((order) => {
            const data = JSON.parse(order)
            dispatch({
                type: GET_ALL_ORDERS,
                data: data
            })
        })
    }
}



