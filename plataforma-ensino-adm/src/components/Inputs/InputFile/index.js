import { Chip } from "@material-ui/core";
import DefaultButton from "components/DefaultButton";
import { useEffect, useRef, useState } from "react";
import { Get } from "utils/request";

const InputFile = props => {

    const {
        paths = [],
        accept = ""
    } = props;

    const [files, SetFiles] = useState([]);
    const [size, SetSize] = useState(0);

    const input = useRef();

    const GetFiles = async () => {
        if (paths.length == 0 || !paths[0]) return;
        console.log(paths[0])
        await fetch(paths[0], {
            method: "GET",
            headers: {
                "Accept": "application/pdf",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        })
        .then(e => e.blob())
        .then(blob => {
            console.log(new File([blob], "name", { lastModified: 1534584790000 }))
        })
    }

    const HandleInputReceive = () => {
        let current_files = input.current.files;
        let temp_files = files;
        for (let i = 0; i < current_files.length; i++) {
            temp_files.push(current_files[i]);
        }
        SetFiles([...temp_files]);
        input.current.value = "";
        console.log(files);
    }

    useEffect(() => GetFiles(), [paths]);

    return (
        <div>
            <div>
                {/* {existingDocs.map((value, i) => (
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
                ))} */}
                {files.map((value, index) => {
                    return (<Chip
                        id={index}
                        key={index}
                        label={"teste"}
                        // onDelete={(index) => HandleChipDeletion(index)}
                        style={{
                            maxWidth: "10em",
                            marginBottom: "5px"
                        }}
                        className="video-new"
                    />)
                })}
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

export default InputFile;