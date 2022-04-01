import { Chip, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Get, Post } from "../../../../../../utils/request";

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import styles from "./index.module.css";
import DefaultButton from "../../../../../../components/DefaultButton";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import Board from "./Board";

const FilesModal = props => {

    const {
        title = "",
        onClose = () => {},
        lessonId,
        ...other
    } = props;

    const [files, SetFiles] = useState([]);
    const [loading, SetLoading] = useState(false);

    const { id } = useParams();//course_id

    const dispatch = useDispatch();

    const GetData = async () => {
        SetLoading(true);
        let response = await Get(`lessons/files?lesson=${lessonId}`);
        SetLoading(false);

        if (response?.status === true) {
            SetFiles(response?.files?.files);
        }
    }

    useEffect(GetData, []);

    return (
        <Dialog
            {...other}
            onClose={onClose}
        >
            <DialogTitle>
                <div className="w100 flex fdrow jcsb">
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className={styles.modal}>
                <div hidden={loading}>
                    {files?.map((file, fileKey) => (
                        <Board
                            key={fileKey}
                            fileKey={fileKey}
                            id={file?.id}
                            type={file?.type}
                            name={file?.name}
                            path={file?.path}
                            onUpdate={GetData}
                        />
                    ))}
                    <Typography
                        align="center"
                        hidden={files?.length !== 0}
                    >
                        Sem arquivos nessa aula
                        <br/>
                        <br/>
                    </Typography>
                </div>
                <div className="flex w100 align-center jcc" hidden={!loading}>
                    <CircularProgress/>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FilesModal;