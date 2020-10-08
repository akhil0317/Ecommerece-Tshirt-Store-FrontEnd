import {API} from "../../backend"

export const getUserPurchases = (userId,token) =>{
    return fetch(`${API}/user/${userId}`,{
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization :`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}