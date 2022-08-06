import {ADD_TO_CART,UPDATE_CART,GET_CART, REMOVE_CART, REMOVE_ALL_CART, GET_MENU_DATA, FETCH_DATA} from "../Actions/types"


const INIT_STATE ={
    product:[],
    loader:false
}

export default function productReducer(state = INIT_STATE, action) {
    switch (action.type) {
      case GET_MENU_DATA:{
        return  {
          ...state,
          product: action.data,
          loader:false
        }
      }
      case FETCH_DATA:{
        return  {
          ...state,
          loader: action.data
        }
      }

      default:
        return state
    }
    
  }