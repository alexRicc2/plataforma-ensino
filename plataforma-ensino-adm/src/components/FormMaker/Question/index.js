import { Card, CardActions, CardContent, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from "@material-ui/core";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { useEffect, useState } from "react";

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

const Question = props => {

    const {
        prevOptions = [{ id: 0, text: "Opção 1", correct: false }],
        prevUtterance = "",
        questionId,
        onChange = () => {},
        onAdd = () => {},
        onQuestionDelete = () => {},
        ...other
    } = props;

    const [utterance, SetUtterance] = useState(prevUtterance);
    const [options, SetOptions] = useState(prevOptions);
    const [answer, SetAnswer] = useState();

    const AddOption = () => {
        let tempOptions = options;
        let optionId = options?.length;
        tempOptions.push({
            id: optionId,
            text: `Opção ${options?.length + 1}`,
            correct: optionId == answer
        });

        SetOptions([...tempOptions]);
        onAdd(questionId, {questionId: questionId, utterance: utterance, options: [...tempOptions]});
    }

    const DeleteOption = optionId => {
        let tempOptions = options;

        for (let i = 0; i < tempOptions?.length; i++) {
            if (optionId != tempOptions[i]["id"]) continue;
            tempOptions.splice(i, 1);
            break;
        }
        
        SetOptions([...tempOptions]);
        onChange(questionId, {questionId: questionId, utterance: utterance, options: [...tempOptions]});
    }

    const HandleChange = (id, value) => {
        let tempOptions = options;
        for (let i = 0; i < tempOptions?.length; i++) {
            if (id != tempOptions[i]["id"]) continue;
            tempOptions[i] = {
                id: id,
                text: value,
                correct: id == answer
            };
            break;
        }

        SetOptions([...tempOptions]);
        onChange(questionId, {questionId: questionId, utterance: utterance, options: [...tempOptions]});
    }

    const HandleAnswerChange = () => {
        if (!answer) return;
        let tempOptions = options;
        for (let i = 0; i < tempOptions?.length; i++) {
            tempOptions[i] = {
                id: tempOptions[i]?.id,
                text: tempOptions[i]?.text,
                correct: tempOptions[i]?.id == answer
            };
        }

        SetOptions([...tempOptions]);
        onChange(questionId, {questionId: questionId, utterance: utterance, options: [...tempOptions]});
    }

    useEffect(() => onAdd(questionId, {questionId: questionId, utterance: utterance, options: [...options]}), []);
    useEffect(() => onAdd(questionId, {questionId: questionId, utterance: utterance, options: [...options]}), [utterance]);
    useEffect(HandleAnswerChange, [answer]);

    return (
        <Card
            style={{
                margin: 10
            }}
            raised
        >
            <CardContent>
                <Input 
                    placeholder="Enunciado"
                    onChange={e => SetUtterance(e.target.value)}
                    value={utterance}
                />
                {options && options?.map((value, key) => (
                    <div 
                        id={value?.id}
                        className="flex align-center jcsb"
                        key={key}
                    >
                        <div>
                            <Radio
                                style={{
                                    color: value?.correct ? "#66bb6a" : ""
                                }}
                                value={value?.id}
                                onChange={e => SetAnswer(e.target.value)}
                                checked={value?.correct}
                            />
                            <TextField
                                value={value?.text}
                                onFocus={e => {
                                    e.target.select();
                                }}
                                onChange={e => HandleChange(value?.id, e.target.value)}
                            />
                        </div>
                        <div>
                            <CheckIcon
                                hidden={!value?.correct}
                                style={{
                                    color: "#66bb6a"
                                }}
                            />
                            <IconButton onClick={() => DeleteOption(value?.id)}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </div>
                ))}
                <div className="flex align-center">
                    <Radio
                        disabled
                    />
                    <TextField 
                        value={"Adicionar opção"}
                        disabled
                        onClick={AddOption}
                    />
                </div>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => onQuestionDelete(questionId)}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Question;