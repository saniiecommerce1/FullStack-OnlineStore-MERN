import react, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import apiService from '../utils/apiService';
import {useSelector} from "react-redux";



function AddProduct(){

const [response, setResponse] =useState('')
const navigate = useNavigate() 
const token = useSelector((state) => state.product.token);  


const [product, setProduct] = useState('')

const handler=({target})=>{

if (target.name === "productPicture") {
const name = target.name
const value = target.files[0]

 setProduct((prev)=>({...prev, [name]:value}))
 return;
}
const name = target.name
const value = target.value

setProduct((prev)=>({...prev, [name]:value}))

}


//if picture upload then need formdata to post bc we need File object (filename: type:  size: )
const submitProduct = async (e) => {
 e.preventDefault()

 const formData = new FormData();
 formData.append( 'productPicture', product.productPicture, product.productPicture.name )                                 //first arg is name of input field (type=file)
 formData.append('title', product.title)
 formData.append('description', product.description)
 formData.append('price', product.price)
 formData.append('category', product.category)



 try {
  //check formDAta in network tab fetchXHR under Payload. form data in Binary form means data is passed from frontend for image
  // for title its string

   let res = await apiService.post('/product/', formData) 

if(res.data){
setResponse("Product is Added")

}
  
 
 } catch (error) {
   console.log(error)
 }
}

return(
  <>
  
<div className="main">   
<h2 className="heading">{response? response: 'Add Product'}</h2>

<form>

<div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="title">
             Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="field"
              value={product.name} onChange={handler} 
            />
          </div>


          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="description">
             Description
            </label>
            <textarea
              id="description"
              type="text"
              name="description"
              className="field resize-none"
              value={product.name} onChange={handler}></textarea> 
            
          </div>



          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="price">
             Price(Rs.)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              className="field"
              value={product.name} onChange={handler} 
            />
          </div>



          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="category">
             Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              className="field"
              value={product.name} onChange={handler} 
            />
          </div>





          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="productPicture">
              Product Image
            </label>
            <input
              id="productPicture"
              type="file"
              name="productPicture"
              accept="image/*"
              className="field"
              value={product.name} onChange={handler}
            />
          </div>


          <div className="mt-6">
            <button type="submit" value="Submit" onClick={submitProduct} className="btn">
             Add Product
            </button>
          </div>


{/* <img src="http://localhost:4000/src/productPic/images/1699560242619%20vege.jpg"/> */}

<div className="mt-6 text-center text-emerald-900">
            <Link to="/admin" className="underline text-lg">
             Goto Admin
            </Link>
          </div>

</form>

</div>
</>
 )
}

export default AddProduct;

