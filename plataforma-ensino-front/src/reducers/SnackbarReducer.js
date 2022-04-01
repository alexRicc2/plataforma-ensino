const INITIAL_STATE = {
    show: false,
    message: "",
    severity: "",
    buttonActionText: "",
    ButtonAction: () => {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "Show":
            return {
                ...state,
                show: action.payload?.show,
                message: action.payload?.message,
                severity: action.payload?.severity,
                buttonActionText: action.payload?.buttonActionText,
                ButtonAction: action.payload?.ButtonAction
            };
        default:
            return {
                ...state
            };
    }
}