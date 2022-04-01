import React from "react";
import ColorPicker from "material-ui-color-picker";
import { Paper } from "@material-ui/core";

import "./index.css";

const ColorInput = props => {

    const {
        value,
        onChange = () => {},
        ...others
    } = props;

    return (
        <div className="flex fdrow" style={{ position: "relative" }}>
            <ColorPicker
                value={value}
                onChange={color => {
                    color !== undefined && onChange(color);
                }}
                style={{
                    backgroundColor: "#e1e1e1"
                }}
                disabled
            />
            <Paper 
                elevation={3}
                style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: value
                }}
            />
            <span 
                id="colorpicker-hinttext"
                style={{
                    pointerEvents: "none"
                }}
            >
                {value}
            </span>
        </div>
    );
}

export default ColorInput;