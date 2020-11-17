import React, {useState,useEffect} from "react";
// import "../styles.css"
 import {API} from "../../backend"
 import Base from "../Base"
import Card from "../Card"
import {loadCart,cartEmpty} from "./cartHelper"
import  Paymentb from "../paymentB"
import {isAuthenticated} from "../../auth/helper/index"
import {Link} from "react-router-dom"
import  SuccessDisplay from "../PaymentSuccessPage"

const Cart = () =>{

    const {user}  = isAuthenticated();
    const [products,setProducts] = useState([])
    const [reload,setReload] = useState(false);
    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadAllProducts =  (products) =>{
       return (
           <div>
               {products.map((product,index)=>{
                   return  <Card key = {index} product = {product} addtoCart = {false}  removeFromCart = {true}  reload = {reload} setReload = {setReload}></Card>
               })}
           </div>
       )
    }
const makeCartEmpty = () =>
{
     cartEmpty(()=>{
                        console.log("did we got a crash ")
                    })
}

// const PaymentSuccess = () =>{

//     return (
       
//               <div>
//         {products.map((product,index)=>{
//             return  <Card key = {index} product = {product} addtoCart = {false}  removeFromCart = {false} ></Card>
//         })}
         
//     </div>
        
      
//     )
// }

    const loadCheckout=  () =>{
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
     }

    return (
        <Base title = "Cart Page" description="Ready to check out">
           <div className = "row text-center">

            <div className =  "col-6">
                {products && products.length>0 ? loadAllProducts(products) : (
                    <h3>No Products in Cart</h3>
                )}
            </div>   
            <div className =  "col-6">
            {user  ? (
                     <Paymentb products = {products} setReload = {setReload}/>
            ) : (
                <div>
                <h3>Please log in to make a purchase</h3>
                <Link className = "btn btn-success btn-block" to = "/signin">Login</Link>
                </div>
            )} 
                </div>         
            
                    {/* {reload  && localStorage.getItem("payment") &&( <div>
                        <SuccessDisplay products = {products}></SuccessDisplay>
                        {reload && makeCartEmpty()}
                        </div>
                    )} */}
                  
                   
           </div>
        </Base>
    )
    }


    export default Cart;