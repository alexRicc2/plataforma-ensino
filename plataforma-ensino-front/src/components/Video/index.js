import { CircularProgress, IconButton, Slider, Typography } from "@material-ui/core";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./index.module.css";

import Controls from "./Controls";
import PlayingOverlay from "./PlayingOverlay";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SkipButton from "./SkipButton";
import { Clamp } from "../../utils/filters";
import MobileControls from "./MobileControls";

const Video = forwardRef((props, ref) => {

    const {
        boldTitle,
        title,
        src = null,
        srcList = [],
        next = "",
        prev = "",
        hidden,
        containerProps,
        autoPlay = false,
        annotations = false,
        onPrev = () => {},
        onNext = () => {},
        onTimeUpdate = () => {},
        onAnnotation = () => {},
        ...other
    } = props;

    const [endTime, SetEndTime] = useState(0);
    const [currTime, SetCurrTime] = useState(0);
    const [playing, SetPlaying] = useState(false);
    const [fullscreen, SetFullscreen] = useState(false);
    const [contentLoaded, SetContentLoaded] = useState(false);

    const player = useRef();
    const container = useRef();
    const timer = useRef();

    useImperativeHandle(ref, () => ({
        ChangeTime: ChangeCurrentTime,
        paused: player?.current?.paused,
        currentTime: player?.current?.currentTime
    }));

    const ChangeCurrentTime = timestamp => player.current.currentTime = Clamp(timestamp, 0, endTime);

    const ErrorHandling = e => {
        switch (e.target.error.code) {
            //MEDIA_ELEMENT_ERROR
            case 4:
                SetSrc(null);
                break;
        }
    }

    const SetSrc = value => {
        if (value === null || value === undefined || value === "") player?.current && (player?.current?.removeAttribute("src"));
        else player?.current && (player.current.src = src);
    }

    useEffect(() => {
        //Checks if the source is valid and then execute the video action
        if (player?.current === undefined || src === undefined || src === null || src === "") return;
        if (playing) {
            const playPromise = player.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => SetPlaying(false));
            }
        }
        else player.current.pause();
    }, [playing]);

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

    useEffect(() => SetSrc(src), [src]);

    useEffect(() => contentLoaded && SetPlaying(autoPlay), [contentLoaded]);

    useEffect(() => {
        //Timer to sinalize time update to a parent component
        timer.current = setInterval(onTimeUpdate(player?.current?.currentTime), 1000);
        return () => clearInterval(timer.current);
    });

    return (
        <div
            className={styles.container}
            hidden={hidden}
            ref={container}
            {...containerProps}
        >
            <PlayingOverlay
                playing={playing}
            />
            <video
                ref={player}
                className={styles.player}
                onMouseUp={() => !navigator.userAgentData.mobile && SetPlaying(!playing)}
                onDoubleClick={() => !navigator.userAgentData.mobile && SetFullscreen(!fullscreen)}
                onTimeUpdate={e => SetCurrTime(e.target.currentTime)}
                onLoadedData={() => SetContentLoaded(true)}
                onSuspend={() => SetContentLoaded(false)}
                onError={ErrorHandling}
                autoPlay={autoPlay}
                {...other}
            />
            {next && (
                <SkipButton
                    currentTime={currTime}
                    endTime={endTime}
                    onClick={onNext}
                />
            )}
            <Controls
                ref={{
                    player: player,
                    container: container
                }}
                src={src}
                setPlaying={playing}
                prev={prev}
                next={next}
                onPrev={onPrev}
                onNext={onNext}
                onEndTime={value => SetEndTime(value)}
                onPlayingChange={value => SetPlaying(value)}
                hidden={src === "" || src === undefined || src === null}
                onAnnotation={onAnnotation}
                boldTitle={boldTitle}
                title={title}
                contentLoaded={contentLoaded}
                annotations={annotations}
            />
            <MobileControls
                playing={playing}
                onPlayingToggle={() => SetPlaying(!playing)}
                currentTime={player?.current?.currentTime}
                endTime={endTime}
                prev={prev}
                next={next}
                onPrev={onPrev}
                onNext={onNext}
            />
            <div className={styles.loading}>
                <CircularProgress
                    hidden={player?.current?.readyState >= 3 || player?.current?.currentTime == endTime || !src || !contentLoaded}
                    style={{
                        color: "white"
                    }}
                />
                <div className="flex fdcolumn align-center" hidden={src !== null || player?.current?.readyState === 4}>
                    <ErrorOutlineIcon
                        color="error"
                    />
                    <Typography
                        style={{
                            color: "white"
                        }}
                    >
                        Erro ao carregar vídeo
                    </Typography>
                </div>
            </div>
        </div>
    );
});

export default Video;