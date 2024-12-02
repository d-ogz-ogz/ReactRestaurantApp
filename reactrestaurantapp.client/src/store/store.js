import { createStore, applyMiddlware, combineReducers } from ' redux';
import thunk from "redux-thunk";
import orderReducer from "../reducers/OrderReducer";
import productReducer from "../reducers/ProductReducer";
import authReducer from "../reducers/AuthReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
    product: productReducer,

})

const store = createStore(rootReducer, applyMiddlware(thunk))
export default store;