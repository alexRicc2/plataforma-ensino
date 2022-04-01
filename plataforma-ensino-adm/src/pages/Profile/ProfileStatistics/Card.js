import React from "react";

const Card = props => {

    const {
        icon,
        data,
        title
    } = props;

    return (
        <div className="card fit-content">
            <div className="card-body row">
                <div className="col-sm jcc align-center flex">
                    {icon}
                </div>
                <div className="col-sm flex align-center fdcolumn text-center">
                    <h2>{data}</h2>
                    <span className="text-muted">{title}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;