import { configureStore } from "@reduxjs/toolkit";
import productsReduser from "./slicers/productsSlicer";
import categoriesSlicer from "./slicers/categoriesSlicer";
import cartSlicer from "./slicers/cartSlicer";
import favoritsSlicer from "./slicers/favoritsSlicer";

export default configureStore({
    reducer: {
        productsStore: productsReduser,
        categoriesStore: categoriesSlicer,
        cartStore: cartSlicer,
        favoritsStore: favoritsSlicer
    }
})