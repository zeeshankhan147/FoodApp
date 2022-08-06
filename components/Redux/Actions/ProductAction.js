
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_CART, FETCH_DATA, GET_CART, GET_MENU_DATA, REMOVE_ALL_CART, REMOVE_CART, SET_USER, UPDATE_CART, } from "./types"

export const getProduct = (id,branchId) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_DATA,
            data: true
          })
        let params = {
            merchant_id:'126',
            area_id:'1230'

        }

        return axios.get("https://menu.indolj.pk/mobileapp/api/GetMenusListingV2?json=1", {
            params: params,
            
          }).then((res)=>{
            // console.warn('--->>>',res);
            dispatch({
                type: GET_MENU_DATA,
                data: res.data.details
              })

          }).catch((err)=>{
            console.warn(err);

          })


    }
}



