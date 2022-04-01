import React, { useEffect, useState } from "react";

import Board from "./Board";

import { Get } from "../../../../../utils/request";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Show } from "../../../../../actions/SnackbarActions";
import { Pagination } from "@material-ui/lab";
import { useParams } from "react-router";

const Table = props => {

    const {
        search = ""
    } = props;

    const [lessons, SetLessons] = useState([]);
    const [loading, SetLoading] = useState(false);

    const [page, SetPage] = useState(1);
    const [maxPage, SetMaxPage] = useState(1);

    const dispatch = useDispatch();
    const { module_id } = useParams();

    const GetData = async () => {
        SetLoading(true);
        let response = await Get(`modules?id=${module_id}&lesson_search=${search}&page=${page}`);
        SetLoading(false);

        if (response?.status === true) {
            SetLessons(response?.lessons);
            SetMaxPage(response?.lessons_pagination?.last_page);
        } else if (!response) dispatch(Show({
            show: true,
            message: "Falha ao carregar categorias",
            severity: "warning"
        }));
    }

    useEffect(() => {
        GetData();
    }, [search, page]);

    return (
        <div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && lessons?.map((value, index) => (
                            <Board
                                key={index}
                                lesson_id={value?.id}
                                name={value?.title}
                                OnDelete={GetData}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w100 flex jcc">
                <CircularProgress hidden={!loading}/>
                <p hidden={lessons?.length !== 0 || loading}>Nenhuma aula foi achada</p>
            </div>
            <Pagination
                className={(maxPage == 1 ? "hide" : "")}
                style={{display: "flex", justifyContent: "flex-end"}} 
                count={maxPage} 
                value={page}
                onChange={(_, value) => SetPage(value)}
            />
        </div>
    );
}

export default Table;