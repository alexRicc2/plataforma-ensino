import React, { useState } from "react";

import { FormControl as Input } from "react-bootstrap";
import { useParams } from "react-router";
import DefaultButton from "../../../../../components/DefaultButton";

import Table from "./Table/";

const ModuleList = () => {

    const [search, SetSearch] = useState("");

    const { id } = useParams();

    return (
        <div className="course-users">
            <h3 className="title">Módulos</h3>
            <p className="text-muted">Aqui são listados todos os módulos do curso</p>
            <hr/>
            <div className="flex jcsb flex-wrap margin-bottom">
                <Input
                    placeholder="Pesquisar módulo pelo Nome"
                    value={search}
                    onChange={e => SetSearch(e.target.value)}
                    style={{ width: "50%" }}
                />
                <DefaultButton
                    bg="confirm"
                    text="Adicionar novo módulo"
                    to={`/modulos/adiciona/${id}`}
                />
            </div>
            <Table
                search={search}
            />
        </div>
    );
}

export default ModuleList;