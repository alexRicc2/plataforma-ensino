import DefaultButton from "components/DefaultButton";
import { useEffect, useRef, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import SignatureCanvas from "react-signature-canvas";


import styles from "./index.module.css";

const CanvasInput = props => {

    const {
        prevCanvas = "",
        onChange = () => {},
        ...other
    } = props;

    const [image, SetImage] = useState("");
    const [hideIcon, SetHideIcon] = useState(false);

    const canvas = useRef();

    const HandleChange = () => {
        if (!canvas?.current) return;
        
        SetImage(canvas.current.toDataURL("image/png"));
    }

    useEffect(() => onChange(image), [image]);

    // useEffect(() => {
    //     if (prevCanvas != "" && canvas?.current) {
    //         canvas?.current.fromDataURL(prevCanvas);
    //     }
    // }, []);

//canvas?.current && SetImage(canvas.current.getTrimmedCanvas().toDataURL("image/png"))
    return (
        <div 
            className={styles.container}
            {...other}
        >
            <div className={styles.overlay} hidden={hideIcon || (canvas?.current && !canvas?.current?.isEmpty())}>
                <FaPen size={50} color={"gray"}/>
            </div>
            <SignatureCanvas
                ref={canvas}
                onEnd={() => {
                    HandleChange();
                    SetHideIcon(false);
                }}
                onBegin={() => SetHideIcon(true)}
                canvasProps={{
                    style: {
                        width: "25em",
                        height: "10em"
                    },
                    className: styles.canvas
                }}
            />
            <DefaultButton
                onClick={() => {
                    canvas?.current && canvas?.current?.clear();
                    SetImage("");
                }}
                className="w100 align-center jcc flex rounded-0"
                hidden={canvas?.current && canvas?.current?.isEmpty()}
                icon={<RiDeleteBin5Line/>}
                bg="danger"
                text="Deletar"
            />
        </div>
    );
}

export default CanvasInput;