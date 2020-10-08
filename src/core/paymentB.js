import React , {useState,useEffect} from "react"
import {loadCart, cartEmpty} from "./helper/cartHelper"
import {Link} from "react-router-dom";
import {getmeToken,processPayment} from "./helper/paymentHelper"
import {createOrder} from "./helper/OrderHelper"
import {isAuthenticated} from "../auth/helper"
import DropIn from "braintree-web-drop-in-react"
 
const Paymentb = ({products,setReload= f=>f ,reload = undefined}) => {

    const [info,setInfo] = useState({
        loading:false,
        success: false,
        clientToken : null,
        error :"",
        instance:{}
    })  
        let userId  = null;
        let token = null;
        if(isAuthenticated())
        {
         userId = isAuthenticated().user._id
         token = isAuthenticated().token
        }

        const showbtdropIn = () =>{
            return (
                <div>
                    {products && info.clientToken!==null && products.length>0 ? (
                      <div>
                      <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                      />
                      <button className = "btn btn-success btn-block" onClick={onPurchase}>Buy</button>
                    </div>
                    ) : (
                        <div>
                            <h3> Please add items to cart</h3>
                            </div>
                    ) }
                </div>
            )
        }

        const getToken = (userId,token) =>{
                getmeToken(userId,token)
                .then(info=>{
                    console.log("information",info);
                    if(info.error){
                        setInfo({...info,error:info.error})
                    }
                    else{
                            const clientToken = info.clientToken
                            setInfo({clientToken})                        
                    }
                })
                .catch()
        }

        useEffect(()=>{
            
            getToken(userId,token)
        },[])


       

        const onPurchase = () => {
            setInfo({loading: true})
            let nonce;
            let getNonce = info.instance
            .requestPaymentMethod()
            .then(data=>{
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce : nonce,
                    amount: getAmount()
                }
                processPayment(userId,token,paymentData)
                .then(response=>{
                    console.log("PAYMENT SUCCESS")
                    setInfo({...info,success:response.success,loading:false})
                    const orderData = {
                        products: products,
                        transaction_id :response.transaction.id,
                        amount:response.transaction.amount
                    }
                    createOrder(userId,token,orderData)
                    .then(data=>{
                        if(data.error){
                                console.log(data.error)
                        }
                        else{
                                console.log(data);
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    // cartEmpty(()=>{
                    //     console.log("did we got a crash ")
                    // })

                    setReload(!reload)
                })
                .catch(error=>{
                    setInfo({loading:false,error:error,success:false})
                })
            })
        }


        const getAmount = () =>{
            let amount = 0;
            if(products&& products.length>0){
            products.map((p)=>{
               amount =  amount+p.price
            })
        }
            return amount;
        }

    return (
        <div>
            <h3> Bill amount is {getAmount()}$</h3>
            {showbtdropIn()}
            </div>
    )
}

export default Paymentb