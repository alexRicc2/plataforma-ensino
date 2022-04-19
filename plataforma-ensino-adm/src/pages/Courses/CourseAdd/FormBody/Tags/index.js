import React, { useEffect, useState } from "react";
import { Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { FormControl as Input } from "react-bootstrap";

import { Get } from "../../../../../utils/request";

const Tags = props => {
    const {
        onChange
    } = props;

    const [Tags, SetTags] = useState([]);
    const [toAddTags, SetToAddTags] = useState([]);
    const [search, SetSearch] = useState("");

    const GetData = async () => {
        let response = await Get(`courses-main/tags?search=${search}`);
        if (response?.status === true) {
            SetTags(response?.tags);
        }
    }

    const UpdateList = category => {
        let toAddTagsTemp = toAddTags;
        if (!toAddTagsTemp.find(x => x.id == category.id))
            toAddTagsTemp.push(category);
        
        SetToAddTags([...toAddTagsTemp]);
        SetSearch("");
        onChange(toAddTagsTemp);
    }   

    const RemoveFromList = index => {
        let toAddTagsTemp = toAddTags;
        toAddTagsTemp.splice(index, 1);
        SetToAddTags([...toAddTagsTemp]);
        onChange(toAddTagsTemp);
    }

    useEffect(GetData, [search]);

    return (
        <div className="Tags">
            <Autocomplete
                id="add-Tags-field"
                disableCloseOnSelect={false}
                blurOnSelect
                options={Tags.filter(tag => !toAddTags.map(x => x.id).includes(tag.id))}
                value={toAddTags.map(x => x.id)}
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
                    <p>Nenhuma tag encontrada</p>
                )}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <Input
                            {...params.inputProps}
                            placeholder="Procurar por tags"
                            
                            value={search}
                            onChange={(e) => SetSearch(e.target.value)}
                        />
                    </div>
                )}
            />
            <div className="categories-chips">
                {toAddTags?.map((value, index) => (
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

export default Tags;