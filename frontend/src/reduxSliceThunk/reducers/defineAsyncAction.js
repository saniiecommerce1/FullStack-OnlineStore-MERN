import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService";


const getProducts = createAsyncThunk('product' , async()=>{   //name is user for Async thunk
 const response = await apiService.get('/product/')
 return response.data;
})




export default getProducts;