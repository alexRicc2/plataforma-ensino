import React, { useState } from "react";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Get } from "../../../../utils/request";
import DefaultButton from "../../../../components/DefaultButton";
import ImageInput from "../../../../components/Inputs/ImageInput";
import Category from "./Category";
import Responsibles from "./Responsibles";
import Tags from "./Tags";
import DateFnsUtils from "@date-io/date-fns";
import { maskPrice } from "../../../../Auxiliar/Masks";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import JoditEditor from "jodit-react";
import JoditConfig from "../../../../utils/joditConfig";
import VideoInput from "../../../../components/Inputs/VideoInput";

const courseContentConfig = new JoditConfig("courses-main/upload-image").config();
const whatWillLearnConfig = new JoditConfig("courses-main/upload-image").config();

const FormBody = props => {

    const {
        loading,
        OnConfirm
    } = props;

    const [image, SetImage] = useState("");
    const [coverImage, SetCoverImage] = useState("");
    const [name, SetName] = useState("");
    const [description, SetDescription] = useState("");
    const [responsibles, SetResponsibles] = useState([]);
    const [categories, SetCategories] = useState([]);
    const [tags, SetTags] = useState([]);
    const [price, SetPrice] = useState(0);
    const [isFree, SetIsFree] = useState(false);
    const [courseContent, SetCourseContent] = useState("");
    const [whatWillLearn, SetWhatWillLearn] = useState("");
    const [videoTrailer, SetVideoTrailer] = useState("");


    return(
        <div className="form-course">
        <form>
            <FormLabel>Imagem de capa</FormLabel>
            <ImageInput
                ImageChange={image => SetCoverImage(image)}
            />
            <br/>

            <FormLabel>Imagem do curso <span style={{color: "red"}}>*</span></FormLabel>
            <ImageInput
                ImageChange={image => SetImage(image)}
            />
            <br/>

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

            <FormLabel>Preço <span style={{color: "red"}}>*</span></FormLabel>
            <Input
                placeholder="Preço"
                value={price}
                onChange={e => SetPrice(maskPrice((e.target.value).toString()))}
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
            <br/>

            <FormLabel>Vídeo de trailer</FormLabel>
            <VideoInput
                VideoChange={video => SetVideoTrailer(video)}
            />
            <br/>
            
            <FormLabel>O que vai aprender com o curso</FormLabel>
            <JoditEditor
                config={whatWillLearnConfig}
                value={whatWillLearn}
                onChange={value => SetWhatWillLearn(value)}
            />
            <br/>

            <FormLabel>Conteúdo do curso</FormLabel>
            <JoditEditor
                config={courseContentConfig}
                onChange={value => SetCourseContent(value)}
            />
            <br/>

            

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isFree}
                        onChange={e => SetIsFree(e.target.checked)}
                    />
                }
                label={"Curso gratuíto"}
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
                        coverImage: coverImage,
                        name: name,
                        description: description,
                        responsibles: responsibles,
                        categories: categories,
                        tags: tags,
                        price: parseFloat(price.toString().replace(/[^0-9,]/g, "").replace(",", ".")),
                        free: isFree,
                        courseContent: courseContent,
                        whatWillLearn: whatWillLearn,
                        videoTrailer: videoTrailer
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