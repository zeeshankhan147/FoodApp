import {ADD_TO_CART,UPDATE_CART,GET_CART, REMOVE_CART} from "../Actions/types"


const INIT_STATE ={
    cartData:[],
}

export default function cartReducer(state = INIT_STATE, action) {
    switch (action.type) {
      case ADD_TO_CART:{
        let cart = [...state.cartData,action.data]
        return  {
          ...state,
          cartData: cart
        }
      }

      case UPDATE_CART:{
        return{
          ...state,
          cartData:action.data
        }
      }
      case GET_CART:{
        return{
          ...state,
          cartData:action.data
        }
      }
      case REMOVE_CART:{
        return{
          ...state,
          cartData:action.data
        }
      }

      default:
        return state
    }
    
  }