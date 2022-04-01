import React, { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import DefaultButton from "../../../components/DefaultButton";
import { Show } from "../../../actions/SnackbarActions";
import { Get } from "../../../utils/request";
import TabsContainer from "./TabsContainer";

const CoursePage = () => {

    const [image, SetImage] = useState("");
    const [name, SetName] = useState("");
    const [description, SetDescription] = useState("");
    const [responsibles, SetResponsibles] = useState([]);

    const [firstLoading, SetFirstLoading] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();

    const GetData = async () => {
        let response = await Get(`courses-main?id=${id}`);
        SetFirstLoading(true);

        if (response?.status === true) {
            SetImage(response?.course.image);
            SetName(response?.course.name);
            SetDescription(response?.course.description);
            SetResponsibles(response?.course?.responsibles);
        } else if (response?.status !== false) {
            dispatch(Show({
                show: true,
                message: response?.message,
                severity: response?.severity
            }));
            return;
        } else if (!response) {
            dispatch(Show({
                show: true,
                severity: "warning",
                message: "Falha ao carregar informações do curso"
            }));
        }
    }

    useEffect(GetData, []);

    if (!firstLoading) return <Skeleton/>;
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="title">{name}</h3>
                <div>
                    <b style={{float: "left"}}>Responsável(eis): </b>
                    {responsibles?.map((value, key) => (
                        <span key={key}>
                            <a
                                href={`/profile/view/${value?.id}`}
                                target={"_blank"}
                            >
                                <span
                                    key={key}
                                >
                                    {value?.name}
                                </span>
                            </a>
                            <span hidden={responsibles?.length - 1 == key}>, </span>
                        </span>
                    ))}
                </div>
                <div>
                    <b style={{float: "left"}}>Descrição: </b>
                    <p> {description}</p>
                </div>
                <TabsContainer/>
                <br/>
                <DefaultButton
                    bg="secondary"
                    text="Voltar"
                    icon={<RiArrowGoBackLine />}
                    to="/cursos/lista"
                />
            </div>
        </div>
    );
}

const Skeleton = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="skeleton-title"/>
                <div className="skeleton-small-text skeleton-shimmer"/>
                <div className="skeleton-small-text skeleton-shimmer"/>
                <br/>
                <div className="w100 flex jcc align-center">
                    <div className="skeleton-base skeleton-shimmer" style={{width: "12em", height: "12em"}}/>
                </div>
                <br/>
                <div className="w100 skeleton-base skeleton-shimmer margin-bottom" style={{minHeight: "48px"}}/>
                <div className="w100 skeleton-base skeleton-shimmer margin-bottom" style={{minHeight: "5em"}}/>
                <div className="skeleton-small-button skeleton-shimmer"/>
            </div>
        </div>
    );
}

export default CoursePage;