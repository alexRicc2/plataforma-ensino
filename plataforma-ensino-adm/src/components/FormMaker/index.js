import { ButtonBase, Fab, Typography } from "@material-ui/core";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Question from "./Question";

const FormMaker = forwardRef((props, ref) => {

    const {
        prevQuestions,
        children,
        onChange = () => {}
    } = props;

    const [questions, SetQuestions] = useState([]);
    const [options, SetOptions] = useState([]);
    const [lastId, SetLastId] = useState(0);

    useImperativeHandle(ref, () => ({
        QuestionIncrement() {HandleQuestionIncrement()}
    }));

    const HandlePrevQuestions = () => {
        let tempQuestions = [];
        let tempOptions = [];
        for (let i = 0; i < prevQuestions?.length; i++) {
            let options = prevQuestions[i]?.options;
            let questionId = prevQuestions[i]?.questionId;
            let utterance = prevQuestions[i]?.utterance;
            tempQuestions.push(
                <Question
                    prevOptions={options}
                    questionId={questionId}
                    prevUtterance={utterance}
                />
            );
            tempOptions.push({questionId: questionId, utterance: utterance, options: [...options]});
            // HandleOptionAdd(questionId, {questionId: questionId, utterance: utterance, options: [...options]});
        }

        SetQuestions([...tempQuestions]);
        SetOptions([...tempOptions]);
    }

    const HandleQuestionIncrement = () => {
        let tempQuestions = questions;
        // let tempOptions = options;
        // let optionId = options?.length;

        tempQuestions.push(
            <Question
                questionId={lastId}
            />
        );

        // tempOptions.push({
        //     id: optionId,
        //     text: `Opção ${options?.length + 1}`,
        //     correct: false
        // });

        // SetOptions([...tempOptions]);
        SetQuestions([...tempQuestions]);
    }

    
    const HandleQuestionDelete = questionId => {
        let tempQuestions = questions;
        let tempOptions = options;
        
        for (let i = 0; i < tempOptions?.length; i++) {
            if (questionId == tempOptions[i]["questionId"]) {
                tempOptions.splice(i, 1);
                break;
            }
        }

        for (let i = 0; i < tempQuestions?.length; i++) {
            if (questionId == tempQuestions[i]?.props?.questionId) {
                tempQuestions?.splice(i, 1);
            }
        }
        
        SetOptions([...tempOptions]);
        SetQuestions([...tempQuestions]);
    }
    
    const HandleOptionAdd = (id, value) => {
        let tempOptions = [...options];

        let optionExistsFlag = false;
        for (let i = 0; i < tempOptions?.length; i++) {
            if (id != tempOptions[i]["questionId"]) continue;
            tempOptions[i] = value;
            optionExistsFlag = true;
            break;
        }
        
        if (!optionExistsFlag) tempOptions.push(value);

        SetOptions([...tempOptions]);
    }

    const HandleOptionChange = (id, value) => {
        let tempOptions = options;
        for (let i = 0; i < tempOptions?.length; i++) {
            if (id != tempOptions[i]["questionId"]) continue;
            tempOptions[i] = value;
            break;
        }
        SetOptions([...tempOptions]);
    }

    // useEffect(HandleQuestionIncrement, []);
    useEffect(() => onChange(options), [options]);
    useEffect(() => SetLastId(lastId + 1), [questions]);
    useEffect(HandlePrevQuestions, [prevQuestions]);

    return (
        <div>   
            <div hidden={questions?.length == 0}>
                {children}
                {questions?.map((question, key) => (
                    <Question
                        questionId={question?.props?.questionId}
                        prevOptions={question?.props?.prevOptions}
                        prevUtterance={question?.props?.prevUtterance}
                        key={question?.props?.questionId}
                        onChange={HandleOptionChange}
                        onAdd={HandleOptionAdd}
                        onQuestionDelete={HandleQuestionDelete}
                    />
                ))}
            </div>
            <Typography 
                hidden={questions?.length > 0}
                align="center"
                variant="h6"
                style={{
                    padding: "50px"
                }}
            >
                Sem questões nessa aula!
            </Typography>
            {/* <Fab
                onClick={HandleQuestionIncrement}
                color="primary"
                style={{
                    right: 20,
                    bottom: 5,
                    position: "absolute"
                }}
                size="medium"
            >
                <AddIcon/>
            </Fab> */}
        </div>
    );
});

export default FormMaker;