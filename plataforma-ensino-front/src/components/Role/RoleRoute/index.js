import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router";
import { Show } from "actions/SnackbarActions";

const RoleRoute = props => {

    const {
        roles = ["Admin"],
        to = "/",
        ...other
    } = props;

    const user = useSelector(store => store.AppReducer.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const role = user?.role;

    useEffect(() => {
        if (!roles.includes(role)) {
            history.push(to);
            dispatch(Show({
                show: true,
                severity: "error",
                message: "Você não tem permissão para estar aqui"
            }));
        }
    });

    return <Route {...other}/>;
}

export default RoleRoute;