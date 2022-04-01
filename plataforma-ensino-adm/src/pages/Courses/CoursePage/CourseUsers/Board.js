import React, { useState } from "react";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import DefaultButton from "../../../../components/DefaultButton";
import SweetAlert from "react-bootstrap-sweetalert";
import { useParams } from "react-router";
import { Post } from "../../../../utils/request";
import { Show } from "../../../../actions/SnackbarActions";
import { useDispatch } from "react-redux";
import AssignmentIcon from '@material-ui/icons/Assignment';

const Board = props => {

    const {
        id,
        name,
        email,
        OnDelete
    } = props;

    const [popup, SetPopup] = useState(false);

    const [loading, SetLoading] = useState(false);

    const course_id = useParams()["id"];
    const dispatch = useDispatch();

    const Delete = async () => {
        let form = new FormData();
        form.append("course_id", course_id);
        form.append("user_id", id);

        let response = await Post("user-course/delete", form);
        
        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity
        }));

        if (response?.status === true) OnDelete();
    }

    return (
        <tr>
            <td>{name}</td>
            <td className="table-text-dots">{email}</td>
            <td>
                <SweetAlert
                    warning
                    title="Atenção"
                    show={popup}
                    showCancel
                    cancelBtnStyle={{color: "white", textDecoration: "none"}}
                    cancelBtnCssClass="btn-danger"
                    cancelBtnText="Cancelar"
                    confirmBtnText="Excluir"
                    onConfirm={() => {
                        SetPopup(false);
                        Delete();
                    }}
                    onCancel={() => SetPopup(false)}
                >
                    Deseja mesmo remover a conta com e-mail '{email}' do curso?
                </SweetAlert>
                <DefaultButton
                    to={`/profile/view/${id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Ver perfil`}
                    bg="danger"
                    loading={loading}
                    bg="warning"
                    icon={<BsFillEyeFill size={17} color="white"/>}
                    style={{
                        marginRight: "2px"
                    }}
                />
                <DefaultButton
                    to={`/courses/exercises-statistics/${course_id}/${id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Ver exercícios realizados`}
                    bg="danger"
                    loading={loading}
                    bg="info"
                    icon={<AssignmentIcon fontSize={"small"}/>}
                    style={{
                        marginRight: "2px"
                    }}
                />
                <DefaultButton
                    onClick={() => SetPopup(true)}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Remover aluno`}
                    bg="danger"
                    loading={loading}
                    icon={!loading && <MdDelete size={17} color="white"/>}
                />
            </td>
        </tr>
    );
}

export default Board;