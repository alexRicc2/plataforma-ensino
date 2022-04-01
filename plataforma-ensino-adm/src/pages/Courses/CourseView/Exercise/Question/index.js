import { Card, Radio, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

const Question = props => {

    const {
        question,
        questionNumber,
        prevSelectedId,
        onChange = () => {}
    } = props;

    const [answer, SetAnswer] = useState(prevSelectedId);

    const HandleAnswerChange = () => {
        onChange({
            questionId: question?.questionId,
            answer: answer
        });
    }

    useEffect(HandleAnswerChange, [answer]);
    useEffect(() => {
        if (prevSelectedId !== undefined && prevSelectedId !== null) SetAnswer(prevSelectedId);
    }, [prevSelectedId]);

    return (
        <Card className={styles.card} id={question?.questionId} data-prev={prevSelectedId}>
            <Typography
                className={styles.utterance}
                data-correct={question?.prevSelected?.correct}
            >
                {question?.utterance}
            </Typography>
            {question?.options?.map((option, optionKey) => (
                <div
                    key={optionKey}
                    className={`flex fdrow align-center`}
                    style={{
                        borderRadius: 4,
                        background: option?.id === answer && (question?.correctAlternative ? (question?.correctAlternative?.id == answer ? "#e6f4ea" : "#fce8e6") : "white")
                    }}
                >
                    <div className="flex fdrow align-center">
                        <Radio
                            value={option?.id}
                            disabled={question?.locked}
                            color="default"
                            onChange={e => SetAnswer(e.target.value)}
                            checked={option?.id === answer}
                        />
                        <Typography>
                            {option?.text}
                        </Typography>
                    </div>
                </div>
            ))}
        </Card>
    );
}

export default Question;