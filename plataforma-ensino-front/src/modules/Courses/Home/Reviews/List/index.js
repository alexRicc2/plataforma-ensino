import { Avatar, Box, CircularProgress, Typography } from "@material-ui/core";
import StarsRate from "../../../../../components/StarsRate";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import { STORAGE_URL } from "../../../../../variables";
import { ReviewsContext } from "..";

import styles from "./index.module.css";

const List = () => {

    const { course_id } = useParams();
    const queryClient = useQueryClient();
    const { evaluationFilter, SetEvaluationFilter } = useContext(ReviewsContext) || {};

    const { status, course } = queryClient?.getQueryData(["course", course_id, `evaluation: ${evaluationFilter}`]) || {};

    return (
        <Box
            flex={1}
            paddingTop={2}
        >
            <Typography
                variant="h5"
            >
                <b>Comentários das avaliações</b>
            </Typography>
            <br/>
            {queryClient.isFetching(["course", course_id, `evaluation: ${evaluationFilter}`]) ? (
                <Box
                    width="100%"
                    minHeight="5em"
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"center"}
                >
                    <CircularProgress/>
                </Box>
            ) : (
                course?.evaluations?.length == 0 ? (
                    <Typography>
                        Sem resultados
                    </Typography>
                ) : (
                    <Box
                        display="flex"
                        flexDirection="column"
                    >
                        {course?.evaluations?.map(evaluation => (
                            <Box
                                id={evaluation?.id}
                                key={evaluation?.id}
                                display="flex"
                                flexDirection="column"
                            >
                                <Box
                                    display="inline-flex"
                                    alignItems="center"
                                    marginBottom={1.5}
                                >
                                    <Avatar
                                        src={evaluation?.user?.profile_image ? STORAGE_URL + evaluation?.user?.profile_image : null}
                                        className={styles.avatar}
                                    />
                                    <Typography>
                                        {evaluation?.user?.name}
                                    </Typography>
                                </Box>
                                <StarsRate rate={parseInt(evaluation?.points)}/>
                                <Typography>
                                    {evaluation?.comment}
                                </Typography>
                                <hr/>
                            </Box>
                        ))}
                    </Box>
                )
            )}
            
        </Box>
    );
}

export default List;