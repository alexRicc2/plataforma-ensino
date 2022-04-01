import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProfileBasicInfo from "./ProfileBasicInfo";
import ProfileStatistics from "./ProfileStatistics";

const Profile = () => {

    return (
        <div className="card">
            <div className="card-body">
                <ProfileBasicInfo/>
                <br/>
               
                
            </div>
        </div>
    );
}

export default Profile;