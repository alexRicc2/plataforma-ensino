import React, { useState, useRef, useEffect } from "react";

import { IconButton } from "@material-ui/core";
import { RiCloseFill } from 'react-icons/ri';

import "./index.css";
import DefaultButton from "../../DefaultButton";
import { STORAGE_URL } from "../../../variables";

const VideoInput = props => {

    const {
        multiple = false,
        limitOne = false,
        existingVideos = [],
        VideoChange,
        HandleExistingVideoDeletion = () => {}
    } = props;
    
    const [videos, SetVideos] = useState([]);
    const [videoSize, SetSize] = useState(0);
    const videoInput = useRef(null);

    const HandleInputReceive = () => {
        let files = videoInput.current.files;
        let temp_videos = videos;
        
        if (limitOne) {
            SetVideos([files[files?.length - 1]]);
            return;
        }

        for (let i = 0; i < files.length; i++) {
            temp_videos.push(files[i]);
        }

        SetVideos([...temp_videos]);
        videoInput.current.value = "";
    }

    const HandleVideoDeletion = index => {
        let temp_videos = videos;
        temp_videos.splice(index, 1);
        SetVideos([...temp_videos]);
    }

    useEffect(() => {
        VideoChange && VideoChange(videos);

        let temp_size = 0;
        for (let i = 0; i < videos.length; i++) {
            temp_size += videos[i].size;
        }
        SetSize(temp_size);
    }, [videos]);

    return (
        <div className="video-input">
            <input
                type="file"
                accept="video/*"
                className="hide"
                multiple={multiple}
                ref={videoInput}
                onChange={HandleInputReceive}
            />

            <div className="video-collection">
                {existingVideos && existingVideos?.map((value, i) => (
                    <VideoInputBox
                        key={i}
                        index={value["id"]}
                        videoName={value["name"]}
                        index_file={i}
                        url={STORAGE_URL + value["path"]}
                        onClose={index => HandleExistingVideoDeletion(index, i)}
                    />
                ))}
                {videos && videos.map((value, index) => (
                    <VideoInputBox
                        key={index}
                        video={value}
                        id={index}
                        index={index}
                        newVideo
                        onClose={(index) => HandleVideoDeletion(index)}
                    />
                ))}
            </div>

            <div className={(videoSize == 0 ? "hide" : "")}>
                <p className="text-muted">Tamanho total dos vídeos: <b>{(videoSize / 1000000).toFixed(2)} MB</b></p>
            </div>

            <DefaultButton
                text={limitOne ? "Selecionar vídeo" : "Selecionar vídeos"}
                bg="primary"
                onClick={() => videoInput.current.click()}
                style={{ marginBottom: "10px" }}
            />
        </div>
    );
}

export const VideoInputBox = ({ video, index, onClose, url = "", newVideo = false, index_file = 1, videoName }) => {

    const [name, SetName] = useState("Video "+(index_file+1));
    const [modal, SetModal] = useState(false);

    const thumb_ref = useRef();

    useEffect(() => {
        if (video === undefined) return;
        thumb_ref.current.src = URL.createObjectURL(video);
        SetName(video.name);
    }, [video]);

    useEffect(() => {
        if (videoName != "" && videoName !== undefined && videoName !== null) SetName(videoName);
    }, [name]);

    return (
        <div className={"video-input-box " + (newVideo ? "video-new" : "")}>
            <IconButton
                id="remove-button"
                size="small"
                onClick={() => (onClose && onClose(index))}
            >
                <RiCloseFill style={{
                    width: "0.7em",
                    color: "white"
                }} />
            </IconButton>
            <video
                autoPlay={false}
                controls={false}
                className="video-thumb"
                ref={thumb_ref}
                src={url}
                onClick={() => alert(0)}
            />
            <div className="video-name">
                {name ? name : "Video sem nome"}
            </div>
            {/* <Modal
                open={modal}
                onClose={SetModal(false)}
            >
                <video 
                    autoPlay={false}
                    controls={false}
                    className="video-thumb"
                    ref={thumb_ref}
                    src={url}
                />
            </Modal> */}
        </div>
    );
}

export default VideoInput;