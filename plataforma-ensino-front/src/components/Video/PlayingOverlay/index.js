import { useEffect, useState } from "react";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from '@material-ui/icons/Pause';

import styles from "./index.module.css";

const PlayingOverlay = props => {

    const {
        playing
    } = props;

    const [fire, SetFire] = useState(false);

    useEffect(() => SetFire(true), [playing]);

    if (navigator.userAgentData.mobile) return null;
    return (
        <div 
            className={`${styles.playingOverlay} ${fire ? styles.fire : ""}`}
            onAnimationEnd={() => SetFire(false)}
        >
            {(() => {
                if (playing) return <PlayArrowIcon style={{ color: "white" }} size={30}/>;
                else return <PauseIcon style={{ color: "white" }} size={30}/>
            })()}
        </div>
    );
}

export default PlayingOverlay;