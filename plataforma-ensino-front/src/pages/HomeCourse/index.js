import { lazy, Suspense, useEffect, useState } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { useParams, useNavigate } from "react-router";
import { Get } from "../../utils/request";
import { Secs2Minutes } from "../../utils/transformations";

import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import Video from "../../components/Video";
import Tabs from "./Tabs";
import { STORAGE_URL } from "../../variables";
import { Skeleton } from "@material-ui/lab";
import { useQuery } from "react-query";
import Evaluation from "./Evaluation";

const HomeCourse = () => {

    const [course, SetCourse] = useState({});

    const { course_id } = useParams();
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery(["course", course_id], () => Get(`courses-main?id=${course_id}`));

    useEffect(() => {
        
        if (data?.status === true) {
            if (data?.error == "NOT_IN") navigate(`/adquire/courses/${course_id}`);
            SetCourse(data?.course);
            console.log('data: ', data)
        }
    }, [data]);
    
    return (
        <Box
        sx={{ backgroundColor: '#212121'}}

        >
            {course?.cover_image && course?.cover_image != "null" && (
                <div>
                    <Box
                        width="100%"
                        style={{
                            backgroundImage: `url("${STORAGE_URL + course?.cover_image}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            aspectRatio: "16/6"
                        }}
                    >
                        {isLoading && (
                            <Skeleton
                                style={{
                                    height: "100%",
                                    transform: "scale(1)"
                                }}
                            />
                        )}
                    </Box>
                    <br/>
                </div>
            )}
            <h4
                style={{ color: '#f7f7f7', fontSize: '1.7rem', lineHeight: 1.5, textTransform: 'capitalize', paddingLeft: '10px' }}
            >
                {course?.name}
            </h4>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="stretch"
                width="100%"
                marginBottom="3em"
                sx={{ paddingLeft: '10px', paddingRight: '10px' }}
            >
                <Video
                    containerProps={{
                        style: {
                            flex: 1
                        }
                    }}
                    src={course?.video_trailer ? STORAGE_URL + course?.video_trailer : null}
                   
                    title={'Trailer'}
                    boldTitle={course?.name}
                />
                <Box
                    flex={0.6}
                    padding={"0 3em"}
                    display="flex"
                    flexDirection="column"
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                >
                    <Box
                        flex={1}
                    >
                        <h5
                        style={{ color: '#e1e1e1' }}>
                            {isLoading ? <Skeleton/> : course?.description}
                        </h5>
                        <h5
                            style={{ color: '#e1e1e1' }}
                        >
                            {isLoading ? (
                                <Skeleton/>
                            ) :
                            course?.duration ? 
                                <><OndemandVideoIcon/>&nbsp;{Secs2Minutes(course?.duration)} {course?.duration > 120 ? "minutos" : "minuto"} de conteúdo de vídeo</>
                                :
                                <><OndemandVideoIcon/> Curso sem tempo disponível</>
                            }
                        </h5>
                        <Evaluation/>
                    </Box>
                    <br/>
                    <Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={() => navigate(`/courses/${course_id}`)}
                        >
                            Ir para o curso
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Tabs/>
            </Box>
        </Box>
    );
}

export default HomeCourse;