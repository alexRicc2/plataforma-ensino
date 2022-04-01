import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Get } from "../../../../utils/request";
import Board from "./Board/";

const Table = props => {

    const {
        search = ""
    } = props;

    const [lessons, SetLessons] = useState([]);

    const [loading, SetLoading] = useState(false);

    const { id } = useParams();

    const GetData = async () => {
        SetLoading(true);
        let response = await Get(`courses-main/lessons/${id}?search=${search}`);
        SetLoading(false);
        console.log(response);
        if (response?.status === true) SetLessons(response?.lessons)
    }

    useEffect(() => GetData(), [search]);

    return (
        <div className="lessons-table">
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
                        {!loading && lessons?.map((value, index) => (
                            <Board
                                key={index}
                                lesson_id={value.id}
                                name={value.title}
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
                    hidden={loading || lessons.length != 0}
                >Nenhuma aula achada</p>
            </div>
        </div>
    );
}

export default Table;