import { useSelector } from "react-redux";

const RoleBased = props => {
    const {
        roles = ["Admin"],
        children
    } = props;

    const user = useSelector(store => store.AppReducer.user);

    if (roles.includes(user?.role)) return (children);
    return null;
}

export default RoleBased;