import { Button } from "@material-ui/core";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import styles from "./index.module.css";

const SkipButton = props => {

    const {
        minTime = 15,
        currentTime,
        endTime,
        onClick = () => {},
        ...others
    } = props;

    const [startAnimation, SetStartAnimation] = useState(false);

    const { file_id } = useParams();

    useEffect(() => {
        if (endTime - currentTime == 0) {
            SetStartAnimation(false);
            onClick();
        }

        if (endTime - currentTime <= 5.5 && !startAnimation) SetStartAnimation(true);
        else if (startAnimation && endTime - currentTime > 5.5 || isNaN(currentTime) || isNaN(endTime)) SetStartAnimation(false);
    }, [currentTime]);

    useEffect(() => SetStartAnimation(false), [file_id])

    if (endTime - currentTime > minTime || isNaN(currentTime) || isNaN(endTime)) return null;
    return (
        <Button
            className={`${styles.button}`}
            variant="contained"
            onClick={() => {
                SetStartAnimation(false);
                onClick();   
            }}
            style={{
                top: navigator.userAgentData.mobile ? "1em" : "auto",
                bottom: navigator.userAgentData.mobile ? "auto" : "6em"
            }}
            {...others}
        >
            <PlayArrowIcon style={{ marginRight: 5 }}/> Próximo
            <div className={`${styles.afterButton} ${startAnimation ? styles.animate : ""}`}></div>
        </Button>
    );
}

export default SkipButton;