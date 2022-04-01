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
            <div className="contact-data text-center">
                <h6 className="font-weight-bold">Entre em contato</h6>
               
            </div>
            <div id="copyright" className="w100 flex jcc text-center fdcolumn">
               
                <span className="text-muted">
                    Direitos reservados Alex<br/>
                   
                </span>
            </div>
        </div>
    );
}

export default Footer;