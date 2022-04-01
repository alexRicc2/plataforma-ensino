import { Accordion, AccordionDetails, AccordionSummary, ButtonBase, Checkbox, Chip, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { STORAGE_URL } from "variables";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import TimerIcon from '@material-ui/icons/Timer';

import styles from "./index.module.css";
import { useHistory, useParams } from "react-router";
import { Secs2Minutes } from "utils/transformations";

const Navigator = props => {
    const {
        modules = [],
        ...other
    } = props;

    const [lessons, SetLessons] = useState([]);

    const history = useHistory();

    const { course_id, file_id } = useParams();

    return (
        <div {...other}>
            <Typography
                className={styles.title}
            >
                Conteúdo do curso
            </Typography>
            {modules?.map((module, moduleKey) => (
                <Accordion
                    key={moduleKey}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        {module?.name}
                    </AccordionSummary>
                    <AccordionDetails
                        className={styles.mainAccordionDetails}
                    >
                        {module?.lessons?.map((lesson, lessonKey) => (
                            <Accordion
                                key={lessonKey}
                                id={lesson?.id}
                                hidden={lesson?.files?.files?.length == 0}
                                className={styles.lessonAccordion}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <div className="text-truncate" style={{ maxWidth: "100px" }}>
                                        {lesson?.title}
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails
                                    className="flex fdcolumn"
                                    style={{
                                        padding: 0
                                    }}
                                >
                                    <Accordion 
                                        hidden={lesson?.files?.videos?.length == 0}
                                        className={styles.simple}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <div>
                                                Vídeo(s)
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            className="flex fdcolumn"
                                            style={{
                                                padding: 0
                                            }}
                                        >
                                            {lesson?.files?.videos?.map((video, videoKey) => (
                                                <ButtonBase
                                                    key={videoKey}
                                                    className={`${styles.videoContainer} ${file_id == video?.id ? styles.selected : ""} ${styles.fileAccordion}`}
                                                    onClick={() => history.push(`/courses/${course_id}/${video?.id}`)}
                                                >
                                                    <Checkbox
                                                        checked={video?.userfile?.completed ?? false}
                                                        disabled
                                                    />
                                                    <video
                                                        controls={false}
                                                        autoPlay={false}
                                                        src={video?.path && (STORAGE_URL + video?.path)}
                                                        className={styles.video}
                                                    />
                                                    <div
                                                        className="flex fdcolumn jcsb"
                                                        style={{
                                                            alignItems: "start"
                                                        }}
                                                    >
                                                        <Chip
                                                            size={"small"}
                                                            label={`Aula ${videoKey + 1}`}
                                                        />
                                                        <Typography
                                                            className="text-truncate"
                                                            style={{ maxWidth: "100px" }}
                                                        >
                                                            {video?.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            hidden={Math.trunc(video?.duration) == 0}
                                                            className="flex align-center"
                                                        >
                                                            <TimerIcon fontSize={"small"} />
                                                            {Secs2Minutes(Math.trunc(video?.duration))} min(s)
                                                        </Typography>
                                                    </div>
                                                </ButtonBase>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion 
                                        hidden={lesson?.files?.documents?.length == 0}
                                        className={styles.simple}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <div>
                                                Documento(s)
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            className="flex fdcolumn"
                                            style={{
                                                padding: 0
                                            }}
                                        >
                                            {lesson?.files?.documents?.map((doc, docKey) => (
                                                <ButtonBase
                                                    key={docKey}
                                                    className={`${styles.documentContainer} ${file_id == doc?.id ? styles.selected : ""} ${styles.fileAccordion}`}
                                                    onClick={() => history.push(`/courses/${course_id}/${doc?.id}`)}
                                                >
                                                    <Checkbox
                                                        checked={doc?.userfile?.completed ?? false}
                                                        disabled
                                                    />
                                                    <div className={styles.filePreview}>
                                                        <PictureAsPdfIcon
                                                            style={{
                                                                color: "#b83535"
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        className="flex fdcolumn jcsb"
                                                        style={{
                                                            alignItems: "start"
                                                        }}
                                                    >
                                                        <Chip
                                                            size={"small"}
                                                            label={`Aula ${docKey + 1}`}
                                                        />
                                                        <Typography
                                                            className="text-truncate"
                                                            style={{ maxWidth: "100px" }}
                                                        >
                                                            {doc?.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            hidden={Math.trunc(doc?.duration) == 0}
                                                            className="flex align-center"
                                                        >
                                                            <TimerIcon fontSize={"small"} />
                                                            {Secs2Minutes(Math.trunc(doc?.duration))} min(s)
                                                        </Typography>
                                                    </div>
                                                </ButtonBase>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default Navigator;