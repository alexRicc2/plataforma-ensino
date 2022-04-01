/**
 * 
 * @param {*}
 * show: bool -> display or not the snackbar
 * message: string -> message to display
 * severity: string -> success | error | info | warning
 * buttonActionText: string -> message to show in action button
 * ButtonAction: function -> callback to be called when action button is fired
 * 
 * @returns
 */
export const Show = data => (
    {
        type: "Show",
        payload: data
    }
);