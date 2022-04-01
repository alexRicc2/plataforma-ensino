import React from "react";
import FormBody from "./FormBody";

const UserAdd = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h2 className="title">Adicionar aluno ao curso</h2>
                <p className="text-muted">Aqui são adicionados os usuários ao curso em questão</p>
                <br/>
                <FormBody/>
            </div>
        </div>
    );
}

export default UserAdd;