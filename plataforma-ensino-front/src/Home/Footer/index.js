import React from "react";
import NoAuth from "./NoAuth";

import "./index.css";
import { useSelector } from "react-redux";

const Footer = () => {
    
    return (
        <div 
            className="footer"
            
        >
            {/* <NoAuth/> */}
            <div >
                <h6>Entre em contato</h6>
               
            </div>
            <div >
               
                <span >
                    Direitos reservados Alex<br/>
                   
                </span>
            </div>
        </div>
    );
}

export default Footer;