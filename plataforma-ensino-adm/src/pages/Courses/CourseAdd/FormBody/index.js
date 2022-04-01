import React, { useState } from "react";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { RiArrowGoBackLine } from "react-icons/ri";
import DefaultButton from "../../../../components/DefaultButton";
import ImageInput from "../../../../components/Inputs/ImageInput";
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

    return(
        <div className="form-course">
            <form>
                <FormLabel>Imagem do curso <span style={{color: "red"}}>*</span></FormLabel>
                <ImageInput
                    ImageChange={image => SetImage(image)}
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
                    onChange={data => SetResponsibles(data)}
                />
                <br/>

                <FormLabel>Categoria(s) <span style={{color: "red"}}>*</span></FormLabel>
                <Category
                    onChange={data => SetCategories(data)}
                />
                <br/>
                
                <FormLabel>Tag(s) <span style={{color: "red"}}>*</span></FormLabel>
                <Tags
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
                    text="Criar curso"
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

export default FormBody;