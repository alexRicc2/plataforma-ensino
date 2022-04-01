import { Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";

import { FormControl as Input } from "react-bootstrap";

import { Get } from "../../../../utils/request";

const Category = props => {

    const {
        onChange = () => {}
    } = props;

    const [categories, SetCategories] = useState([]);
    const [toAddCategories, SetToAddCategories] = useState([]);
    const [search, SetSearch] = useState("");

    const GetData = async () => {
        let response = await Get(`courses-main/category?search=${search}`);
        console.log(response);
        if (response?.status === true) {
            SetCategories(response?.categories);
        }
    }

    const UpdateList = category => {
        let toAddCategoriesTemp = toAddCategories;
        if (!toAddCategoriesTemp.find(x => x.id == category.id))
            toAddCategoriesTemp.push(category);
        
        SetToAddCategories([...toAddCategoriesTemp]);
        SetSearch("");
        onChange(toAddCategoriesTemp);
    }   

    const RemoveFromList = index => {
        let toAddCategoriesTemp = toAddCategories;
        toAddCategoriesTemp.splice(index, 1);
        SetToAddCategories([...toAddCategoriesTemp]);
        onChange(toAddCategoriesTemp);
    }

    useEffect(() => GetData(), [search]);

    return (
        <div className="categories">
            <Autocomplete
                id="add-categories-field"
                disableCloseOnSelect={false}
                blurOnSelect
                options={categories.filter(category => !toAddCategories.map(x => x.id).includes(category.id))}
                value={toAddCategories.map(x => x.id)}
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
                    <p>Nenhuma categoria encontrada</p>
                )}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <Input
                            {...params.inputProps}
                            placeholder="Procurar por categorias"
                            autoFocus
                            value={search}
                            onChange={(e) => SetSearch(e.target.value)}
                        />
                    </div>
                )}
            />
            <div className="categories-chips">
                {toAddCategories?.map((value, index) => (
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

export default Category;