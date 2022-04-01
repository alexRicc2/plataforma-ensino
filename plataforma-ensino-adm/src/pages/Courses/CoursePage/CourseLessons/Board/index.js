import React, { useState } from "react";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillFile } from "react-icons/ai";
import DefaultButton from "../../../../../components/DefaultButton";
import { useParams } from "react-router";
import FilesModal from "./FilesModal";
import { Post } from "../../../../../utils/request";
import { useDispatch } from "react-redux";
import { Show } from "../../../../../actions/SnackbarActions";
import SweetAlert from "react-bootstrap-sweetalert";

const Board = props => {

    const {
        lesson_id,
        name,
        description,
        onDelete = () => {}
    } = props;

    const [loading, SetLoading] = useState(false);
    const [filesModal, SetFilesModal] = useState(false);
    const [popup, SetPopup] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();

    const Delete = async () => {
        let form = new FormData();
        form.append("id", lesson_id);

        let response = await Post(`lessons/delete`, form);

        if (response?.status === true) onDelete();

        dispatch(Show({
            message: response?.message,
            severity: response?.severity,
            show: true
        }));
    }

    return (
        <tr id={lesson_id}>
            <td>{name}</td>
            <td className="table-text-dots">{description}</td>
            <td>
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
                    Tem certeza que deseja deletar essa aula?
                </SweetAlert>
                <FilesModal
                    open={filesModal}
                    onClose={() => SetFilesModal(false)}
                    lessonId={lesson_id}
                    title={name}
                />
                <DefaultButton
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Ver arquivos da aula`}
                    bg="secondary"
                    icon={<AiFillFile size={17} color="white"/>}
                    style={{
                        marginRight: "2px"
                    }}
                    onClick={() => SetFilesModal(true)}
                />
                <DefaultButton
                    to={`/curso/${id}/aula/${lesson_id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Ver aula`}
                    //bg="danger"
                    loading={loading}
                    bg="warning"
                    icon={<BsFillEyeFill size={17} color="white"/>}
                    style={{
                        marginRight: "2px"
                    }}
                />
                <DefaultButton
                    to={`/courses/edit-lesson/${id}/${lesson_id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Editar aula`}
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
                    title={`Deletar aula`}
                    bg="danger"
                    loading={loading}
                    icon={!loading && <MdDelete size={17} color="white"/>}
                />
            </td>
        </tr>
    );
}

export default Board;