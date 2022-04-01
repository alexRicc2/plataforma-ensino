import { useSelector } from "react-redux";

const RoleBasedStyle = props => {

    const {
        roles = [],
        hasRoleStyle = {},
        hasNotRoleStyle = {},
        defaultStyle = {},
        children,
        ...other
    } = props;

    const user = useSelector(store => store.AppReducer.user);

    const role = user?.role;

    return (
        <div
            id="role-based-feature-style"
            style={Object.assign(defaultStyle, roles.includes(role) ? hasRoleStyle : hasNotRoleStyle)}
            {...other}
        >
            {children}
        </div>
    );
}

export default RoleBasedStyle;