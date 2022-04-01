import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";

import { FormControl as Input } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { Get } from "../../../../../utils/request";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import DefaultButton from "../../../../../components/DefaultButton";
import { Post } from "../../../../../utils/request";
import { Show } from "../../../../../actions/SnackbarActions";
import { useDispatch } from "react-redux";

const FormBody = props => {

    const [search, SetSearch] = useState("");
    const [users, SetUsers] = useState([]);
    const [toAddUsers, SetToAddUsers] = useState([]);

    const [loading, SetLoading] = useState(false);

    const { course_id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const GetData = async () => {
        let response = await Get(`user-course/from/course/${course_id}?search=${search}`);
        SetUsers(response?.usersNotIn);
    }

    const Submit = async () => {
        let form = new FormData();
        form.append("course_id", course_id);
        for (let i = 0; i < toAddUsers.length; i++) form.append("user_id[]", toAddUsers[i].id);

        let response = await Post("user-course/create", form);
        console.log(response);

        dispatch(Show({
            show: true,
            message: response?.message,
            severity: response?.severity
        }));

        if (response?.status === true) history.push(`/courses/view/${course_id}`);
    }

    const UpdateUserList = (user_id) => {
        let toAddUsersTemp = toAddUsers;
        console.log(toAddUsersTemp)

        if (!toAddUsersTemp.find(x => x.id == user_id))
            toAddUsersTemp.push(users.find(x => x.id == user_id));
        console.log(toAddUsersTemp)
        SetToAddUsers([...toAddUsersTemp]);
        SetSearch("");
    }

    const RemoveUserFromUserList = index => {
        let toAddUsersTemp = toAddUsers;
        toAddUsersTemp.splice(index, 1);
        SetToAddUsers([...toAddUsersTemp]);
    }

    useEffect(() => {
        GetData();
    }, [search]);

    return (
        <div>
            <Autocomplete
                id="add-user-field"
                disableCloseOnSelect={false}
                blurOnSelect
                options={users.filter(user => !toAddUsers.map(value => value["id"]).includes(user["id"]))}
                value={toAddUsers}
                multiple
                getOptionSelected={(option, value) => option.id === value.id}

                getOptionLabel={option => option.name ? option.name : ""}
                renderOption={(option, i) => (
                    <div key={i} onClick={(e) => UpdateUserList(option["id"])} className="flex fdrow jcsb w100 align-center" >
                        Nome: {option.name} - Email: {option.email}
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
                            placeholder="Procurar alunos que não estão no curso por Nome ou E-mail"
                            autoFocus
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
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toAddUsers.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value["name"]}</td>
                                    <td>{value["email"]}</td>
                                    <td>
                                        <DefaultButton
                                            icon={<MdDelete size={17} color="white" />}
                                            bg="danger"
                                            onClick={() => RemoveUserFromUserList(index)}
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
                    {toAddUsers.length == 0 && !loading ? "Nenhum usuário selecionado" : ""}
                </div>
            </div>
            <div className="w100 inline-flex jcsb mt-2">
                <DefaultButton
                    bg="secondary"
                    text="Voltar"
                    icon={<RiArrowGoBackLine />}
                    to={`/cursos/ver/${course_id}`}
                    search={'?'+new URLSearchParams({tab: 1}).toString()}
                />
                <DefaultButton
                    bg="confirm"
                    text={toAddUsers.length <= 1 ? "Adicionar usuário" : "Adicionar usuários"}
                    onClick={Submit}
                    loading={loading}
                    disabled={toAddUsers.length == 0}
                />
            </div>
        </div>
    );
}

export default FormBody;