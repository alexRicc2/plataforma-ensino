import React, { useState } from "react";

import { FormControl as Input } from "react-bootstrap";
import { useParams } from "react-router";
import DefaultButton from "../../../../components/DefaultButton";

import Table from "./Table";

const CourseLesson = () => {

    const [search, SetSearch] = useState("");

    const { id } = useParams();

    return (
        <div className="course-users">
            <h3 className="title">Aulas</h3>
            <p className="text-muted">Aqui são listados todas as aulas do curso</p>
            <hr/>
            <div className="flex jcsb flex-wrap margin-bottom">
                <Input
                    placeholder="Pesquisar aula pelo Nome"
                    value={search}
                    onChange={e => SetSearch(e.target.value)}
                    style={{width: "50%"}}
                />
                <DefaultButton
                    bg="confirm"
                    text="Adicionar nova aula"
                    to={`/courses/add-lesson/${id}`}
                />
            </div>
            <Table
                search={search}
            />
        </div>
    );
}

export default CourseLesson;