import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { Get } from "../../utils/request";
import { MdEdit } from "react-icons/md";
import defaultPhoto from "../../assets/images/default.png";
import { STORAGE_URL } from "../../variables";
import DefaultButton from "../../components/DefaultButton";

const ProfileBasicInfo = props => {

    const { user_id } = useParams();

    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");
    const [photo, SetPhoto] = useState("");
    const [createdAt, SetCreatedAt] = useState("");

    const [firstLoading, SetFirstLoading] = useState(false);

    const GetData = async () => {
        let response = await Get(`user?id=${user_id}`);
        SetFirstLoading(true);
        if (response?.status === true) {
            SetName(response?.user?.name);
            SetEmail(response?.user?.email);
            SetPhone(response?.user?.phone);
            SetPhoto(response?.user?.profile_image ?? "");
            SetCreatedAt(response?.user?.created_at);
        }
    }

    useEffect(() => {
        GetData();
    }, []);

    if (!firstLoading) return <Skeleton/>
    return (
        <div className="card"
        style={{ backgroundColor: "#212121", borderColor: "gray", color: "#f7f7f7"}}
        >
            <div className="card-body row">
                <div className="col-lg">
                    <div className="flex align-center fdcolumn fit-content">
                        <img 
                            src={photo ? STORAGE_URL + photo : defaultPhoto}
                            alt="Imagem de perfil"
                            width="150px"
                        />
                        <div className="inline-flex">
                            <h3 style={{wordBreak: "break-all"}}>{name}</h3>
                            {/* <DefaultButton
                                to={`/profile/edit/${user_id}`}
                                bg="info"
                                icon={<MdEdit/>}
                                style={{
                                    width: "2.2em",
                                    height: "2.2em",
                                    padding: 0,
                                    marginLeft: "0.5em"
                                }}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 row">
                    <div className="col-sm">
                        <span >Telefone</span>
                        <p className="text-primary">{phone || "(xx) xxxxx-xxxx"}</p>
                        <span>E-mail</span>
                        <p className="text-primary">{email}</p>
                    </div>
                    <div className="col-sm">
                        <span>Data de criação de conta</span>
                        <p className="text-primary">{new Date(Date.parse(createdAt)).toLocaleDateString("pt-BR")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Skeleton = () => {
    return (
        <div className="skeleton-base skeleton-shimmer w100" style={{height: "14em"}}/>
    );
}
export default ProfileBasicInfo;