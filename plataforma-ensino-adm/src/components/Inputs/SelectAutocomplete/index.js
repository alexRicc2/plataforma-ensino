import { Autocomplete } from "@material-ui/lab";
import DefaultButton from "components/DefaultButton";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FormControl as Input } from "react-bootstrap";

const SelectAutocomplete = props => {

    const {
        items = [],
        placeholder = "Pesquisar",
        notFoundMessage = "Nada encontrado",
        zeroItemsMessage = "Nada selecionado",
        tableBody = [],
        onChange = () => {},
        onSearch = () => {},
        ...other
    } = props;

    const [toAddItems, SetToAddItems] = useState([]);
    const [search, SetSearch] = useState("");

    const UpdateList = category => {
        let toAddItemsTemp = toAddItems;
        if (!toAddItemsTemp.find(x => x.id == category.id))
            toAddItemsTemp.push(category);
        
        SetToAddItems([...toAddItemsTemp]);
        SetSearch("");
        onChange(toAddItemsTemp);
    }   

    const RemoveFromList = index => {
        let toAddItemsTemp = toAddItems;
        toAddItemsTemp.splice(index, 1);
        SetToAddItems([...toAddItemsTemp]);
        onChange(toAddItemsTemp);
    }

    useEffect(() => onSearch(search), [search]);

    return (
        <div>
            <Autocomplete
                id="select-auto-complete-field"
                disableCloseOnSelect={false}
                blurOnSelect
                options={items?.filter(tag => !toAddItems?.map(x => x.id).includes(tag.id))}
                value={toAddItems.map(x => x.id)}
                multiple
                getOptionSelected={(option, value) => option?.id === value?.id}
                getOptionLabel={option => option?.name ? option?.name : ""}
                renderOption={(option, i) => (
                    <div 
                        key={i} 
                        onClick={(e) => UpdateList(option)} 
                        className="flex fdrow jcsb w100 align-center"
                    >
                        {option?.name}
                    </div>
                )}
                style={{ width: "100%" }}
                noOptionsText={(
                    <p>{notFoundMessage}</p>
                )}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <Input
                            {...params.inputProps}
                            placeholder={placeholder}
                            value={search}
                            onChange={(e) => SetSearch(e.target.value)}
                        />
                    </div>
                )}
            />
            <div className="table-responsive margin-bottom">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {tableBody?.map((cell, key) => (
                                <th key={key}>{cell?.header}</th>
                            ))}
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toAddItems.map((item, index) => {
                            return (
                                <tr key={index}>
                                    {tableBody?.map((cell, key) => (
                                        <td key={key}>{item[cell?.objLabel]}</td>
                                    ))}
                                    <td>
                                        <DefaultButton
                                            icon={<MdDelete size={17} color="white" />}
                                            bg="danger"
                                            onClick={() => RemoveFromList(index)}
                                            title="Remover usuário da lista"
                                            width="2.2em"
                                            height="2.2em"
                                            padding="0"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="w100 flex align-center jcc">
                    {toAddItems.length === 0 ? zeroItemsMessage : ""}
                </div>
            </div>
        </div>
    );
}

export default SelectAutocomplete;