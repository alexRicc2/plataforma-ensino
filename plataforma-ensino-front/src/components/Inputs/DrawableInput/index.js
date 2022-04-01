import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import CanvasInput from "../CanvasInput";
import ImageInput from "../ImageInput";

import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';

const DrawableInput = React.forwardRef((props, ref) => {

    const {
        prevImage,
        initialMode = 0,
        onChange = () => {},
        ...other
    } = props;

    const [image, SetImage] = useState("");
    const [mode, SetMode] = useState(0);

    const [canvasImage, SetCanvasImage] = useState("");
    const [inputImage, SetInputImage] = useState("");

    useEffect(() => {
        switch (mode) {
            case 0:
                onChange(canvasImage);
                break;
            case 1:
                onChange(inputImage);
                break;
            default:
                onChange(image);
                break;
        }
    }, [inputImage, canvasImage, mode]);

    return (
        <div style={{ width: "fit-content" }} ref={ref}>
            <Tabs
                value={mode}
                textColor="primary"
                indicatorColor="primary"
                onChange={(_, key) => SetMode(key)}
                variant="fullWidth"
            >
                <Tab icon={<CreateIcon/>} label="Escrever"/>
                <Tab icon={<ImageIcon/>} label="Inserir"/>
            </Tabs>
            <CanvasInput
                onChange={value => {
                    SetImage(value);
                    SetCanvasImage(value);
                }}
                hidden={mode != 0}
            />
            <ImageInput
                boxStyle={{
                    width: "25em",
                    height: "10em"
                }}
                onImageChangeBase64={value => {
                    SetImage(value);
                    SetInputImage(value);
                }}
                hidden={mode != 1}
                path={prevImage}
            />
        </div>
    );
});

export default DrawableInput;