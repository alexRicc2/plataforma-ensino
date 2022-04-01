import React from "react";

import { InputBase, InputAdornment } from "@material-ui/core";
import { AiOutlineSearch } from "react-icons/ai";

import "./index.css";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        transition: "200ms",
        width: "175px",
        color: "white",
        borderRadius: "5px",
        padding: "0 10px",
        backgroundColor: "#515151",
        // "&.Mui-focused": {
        //     width: "200px"
        // },
        "&:hover": {
            filter: "brightness(1.2)"
        }
    }
}));

const SearchInput = props => {

    const {
        placeholder = "Pesquisar...",
        ...others
    } = props;

    const classes = useStyles();

    return (
        <InputBase
            className={classes.root}
            placeholder={placeholder}
            startAdornment={
                <InputAdornment
                    style={{
                        padding: "0 10px"
                    }}
                    position="start"
                >
                    <AiOutlineSearch color="white"/>
                </InputAdornment>
            }
            {...others}
        />
    );
}

export default SearchInput;