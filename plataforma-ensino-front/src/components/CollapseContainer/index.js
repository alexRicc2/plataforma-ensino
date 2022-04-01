import { useState } from "react";
import { ButtonBase, Collapse } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from "./index.module.css";

const CollapseContainer = props => {

    const {
        title,
        hideExpandLabel = false,
        label = "",
        children,
        ...other
    } = props;

    const [expanded, SetExpanded] = useState(false);

    return (
        <div className="collapseContainer">
            <ButtonBase
                className={`flex w100 jcsb align-center ${styles.expandTab}`}
                {...other}
                onClick={() => SetExpanded(!expanded)}
            >
                <span className={styles.title}>{title}</span>
                <span 
                    className="flex fdrow"
                    style={{
                        userSelect: "none",
                        cursor: "pointer"
                    }}
                >
                    <div className={styles.button} hidden={hideExpandLabel}>
                        {label ? label : !expanded ? "Mostrar mais" : "Mostrar menos"}
                    </div>
                    <ExpandMoreIcon
                        className={`${expanded ? styles.expandedIcon : ""} ${styles.icon}`}
                    />
                </span>
            </ButtonBase>
            <Collapse in={expanded}>
                {children}
            </Collapse>
        </div>
    );
}

export default CollapseContainer;