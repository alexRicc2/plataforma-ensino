import React from "react";

import { createTheme, TextField, ThemeProvider, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

/*
    A ideia desse componente é facilitar algumas modificações no TextField, como mudança de cores, etc
isso mantendo o padrão dos nomes das props
*/

const useStyles = makeStyles(theme => ({
    root: props => ({
        background: "white",
        "& label": {
            ...(props?.labelColor && {color: props?.labelColor})
        },
        "& label.Mui-focused": {
            ...(props?.focusedLabelColor && {color: props?.focusedLabelColor})
        },
        "& .MuiInput-underline:after": {
            ...(props?.underlineColor && {borderBottomColor: props?.underlineColor})
        },
        "& .MuiFilledInput-underline:after": {
            ...(props?.underlineColor && {borderBottomColor: props?.underlineColor})
        },
    })
}));

const InputText = React.forwardRef((props, ref) => {
    
    const {
        labelColor,
        focusedLabelColor,
        underlineColor,
        ...other
    } = props;
    
    const classes = useStyles(props);

    return (
        <TextField
            {...other}
            className={classes.root}
            inputRef={ref}
        />
    );
});

export default InputText;