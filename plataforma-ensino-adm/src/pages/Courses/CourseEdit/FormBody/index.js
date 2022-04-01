import React, { useEffect, useState } from "react";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useParams } from "react-router";
import DefaultButton from "../../../../components/DefaultButton";
import ImageInput from "../../../../components/Inputs/ImageInput";
import { Get } from "../../../../utils/request";
import Category from "./Category";
import Responsibles from "./Responsibles";
import Tags from "./Tags";

const FormBody = props => {

    const {
        loading,
        OnConfirm
    } = props;

    const [image, SetImage] = useState();
    const [name, SetName] = useState("");
    const [description, SetDescription] = useState("");
    const [responsibles, SetResponsibles] = useState([]);
    const [categories, SetCategories] = useState([]);
    const [tags, SetTags] = useState([]);

    const [firstLoading, SetFirstLoading] = useState(false);

    const { id } = useParams();

    const GetData = async () => {
        let response = await Get(`courses-main/one/${id}`)
        console.log(response);
        if (response?.status === true) {
            console.log(response?.course);
            SetImage(response?.course.image);
            SetName(response?.course.name);
            SetDescription(response?.course.description);
            SetResponsibles(response?.course?.responsibles);
            SetCategories(response?.course.categories);
            SetTags(response?.course?.tags);
        }

        SetFirstLoading(true);
    }

    useEffect(GetData, []);

    if (!firstLoading) return <Skeleton/>;
    return(
        <div className="form-course">
            <form>
                <FormLabel>Imagem do curso <span style={{color: "red"}}>*</span></FormLabel>
                <ImageInput
                    ImageChange={image => SetImage(image)}
                    path={image}
                />
                <FormLabel>Nome <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                    placeholder="Nome"
                    value={name}
                    onChange={e => SetName(e.target.value)}
                    required
                />
                <br/>
                <FormLabel>Descrição <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                    placeholder="Descrição"
                    value={description}
                    onChange={e => SetDescription(e.target.value)}
                    as="textarea"
                    required
                />
                <br/>

                <FormLabel>Responsável(eis) <span style={{color: "red"}}>*</span></FormLabel>
                <Responsibles
                    prevResponsibles={responsibles}
                    onChange={data => SetResponsibles(data)}
                />
                <br/>

                <FormLabel>Categoria(s) <span style={{color: "red"}}>*</span></FormLabel>
                <Category
                    prevCategories={categories}
                    onChange={data => SetCategories(data)}
                />
                <br/>

                <FormLabel>Tag(s) <span style={{color: "red"}}>*</span></FormLabel>
                <Tags
                    prevTags={tags}
                    onChange={data => SetTags(data)}
                />
            </form>
            <br/>
            <div className="w100 inline-flex jcsb mt-2">
                <DefaultButton
                    bg="secondary"
                    text="Voltar"
                    icon={<RiArrowGoBackLine />}
                    to="/cursos/lista"
                />
                <DefaultButton
                    bg="confirm"
                    text="Salvar alterações"
                    onClick={() => {
                        let data = {
                            image: image,
                            name: name,
                            description: description,
                            responsibles: responsibles,
                            categories: categories,
                            tags: tags
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
            <FormLabel>Descrição <span style={{color: "red"}}>*</span></FormLabel>
            <div className="skeleton-base skeleton-shimmer w100 height3"/>
            <br/>
            <div className="flex jcsb w100">
                <div className="skeleton-small-button skeleton-shimmer"/>
                <div className="skeleton-medium-button skeleton-shimmer"/>
            </div>
        </div>
    );
}

export default FormBody;