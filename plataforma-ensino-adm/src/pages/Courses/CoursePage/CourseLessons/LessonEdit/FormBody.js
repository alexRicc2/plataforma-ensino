import React, { useState, useEffect, useRef } from "react";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useParams } from "react-router";
import { Get } from "../../../../../utils/request";
import DefaultButton from "../../../../../components/DefaultButton";
import FileInput from "../../../../../components/Inputs/FileInput";
import VideoInput from "../../../../../components/Inputs/VideoInput";
import FormMaker from "../../../../../components/FormMaker";
import { Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControlLabel, IconButton, Switch, TextField, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import CollapseContainer from "../../../../../components/CollapseContainer";

const FormBody = props => {

    const {
        loading,
        OnConfirm
    } = props;

    const [title, SetTitle] = useState("");
    const [description, SetDescription] = useState("");
    const [questions, SetQuestions] = useState([]);
    const [prevQuestions, SetPrevQuestions] = useState([]);
    const [answerReveal, SetAnswerReveal] = useState(false);
    const [minCorrectPercentage, SetMinCorrectPercentage] = useState(0);

    const [questionFormModal, SetQuestionFormModal] = useState(false);

    const [videos, SetVideos] = useState([]);
    const [existingVideos, SetExistingVideos] = useState([]);
    const [videosToDelete, SetVideosToDelete] = useState([]);
    
    const [docs, SetDocs] = useState([]);
    const [existingDocs, SetExistingDocs] = useState([]);
    const [docsToDelete, SetDocsToDelete] = useState([]);

    const [firstLoading, SetFirstLoading] = useState(false);

    const formMakerRef = useRef();

    const { module_id, course_id, lesson_id } = useParams();

    const GetData = async () => {
        let response = await Get(`lessons/one/${lesson_id}`);
        SetFirstLoading(true);
        if (response?.status === true) {
            SetTitle(response?.lesson.title);
            SetDescription(response?.lesson.description);
            SetAnswerReveal(response?.lesson?.allow_answer_reveal);
            SetPrevQuestions(response?.lesson?.questions);
            SetExistingVideos(response?.lesson.files.videos);
            SetExistingDocs(response?.lesson.files.documents);
            SetMinCorrectPercentage(response?.lesson?.min_percentage);
        }

    }

    const HandleExistingVideoDeletion = (id, index) => {
        let tempList = existingVideos;
        tempList.splice(index, 1);
        let tempVideoIds = videosToDelete;
        tempVideoIds.push(id);

        SetExistingVideos([...tempList]);
        SetVideosToDelete(tempVideoIds);
    }

    const HandleExistingDocDeletion = (id, index) => {
        let tempList = existingDocs;
        tempList.splice(index, 1);
        let tempDocsIds = docsToDelete;
        tempDocsIds.push(id);
        SetExistingDocs([...tempList]);
        SetDocsToDelete(tempDocsIds);
    }

    useEffect(GetData, []);

    if (!firstLoading) return <Skeleton/>;
    return(
        <div classtitle="form-course">
            <form>
                <FormLabel>V??deo(s)</FormLabel>
                <VideoInput
                    multiple
                    existingVideos={existingVideos}
                    HandleExistingVideoDeletion={HandleExistingVideoDeletion}
                    VideoChange={videos => SetVideos(videos)}
                />
                <FormLabel>Arquivo(s)</FormLabel>
                <FileInput
                    existingDocs={existingDocs}
                    OnChange={files => SetDocs(files)}
                    HandleExistingDocDeletion={HandleExistingDocDeletion}
                />
                <FormLabel>Nome <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                    placeholder="Nome"
                    value={title}
                    onChange={e => SetTitle(e.target.value)}
                    required
                />
                <br/>
                <FormLabel>Descri????o <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                    placeholder="Descri????o"
                    value={description}
                    onChange={e => SetDescription(e.target.value)}
                    as="textarea"
                    required
                />
                <br/>

                <Dialog
                    open={questionFormModal}
                    onClose={() => SetQuestionFormModal(false)}
                    keepMounted
                    maxWidth="lg"
                >
                    <DialogTitle>
                        <div className="flex fdrow jcsb w100 align-center">
                            <Typography>Formul??rio de exerc??cio</Typography>
                            <IconButton
                                onClick={() => SetQuestionFormModal(false)}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent
                        style={{
                            width: "60vw",
                            minWidth: "30em",
                            backgroundColor: "whitesmoke"
                        }}
                    >
                        <TextField
                            placeholder="Porcentagem m??nima de acertos"
                            onChange={e => SetMinCorrectPercentage(e.target.value)}
                            value={minCorrectPercentage}
                            label="Porcentagem m??nima"
                        />
                        <CollapseContainer title="Quest??es">
                            <FormMaker
                                onChange={value => SetQuestions(value)}
                                prevQuestions={prevQuestions}
                                ref={formMakerRef}
                            />
                        </CollapseContainer>
                        {/* <span onClick={() => formMakerRef.current.QuestionIncrement()}>click</span> */}
                    </DialogContent>
                    <DialogActions
                        style={{
                            justifyContent: "flex-start"
                        }}
                    >
                        <FormControlLabel
                            label="Habilitar visualiza????o de respostas"
                            control={
                                <Switch
                                    color="primary"
                                    checked={answerReveal}
                                    onChange={e => SetAnswerReveal(e.target.checked)}
                                />
                            }
                        />
                        <Fab
                            onClick={() => formMakerRef.current.QuestionIncrement()}
                            color="primary"
                            style={{
                                right: 20,
                                bottom: 5,
                                position: "absolute"
                            }}
                            size="medium"
                        >
                            <AddIcon/>
                        </Fab>
                    </DialogActions>
                </Dialog>
                <DefaultButton
                    onClick={() => SetQuestionFormModal(true)}
                    text="Abrir formul??rio de exerc??cios"
                    bg="confirm"
                />
            </form>
            <br/>
            <div className="w100 inline-flex jcsb mt-2">
                <DefaultButton
                    bg="secondary"
                    text="Voltar"
                    icon={<RiArrowGoBackLine />}
                    to={`/modulos/${module_id}/${course_id}`}
                />
                <DefaultButton
                    bg="confirm"
                    text="Salvar altera????es"
                    onClick={() => {
                        let data = {
                            title: title,
                            description: description,
                            videos: videos,
                            docs: docs,
                            docsToDelete: docsToDelete,
                            videosToDelete: videosToDelete,
                            questions: JSON.stringify(questions),
                            answerReveal: answerReveal,
                            minCorrectPercentage: minCorrectPercentage
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
        <div className="skeleton">
            <FormLabel>V??deo(s) <span style={{color: "red"}}>*</span></FormLabel>
            <div className="flex fdrow margin-bottom">
                <div className="skeleton-base skeleton-shimmer" style={{width: "7em", height: "7em", marginRight: "1em"}}/>
                <div className="skeleton-base skeleton-shimmer" style={{width: "7em", height: "7em", marginRight: "1em"}}/>
                <div className="skeleton-base skeleton-shimmer" style={{width: "7em", height: "7em", marginRight: "1em"}}/>
            </div>
            <div className="skeleton-medium-button skeleton-shimmer"/>
            <FormLabel>Arquivo(s)</FormLabel>
            <div className="flex fdrow margin-bottom">
                <div className="skeleton-base skeleton-shimmer" style={{width: "7em", height: "2em", marginRight: "1em", borderRadius: "10em"}}/>
                <div className="skeleton-base skeleton-shimmer" style={{width: "7em", height: "2em", marginRight: "1em", borderRadius: "10em"}}/>
                <div className="skeleton-base skeleton-shimmer" style={{width: "7em", height: "2em", marginRight: "1em", borderRadius: "10em"}}/>
            </div>
            <div className="skeleton-medium-button skeleton-shimmer"/>

            <FormLabel>Titulo <span style={{color: "red"}}>*</span></FormLabel>
            <div className="skeleton-base w100 skeleton-shimmer" style={{height: "2em"}}/>
            <FormLabel>Descri????o <span style={{color: "red"}}>*</span></FormLabel>
            <div className="skeleton-base w100 skeleton-shimmer margin-bottom" style={{height: "2em"}}/>

            <div className="flex w100 jcsb">
                <div className="skeleton-small-button skeleton-shimmer"/>
                <div className="skeleton-medium-button skeleton-shimmer"/>
            </div>
        </div>
    );
}

export default FormBody;