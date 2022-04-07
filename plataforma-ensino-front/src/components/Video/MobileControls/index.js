import { forwardRef } from "react";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from '@material-ui/icons/Pause';
import ReplayIcon from '@material-ui/icons/Replay';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import styles from "./index.module.css";
import control from "../index.module.css";
import { IconButton } from "@material-ui/core";

const MobileControls = forwardRef((props, ref) => {

    const {
        next,
        prev,
        playing,
        currentTime,
        endTime,
        onPlayingToggle = () => {},
        onPrev = () => {},
        onNext = () => {}
    } = props;

    if (!navigator.userAgentData.mobile) return null;
    return (
        <div className={`${control.mobileControls} ${styles.container}`}>
            <div>

            </div>
            <div>
                <IconButton 
                    onClick={onPrev}
                    style={{ color: prev ? "white" : "" }}
                    disabled={!prev}
                    className={control.buttons}
                >
                    <SkipPreviousIcon/>
                </IconButton>
                <IconButton
                    onClick={onPlayingToggle}
                    className={`${styles.playButton} ${control.buttons}`}
                >
                    {(() => {
                        if (currentTime != endTime) {
                            if (playing) return <PauseIcon/>;
                            else return <PlayArrowIcon/>;
                        }
                        else return <ReplayIcon/>;
                    })()}
                </IconButton>
                <IconButton
                    onClick={onNext}
                    style={{ color: next ? "white" : "" }}
                    disabled={!next}
                    className={control.buttons}
                >
                    <SkipNextIcon/>
                </IconButton>
            </div>
        </div>
    );
});

export default MobileControls;