import {combineReducers} from 'redux'
import authReducer from './authReducer'
import ProductsReducer from './productsReducer'

const RootReducer=combineReducers({
        'auth':authReducer,
        'products':ProductsReducer
})

export default RootReducer;