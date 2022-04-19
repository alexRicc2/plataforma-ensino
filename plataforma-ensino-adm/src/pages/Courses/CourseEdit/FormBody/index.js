import { Checkbox, FormControlLabel } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { maskPrice } from "../../../../Auxiliar/Masks";
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

import JoditConfig from "../../../../utils/joditConfig";
import JoditEditor from "jodit-react";
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
    const [availabilityDuration, SetAvailabilityDuration] = useState(30);
    const [price, SetPrice] = useState(0);
    const [isFree, SetIsFree] = useState(false);
    const [subStart, SetSubStart] = useState(Date.now());
    const [subEnd, SetSubEnd] = useState(Date.now());
    const [courseContent, SetCourseContent] = useState("");
    const [whatWillLearn, SetWhatWillLearn] = useState("");
    const [videoTrailer, SetVideoTrailer] = useState("");
    const [existingVideoTrailer, SetExistingVideoTrailer] = useState("");

    const [firstLoading, SetFirstLoading] = useState(false);

    const { id } = useParams();

    const GetData = async () => {
        let response = await Get(`courses-main/one/${id}`)
        console.log(response);
        if (response?.status === true) {
            SetImage(response?.course?.image);
            SetCoverImage(response?.course?.cover_image);
            SetName(response?.course?.name);
            SetDescription(response?.course?.description);
            SetResponsibles(response?.course?.responsibles);
            SetCategories(response?.course.categories);
            SetTags(response?.course?.tags);
            SetAvailabilityDuration(response?.course?.availability_duration_days);
            SetPrice(maskPrice(response?.course?.price));
            SetIsFree(response?.course?.free);
            SetSubStart(response?.course?.sub_start);
            SetSubEnd(response?.course?.sub_end);
            SetCourseContent(response?.course?.course_content);
            SetWhatWillLearn(response?.course?.what_will_learn);
            SetExistingVideoTrailer(response?.course?.video);
            SetVideoTrailer(response?.course?.video);
            // response?.course?.video_trailer != "undefined" ? SetExistingVideoTrailer([{
            //     id: response?.course?.id,
            //     path: response?.course?.video_trailer,
            //     name: "Video de trailer"
            // }]) : SetExistingVideoTrailer([]);
        }

        SetFirstLoading(true);
    }

    useEffect(GetData, []);

    if (!firstLoading) return <Skeleton/>;
    return(
        <div className="form-course">
            <form>
                <FormLabel>Imagem de capa</FormLabel>
                <ImageInput
                    ImageChange={image => SetCoverImage(image)}
                    path={coverImage}
                />
                <br/>

                <FormLabel>Imagem do curso <span style={{color: "red"}}>*</span></FormLabel>
                <ImageInput
                    ImageChange={image => SetImage(image)}
                    path={image}
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
                <br/>

                <FormLabel>Vídeo de trailer</FormLabel>
                <VideoInput
                    VideoChange={value => {
                        if (value?.length !== 0) SetExistingVideoTrailer([]);
                        SetVideoTrailer(value);
                    }}
                    HandleExistingVideoDeletion={() => SetExistingVideoTrailer([])}
                    existingVideos={existingVideoTrailer}
                    limitOne
                    
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
                    value={courseContent}
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
                    text="Salvar alterações"
                    onClick={() => {
                        console.log('video', videoTrailer);
                        let data = {
                            image: image,
                            coverImage: coverImage,
                            name: name,
                            description: description,
                            responsibles: responsibles,
                            categories: categories,
                            tags: tags,
                            
                            price: parseFloat(price.replace(/[^0-9,]/g, "").replace(",", ".")),
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