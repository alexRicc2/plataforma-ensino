import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Get } from "utils/request";
import DocumentContainer from "./Document";
import Navigator from "./Navigator";
import VideoContainer from "./Video/";

import styles from "./index.module.css";
import TabsContainer from "components/TabsContainer";
import AboutCourse from "./TabsContent/AboutCourse";
import Exercise from "./Exercise";
import AboutLesson from "./TabsContent/AboutLesson";

const CourseView = () => {

    const [courseDescription, SetCourseDescription] = useState("");
    const [lesson, SetLesson] = useState("");
    const [name, SetName] = useState("");
    const [modules, SetModules] = useState([]);

    const [path, SetPath] = useState("");
    const [type, SetType] = useState("");
    const [next, SetNext] = useState("");
    const [prev, SetPrev] = useState("");
    const [duration, SetDuration] = useState(0);

    const { course_id, file_id } = useParams();

    const history = useHistory();

    const GetData = async () => {
        if (course_id === undefined) return;
        let response = await Get(`courses-main?id=${course_id}`);
        if (response?.status === true) {
            SetModules(response?.course?.modules);
            SetCourseDescription(response?.course?.courseDescription);
            SetName(response?.course?.name);
            if (response?.course?.lastSeenLesson && file_id == undefined) {
                history.push(`/courses/${course_id}/${response?.course?.lastSeenLesson?.file_id}`);
            } else if (response?.course?.first_file_id !== undefined && file_id == undefined) {
                history.push(`/courses/${course_id}/${response?.course?.first_file_id}`);
            }
        }
    }

    const GetFileData = async () => {
        if (file_id === undefined) return;
        let response = await Get(`lessons/files?id=${file_id}`);
        // console.log(response);
        if (response?.status === true) {
            SetLesson(response?.lesson);
            SetPath(response?.file?.path);
            SetType(response?.file?.type);
            SetNext(response?.next);
            SetPrev(response?.prev);
            SetDuration(parseFloat(response?.file?.duration));
        }
    }

    useEffect(GetData, [course_id]);
    useEffect(GetFileData, [file_id]);

    return (
        <Box className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.previewHolder}>
                    <VideoContainer
                        path={path}
                        type={type}
                        next={next}
                        prev={prev}
                        onUpdate={GetData}
                    />
                    <DocumentContainer
                        path={path}
                        type={type}
                        duration={duration}
                        onUpdate={GetData}
                    />
                </div>
                
                <TabsContainer
                    labels={[
                        {
                            label: "Sobre o curso"
                        }, 
                        {
                            label: "Sobre a aula"
                        },
                        {
                            label: "Exercícios"
                        },
                        {
                            label: "Conteúdo",
                            className: "d-block d-xl-none"
                        }
                    ]}
                >
                    <AboutCourse
                        description={courseDescription}
                    />
                    <AboutLesson
                        lesson={lesson}
                    />
                    <Exercise/>
                    <Navigator
                        modules={modules}
                        className={styles.navigatorSmallScreen}
                    />
                </TabsContainer>
            </div>

            <Navigator
                modules={modules}
                className={styles.navigator}
            />
        </Box>
    );
}

export default CourseView;
