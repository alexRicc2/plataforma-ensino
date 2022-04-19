import { forwardRef, useEffect, useState } from "react";
import { IconButton, Slider, useTheme, Typography, useMediaQuery } from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from '@material-ui/icons/Pause';
import ReplayIcon from '@material-ui/icons/Replay';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';

import styles from "./index.module.css";
import control from "../index.module.css";

import Timing from "../Timing";
import SettingsMenu from "./SettingsMenu";
import AnnotationsMenu from "./AnnotationsMenu";
import { Clamp } from "../../../utils/filters";

const Controls = forwardRef((props, ref) => {

    const {
        player,
        container
    } = ref;

    const {
        contentLoaded,
        boldTitle,
        title,
        src,
        prev,
        next,
        annotations,
        setPlaying = () => {},
        onPrev = () => {},
        onNext = () => {},
        onEndTime = () => {},
        onPlayingChange = () => {},
        onAnnotation = () => {},
        ...other
    } = props;

    const [slider, SetSlider] = useState(0);
    const [endTime, SetEndTime] = useState(0);
    const [currTime, SetCurrTime] = useState(0);
    const [volume, SetVolume] = useState(60);
    const [playing, SetPlaying] = useState(false);
    const [fullscreen, SetFullscreen] = useState(false);

    const theme = useTheme();
    const downSm = useMediaQuery(theme.breakpoints.down("sm"));

    const HandlePlayButton = () => {
        if (player?.current.currentTime == endTime) SetCurrTime(0);
        SetPlaying(!playing);
    }

    const SumToCurrentTime = value => player?.current && (player.current.currentTime = Clamp(player?.current?.currentTime + value, 0, endTime));

    useEffect(() => player?.current && (player.current.volume = (volume / 100)), [volume]);

    useEffect(() => {
        if (fullscreen) {
            if (container?.current.requestFullscreen) container.current.requestFullscreen().catch(err => Promise.resolve(err));
            else if (container?.current.msRequestFullscreen) container.current.msRequestFullscreen().catch(err => Promise.resolve(err));
            else if (container?.current.mozRequestFullScreen) container.current.mozRequestFullScreen().catch(err => Promise.resolve(err));
            else if (container?.current.webkitRequestFullScreen) container.current.webkitRequestFullScreen().catch(err => Promise.resolve(err));
        } else {
            if (document.exitFullscreen) document.exitFullscreen().catch(err => Promise.resolve(err));
            else if (document.msExitFullscreen) document.msExitFullScreen().catch(err => Promise.resolve(err));
            else if (document.mozExitFullscreen) document.mozExitFullScreen().catch(err => Promise.resolve(err));
            else if (document.webkitExitFullscreen) document.webkitExitFullScreen().catch(err => Promise.resolve(err));
        }
    }, [fullscreen]);

    useEffect(() => {
        if (!player?.current) return;
        let videoTimePercent = player?.current?.currentTime * 100 / endTime;
        SetSlider(videoTimePercent);
    }, [player?.current?.currentTime]);

    useEffect(() => {
        //networkState === 3 => no audio/video source has been found
        if (player?.current === undefined || player?.networkState === 3) return;
        if (playing) {
            const playPromise = player.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => SetPlaying(false));
            }
        }
        else player.current.pause();
        onPlayingChange(playing);
    }, [playing]);

    useEffect(() => SetPlaying(setPlaying), [setPlaying]);

    //Detecta quando o vídeo é trocado do player
    useEffect(() => SetCurrTime(0), [src]);

    useEffect(() => {
        SetEndTime(player?.current?.duration);
        onEndTime(player?.current?.duration);
    }, [player?.current?.duration, contentLoaded]);

    return (
        <div
            {...other}
            className={control.controls}
        >
            <div className="flex jcc" id="top">
                <Slider
                    className={styles.slider}
                    onChange={(_, value) => {
                        const newTime = endTime * value / 100;
                        player?.current && (player.current.currentTime = isNaN(newTime) ? 0 : newTime);
                        SetSlider(value);
                    }}
                    style={{
                        color: theme.palette?.default?.error,
                        width: "98%"
                    }}
                    onMouseDown={() => SetPlaying(false)}
                    onMouseUp={() => SetPlaying(true)}
                    value={slider}
                />
            </div>
            <div className="flex fdrow align-center jcsb">
                <div className="flex fdrow">
                    <IconButton 
                        hidden={!prev || navigator.userAgentData.mobile}
                        onClick={onPrev}
                        style={{ color: "white" }}
                    >
                        <SkipPreviousIcon/>
                    </IconButton>
                    <div hidden={navigator.userAgentData.mobile}>
                        <IconButton style={{ color: "white" }} onClick={HandlePlayButton}>
                            {(() => {
                                if (player?.current?.currentTime != endTime) {
                                    if (playing) return <PauseIcon/>;
                                    else return <PlayArrowIcon/>;
                                }
                                else return <ReplayIcon/>;
                            })()}
                        </IconButton>
                    </div>
                    <IconButton
                        hidden={!next || navigator.userAgentData.mobile}
                        onClick={onNext}
                        style={{ color: "white" }}
                    >
                        <SkipNextIcon/>
                    </IconButton>
                    <IconButton
                        style={{
                            color: "white"
                        }}
                        onClick={() => SumToCurrentTime(-10)}
                        hidden={downSm}
                    >
                        <Replay10Icon/>
                    </IconButton>
                    <IconButton
                        style={{
                            color: "white"
                        }}
                        onClick={() => SumToCurrentTime(10)}
                        hidden={downSm}
                    >
                        <Forward10Icon/>
                    </IconButton>
                    <div className={styles.volume}>
                        <IconButton 
                            className={styles.volumeBtn}
                            onClick={() => SetVolume(volume == 0 ? 10 : 0)}
                        >
                            {/* <VolumeUpIcon/> */}
                            {(() => {
                                if (volume == 0) return <VolumeOffIcon/>
                                else if (volume > 0 && volume <= 20) return <VolumeMuteIcon/>
                                else if (volume > 20 && volume <= 60) return <VolumeDownIcon/>
                                else if (volume > 60) return <VolumeUpIcon/>
                            })()}
                        </IconButton>
                        <div className={styles.volumeSliderContainer}>
                            <Slider
                                className={styles.volumeSlider}
                                value={volume}
                                onChange={(_, value) => SetVolume(value)}
                            />
                        </div>
                    </div>
                    <div className={styles.timing}>
                        <Timing seconds={player?.current?.currentTime}/>/<Timing seconds={endTime}/>
                    </div>
                </div>
                <div
                    style={{
                        maxWidth: "30%"
                    }}
                    hidden={downSm}
                >
                    <Typography
                        style={{
                            color: "white",
                        }}
                        className="text-truncate"
                    >
                        <b>{boldTitle}</b> {title}
                    </Typography>
                </div>
                <div
                    className="flex fdrow align-center"
                >
                    {annotations && (
                        <AnnotationsMenu
                            currentTime={player?.current?.currentTime}
                            onSubmit={onAnnotation}
                        />
                    )}
                    <SettingsMenu
                        ref={player}
                    />
                    <IconButton style={{color: "white"}} onClick={() => SetFullscreen(!fullscreen)} onTouchStart={() => SetFullscreen(!fullscreen)}>
                        {(fullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>)}
                    </IconButton>
                </div>
            </div>
        </div>
    );
});

export default Controls;