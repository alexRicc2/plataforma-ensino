import { Avatar, Box } from "@material-ui/core";

const Instructor = props => {
    const {
        id,
        name,
        img,
    } = props;

    return (
        <Box>
            <a
                href={`/profile/view/${id}/public`}
            >
                {name}
            </a>
            <Avatar
                src={img}
                style={{
                    width: "6em",
                    height: "6em"
                }}
            />
        </Box>
    );
}

export default Instructor;