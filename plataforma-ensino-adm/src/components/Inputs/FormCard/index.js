import React, { useEffect, useRef, useState } from "react";
import { FormLabel, FormControl as Input } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import DefaultButton from "components/DefaultButton";
import { Tooltip } from "@material-ui/core";
import { maskNumber } from "Auxiliar/Masks";

const FormCard = props => {

    const {
        onChange,
        initialCards = [],
        headers = []
    } = props;

    const [number, SetNumber] = useState("");
    const [text, SetText] = useState("");
    const [cardList, SetCardList] = useState([...initialCards]);
    const [inputData, SetInputData] = useState({});

    const firstInputRef = useRef(null);

    const HandleInputChange = (prop, value) => {
        let tempInputData = inputData;
        tempInputData[prop] = value;
        console.log(tempInputData);
        SetInputData({...tempInputData});
    }

    const HandleCardAdd = () => {
        // if (!number && !text) {
        //     firstInputRef.current.focus();
        //     return;
        // }

        let tempCardList = cardList;
        // let cardData = {
        //     number: number,
        //     text: text
        // };
        tempCardList.push(inputData);
        console.log([...tempCardList]);
        SetCardList([...tempCardList]);
        SetNumber("");
        SetText("");
        onChange(tempCardList);
    }

    const HandleCardRemove = index => {
        let tempCardList = cardList;

        tempCardList.splice(index, 1);
        SetCardList([...tempCardList]);
        onChange(tempCardList);
    }

    useEffect(() => SetCardList(initialCards), [initialCards]);

    return (
        <div className="card-add-form">
            {/* <FormLabel>
                Número 
            </FormLabel>
            <Input
                placeholder="Número"
                value={number}
                onChange={e => SetNumber(maskNumber(e.target.value))}
                ref={firstInputRef}
            />
            <br/>
            <FormLabel>Texto</FormLabel>
            <Input
                placeholder="Texto do card"
                value={text}
                onChange={e => SetText(e.target.value)}
                as="textarea"
            />
            <br/> */}
            {headers?.map((header, key) => (
                <div
                    key={key}
                >
                    <FormLabel>{header?.label}</FormLabel>
                    <Input
                        placeholder="Texto do card"
                        value={inputData[header?.prop]}
                        onChange={e => HandleInputChange(header?.prop, e.target.value)}
                        as="textarea"
                    />
                </div>
            ))}
            
            <DefaultButton
                text="Adicionar card"
                style={{
                    width: "fit-content"
                }}
                onClick={HandleCardAdd}
            />
            
            <div className="table-responsive" hidden={cardList.length == 0}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {headers?.map((header, key) => (
                                <th
                                    key={key}
                                >
                                    {header?.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cardList.map((value, index) => (
                            <tr key={index}>
                                {/* <td className="text-truncate" style={{maxWidth: "150px"}}>{value.number}</td>
                                <td className="text-truncate" style={{maxWidth: "150px"}}>{value.text}</td> */}
                                {Object.keys(value)?.map((prop, key) => (
                                    <td
                                        className="text-truncate"
                                        style={{maxWidth: "150px"}}
                                        key={key}
                                    >
                                        teste
                                    </td>
                                ))}
                                <td>
                                    <DefaultButton
                                        onClick={() => HandleCardRemove(index)}
                                        width="2.2em"
                                        height="2.2em"
                                        padding={0}
                                        number={`Remover card`}
                                        bg="danger"
                                        icon={<MdDelete size={17} color="white"/>}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FormCard;