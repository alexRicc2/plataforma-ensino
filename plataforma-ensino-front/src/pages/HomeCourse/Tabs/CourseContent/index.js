import { Box, Typography } from "@material-ui/core";
import { Secs2Minutes, Secs2Time } from "../../../../utils/transformations";

import CollapseContainer from "../../../../components/CollapseContainer";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const CourseContent = props => {

    const {
        modules
    } = props;

    return (
        <div>
            <Typography
                variant="h5"
                gutterBottom
            >
                Conteúdo do curso
            </Typography>
            <Typography
                variant="body2"
            >
                {modules?.length} módulos • {modules?.reduce((result, module) => result + module?.lessons?.length, 0)} aulas
            </Typography>
            {modules?.map(module => (
                <CollapseContainer
                    key={module?.id}
                    title={module?.name}
                    label={`${module?.lessons?.reduce((result, lesson) => result + lesson?.files?.files?.length, 0)} aulas • ${Secs2Minutes(module?.duration)}min`}
                >
                    {module?.lessons?.map(lesson => (
                        lesson?.files?.files?.map(file => (
                            <Box
                                key={file?.id}
                                display="inline-flex"
                                justifyContent="space-between"
                                padding="0.5em"
                                width="100%"
                            >
                                <div
                                    style={{
                                        maxWidth: "50%",
                                        display: "flex"
                                    }}
                                    className="text-truncate"
                                >
                                    {file?.type === "video" ? <PlayCircleFilledIcon/> : <InsertDriveFileIcon/>}
                                    {file?.name}
                                </div>
                                <div>
                                    {Secs2Time(file?.duration)}
                                </div>
                            </Box>
                        ))
                    ))}
                </CollapseContainer>
            ))}
        </div>
    );
}

export default CourseContent;