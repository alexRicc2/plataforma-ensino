import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Show } from "../../../../../actions/SnackbarActions";
import { Post } from "../../../../../utils/request";
import FormBody from "./FormBody";
import SweetAlert from "react-bootstrap-sweetalert";

const ModuleAdd = () => {

    const [popup, SetPopup] = useState(false);
    const [popupMessage, SetPopupMessage] = useState("");

    const [loading, SetLoading] = useState(false);

    const userId = useSelector(store => store.AppReducer.user?.id);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { course_id } = useParams();

    const Submit = async (data) => {
        if (!data?.name) {
            SetPopup(true);
            SetPopupMessage("Insira um nome!");
            return;
        }

        let form = new FormData();
        form.append("name", data.name);
        form.append("course_id", course_id);

        SetLoading(true);
        let response = await Post("modules/create", form);
        SetLoading(false);

        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity
        }));

        if (response?.status === true) navigate(`/cursos/ver/${course_id}?tab=0`);
    }

    return (
        <div className="card">
            <SweetAlert
                warning
                show={popup}
                title="Atenção!"
                confirmBtnText="Ok"
                onConfirm={() => SetPopup(false)}
            >
                {popupMessage}
            </SweetAlert>
            <div className="card-body">
                <h2 className="title">Criar módulo</h2>
                <p>Aqui são criados os módulos dos cursos do sistema</p>
                <br/>
                <FormBody
                    OnConfirm={data => Submit(data)}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default ModuleAdd;