import React, { useState } from "react";

import { FormControl as Input } from "react-bootstrap";
import DefaultButton from "../../../components/DefaultButton";

import { Show } from "../../../actions/SnackbarActions";

import Table from "./Table";
import { useDispatch } from "react-redux";
import RoleBased from "../../../components/Role/RoleBased";

const CourseList = () => {

    const [search, SetSearch] = useState("");

    const dispatch = useDispatch();

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="title">Cursos</h3>
                <p className="text-muted">Aqui são listados todos os cursos do sistema</p>
                <hr/>
                <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Input
                        placeholder="Pesquisar pelo Nome"
                        value={search}
                        onChange={e => SetSearch(e.target.value)}
                        style={{ width: "50%" }}
                    />
                    <RoleBased>
                        <DefaultButton
                            bg="confirm"
                            text="Adicionar novo curso"
                            to="/cursos/adiciona"
                        />
                    </RoleBased>
                </div>
                <Table
                    search={search}
                />
            </div>
        </div>
    );
}

export default CourseList;