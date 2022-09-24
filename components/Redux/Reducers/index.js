import { combineReducers } from "redux";
import cartReducer from "./CartReducer"
import authReducer from "./AuthReducer"
import productReducer from "./ProductReducer"
import orderReducer from "./OrdersReducer"
import theme from "./ThemeReducer"
const reducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  menu: productReducer,
  orders: orderReducer,
  colors: theme,

})
export default reducer;