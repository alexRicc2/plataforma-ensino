import Video from "components/Video";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Get, Post } from "utils/request";
import { STORAGE_URL } from "variables";

import styles from "./index.module.css";

const LOG_UPDATE_DELAY = 1;

const VideoContainer = props => {

    const {
        path = "",
        type = "",
        prev = "",
        next = "",
        onUpdate = () => {}
    } = props;

    const [videoTime, SetVideoTime] = useState(0);
    const [loading, SetLoading] = useState(false);
    const [lastLogTime, SetLastLogTime] = useState(Date.now() / 1000);

    const history = useHistory();
    const { course_id, file_id } = useParams();

    const Log = async () => {
        let deltaLogTime = Date.now() / 1000 - lastLogTime;
        if (loading || deltaLogTime < LOG_UPDATE_DELAY || type != "video") return;
        SetLastLogTime(Date.now() / 1000);
        let form = new FormData();
        form.append("file_id", file_id);
        form.append("video_time", videoTime);
        
        SetLoading(true);
        let response = await Post(`lessons/files/log`, form);
        SetLoading(false);
        if (response?.status === true) {
            if (response?.userfile?.completed) onUpdate();
        }
    }
    
    useEffect(Log, [videoTime]);

    return (
        <div className="preview-video">
            <Video
                src={path && (STORAGE_URL + path)}
                hidden={type != "video"}
                next={next}
                prev={prev}
                onPrev={() => history.push(`/courses/${course_id}/${prev?.id}`)}
                onNext={() => history.push(`/courses/${course_id}/${next?.id}`)}
                onTimeUpdate={time => SetVideoTime(time)}
            />
        </div>
    );
}

export default VideoContainer;