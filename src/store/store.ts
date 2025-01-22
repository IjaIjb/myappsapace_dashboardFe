import {configureStore} from '@reduxjs/toolkit'
 import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import storage from 'redux-persist/storage'
import reducers from "../reducer";
import { persistStore, persistReducer } from 'redux-persist'



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login'] // only navigation will be persisted
  }

  const persistedReducer = persistReducer(persistConfig, reducers)

  export const store = configureStore({
   
    reducer:{
         data: persistedReducer,
    },
     
})

export const persistor = persistStore(store)