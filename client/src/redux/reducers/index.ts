import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {AuthReducer} from "./authReducers";
import storage from "redux-persist/lib/storage";



const appReducer = combineReducers({
    authReducer : AuthReducer,
    routing:routerReducer,
})

const rootReducer = (state : any,action:any) => {
    if(action.type === 'USER_LOGOUT_RESET'){
        state = undefined;
        storage.removeItem('persist:root')
    }
    return appReducer(state,action)
}

export type ApplicationState = ReturnType<typeof rootReducer >
export {rootReducer}
