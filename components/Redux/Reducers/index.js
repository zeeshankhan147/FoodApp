import {combineReducers} from "redux";
import cartReducer from "./CartReducer"
import authReducer from "./AuthReducer"
import productReducer from "./ProductReducer"
import orderReducer from "./OrdersReducer"
const reducer = combineReducers({
    cart:cartReducer,
    auth:authReducer,
    menu:productReducer,
    orders:orderReducer,

  })
export default reducer;