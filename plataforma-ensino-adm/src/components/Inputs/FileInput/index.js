import React, { useEffect, useRef, useState } from "react";

import { Chip } from "@material-ui/core";
import DefaultButton from "../../DefaultButton";

const FileInput = props => {

    const {
        OnChange,
        accept = "",
        HandleExistingDocDeletion = () => {},
        existingDocs = [],
        single = false
    } = props;

    const [files, SetFiles] = useState([]);
    const [size, SetSize] = useState(0);

    const input = useRef();

    const HandleInputReceive = () => {
        let current_files = input.current.files;
        let temp_files = files;
        for (let i = 0; i < current_files.length; i++) {
            temp_files.push(current_files[i]);
        }
        SetFiles([...temp_files]);
        input.current.value = "";
    }

    const HandleChipDeletion = index => {
        let temp_files = files;
        temp_files.splice(index, 1);
        SetFiles([...temp_files]);
    }

    useEffect(() => {
        OnChange && OnChange(files);
        if (single) {
            if (existingDocs.length > 0) {
                HandleExistingDocDeletion();
                SetFiles([files[files.length - 1]]);
            }
            if (files.length > 1) SetFiles([files[files.length - 1]]);
        }

        let temp_size = 0;
        for (let i = 0; i < files.length; i++) {
            temp_size += files[i].size;
        }
        SetSize(temp_size);
    }, [files]);

    return (
        <div className="input-select">
            <div id="chips" className='mb-2'>
                {!single && existingDocs.map((value, i) => (
                    <Chip
                        key={i}
                        // label={'Arquivo '+(i+1)}
                        label={value["name"]}
                        onDelete={() => HandleExistingDocDeletion(value["id"], i)}
                        style={{
                            maxWidth: "10em",
                            marginBottom: "5px"
                        }}
                    />
                ))}

                {single && existingDocs.length != 0 && (
                    <Chip
                        // label={'Arquivo '+(i+1)}
                        label={existingDocs[0]["name"]}
                        onDelete={() => HandleExistingDocDeletion(existingDocs[0]["id"], 0)}
                        style={{
                            maxWidth: "10em",
                            marginBottom: "5px"
                        }}
                    />
                )}
                {
                    files.map((value, index) => {
                        return (<Chip
                            id={index}
                            key={index}
                            label={value["name"]}
                            onDelete={(index) => HandleChipDeletion(index)}
                            style={{
                                maxWidth: "10em",
                                marginBottom: "5px"
                            }}
                            className="video-new"
                        />)
                    })
                }
            </div>

            <div className={(size == 0 ? "hide" : "")}>
                <p className="text-muted">Tamanho total dos arquivos: <b>{(size / 1000000).toFixed(2)} MB</b></p>
            </div>
            <input
                ref={input}
                className="hide"
                type="file"
                multiple
                accept={accept}
                onChange={() => HandleInputReceive()}
            />

            <DefaultButton
                text="Selecionar arquivos"
                bg="primary"
                onClick={() => input.current.click()}
                style={{ marginBottom: "10px" }}
            />


        </div>
    );

}

export default FileInput;