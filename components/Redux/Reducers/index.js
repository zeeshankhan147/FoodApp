import {combineReducers} from "redux";
import cartReducer from "./CartReducer"
import authReducer from "./AuthReducer"
import productReducer from "./ProductReducer"
const reducer = combineReducers({
    cart:cartReducer,
    auth:authReducer,
    menu:productReducer,

  })
export default reducer;