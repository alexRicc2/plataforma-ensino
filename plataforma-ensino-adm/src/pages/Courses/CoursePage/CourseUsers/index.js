import React, { useState } from "react";

import { FormControl as Input } from "react-bootstrap";
import { useParams } from "react-router";
import DefaultButton from "../../../../components/DefaultButton";

import Table from "./Table";

const CourseUsers = () => {

    const [search, SetSearch] = useState("");

    const { id } = useParams();

    return (
        <div className="course-users">
            <h3 className="title">Alunos</h3>
            <p className="text-muted">Aqui são listados todos os alunos do curso</p>
            <hr/>
            <div className="flex jcsb flex-wrap margin-bottom">
                <Input
                    placeholder="Pesquisar aluno pelo Nome ou E-mail"
                    value={search}
                    onChange={e => SetSearch(e.target.value)}
                    style={{width: "50%"}}
                />
                <DefaultButton
                    bg="confirm"
                    text="Adicionar novo aluno"
                    to={`/courses/add-user/${id}`}
                />
            </div>
            <Table
                search={search}
            />
        </div>
    );
}

export default CourseUsers;