import React, { useState } from "react";

import { FormControl as Input } from "react-bootstrap";
import DefaultButton from "../../../../../components/DefaultButton";


import Table from "./Table";
import { useDispatch } from "react-redux";
import CourseLesson from "../../CourseLessons";
import { useParams } from "react-router";
import { RiArrowGoBackLine } from "react-icons/ri";

const ModuleView = () => {

    const [search, SetSearch] = useState("");

    const dispatch = useDispatch();
    const { module_id, course_id } = useParams();

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="title">Aulas do módulo</h3>
                <p className="text-muted">Aqui são listados todas as aulas presentes neste módulo</p>
                <hr/>
                <div className="flex jcsb flex-wrap margin-bottom">
                    <Input
                        placeholder="Pesquisar pelo Nome"
                        value={search}
                        onChange={e => SetSearch(e.target.value)}
                        style={{width: "50%"}}
                    />
                    <DefaultButton
                        bg="confirm"
                        text="Adicionar nova aula"
                        to={`/modulos/${module_id}/${course_id}/lesson/adiciona`}
                    />
                </div>
                <Table
                    search={search}
                />
                <DefaultButton
                    bg="secondary"
                    text="Voltar"
                    icon={<RiArrowGoBackLine/>}
                    to={`/cursos/ver/${course_id}`}
                />
            </div>
        </div>
    );
}

export default ModuleView;