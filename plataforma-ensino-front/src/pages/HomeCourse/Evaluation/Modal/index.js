import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Button, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ratesDescriptions } from "./data";
import { useParams } from "react-router-dom";
import { Post } from "../../../../utils/request";
import { useQueryClient, useMutation } from "react-query";

import CloseIcon from '@material-ui/icons/Close';
import styles from "../index.module.css";
import StarIcon from '@material-ui/icons/Star';

const Modal = props => {

    const {
        initialRate,
        initialComment = "",
        onClose = () => {},
        ...others
    } = props;

    const [rate, SetRate] = useState(initialRate)
    const [rateDescription, SetRateDescription] = useState(null);
    const [comment, SetComment] = useState(initialComment);

    const [loading, SetLoading] = useState(false);

    const { course_id } = useParams();
    const queryClient = useQueryClient();

    const mutation = useMutation(async (form) => await Post("courses-main/evaluations/create", form), {
        onSuccess: () => queryClient.refetchQueries(["course", course_id])
    });

    const Rate = key => SetRate(key + 1);

    const Submit = async () => {
        const form = new FormData();
        form.append("course_id", course_id);
        form.append("comment", comment);
        form.append("points", rate);
        SetLoading(true);
        mutation.mutate(form);
        SetLoading(false);
        
        onClose();
    }
    
    useEffect(() => {
        SetRate(initialRate);
        SetComment(initialComment);
    }, [initialRate, initialComment]);

    return (
        <Dialog
            {...others}
            onClose={onClose}
        >
            <DialogTitle
                align="center"
            >
                <Box
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <b>O que você achou deste curso?</b>
                    <IconButton
                        onClick={onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box
                    minWidth="20rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Typography
                        align="center"
                    >
                        <b>{rateDescription !== null ? ratesDescriptions[rateDescription]: "ㅤ"}</b>
                    </Typography>
                    <Box
                        position="relative"
                    >
                        {new Array(5).fill(undefined).map((_, key) => (
                            <StarIcon
                                key={key}
                                className={styles.star}
                                onClick={() => Rate(key)}
                                onMouseEnter={() => SetRateDescription(key)}
                                onMouseLeave={() => SetRateDescription(null)}
                            />
                        ))}
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                        >
                            {new Array(rate).fill(undefined).map((_, key) => (
                                <StarIcon
                                    key={key}
                                    className={styles.rateStar}
                                    onClick={() => Rate(key)}
                                    onMouseEnter={() => SetRateDescription(key)}
                                    onMouseLeave={() => SetRateDescription(null)}
                                />
                            ))}
                        </Box>
                    </Box>
                    <br/>
                    <TextField
                        fullWidth
                        multiline
                        value={comment}
                        placeholder="Nos conte sobre sua experiência com o nosso curso"
                        variant="outlined"
                        minRows={5}
                        maxRows={5}
                        onChange={e => SetComment(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={Submit}
                >
                    Salvar e continuar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Modal;