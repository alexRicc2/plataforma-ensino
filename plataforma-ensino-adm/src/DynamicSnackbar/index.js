import React from "react";
import { IconButton, Snackbar, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from "react-redux";
import { RiCloseFill } from "react-icons/ri";
import { Show } from "../actions/SnackbarActions";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: props => ({
        "& .MuiAlert-message": {
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center"
        }
    })
}));

const DynamicSnackbar = props => {
    
    const snackbar = useSelector(store => store.SnackbarReducer);
    const dispatch = useDispatch();

    const classes = useStyles();

    return (
        <Snackbar
            open={snackbar.show}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            autoHideDuration={4000}
            onClose={(e, reason) => reason !== "clickaway" && dispatch(Show({
                show: false,
                message: "",
                severity: "",
                buttonActionText: "",
                ButtonAction: () => {}
            }))}
        >
            <MuiAlert
                severity={snackbar.severity ? snackbar.severity : "success"}
                hidden={!snackbar.show}
                variant="filled"
                className={classes.root}
            >
                {snackbar.message}
                <Button
                    size="small"
                    style={{
                        color: "white"
                    }}
                    onClick={() => typeof(snackbar?.ButtonAction) === "function" && snackbar.ButtonAction()}
                    hidden={!snackbar.buttonActionText}
                >
                    {snackbar.buttonActionText}
                </Button>
                <IconButton
                    onClick={() => dispatch(Show({
                        show: false,
                        message: "",
                        severity: "",
                        buttonActionText: "",
                        ButtonAction: () => {}
                    }))}
                    style={{
                        padding: 0
                    }}
                >
                    <RiCloseFill color="white"/>
                </IconButton>
            </MuiAlert>
        </Snackbar>
    );
}

export default DynamicSnackbar;