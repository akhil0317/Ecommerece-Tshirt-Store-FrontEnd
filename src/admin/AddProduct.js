import React ,{useState,useEffect} from "react";
import Base from "../core/Base"
import {Link,Redirect} from "react-router-dom"
import {getCategories,createProduct} from "./helper/adminapicall"
import {isAuthenticated} from "../auth/helper/index"


const  AddProduct = () => {

    var  [values,setValues] = useState({
        name :"",
        description :"",
        price: "",
        stock:"",
        photo :"",
        categories: [],
        category :"",
        loading :false,
        error: "",
        createdProduct :"",
        getRedirect:false,
        formData :""

    });

    const  {user,token} = isAuthenticated();
    const {name,description,price,stock,categories,loading,error,category,createdProduct,getRedirect,formData} = values
   
    const preload = () =>{
        getCategories()
        .then(data=>{
            console.log(data);
            if(data.error)
            {
                setValues({...values, error:data.error})
            }
            else
            {
                setValues({...values,categories:data,formData: new FormData()})
            }
        })
    } 

    useEffect(()=>{
        preload()
    },[])

    const onSubmit = (event) =>{

        event.preventDefault();
        setValues({...values,error:"",loading:true});
        createProduct(user._id,token,formData)
        .then(data=>{
            if(data.error){
                    setValues({...values,error:data.error})
            }
            else{
                    setValues({error:false,loading:false,getRedirect:true,name:"",description:"",price:"",photo:"",stock:"", createdProduct:data.name})
            }
        })


    }

    const loadingMessage = ()=>{
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }


    const handleChange =(name) =>(event)=>{
        const value = name==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values,[name]:value})
    }

    const successMessage = () =>{
       return  <div className = "alert alert-success mt-3" style = {{display : createdProduct ? "" :"none"}}>
              <h4>  {createdProduct} has been created successfully!! </h4>
        </div>
    }

    const warningMessage = () =>{
        return  <div className = "alert alert-danger mt-3" style = {{display : error? "" :"none"}}>
        <h4> {error}</h4>
  </div>
    }


    // const redirect = () =>{
    //             if(getRedirect)
    //             {
    //                  setTimeout(function(){ return <Redirect to = "/admin/dashboard"/> }, 3000)
    //             }
                
    // }



    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
             {categories &&
                categories.map((category,index)=>(
                    <option value={category._id}>{category.name}</option>
                ))}
              
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );


    return (
        <Base title = "Add a Product here" description = "Welcome to product creation section" className ="container bg-info p-4">
            <Link to = "/admin/dashboard" className = "btn btn-dark bt-md mb-3">Admin Home</Link>
            <div className = "row bg-dark text-white rounded">
                <div className = "col-md-8 offset-md-2">
                    {loadingMessage()}
                    {warningMessage()}
                    {successMessage()}
                {createProductForm()}

                    
                </div>
            </div>
            </Base>
    )
}


export default AddProduct