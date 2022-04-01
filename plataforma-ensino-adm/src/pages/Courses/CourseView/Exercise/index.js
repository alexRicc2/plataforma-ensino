import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Get, Post } from "utils/request";
import Question from "./Question";
import DefaultButton from "components/DefaultButton";
import { Typography } from "@material-ui/core";

import styles from "./index.module.css";

const Exercise = props => {

    const [questions, SetQuestions] = useState([]);
    const [answers, SetAnswers] = useState([]);
    const [lessonId, SetLessonId] = useState("");
    const [answered, SetAnswered] = useState(false);

    const [loggingQuestions, SetLoggingQuestions] = useState(false);

    // const [correctLessons, SetCorrectLessons] = useState([]);
    const [totalCorrect, SetTotalCorrect] = useState(0);
    const [totalQuestions, SetTotalQuestions] = useState(0);

    const questionTimer = useRef();

    const { file_id } = useParams();

    const Submit = async () => {
        let form = new FormData();
        form.append("lesson_id", lessonId);
        form.append("answers", JSON.stringify(answers));

        let response = await Post("lessons/exercise/submit", form);

        if (response?.status === true) {
            // SetCorrectLessons(response?.correctAnswers);
            SetQuestions(response?.questions);
            SetAnswered(response?.answered);
            SetTotalQuestions(response?.totalQuestions);
            SetTotalCorrect(response?.totalCorrect);
        }
    }

    const LogQuestion = async () => {
        if (answered || questions?.length == 0) return;
        let form = new FormData();
        form.append("lesson_id", lessonId);
        form.append("answers", JSON.stringify(answers));

        SetLoggingQuestions(true);
        await Post("lessons/exercise/log", form);
        SetLoggingQuestions(false);
    }

    const GetData = async () => {
        if (file_id === undefined) return;
        let response = await Get(`lessons/files?id=${file_id}`);
        console.log(response);
        if (response?.status === true) {
            SetLessonId(response?.file?.lesson_id);
            SetQuestions(response?.questions);
            SetAnswered(response?.answered);
            SetTotalQuestions(response?.userStatistics?.totalQuestions);
            SetTotalCorrect(response?.userStatistics?.totalCorrect);
        }
    }

    const HandleQuestionsChange = () => {
        let tempAnswers = [];
        for (let i = 0; i < questions?.length; i++) {
            tempAnswers.push({
                questionId: questions[i]?.questionId,
                answer: questions[i]?.tempAnswer?.alternative_id
            });
        }
        SetAnswers([...tempAnswers]);
    }

    const HandleAnswerChange = value => {
        let tempAnswers = answers;
        for (let i = 0; i < tempAnswers?.length; i++) {
            if (value?.questionId == tempAnswers[i]?.questionId) {
                tempAnswers[i] = value;
            }
        }
        
        // console.log([...tempAnswers]);
        SetAnswers([...tempAnswers]);
    }

    useEffect(GetData, [file_id]);
    useEffect(HandleQuestionsChange, [questions]);
    useEffect(() => {
        questionTimer.current = setInterval(LogQuestion, 5000);
        return () => clearInterval(questionTimer.current);
    });

    return (
        <div className="exercise">
            <div
                className={`${loggingQuestions ? styles.smoothShow : styles.smoothFade} ${styles.syncContainer}`}
            >
                <Typography>
                    Sincronizando respostas...
                </Typography>
            </div>
            <div
                hidden={!answered || (!totalCorrect && !totalQuestions)}
                className={styles.score}
            >
                Pontuação: {totalCorrect}/{totalQuestions}
            </div>
            <div hidden={questions?.length == 0 || questions === undefined}>
                {questions?.map((question, questionKey) => (
                    <Question 
                        question={question}
                        questionNumber={questionKey + 1}
                        prevSelectedId={question?.prevSelected?.id || question?.tempAnswer?.alternative_id}
                        key={questionKey}
                        onChange={HandleAnswerChange}
                    />
                ))}
                <DefaultButton
                    bg="confirm"
                    variant="contained"
                    text="Entregar exercícios"
                    onClick={Submit}
                    disabled={answered}
                    hidden={answered}
                />
            </div>
            <Typography
                hidden={questions?.length != 0 && questions !== undefined}
                variant="h6"
                align="center"
            >
                Aula sem exercícios
            </Typography>
        </div>
    );
}

export default Exercise;