import React from "react"
import Base from "./Base"
import Card from "./Card"
import {Link} from "react-router-dom"
const SuccessDisplay = ({products}) =>{
    return(
    <div>
    <h3 class = "text-success text-center">Pyament has been made successfully </h3>
    <h2 className = "text-info text-center">click here to view orders</h2>
    <Link className = "btn-success btn-block" to = "/user/purchases">Click here</Link>
    </div>)
    // return (
    //     <Base title = "Payment has been made successfully" description="please check the items you have ordered">
    //                  {products.map((product,index)=>{
    //         return  <Card key = {index} product = {product} addtoCart = {false}  removeFromCart = {false} ></Card>
    //     })}
    //         </Base>
    // )
}


export default SuccessDisplay