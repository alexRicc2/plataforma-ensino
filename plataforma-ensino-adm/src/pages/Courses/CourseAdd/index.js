import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Show } from "../../../actions/SnackbarActions";
import { Post } from "../../../utils/request";
import FormBody from "./FormBody/index.js";
import SweetAlert from "react-bootstrap-sweetalert";

const CourseAdd = () => {

    const [popup, SetPopup] = useState(false);
    const [popupMessage, SetPopupMessage] = useState("");

    const [loading, SetLoading] = useState(false);

    const userId = useSelector(store => store.AppReducer.user?.id);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Submit = async (data) => {
        if (!data?.image) {
            SetPopup(true);
            SetPopupMessage("Insira uma imagem");
            return;
        } else if (!data?.name) {
            SetPopup(true);
            SetPopupMessage("Insira um nome!");
            return;
        } else if (!data?.description) {
            SetPopup(true);
            SetPopupMessage("Insira uma descrição!");
            return;
        } else if (data?.responsibles.length == 0) {
            SetPopup(true);
            SetPopupMessage("Insira pelo menos um responsável pelo curso!");
            return;
        } else if (data?.categories.length == 0) {
            SetPopup(true);
            SetPopupMessage("Insira uma categoria!");
            return;
        }

        let form = new FormData();
        form.append("name", data.name);
        form.append("description", data.description);
        form.append("image", data.image);
        form.append("created_by", userId);
        for (let i = 0; i < data.responsibles.length; i++) form.append("responsible_id[]", data.responsibles[i]?.id);
        for (let i = 0; i < data.categories.length; i++) form.append("category_id[]", data.categories[i]?.id);
        for (let i = 0; i < data.tags.length; i++) form.append("tag_id[]", data.tags[i]?.id);

        SetLoading(true);
        let response = await Post("courses-main/create", form);
        SetLoading(false);

        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity,
            buttonActionText: "Ver",
            ButtonAction: () => navigate(`/cursos/view/${response?.courseId}`)
        }));

        if (response?.status === true) navigate("/cursos/lista");
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
                <h2 className="title">Criar curso</h2>
                <p>Aqui são criados os cursos do sistema</p>
                <br/>
                <FormBody
                    OnConfirm={data => Submit(data)}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default CourseAdd;