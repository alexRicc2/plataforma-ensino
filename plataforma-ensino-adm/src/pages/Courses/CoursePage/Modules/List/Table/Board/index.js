import React, { useState } from "react";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillFile } from "react-icons/ai";
import DefaultButton from "../../../../../../../components/DefaultButton";
import { useParams } from "react-router";
import { Post } from "../../../../../../../utils/request";
import { useDispatch } from "react-redux";
import { Show } from "../../../../../../../actions/SnackbarActions";
import SweetAlert from "react-bootstrap-sweetalert";

const Board = props => {

    const {
        module_id,
        name,
        description,
        onDelete = () => {}
    } = props;

    const [loading, SetLoading] = useState(false);
    const [popup, SetPopup] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();

    const Delete = async () => {
        let form = new FormData();
        form.append("id", module_id);

        let response = await Post(`modules/delete`, form);

        if (response?.status === true) onDelete();

        dispatch(Show({
            message: response?.message,
            severity: response?.severity,
            show: true
        }));
    }

    return (
        <tr>
            <td>{name}</td>
            <td className="table-text-dots">{description == "" ? "---" : description}</td>
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
                    Tem certeza que deseja deletar esse módulo?
                </SweetAlert>
                <DefaultButton
                    to={`/modulos/${module_id}/${id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Ver módulo`}
                    //bg="danger"
                    loading={loading}
                    bg="warning"
                    icon={<BsFillEyeFill size={17} color="white"/>}
                    style={{
                        marginRight: "2px"
                    }}
                />
                <DefaultButton
                    to={`/modulos/editar/${module_id}/${id}`}
                    width="2.2em"
                    height="2.2em"
                    padding={0}
                    title={`Editar módulo`}
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
                    title={`Deletar módulo`}
                    bg="danger"
                    loading={loading}
                    icon={!loading && <MdDelete size={17} color="white"/>}
                />
            </td>
        </tr>
    );
}

export default Board;