const LIGHT_PALETTE = {
    root: {
        "& .MuiInputBase-root": {
            backgroundColor: "red"
        }
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    scrollbarColor: "#6b6b6b #2b2b2b",
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: "#f1f1f1"
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "#606060",//@c0c0c0
                        minHeight: 24,
                        border: "3px solid #f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                        backgroundColor: "#2b2b2b",
                    },
                    "& .MuiTextField-root": {
                        backgroundColor: "white"
                    }
                },
            },
        }
    },
    typography: {
        fontFamily: [
            "'Montserrat', sans-serif"
        ]
    },
    palette: {
        primary: {
            light: '#B0A394',
            main: '#a29688',
            dark: '#635C54',
            contrastText: '#fff',
        },
        secondary: {
            main: "#f3da26",
            dark: "#eccd18",
            contrastText: "#000"
        },
        default: {
            primary: {
                main: "#90caf9",
                dark: "#42a5f5",
                light: "#e3f2fd"
            },
            secondary: {
                main: "#ce93d8",
                dark: "#ab47bc",
                light: "#f3e5f5"
            },
            error: "#d32f2f",
            warning: "#f57c00",
            info: "#0288d1",
            success: "#388e3c"
        }
    }
}

const INITIAL_STATE = {
    palette: LIGHT_PALETTE
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "palette":
            return {
                ...state,
                palette: {...Object.assign(state.palette, action.payload)}
            };
        default:
            return { ...state };
    }
};