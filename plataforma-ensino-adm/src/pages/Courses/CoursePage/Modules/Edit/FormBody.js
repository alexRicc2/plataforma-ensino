import React, { useEffect, useState } from "react";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useParams } from "react-router";
import DefaultButton from "../../../../../components/DefaultButton";
import { Get } from "../../../../../utils/request";

const FormBody = props => {

    const {
        loading,
        OnConfirm
    } = props;

    const [name, SetName] = useState("");
    const [firstLoading, SetFirstLoading] = useState(false);
    const [course, setCourse] = useState("");
    const { module_id } = useParams();

    const GetData = async () => {
        let response = await Get(`modules?id=${module_id}`);
        SetFirstLoading(true);
        
        if (response?.status === true) {
            SetName(response?.module?.name);
            setCourse(response?.module?.course.id)
        }
    }

    useEffect(GetData, []);

    if (!firstLoading) return <Skeleton/>;
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
                    to={`/cursos/ver/${course}`}
                />
                <DefaultButton
                    bg="confirm"
                    text="Salvar mudanças"
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

const Skeleton = () => {
    return (
        <div className="skeleton-loading">
            <FormLabel>Nome <span style={{color: "red"}}>*</span></FormLabel>
            <div className="skeleton-base skeleton-shimmer w100 height2"/>
            <br/>
            <div className="flex jcsb w100">
                <div className="skeleton-small-button skeleton-shimmer"/>
                <div className="skeleton-medium-button skeleton-shimmer"/>
            </div>
        </div>
    );
}

export default FormBody;