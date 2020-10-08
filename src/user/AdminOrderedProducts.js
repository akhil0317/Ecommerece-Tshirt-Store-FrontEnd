import React ,{useEffect,useState}from "react"
import {isAuthenticated} from "../auth/helper/index"
import {getUserPurchases} from "./helper/userapicalls"
import Card from "../core/Card" 
import Base from "../core/Base"

const AdminPurchases = () =>{
  const {user,token } =   isAuthenticated()
    const [userDetails,setUserDetails] = useState({
        purchases:[]
    })
    useEffect(()=>{
        getUserPurchases(user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)        
            }
            else{
                    
                    setUserDetails(data)
                    
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const orderDetails = () =>{
        return (
            <Base title = "Order summary" description= "check the orders you have made ">
                   
          
            <div class="row">
               
                <div className = "col-6 offset-3">
                    
                    { userDetails.purchases.map((product,index)=>{
                    return  <Card key = {index} addtoCart = {false} removeFromCart = {false} product = {product}/>
           })}
                </div>
            </div>
            
            </Base>
            
        )
    }
    
       
  
const emptyOrderDetails = () =>{
    return (
        <Base title = "Order summary" description= "check the orders you have made ">
        <h3 className = "text-center text-warning">You have not placed any orders yet!!</h3>
        </Base>
    )
}

return(
                    <div>
                    {userDetails && userDetails.purchases.length>0 ? orderDetails() : emptyOrderDetails()}
                
                    </div>
            )   

}
export default AdminPurchases;