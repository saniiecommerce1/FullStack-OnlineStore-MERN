import {configureStore } from "@reduxjs/toolkit";
import productSlice from './reducers/sliceGetAction'


const store = configureStore({
 reducer: {product : productSlice }
})




export default store;

