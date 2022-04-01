import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Get } from "../../../../../../utils/request";
import Board from "./Board";

const Table = props => {
    const {
        search = ""
    } = props;

    const [modules, SetModules] = useState([]);

    const [loading, SetLoading] = useState(false);

    const { id } = useParams();

    const GetData = async () => {
        SetLoading(true);
        let response = await Get(`courses-main/related-info/modules?course_id=${id}&search=${search}`);
        console.log(response);
        SetLoading(false);

        if (response?.status === true) SetModules(response?.modules)
    }

    useEffect(() => GetData(), [search]);

    return (
        <div className="modules-table">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && modules?.map((value, index) => (
                            <Board
                                key={index}
                                module_id={value.id}
                                name={value.name}
                                description={value.description}
                                onDelete={GetData}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w100 flex jcc">
                <CircularProgress hidden={!loading}/>
                <p
                    hidden={loading || modules.length != 0}
                >Nenhum módulo achada</p>
            </div>
        </div>
    );
}

export default Table;