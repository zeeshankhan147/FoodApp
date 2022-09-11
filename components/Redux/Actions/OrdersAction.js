
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_ALL_ORDERS, PLACED_ORDER } from "./types";

export const orderPlaced = (orders) => {
    return (dispatch) => {
        AsyncStorage.getItem('@ALL_ORDERS').then((val) => {
            let data = JSON.parse(val);
            if (data === null) {
                data = [orders]
            } else {
                data = [...data, orders]
            }
            AsyncStorage.setItem('@ALL_ORDERS', JSON.stringify(data))
            dispatch({
                type: PLACED_ORDER,
                data: orders
            })
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



