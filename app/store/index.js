import { configureStore } from "@reduxjs/toolkit";
import productsReduser from "./slicers/productsSlicer";
import categoriesSlicer from "./slicers/categoriesSlicer";

export default configureStore({
    reducer: {
        productsStore: productsReduser,
        categoriesStore: categoriesSlicer,
    }
})