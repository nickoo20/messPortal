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
import complaintSlice from './complaints/complaintSlice';

const rootReducer = combineReducers({ 
    user: userReducer, 
    complaint: complaintSlice,
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
