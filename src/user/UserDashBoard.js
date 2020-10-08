import React from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom"

const UserDashBoard = () =>{


    const userUpSide  = () =>{
       return  <div className = "card">
        <h4 className = "card-header text-danger text-info text-center">User Navigation</h4>
        <ul className = "list-group">
            

            <li className = "list-group-item">
                    <Link to = "/user/purchases" className = "nav-link text-primary">User Purchases</Link>
            </li>

            

        </ul>
    </div>
    }


    return (
        <Base title = "UserDashBoard page">
          
                {userUpSide()}
                
                
            
        </Base>
    )
}


export default UserDashBoard;