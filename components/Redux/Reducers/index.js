import {combineReducers} from "redux";
import cartReducer from "./CartReducer"
const reducer = combineReducers({
    cart:cartReducer,

  })
export default reducer;