import { useEffect, useState } from "react";
import { Get } from "../../utils/request";

export const useMainPages = () => {

    const [courseItems, SetCourseItems] = useState([]);

    const GetData = async () => {
        let response = await Get("courses-main/category");
        let categories = [];

        if (response?.status === true) {
            for (let i = 0; i < response?.categories?.length; i++) {
                let currCategory = response?.categories[i];
                let tempCategoryItems = {};
                let tempCategoryCourses = [];

                for (let j = 0; j < currCategory?.courses?.length; j++) {
                    let currCourse = currCategory?.courses[j];
                    tempCategoryCourses.push({ label: currCourse?.name });
                }

                tempCategoryItems["label"] = currCategory?.name;
                tempCategoryItems["items"] = tempCategoryCourses;
                categories.push(tempCategoryItems);
            }
        }

        SetCourseItems([...categories]);
    }

    useEffect(GetData, []);

    return [
        {
            label: "exemplo",
            link: "/mission"
        },
        {
            label: "exemplo2",
            link: "/about"
        },
        
    ];
}

export const mainPages = [
    {
        label: "exemplo",
        link: "/mission"
    },
    {
        label: "exemplo2",
        link: "/about"
    },
    
];

//items to show when the user is already logged
export const loggedPages = [
    {
        label: "Home",
        link: "/home"
    },
    {
        label: "Minha lista",
        link: "/home/minha-lista"
    }
];
