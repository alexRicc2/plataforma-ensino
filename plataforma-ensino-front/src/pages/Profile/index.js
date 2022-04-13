import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProfileBasicInfo from "./ProfileBasicInfo";
import ProfileStatistics from "./ProfileStatistics";
import "./index.css"
const Profile = () => {

    return (
        <div style={{  minHeight: '100vh', backgroundColor: '#212121' }}>
        <div className="card"
            style={{ backgroundColor: "#212121", borderRadius: 0 }}
        >
            <div className="card-body"
            >
                <ProfileBasicInfo/>
                <br/>
               
                
            </div>
        </div>

        </div>
    );
}

export default Profile;