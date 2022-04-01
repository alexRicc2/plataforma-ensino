import React, { useState } from "react";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { RiArrowGoBackLine } from "react-icons/ri";
import DefaultButton from "../../../../components/DefaultButton";

const FormBody = props => {

    const {
        loading,
        OnConfirm
    } = props;

    const [name, SetName] = useState("");

    return(
        <div className="form-course">
            <form>
                <FormLabel>Nome <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                    placeholder="Nome"
                    value={name}
                    onChange={e => SetName(e.target.value)}
                    required
                />
                <br/>
            </form>
            <br/>
            <div className="w100 inline-flex jcsb mt-2">
                <DefaultButton
                    bg="secondary"
                    text="Voltar"
                    icon={<RiArrowGoBackLine />}
                    to="/categorias"
                />
                <DefaultButton
                    bg="confirm"
                    text="Criar categoria"
                    onClick={() => {
                        let data = {
                            name: name
                        };
                        OnConfirm(data);
                    }}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default FormBody;