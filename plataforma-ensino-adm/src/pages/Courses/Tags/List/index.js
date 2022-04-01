import React, { useState } from "react";

import { FormControl as Input } from "react-bootstrap";
import DefaultButton from "../../../../components/DefaultButton";

import { Show } from "../../../../actions/SnackbarActions";

import Table from "./Table";
import { useDispatch } from "react-redux";

const TagList = () => {

    const [search, SetSearch] = useState("");

    const dispatch = useDispatch();

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="title">Tags para os cursos</h3>
                <p className="text-muted">Aqui são listados todas as tags para os cursos do sistema</p>
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
                        text="Adicionar nova tag"
                        to="/tags/adiciona"
                    />
                </div>
                <Table
                    search={search}
                />
            </div>
        </div>
    );
}

export default TagList;