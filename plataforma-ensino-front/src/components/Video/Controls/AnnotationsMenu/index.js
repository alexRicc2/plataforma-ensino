import { Dialog, DialogContent, DialogTitle, IconButton, TextField, Button, DialogActions, Typography } from "@material-ui/core";

import { useState } from "react";
import { useParams } from "react-router";
import { Post } from "../../../../utils/request";

import PostAddIcon from '@material-ui/icons/PostAdd';
import CloseIcon from '@material-ui/icons/Close';
import styles from "./index.module.css";
import { Secs2Time } from "../../../../utils/transformations";

const AnnotationsMenu = props => {

    const {
        currentTime,
        onModalOpen = () => {},
        onModalClose = () => {},
        onSubmit = () => {},
        ...others
    } = props;

    const [modal, SetModal] = useState(false);
    const [message, SetMessage] = useState("");
    const [targetTime, SetTargetTime] = useState(null);//targetTime is to get the current time for when the user opens the modal

    const { file_id } = useParams();

    const HandleOpenModal = () => {
        SetModal(true);
        onModalOpen();
        SetTargetTime(currentTime);
    }
    const HandleCloseModal = () => {
        SetModal(false);
        onModalClose();
        SetTargetTime(null);
    }

    const Submit = async () => {
        let form = new FormData();
        form.append("file_id", file_id);
        form.append("video_time", targetTime);
        form.append("message", message);

        let response = await Post("lessons/annotations/create", form);
        
        SetMessage("");
        HandleCloseModal();
        onSubmit();
    }

    return (
        <>
            <IconButton
                onClick={HandleOpenModal}
                {...others}
            >
                <PostAddIcon htmlColor="white"/>
            </IconButton>
            <Dialog
                open={modal}
                onClose={HandleCloseModal}
                PaperProps={{
                    style: { maxWidth: "none" }
                }}
            >
                <DialogTitle>
                    <div className="flex fdrow jcsb align-center w100">
                        <Typography>Adicionar anotação no tempo {Secs2Time(targetTime)}</Typography>
                        <IconButton onClick={HandleCloseModal}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent
                    className={styles.content}
                >
                    <TextField
                        label="Anotações"
                        multiline
                        maxRows={8}
                        minRows={4}
                        helperText={"Obs: Somente você poderá ver suas anotações."}
                        variant="filled"
                        fullWidth
                        value={message}
                        onChange={e => SetMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={HandleCloseModal}
                        variant="outlined"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={Submit}
                        variant="outlined"
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AnnotationsMenu;