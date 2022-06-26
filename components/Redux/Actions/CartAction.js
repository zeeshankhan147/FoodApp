
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_CART, GET_CART, REMOVE_CART, UPDATE_CART,} from "./types"

export const _ADDTO_CART = (item) => {
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
                    else{
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
export const _UPDATE_CART = (item) => {
    AsyncStorage.setItem('@cartItem',JSON.stringify(item))
    return (dispatch) => {
        dispatch({
            type: UPDATE_CART,
            data: item
        })
    }
}
export const _GET_CART = () =>{
    AsyncStorage.getItem('@cartItem').then((res)=>{
        let data = JSON.parse(res)
        // console.warn('+++++++ ',data,' ++++++');
        return (dispatch) => {
            dispatch({
                type: GET_CART,
                data: data?data:[],
            })
        }
    }).catch((err)=>{
        console.log('Some Error Occured -->>> ',err);
    })
}
export const _REMOVE_CART = (cart) =>{
    AsyncStorage.setItem('@cartItem', JSON.stringify(cart))
    return (dispatch) => {
        dispatch({
            type: REMOVE_CART,
            data: cart,
        })
    }
}

