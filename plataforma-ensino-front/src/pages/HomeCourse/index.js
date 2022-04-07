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
        <Box>
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
            <Typography
                variant="h4"
                align="center"
                gutterBottom
            >
                {course?.name}
            </Typography>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="stretch"
                width="100%"
                marginBottom="3em"
            >
                <Video
                    containerProps={{
                        style: {
                            flex: 1
                        }
                    }}
                    src={course?.video_trailer ? STORAGE_URL + course?.video_trailer : null}
                />
                <Box
                    flex={0.6}
                    padding={"0 3em"}
                    display="flex"
                    flexDirection="column"
                >
                    <Box
                        flex={1}
                    >
                        <Typography>
                            {isLoading ? <Skeleton/> : course?.description}
                        </Typography>
                        <Typography
                            variant="body2"
                        >
                            {isLoading ? (
                                <Skeleton/>
                            ) : 
                                <><OndemandVideoIcon/>&nbsp;{Secs2Minutes(course?.duration)} {course?.duration > 120 ? "minutos" : "minuto"} de conteúdo de vídeo</>
                            }
                        </Typography>
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