import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice'; 
import complaintReducer from './complaints/complaintSlice';
import adminReducer from './admin/adminSlice';  
import noticeReducer from './notice/noticeSlice' ;
import billReducer from './bill/billSlice'; 

const rootReducer = combineReducers({ 
    user: userReducer, 
    complaint: complaintReducer,
    admin: adminReducer,
    notice:noticeReducer,
    bill:billReducer,
})
const persistConfig = {
    key: 'root',
    storage,
    version: 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

