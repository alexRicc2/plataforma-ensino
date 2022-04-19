import React from "react";
import NoAuth from "./NoAuth";

import "./index.css";
import { useSelector } from "react-redux";

const Footer = () => {
    
    return (
        <div className="footer">
            <h2>Plataforma</h2>
            <ul>
            <li>Sugira um curso</li>
            <li>Sobre a plataforma</li>
            <li>Sugira uma funcionalidade</li>
            </ul>

            <div>
                Nos siga nas redes sociais
                <ul>
                <li>youtube</li>
                <li>instagram</li>
                <li>playstore</li>
                <li>apple</li>

                </ul>
            </div>
        </div>
    );
}

export default Footer;