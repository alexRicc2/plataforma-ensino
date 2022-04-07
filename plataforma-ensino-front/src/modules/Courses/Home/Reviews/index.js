import { Box, LinearProgress, Typography } from "@material-ui/core";
import { createContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { Get } from "../../../../utils/request";

import Average from "./Average";
import List from "./List";

export const ReviewsContext = createContext(null);

const Reviews = () => {

    const [evaluationFilter, SetEvaluationFilter] = useState("");

    const { course_id } = useParams();
    const queryClient = useQueryClient();

    const { isLoading, error, data, refetch } = useQuery(["course", course_id, `evaluation: ${evaluationFilter}`], () => Get(`courses-main?id=${course_id}&evaluationFilter=${evaluationFilter ?? ""}`));
    // const { status, course } = queryClient?.getQueryData(["course", course_id]) || {};
    
    return (
        <Box 
            display="inline-flex"
            width="100%"
        >
            <ReviewsContext.Provider
                value={{
                    evaluationFilter,
                    SetEvaluationFilter
                }}
            >
                <Average/>
                <List/>
            </ReviewsContext.Provider>
        </Box>
    );
}

export default Reviews;