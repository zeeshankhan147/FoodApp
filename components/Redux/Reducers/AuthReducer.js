import {ADD_TO_CART,UPDATE_CART,GET_CART, REMOVE_CART, REMOVE_ALL_CART, SET_USER} from "../Actions/types"


const INIT_STATE ={
    user:[],
}

export default function cartReducer(state = INIT_STATE, action) {
    switch (action.type) {
      case SET_USER:{
        return{
            ...state,
            user:action.data
          }
      }

      default:
        return state
    }
    
  }