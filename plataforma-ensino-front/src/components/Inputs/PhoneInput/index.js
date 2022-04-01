import React, { useState } from "react";

import { TextField } from "@material-ui/core";
import { FormControl as Input } from "react-bootstrap";
import InputText from "../InputText";

const PhoneInput = props => {

    const {
        GetValue,
        initialValue = "",
        inputType = "materialUI | bootstrap",
        labelColor="",
        focusedLabelColor="",
        underlineColor="",
        label="",
        ...others
    } = props;

    const [inputValue, SetInputValue] = useState(initialValue !== null ? initialValue : "");
    const [prevInputValue, SetPrevInputValue] = useState(initialValue !== null ? initialValue : "");

    const Normalize = (value) => {
        const realNumber = value.replace(/[^0-9]/g, '');
        const realNumberSize = realNumber.toString().length;
        
        if (realNumberSize > 11) return;

        let inputValueTemp = realNumber.toString();

        if (realNumberSize != prevInputValue.replace(/[^0-9]/g, '').length) {
            if (realNumberSize >= 2) {
                inputValueTemp = [inputValueTemp.slice(0, 0), "(", inputValueTemp.slice(0)].join("");
                inputValueTemp = [inputValueTemp.slice(0, 3), ") ", inputValueTemp.slice(3)].join("");
            }

            if (realNumberSize >= 7) inputValueTemp = [inputValueTemp.slice(0, 10), "-", inputValueTemp.slice(10)].join("");
        }

        SetPrevInputValue(value);
        SetInputValue(inputValueTemp);
        GetValue && GetValue(inputValueTemp);
    }

    if (inputType == "bootstrap") return (
        <Input
            placeholder="(xx) xxxxx-xxxx"
            value={inputValue}
            onChange={(e) => Normalize(e.target.value)}
            {...others}
        />
    );
    
    return (
        <TextField
            placeholder="(xx) xxxxx-xxxx"
            value={inputValue}
            onChange={(e) => Normalize(e.target.value)}
            // labelColor={labelColor}
            // focusedLabelColor={focusedLabelColor}
            // underlineColor={underlineColor}
            label={label}
            {...others}
        />
    );
}

export default PhoneInput;