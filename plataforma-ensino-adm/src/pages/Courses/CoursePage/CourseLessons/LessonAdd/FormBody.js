import React, { useRef, useState } from "react";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { RiArrowGoBackLine } from "react-icons/ri";
import DefaultButton from "../../../../../components/DefaultButton";
import FileInput from "../../../../../components/Inputs/FileInput";
import VideoInput from "../../../../../components/Inputs/VideoInput";
import { useParams } from "react-router";
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
    const [videos, SetVideos] = useState([]);
    const [files, SetFiles] = useState([]);
    const [questions, SetQuestions] = useState();
    const [answerReveal, SetAnswerReveal] = useState(false);
    const [minCorrectPercentage, SetMinCorrectPercentage] = useState(0);

    const [questionFormModal, SetQuestionFormModal] = useState(false);

    const formMakerRef = useRef();

    const { module_id, course_id } = useParams();

    return(
        <div classtitle="form-course">
            <form>
                <FormLabel>Vídeo(s)</FormLabel>
                <VideoInput
                    multiple
                    VideoChange={videos => SetVideos(videos)}
                />
                <FormLabel>Arquivo(s)</FormLabel>
                <FileInput
                    accept="application/pdf"
                    OnChange={files => SetFiles(files)}
                />
                <FormLabel>Nome <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                    placeholder="Nome"
                    value={title}
                    onChange={e => SetTitle(e.target.value)}
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

                <Dialog
                    open={questionFormModal}
                    onClose={() => SetQuestionFormModal(false)}
                    keepMounted
                    maxWidth="lg"
                >
                    <DialogTitle>
                        <div className="flex fdrow jcsb w100 align-center">
                            <Typography>Formulário de exercício</Typography>
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
                            placeholder="Porcentagem mínima de acertos"
                            onChange={e => SetMinCorrectPercentage(e.target.value)}
                            value={minCorrectPercentage}
                            label="Porcentagem mínima"
                        />
                        <CollapseContainer title="Questões">
                            <FormMaker
                                onChange={value => SetQuestions(JSON.stringify(value))}
                                ref={formMakerRef}
                            />
                        </CollapseContainer>
                    </DialogContent>
                    <DialogActions
                        style={{
                            justifyContent: "flex-start"
                        }}
                    >
                        <FormControlLabel
                            label="Habilitar visualização de respostas"
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
                    text="Abrir formulário de exercícios"
                    bg="confirm"
                />
            </form>
            <br/>
            <div className="w100 inline-flex jcsb mt-2">
                <DefaultButton
                    bg="secondary"
                    text="Voltar"
                    icon={<RiArrowGoBackLine />}
                    to={`/modules/${module_id}/${course_id}`}
                />
                <DefaultButton
                    bg="confirm"
                    text="Criar aula"
                    onClick={() => {
                        let data = {
                            title: title,
                            description: description,
                            videos: videos,
                            files: files,
                            questions: questions,
                            answerReveal: answerReveal
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