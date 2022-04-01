import React, { useEffect, useState } from "react";

import Board from "./Board";

import { Get } from "../../../utils/request";
import { CircularProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { Show } from "../../../actions/SnackbarActions";

const Table = props => {

    const {
        search = ""
    } = props;
    
    const dispatch = useDispatch();
    const [courses, SetCourses] = useState([]);
    const [loading, SetLoading] = useState(false);

    const [page, SetPage] = useState(1);
    const [maxPage, SetMaxPage] = useState(1);


    const GetData = async () => {
        SetLoading(true);
        let response = await Get(`courses-main?search=${search}&page=${page}`);
        SetLoading(false);

        if (response?.status === true) {
            SetCourses(response?.courses);
            SetMaxPage(response?.pagination.last_page);
        } else if (!response) dispatch(Show({
            show: true,
            message: "Falha ao carregar os cursos",
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
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && courses?.map((value, index) => (
                            <Board
                                key={index}
                                id={value["id"]}
                                name={value["name"]}
                                description={value["description"]}
                                OnDelete={GetData}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w100 flex jcc">
                <CircularProgress hidden={!loading}/>
                <p hidden={courses?.length !== 0 || loading}>Nenhum curso foi achado</p>
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