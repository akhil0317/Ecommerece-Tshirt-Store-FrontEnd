import React,{useState,useEffect} from "react";
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper/index"
import {Link} from "react-router-dom"



const AdminDashBoard = () =>{

    var name = "adminEmail"
var email  = "adminEmail"
    if(isAuthenticated()!=false)
    {
        
  var  {user:{name,email,role}} = isAuthenticated() 
 console.log(name,email)
    }

const adminLeftSide = () =>{
return (
    <div className = "card">
        <h4 className = "card-header bg-dark text-white">Admin Navigation</h4>
        <ul className = "list-group">
            <li className = "list-group-item">
                    <Link to = "/admin/create/category" className = "nav-link text-success">Create Categories</Link>
            </li>

            <li className = "list-group-item">
                    <Link to = "/admin/categories" className = "nav-link text-success">Manage Categories</Link>
            </li>



            <li className = "list-group-item">
                    <Link to = "/admin/create/product" className = "nav-link text-success">Create product</Link>
            </li>

           

            <li className = "list-group-item">
                    <Link to = "/admin/products" className = "nav-link text-success">Manage products </Link>
            </li>

            <li className = "list-group-item">
                    <Link to = "/admin/orderedProducts" className = "nav-link text-success">View Orders</Link>
            </li>
        </ul>
    </div>
)
}

const adminRightSide  = () =>{
    return (
        <div className = "card mb-4">
            <h4 className = "card-header">Admin Information</h4>
            <ul className = "list-group">
                <li className = "list-group-item">
                    <span className = "badge badge-success mr-2">Name:</span> {name}
                </li>
                <li className = "list-group-item">
                    <span className = "badge badge-success mr-2">Email:</span> {email}
                </li>
                <li className = "list-group-item">
                    <span className = "badge badge-danger mr-2">Admin area</span> 
                </li>

            </ul>
        </div>
    )
}


    return (
        <Base title = "Welecome to admin area" description = "Manage all of your products here" className = "container bg-info p-4">
            <div className = "row">
                <div className = "col-3">
                {adminLeftSide()}
                </div>
                <div className = "col-9">
                {adminRightSide()}
                </div>
            </div>
           
          
        </Base>
    )
}


export default AdminDashBoard;