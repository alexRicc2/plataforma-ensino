import { Box } from "@material-ui/core";
import Video from "../../../../../../components/Video";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Get } from "../../../../../../utils/request";
import { STORAGE_URL } from "../../../../../../variables";

const VideoContainer = () => {

    const [videos, SetVideos] = useState([]);

    const { course_id, lesson_id } = useParams();

    const GetData = async () => {
        let response = await Get(`lessons?id=${lesson_id}`);

        if (response?.status === true) {
            SetVideos(response?.lesson?.files?.videos);
        }
        console.log(response);
    }

    useEffect(GetData, []);

    return (
        <Box>
            <Video
                src={videos && videos[0]?.path && STORAGE_URL + videos[0]?.path}
            />
        </Box>
    );
}

export default VideoContainer;