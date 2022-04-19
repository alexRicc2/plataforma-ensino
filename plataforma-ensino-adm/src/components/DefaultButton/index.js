import React, { useState } from "react";

import {Button, CircularProgress, Tooltip, Zoom} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const colors = {
    primary: "#198754",
    info:"#38a4f8",
    secondary: "#6c757d",
    confirm: "#198754",
    warning: "#ffc107",
    danger: "#dc3545",
    disabled: "gray",
    none: "none"
}

const DefaultButton = ({
    loading = false, 
    disabled = false,
    text = "", 
    loadingtext = "",
    bg = Object.keys(colors)[0], 
    color = "white", 
    variant = "contained", 
    type = "button",
    icon = <></>,
    hoverIcon,
    to,
    routeState = {},
    title = "",
    width = "auto",
    height = "auto",
    padding = "auto",
    className = "",
    style = {},
    onClick = (e) => void 0,
    search = '',
    bordersRadius = [true, true, true, true],
    ...others
}) => {

    const [hoverBtn, SetHoverBtn] = useState(false);

    const navigate = useNavigate();

    return (
        <Tooltip
            title={title}
            // TransitionComponent={Zoom}
        >
            <div className="inline-flex">
                <Button
                    variant={variant}
                    disabled={loading || disabled}
                    style={Object.assign({
                        backgroundColor: (bg in colors && !disabled ? colors[`${bg}`] : disabled ? colors["disabled"] : bg),
                        color: (color in colors ? colors[`${color}`] : color),
                        position: "relative",
                        textDecoration: "none",
                        minWidth: "auto",
                        width: width,
                        textTransform: "none",
                        height: height,
                        padding: padding,
                        borderTopLeftRadius: bordersRadius[0] ? "4px" : "initial",
                        borderTopRightRadius: bordersRadius[1] ? "4px" : "initial",
                        borderBottomRightRadius: bordersRadius[2] ? "4px" : "initial",
                        borderBottomLeftRadius: bordersRadius[3] ? "4px" : "initial",
                        
                    }, style)}
                    type={type}
                    onClick={(e) => {
                        onClick(e);
                        to && navigate({
                            pathname: to,
                            state: routeState,
                            search: search
                        });
                    }}
                    className={"flex jcc align-center " + className}
                    onMouseEnter={() => SetHoverBtn(true)}
                    onMouseLeave={() => SetHoverBtn(false)}
                    {...others}
                >
                    {!loading && (hoverIcon ? (hoverBtn ? hoverIcon : icon) : icon)}
                    <CircularProgress
                        className={loading ? "" : "hide"}
                        style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "4px",
                            color: color
                        }}
                    />
                    {loadingtext != "" && loading ? loadingtext : text}
                </Button>
            </div>
        </Tooltip>
    );
}

export default DefaultButton;