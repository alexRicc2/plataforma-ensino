import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Show } from "../../../../../actions/SnackbarActions";
import { Post } from "../../../../../utils/request";
import FormBody from "./FormBody";

const LessonEdit = () => {

    const [loading, SetLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const { module_id, course_id, lesson_id } = useParams();

    const Submit = async (data) => {
        let form = new FormData();
        form.append("id", lesson_id);
        form.append("title", data?.title);
        form.append("description", data?.description);
        for (let i = 0; i < data?.videos.length; i++) form.append("videos[]", data?.videos[i]);
        for (let i = 0; i < data?.docs.length; i++) form.append("files[]", data?.docs[i]);
        for (let i = 0; i < data?.videosToDelete.length; i++) form.append("videos_to_delete[]", data?.videosToDelete[i]);
        for (let i = 0; i < data?.docsToDelete.length; i++) form.append("docs_to_delete[]", data?.docsToDelete[i]);
        form.append("questions", data?.questions);
        form.append("allow_answer_reveal", data?.answerReveal);
        form.append("min_percentage", data?.minCorrectPercentage);

        console.log(data?.questions);

        SetLoading(true);
        let response = await Post("lessons/update", form);
        SetLoading(false);

        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity
        }));
        history.push(`/modules/${module_id}/${course_id}`);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="title">Editar aula</h2>
                <p>Aqui são editadas as aulas do sistema</p>
                <br/>
                <FormBody
                    OnConfirm={data => Submit(data)}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default LessonEdit;