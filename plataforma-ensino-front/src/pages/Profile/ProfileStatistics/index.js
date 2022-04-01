import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Get } from "../../../utils/request";
import { FaBook } from "react-icons/fa";
import Card from "./Card";

const ProfileStatistics = props => {

    const { user_id } = useParams();

    const [coursesCount, SetCoursesCount] = useState(0);

    const GetData = async () => {
        let response = await Get(`user/account-statistics/${user_id}`);
        SetCoursesCount(response?.coursesCount);
    }

    useEffect(() => GetData(), []);

    return (
        <div className="statistics">
            <Card
                title="Quantidade de cursos"
                data={coursesCount}
                icon={<FaBook size={50}/>}
            />
        </div>
    );
}

export default ProfileStatistics;