import DefaultButton from "../../../../../../../components/DefaultButton";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { STORAGE_URL } from "../../../../../../../variables";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import { Chip, InputBase, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Post } from "../../../../../../../utils/request";
import { useDispatch } from "react-redux";
import { Show } from "../../../../../../../actions/SnackbarActions";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import styles from "../index.module.css";

const Board = props => {
    const {
        id,
        type,
        path,
        name,
        fileKey,
        onUpdate = () => {}
    } = props;

    const [popup, SetPopup] = useState(false);
    const [editing, SetEditing] = useState(false);
    const [tempName, SetTempName] = useState(name);

    const editInput = useRef();

    const dispatch = useDispatch();

    const Delete = async () => {
        let form = new FormData();
        form.append("id", id);

        let response = await Post(`lessons/files/delete`, form);

        if (response?.status === true) onUpdate();

        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity
        }));
    }

    const Alter = async () => {
        let form = new FormData();
        form.append("id", id);
        form.append("name", tempName);

        let response = await Post("lessons/files/alter", form);

        if (response?.status === true) onUpdate();

        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity
        }));
    }

    useEffect(() => editing && editInput?.current?.focus(), [editing]);

    return (
        <div className={type == "video" ? styles.videoContainer : styles.documentContainer}>
            <SweetAlert
                warning
                title={"Atenção"}
                onConfirm={() => {
                    Delete();
                    SetPopup(false);
                }}
                onCancel={() => SetPopup(false)}
                show={popup}
                confirmBtnText='Deletar'
                cancelBtnText='Cancelar'
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="danger"
                showCancel={true}
            >
                Tem certeza que deseja deletar esse arquivo?
            </SweetAlert>
            
            <video
                controls={false}
                autoPlay={false}
                src={path && (STORAGE_URL + path)}
                // width="120"
                className={styles.video}
                hidden={type != "video"}
            />
            <div className={styles.filePreview} hidden={type != "document"}>
                <PictureAsPdfIcon
                    style={{
                        color: "#b83535"
                    }}
                />
            </div>
            <div 
                className="flex fdcolumn jcsb"
                style={{
                    alignItems: "start"
                }}
            >
                <Chip
                    size={"small"}
                    label={`Aula ${fileKey + 1}`}
                />
                <Typography
                    hidden={editing}
                    noWrap
                    style={{
                        textOverflow: "ellipsis",
                        width: "70%"
                    }}
                >
                    {name}
                </Typography>
                <InputBase
                    hidden={!editing}
                    value={tempName}
                    onChange={e => SetTempName(e.target.value)}
                    inputRef={editInput}
                    style={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.3)"
                    }}
                />
            </div>
            <div
                style={{
                    marginLeft: "auto",
                    alignSelf: "center"
                }}
                hidden={editing}
            >
                <DefaultButton
                    // to={`/courses/edit-lesson/${id}/${lesson_id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Editar vídeo`}
                    bg="info"
                    onClick={() => {
                        SetEditing(true);
                        SetTempName(name);
                    }}
                    icon={<MdModeEdit color="white" size={17}/>}
                    style={{
                        margin: "0 2px"
                    }}
                />
                <DefaultButton
                    onClick={() => SetPopup(true)}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Deletar vídeo`}
                    bg="danger"
                    icon={<MdDelete size={17} color="white"/>}
                    
                />
            </div>
            <div
                style={{
                    marginLeft: "auto",
                    alignSelf: "center"
                }}
                hidden={!editing}
            >
                <DefaultButton
                    // to={`/courses/edit-lesson/${id}/${lesson_id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Confirmar`}
                    bg="confirm"
                    onClick={() => {
                        SetEditing(false);
                        Alter();
                    }}
                    icon={<AiOutlineCheck color="white" size={17}/>}
                    style={{
                        margin: "0 2px"
                    }}
                />
                <DefaultButton
                    onClick={() => SetEditing(false)}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Cancelar`}
                    bg="danger"
                    icon={<AiOutlineClose size={17} color="white"/>}
                    
                />
            </div>
        </div>
    );
    return (
        <div className={styles.documentContainer}>
            {/* <iframe
                src={path && (STORAGE_URL + path + "#toolbar=0&navpanes=0&scrollbar=0")}
                className={styles.iframe}
            /> */}
            <SweetAlert
                warning
                title={"Atenção"}
                onConfirm={() => {
                    Delete();
                    SetPopup(false);
                }}
                onCancel={() => SetPopup(false)}
                show={popup}
                confirmBtnText='Deletar'
                cancelBtnText='Cancelar'
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="danger"
                showCancel={true}
            >
                Tem certeza que deseja deletar esse arquivo?
            </SweetAlert>
            <div className={styles.filePreview}>
                <PictureAsPdfIcon
                    style={{
                        color: "#b83535"
                    }}
                />
            </div>
            <div 
                className="flex fdcolumn jcsb"
                style={{
                    alignItems: "start"
                }}
            >
                <Chip
                    size={"small"}
                    label={`Aula ${fileKey + 1}`}
                />
                <Typography>
                    {name}
                </Typography>
            </div>
            <div
                style={{
                    marginLeft: "auto",
                    alignSelf: "center"
                }}
            >
                <DefaultButton
                    // to={`/courses/edit-lesson/${id}/${lesson_id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Editar nome do arquivo'`}
                    bg="info"
                    icon={<MdModeEdit color="white" size={17}/>}
                    style={{
                        margin: "0 2px"
                    }}
                />
                <DefaultButton
                    onClick={() => SetPopup(true)}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Deletar arquivo`}
                    bg="danger"
                    icon={<MdDelete size={17} color="white"/>}
                />
            </div>
        </div>
    );

}

export default Board;