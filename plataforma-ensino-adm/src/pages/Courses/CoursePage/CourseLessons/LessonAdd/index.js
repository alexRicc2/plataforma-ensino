import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Show } from "../../../../../actions/SnackbarActions";
import { Post } from "../../../../../utils/request";
import FormBody from "./FormBody";

const LessonAdd = () => {

    const [loading, SetLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { module_id, course_id } = useParams();

    const Submit = async (data) => {
        let form = new FormData();
        form.append("course_id", "course_id");
        form.append("module_id", module_id);
        form.append("title", data?.title);
        form.append("description", data?.description);
        for (let i = 0; i < data?.videos.length; i++) form.append("videos[]", data?.videos[i]);
        for (let i = 0; i < data?.files.length; i++) form.append("files[]", data?.files[i]);
        form.append("questions", data?.questions);
        form.append("allow_answer_reveal", data?.answerReveal);
        form.append("min_percentage", data?.minCorrectPercentage);

        let response = await Post("lessons/create", form);

        console.log(response);
        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity
        }));

        if (response?.status === true) navigate(`/modulos/${module_id}/${course_id}`);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="title">Criar aula</h2>
                <p>Aqui são criados as aulas do sistema</p>
                <br/>
                <FormBody
                    OnConfirm={data => Submit(data)}
                />
            </div>
        </div>
    );
}

export default LessonAdd;