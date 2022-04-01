import React, { useEffect, useState } from "react";
import { Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { FormControl as Input } from "react-bootstrap";

import { Get } from "../../../../../utils/request";

const Responsibles = props => {
    const {
        prevResponsibles,
        onChange
    } = props;

    const [responsibles, SetResponsibles] = useState([]);
    const [toAddResponsibles, SetToAddResponsibles] = useState(prevResponsibles);
    const [search, SetSearch] = useState("");

    const GetData = async () => {
        let response = await Get(`user/privileged?search=${search}`);
        console.log(response);
        if (response?.status === true) {
            SetResponsibles(response?.users);
        }
    }

    const UpdateList = category => {
        let toAddResponsiblesTemp = toAddResponsibles;
        if (!toAddResponsiblesTemp.find(x => x.id == category.id))
            toAddResponsiblesTemp.push(category);
        
        SetToAddResponsibles([...toAddResponsiblesTemp]);
        SetSearch("");
        onChange(toAddResponsiblesTemp);
    }   

    const RemoveFromList = index => {
        let toAddResponsiblesTemp = toAddResponsibles;
        toAddResponsiblesTemp.splice(index, 1);
        SetToAddResponsibles([...toAddResponsiblesTemp]);
        onChange(toAddResponsiblesTemp);
    }

    useEffect(() => GetData(), [search]);

    return (
        <div className="responsibles">
            <Autocomplete
                id="add-responsibles-field"
                disableCloseOnSelect={false}
                blurOnSelect
                options={responsibles.filter(category => !toAddResponsibles.map(x => x.id).includes(category.id))}
                value={toAddResponsibles.map(x => x.id)}
                multiple
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={option => option.name ? option.name : ""}
                renderOption={(option, i) => (
                    <div 
                        key={i} 
                        onClick={(e) => UpdateList(option)} 
                        className="flex fdrow jcsb w100 align-center"
                    >
                        {option.name}
                    </div>
                )}
                style={{ width: "100%" }}
                noOptionsText={(
                    <p>Nenhum usuário encontrado</p>
                )}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <Input
                            {...params.inputProps}
                            placeholder="Procurar por usuários"
                            autoFocus
                            value={search}
                            onChange={(e) => SetSearch(e.target.value)}
                        />
                    </div>
                )}
            />
            <div className="categories-chips">
                {toAddResponsibles?.map((value, index) => (
                    <Chip
                        key={index}
                        label={value?.name}
                        onDelete={() => RemoveFromList(index)}
                        style={{
                            marginTop: "10px"
                        }}
                    />
                ))}
            </div>
        </div>
    );

}

export default Responsibles;