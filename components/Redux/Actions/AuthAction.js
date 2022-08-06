
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_CART, GET_CART, REMOVE_ALL_CART, REMOVE_CART, SET_USER, UPDATE_CART, } from "./types"
import auth from '@react-native-firebase/auth';

export const setUser = (user) => {
    return (dispatch) => {
        AsyncStorage.setItem('@userInfo', JSON.stringify(user))
        dispatch({
            type: SET_USER,
            data: user
        })


    }
}
export const getUser = () => {
    return (dispatch) => {
        AsyncStorage.getItem('@userInfo').then((user) => {
            let data = JSON.parse(user)
            dispatch({
                type: SET_USER,
                data: data
            })
        })


    }
}
export const logoutUser = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    return (dispatch) => {
        AsyncStorage.removeItem('@userInfo')
        dispatch({
            type: SET_USER,
            data: null
        })


    }
}


