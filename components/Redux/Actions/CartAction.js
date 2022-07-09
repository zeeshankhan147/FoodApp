
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_CART, GET_CART, REMOVE_ALL_CART, REMOVE_CART, UPDATE_CART, } from "./types"


export const addToCartAction = (item) => {
    return (dispatch) => {
        AsyncStorage.getItem('@cartItem').then((valo) => {
            let data = JSON.parse(valo)
            if (data != null) {
                data = [...data, item]
            }
            else {
                data = [item]
            }
            AsyncStorage.setItem('@cartItem', JSON.stringify(data))
            dispatch({
                type: ADD_TO_CART,
                data: item
            })
        })

    }
}
export const updateCart = (item) => {
    return (dispatch) => {
        AsyncStorage.setItem('@cartItem', JSON.stringify(item))
        dispatch({
            type: UPDATE_CART,
            data: item
        })
    }
}
export const getCart = () => {
    return (dispatch) => {
        AsyncStorage.getItem(`@cartItem`)
            .then((res) => {
                let data = JSON.parse(res)
                dispatch({
                    type: GET_CART,
                    data: data ? data : [],
                })

            })
            .catch((err) => {
                console.log(err)
            })

    }
}
export const removeCart = (cart) => {
    AsyncStorage.setItem('@cartItem', JSON.stringify(cart))
    return (dispatch) => {
        dispatch({
            type: REMOVE_CART,
            data: cart,
        })
    }
}
export const removeAllCart = () => {
    AsyncStorage.removeItem('@cartItem')
    return (dispatch) => {
        dispatch({
            type: REMOVE_ALL_CART,
            data: [],
        })
    }
}

