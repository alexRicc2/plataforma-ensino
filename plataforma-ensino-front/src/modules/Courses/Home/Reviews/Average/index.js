import { Box, LinearProgress, Typography } from "@material-ui/core";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import { ReviewsContext } from "..";

import styles from "./index.module.css";

const Average = () => {

    const { course_id } = useParams();
    const queryClient = useQueryClient();
    const { evaluationFilter, SetEvaluationFilter } = useContext(ReviewsContext) || {};

    const { status, course } = queryClient?.getQueryData(["course", course_id, `evaluation: ${evaluationFilter}`]) || {};

    const HandleFilter = points => {
        if (points == evaluationFilter) SetEvaluationFilter("");
        else SetEvaluationFilter(points);
    }

    return (
        <Box
            padding={2}
            paddingRight={8}
        >
            <Typography
                variant="h5"
                gutterBottom
            >
                <b>Avaliações de alunos</b>
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
            >
                {course?.evaluationsPerPoints?.map((value, key) => (
                    <Box
                        display="inline-flex"
                        alignItems="center"
                        key={value?.points + key}
                    >
                        <Typography
                            className={styles.text}
                        >
                            {value?.points} {value?.points == 1 ? "estrela" : "estrelas"}
                        </Typography>
                        <LinearProgress
                            value={value?.percentageRelative}
                            variant="determinate"
                            className={styles.percentageBar}
                            color="secondary"
                            onClick={() => HandleFilter(value?.points)}
                            aria-selected={evaluationFilter == value.points}
                            aria-faded={evaluationFilter != "" && evaluationFilter != value.points}
                        />
                        <Typography>
                            {value?.percentageRelative}%
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Average;