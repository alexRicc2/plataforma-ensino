import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Show } from "../../../actions/SnackbarActions";
import { Post } from "../../../utils/request";
import FormBody from "./FormBody/index";

const CourseEdit = () => {

    const [popup, SetPopup] = useState(false);
    const [popupMessage, SetPopupMessage] = useState("");

    const [loading, SetLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector(store => store.AppReducer.user?.id);

    const { id } = useParams();

    const Submit = async (data) => {
        console.log("chamou submit" , data)
        if (!data?.image) {
            SetPopup(true);
            SetPopupMessage("Insira uma imagem!");
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
            SetPopupMessage("Insira um responsável!");
            return;
        } else if (data?.categories.length == 0) {
            SetPopup(true);
            SetPopupMessage("Insira uma categoria!");
            return;
        }

        let form = new FormData();
        form.append("id", id);
        form.append("image", data.image);
        form.append("cover_image", data.coverImage);
        form.append("name", data.name);
        form.append("description", data.description);
        form.append("created_by", userId);
        form.append("price", data?.price);
        form.append("free", data?.free);
       
        form.append("course_content", data?.courseContent);
        form.append("what_will_learn", data?.whatWillLearn);
        form.append("video_trailer", data?.videoTrailer);
        
        for (let i = 0; i < data.responsibles.length; i++) form.append("responsible_id[]", data.responsibles[i]?.id);
        for (let i = 0; i < data.categories.length; i++) form.append("category_id[]", data.categories[i]?.id);
        for (let i = 0; i < data.tags.length; i++) form.append("tag_id[]", data.tags[i]?.id);

        SetLoading(true);
        let response = await Post("courses-main/update", form);
        SetLoading(false);

        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity
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
                <h2 className="title">Editar curso</h2>
                <p>Aqui é possível editar os cursos do sistema</p>
                <br/>
                <FormBody
                    OnConfirm={data => Submit(data)}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default CourseEdit;