import { Skeleton } from "@material-ui/lab";
import TabsContainer from "../../../components/TabsContainer";
import Reviews from "../../../modules/Courses/Home/Reviews";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import { STORAGE_URL } from "../../../variables";
import CourseContent from "./CourseContent";
import Instructor from "./Instructor";

const Tabs = props => {

    const { course_id } = useParams();
    const queryClient = useQueryClient();
    
    const loading = Boolean(queryClient.isFetching(["course", course_id]));
    const { course } = queryClient.getQueryData(["course", course_id]) || {};

    return (
        <TabsContainer
            labels={[
                { label: "Conteúdo do curso" },
                { label: "O que você irá aprender" },
                { label: "Instrutores" },
                { label: "Avaliações" }
            ]}
        >
            {loading ? (
                <Skeleton
                    width="100%"
                    height="15em"
                    style={{
                        transform: "scale(1)"
                    }}
                />
            ) : (
                <div>
                    <div dangerouslySetInnerHTML={{__html: course?.course_content}}/>
                    <CourseContent
                        modules={course?.modules}
                    />
                </div>
            )}
            {loading ? (
                <Skeleton
                    width="100%"
                    height="15em"
                    style={{
                        transform: "scale(1)"
                    }}
                />
            ) : (
                <div dangerouslySetInnerHTML={{__html: course?.what_will_learn}}/>
            )}
            {loading ? (
                <div
                    style={{ width: "fit-content" }}
                >
                    <Skeleton width="14em"/>
                    <Skeleton
                        variant="circle"
                        width="6em"
                        height="6em"
                    />
                </div>
            ) : (
                <div>
                    {course?.responsibles?.map(responsible => (
                        <Instructor
                            name={responsible?.name}
                            img={STORAGE_URL + responsible?.profile_image}
                            key={responsible?.id}
                            id={responsible?.id}
                        />
                    ))}
                </div>
            )}
            <Reviews/>
        </TabsContainer>
    );
}

export default Tabs;