import React, {useState, useRef, useEffect} from "react";
import { ButtonBase } from "@material-ui/core";

import {FormControl as Input, Button} from "react-bootstrap";

import {ImImages} from "react-icons/im";
import {RiDeleteBin5Line} from "react-icons/ri";

import { STORAGE_URL } from "../../../variables";

import "./ImageInput.css";
import DefaultButton from "../../DefaultButton";

const ImageInput = props => {

    const {
        ImageChange,
        path,
        boxStyle = {},
        svgSize = 50,
        onImageChangeBase64 = () => {},
        ...others
    } = props;

    const [image, SetInputValue] = useState();
    const [has_image, SetHasImage] = useState(false);

    const [path_loaded, SetPathLoad] = useState(false);

    const input_image = useRef(null);
    const image_holder = useRef(null);

    const PreviewImage = (file) => {
        let image = file;
        if (image && FileReader) {
            let filereader = new FileReader();

            filereader.onload = () => {
                image_holder.current.style.backgroundImage = `url(${filereader.result})`;
                onImageChangeBase64(filereader.result);
                SetHasImage(true);
                console.log('has image:',has_image);
            };
            filereader.readAsDataURL(image);
        }
    };

    const RemovePreviewImage = () => {
        SetInputValue("");
        SetHasImage(false);

        (ImageChange && ImageChange(""));
        onImageChangeBase64("");

        image_holder.current.style.backgroundImage = "";
        input_image.current.value = "";
    };

    const LoadPathImage = () => {
        image_holder.current.style.backgroundImage = `url(${STORAGE_URL + path})`;
        SetHasImage(true);
    }
    
    useEffect(() => {
        if (path && !path_loaded) {
            SetPathLoad(true);
            LoadPathImage();
        }
    });

    return(
        <div 
            style={{width: "fit-content"}}
            {...others}
        >
            <Input 
                type="file" 
                accept="image/*"
                className="hide"
                onChange={(e) => {
                    let file = e.target.files[0];
                    SetInputValue(file);
                    PreviewImage(file);
                    (ImageChange && ImageChange(file));
                }}
                ref={input_image}
            />
            <div className="flex fdcolumn">
                <ButtonBase
                    onClick={() => input_image.current.click()}
                    className="input-image-box align-center jcc flex"
                    ref={image_holder}
                    style={boxStyle}
                >
                    <ImImages size={svgSize} color="gray" className={has_image ? "hide" : ""}/>
                </ButtonBase>
                <DefaultButton
                    onClick={() => RemovePreviewImage()}
                    className="w100 align-center jcc flex rounded-0"
                    hidden={!has_image}
                    icon={<RiDeleteBin5Line/>}
                    bg="danger"
                    text="Deletar"
                    width="50"
                />
            </div>
        </div>
    );
}

export default ImageInput;