import {createStore, combineReducers} from 'redux'
import ContactReducer from '../reducer/ContactReducer'

const appReducer= combineReducers(
    {
        ContactReducer,       

    }
)
const rootReducer=(state,action)=>{
    return appReducer(state, action)

}


const Store = createStore( rootReducer,{})

export default Store;