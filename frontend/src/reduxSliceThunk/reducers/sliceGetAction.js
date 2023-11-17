import { createSlice , combineReducers} from "@reduxjs/toolkit";
import getProducts from "./defineAsyncAction";

//This values visible for all define functions
const initialState={

token: 0,
isAdmin:false, 
userId: '',
loader: false,
allProducts :[], //list of document obj
cartItems:[],
cartItemsRes:{}  //bc using main order price calculation based from BE
}

const productSlice = createSlice({
 name: 'product',
 initialState,
 reducers:{
  //define all sync function
  // add: (state, action)=>{ state.loader = true},
  // sub: (state, action)=>{ state.loader = false},

  getTokenByResponse:(state,action)=>{  
   
   state.token = action.payload.token
   state.isAdmin = action.payload.isAdmin
   state.userId = action.payload.userId
  },

  addCartItem:(state,action)=>{  

   state.cartItems.push(action.payload)

}
 
  ,

  updateCartItem:(state,action)=>{  
   
   const {id, quantity, priceWithQuantity, cartItem} = action.payload

  const cartToUpdate = state.cartItems.find(cartItem => cartItem.id == id)
  

  cartToUpdate.quantity= quantity
  cartToUpdate.priceWithQuantity= priceWithQuantity
  cartToUpdate.cartItem= cartItem

 
  
},


removeCartItem:(state,action)=>{  
   
   const id  = action.payload
  const cartToRemove = state.cartItems.find(cartItem => cartItem.id == id)
  if (cartToRemove){
   state.cartItems = state.cartItems.filter(user => user.id != id);
  }
  else {
 
   console.error(`Cart with ID ${id} not found.`);

 }

 },

getCartItemsByResponse:(state,action)=>{  
  state.cartItemsRes = action.payload
},

clearState:(state,action)=>{  
state.token = 0
state.isAdmin = false 
state.userId = ''
state.loader = false
state.allProducts =[] //list of document obj
state.cartItems =[]
state.cartItemsRes={} 
}


 },

 extraReducers:{
 

 [getProducts.pending] : (state, action)=>{ state.loader = true},

 [getProducts.fulfilled] : (state, action)=>{ 
  state.loader = false; 
  state.allProducts = action.payload},

 [getProducts.rejected] : (state, action)=>{ state.loader = false}


 }
}
)

export const { getTokenByResponse , addCartItem, updateCartItem, removeCartItem, getCartItemsByResponse, clearState } = productSlice.actions;
export default productSlice.reducer;    
