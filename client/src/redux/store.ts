import {createStore,applyMiddleware} from "redux"; // defaults to localStorage for web
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { logger } from 'redux-logger';
import {rootReducer } from "./reducers";


const persistConfig = {
    key : 'root',
    storage : storage,
    blacklist :['navigation']
}

const persistedReducer = persistReducer(persistConfig,rootReducer );

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk,logger))
)

const persistor = persistStore(store);

export {store,persistor}
