import React, { useEffect, useState } from "react";
import Board from "./Board";

import { useParams } from "react-router";

import { Get } from "../../../../utils/request";
import { CircularProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { Show } from "../../../../actions/SnackbarActions";

const Table = props => {

    const {
        search
    } = props;

    const [users, SetUsers] = useState([]);

    const [loading, SetLoading] = useState(false);
    const [page, SetPage] = useState(1);
    const [maxPage, SetMaxPage] = useState(1);

    const { id } = useParams();
    const dispatch = useDispatch();

    const GetData = async () => {
        SetLoading(true);
        let response = await Get(`user-course/from/course/${id}?search=${search}&page=${page}`);
        SetLoading(false);
        
        if (!response) dispatch(Show({
            show: true,
            severity: "warning",
            message: "Falha ao carregar informações do curso"
        }));

        SetUsers(response?.usersIn.data);
        SetMaxPage(response?.usersIn.last_page);
    }

    useEffect(() => GetData(), [search, page]);

    return (
        <div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && users?.map((value, index) => (
                            <Board
                                id={value?.id}
                                name={value?.name}
                                email={value?.email}
                                OnDelete={GetData}
                                key={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w100 flex jcc">
                <CircularProgress hidden={!loading}/>
                <p
                    hidden={loading || users?.length != 0}
                >Nenhum aluno achado</p>
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