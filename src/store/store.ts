import {configureStore} from '@reduxjs/toolkit'
 import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import storage from 'redux-persist/storage'
import reducers from "../reducer";
import { persistStore, persistReducer } from 'redux-persist'
import stateReducer from "./stateSlice"; // Import your stateSlice


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login'] // only navigation will be persisted
  }

  const persistedReducer = persistReducer(persistConfig, reducers)

  export const store = configureStore({
   
    reducer:{
         data: persistedReducer,
         globalState: stateReducer, // Ensure this matches what you're calling in useSelector
    },
     
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)