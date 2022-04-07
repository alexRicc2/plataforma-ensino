import { Box } from "@material-ui/core";

import StarIcon from '@material-ui/icons/Star';
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import styles from "./index.module.css";
import Modal from "./Modal";

const Evaluation = () => {

    const [modal, SetModal] = useState(false);
    const [initialRate, SetInitialRate] = useState(0);
    const [defaultRate, SetDefaultRate] = useState(0);
    const [initialComment, SetInitialComment] = useState("");

    const queryClient = useQueryClient();
    const { course_id } = useParams();

    const { course } = queryClient.getQueryData(["course", course_id]) || {};

    const CloseModal = () => {
        SetModal(false);
        SetInitialRate(defaultRate);
    }
    const OpenModal = key => {
        SetInitialRate(key + 1);
        SetModal(true);
    }

    useEffect(() => {
        SetInitialRate(parseInt(course?.rate?.points) || 0);
        SetDefaultRate(parseInt(course?.rate?.points) || 0);
        SetInitialComment(course?.rate?.comment);
    }, [course]);

    return (
        <Box>
            <Box
                position="relative"
            >
                {new Array(5).fill(undefined).map((_, key) => (
                    <StarIcon
                        key={key}
                        className={styles.star}
                        onClick={() => OpenModal(key)}
                    />
                ))}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                >
                    {new Array(initialRate).fill(undefined).map((_, key) => (
                        <StarIcon
                            key={key}
                            className={styles.rateStar}
                            onClick={() => OpenModal(key)}
                        />
                    ))}
                </Box>
            </Box>
            <Modal
                open={modal}
                onClose={CloseModal}
                initialRate={initialRate}
                initialComment={initialComment}
            />
        </Box>
    );
}

export default Evaluation;