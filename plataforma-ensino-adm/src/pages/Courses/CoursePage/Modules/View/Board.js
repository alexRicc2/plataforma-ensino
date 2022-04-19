import React, { useState } from "react";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import DefaultButton from "../../../../../components/DefaultButton";
import SweetAlert from "react-bootstrap-sweetalert";
import { Post } from "../../../../../utils/request";
import { Show } from "../../../../../actions/SnackbarActions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const Board = props => {

    const {
        lesson_id,
        name,
        OnDelete
    } = props;

    const [popup, SetPopup] = useState(false);

    const [loading, SetLoading] = useState(false);

    const dispatch = useDispatch();

    const { module_id, course_id } = useParams();

    const Delete = async () => {
        let form = new FormData();
        form.append("id", lesson_id);

        SetLoading(true);
        let response = await Post("lessons/delete", form);
        SetLoading(false);

        if (response?.status) {
            dispatch(Show({
                show: true,
                message: response?.message,
                severity: response?.severity
            }));
            OnDelete();
        }
    }

    return (
        <tr>
            <td>{name}</td>
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
                <DefaultButton
                    to={`/modulos/${module_id}/${course_id}/lesson/${lesson_id}/editar`}
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