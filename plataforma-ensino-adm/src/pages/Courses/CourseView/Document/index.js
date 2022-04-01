import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Get, Post } from "utils/request";
import { STORAGE_URL } from "variables";

import styles from "./index.module.css";

const DocumentContainer = props => {

    const {
        path = "",
        type = "",
        duration,
        onUpdate = () => {}
    } = props;

    const [loading, SetLoading] = useState(false);

    const history = useHistory();
    const { file_id } = useParams();

    const timer = useRef();

    const Log = async (firstCall = false) => {
        if (type != "document") return;
        let form = new FormData();
        form.append("file_id", file_id);
        if (!firstCall) form.append("completed", true);
        
        SetLoading(true);
        let response = await Post(`lessons/files/log`, form);
        // console.log(response);
        SetLoading(false);
        if (response?.status === true) {
            if (response?.userfile?.completed) onUpdate();
        }
    }

    useEffect(() => Log(true), [path, type]);//Logging when user opens a new document

    useEffect(() => {
        timer.current = setTimeout(Log, duration * 0.5 * 1000);
        return () => clearTimeout(timer.current);
    }, [duration]);

    return (
        <div className="preview-document">
            <iframe
                src={path && (STORAGE_URL + path)}
                className={styles.iframe}
                hidden={type != "document"}
            />
        </div>
    );
}

export default DocumentContainer;