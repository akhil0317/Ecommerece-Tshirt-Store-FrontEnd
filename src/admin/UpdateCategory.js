import React ,{useState,useEffect} from "react";
import Base from "../core/Base"
import {Link,Redirect} from "react-router-dom"
import {getCategory,UpdateCategory} from "./helper/adminapicall"
import {isAuthenticated} from "../auth/helper/index"


const  UpdateACategory = ({match}) => {

    var  [values,setValues] = useState({
        name :"",
        loading :false,
        error: "",
        createdCategory :"",
        getRedirect:false,
        categories: []

    });

    const  {user,token} = isAuthenticated();
    const {name,loading,error,getRedirect,categories,createdCategory} = values
   
    const preload = (categoryId) =>{
        getCategory(categoryId)
        .then(data=>{
            console.log(data);
            if(data.error)
            {
                setValues({...values, error:data.error})
            }
            else
            {
                    setValues({...values,
                    name: data.name
                })
            }
        })
    }

    useEffect(()=>{
        preload(match.params.categoryId)
    },[])

    const onSubmit = (event) =>{

        event.preventDefault();
        setValues({...values,error:"",loading:true});
        UpdateCategory(match.params.categoryId,user._id,token,{name})
        .then(data=>{
            if(data.error){
                    setValues({...values,error:data.error})
            }
            else{
                    setValues({error:false,loading:false,getRedirect:true,name:"",createdCategory:data.name})
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


    const handleChange =(event)=>{
        
     
         setValues({...values,name:event.target.value})
    }

    const successMessage = () =>{
       return  <div className = "alert alert-success mt-3" style = {{display : createdCategory ? "" :"none"}}>
              <h4>  {createdCategory} has been updated successfully!! </h4>
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



    const createCategoryForm = () => (
        <form >
          
          <div className="form-group mt-3">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="EX:SUMMER"
              value={name}
            />
          </div>

          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Update Product
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
                {createCategoryForm()}

                    
                </div>
            </div>
            </Base>
    )
}


export default UpdateACategory