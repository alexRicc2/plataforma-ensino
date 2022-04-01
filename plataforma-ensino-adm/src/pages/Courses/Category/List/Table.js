import React, { useEffect, useState } from "react";

import Board from "./Board";

import { Get } from "../../../../utils/request";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Show } from "../../../../actions/SnackbarActions";
import { Pagination } from "@material-ui/lab";

const Table = props => {

    const {
        search = ""
    } = props;

    const [categories, SetCategories] = useState([]);
    const [loading, SetLoading] = useState(false);

    const [page, SetPage] = useState(1);
    const [maxPage, SetMaxPage] = useState(1);

    const dispatch = useDispatch();

    const GetData = async () => {
        SetLoading(true);
        let response = await Get(`courses-main/category?search=${search}&page=${page}`);
        SetLoading(false);

        if (response?.status === true) {
            SetCategories(response?.categories);
            SetMaxPage(response?.pagination?.last_page);
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
                        {!loading && categories?.map((value, index) => (
                            <Board
                                key={index}
                                id={value["id"]}
                                name={value["name"]}
                                OnDelete={GetData}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w100 flex jcc">
                <CircularProgress hidden={!loading}/>
                <p hidden={categories?.length !== 0 || loading}>Nenhuma categoria foi achada</p>
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