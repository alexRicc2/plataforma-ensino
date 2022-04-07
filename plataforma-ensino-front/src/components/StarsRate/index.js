import { Box } from "@material-ui/core";

import StarIcon from '@material-ui/icons/Star';
import styles from "./index.module.css";

const StarsRate = props => {

    const {
        rate
    } = props;

    return (
        <Box
            position="relative"
        >
            {new Array(5).fill(undefined).map((_, key) => (
                <StarIcon
                    key={key}
                    className={styles.star}
                />
            ))}
            <Box
                position="absolute"
                top="0"
                left="0"
            >
                {new Array(rate ? rate : 0).fill(undefined).map((_, key) => (
                    <StarIcon
                        key={key}
                        className={styles.rateStar}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default StarsRate;