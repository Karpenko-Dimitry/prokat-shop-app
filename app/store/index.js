import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReduser from "./slicers/productsSlicer";
import categoriesSlicer from "./slicers/categoriesSlicer";
import cartSlicer from "./slicers/cartSlicer";
import favoritsSlicer from "./slicers/favoritsSlicer";
import clientInfoSlicer from "./slicers/clientInfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
    productsStore: productsReduser,
    categoriesStore: categoriesSlicer,
    cartStore: cartSlicer,
    favoritsStore: favoritsSlicer,
    clientInfoStore: clientInfoSlicer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                warnAfter: 128
            },
            immutableCheck: { warnAfter: 128 },
        }),
})

export const persistor = persistStore(store);
export default store;