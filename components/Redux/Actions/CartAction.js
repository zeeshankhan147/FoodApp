
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_CART, GET_CART, REMOVE_ALL_CART, REMOVE_CART, UPDATE_CART, } from "./types"

export const addToCartAction = (item) => {
    const datarray = [];
    datarray.push(item);

    AsyncStorage.getItem('@cartItem').then((valo) => {
        const data = JSON.parse(valo)
        if (data != null) {
            data.forEach(element => {
                if (element.id != item.id) {
                    datarray.push(element)
                    // ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);


                }
                else {
                    ToastAndroid.show(`Warning this item is already in your cart`, ToastAndroid.LONG);
                }

            });

            AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
            console.log('next time run', JSON.stringify(datarray));




        }
        else {
            AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
            console.log('1st time', JSON.stringify(datarray));
            ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);


        }

    })
    return (dispatch) => {
        dispatch({
            type: ADD_TO_CART,
            data: item
        })
    }
}
export const addToCartAction2 = (item) => {
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
    AsyncStorage.setItem('@cartItem', JSON.stringify(item))
    return (dispatch) => {
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

