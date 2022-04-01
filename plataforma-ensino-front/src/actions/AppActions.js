export const login = (data) => (
    {
        type: 'login',
        payload: data
    }
);

export const logout = () => (
    {
        type: 'logout',
        payload: ''
    }
);

export const mudarUser = (data) => (
    {
        type: 'user',
        payload: data
    }
);

export const mudarDados = (data) => (
    {
        type: 'dados',
        payload: data
    }
);

export const generalStyle = data => (
    {
        type: "generalStyle",
        payload: data
    }
);

export const pagesStyles = data => (
    {
        type: "pagesStyles",
        payload: data
    }
);

export const loading = data => (
    {
        type: "loading",
        payload: data
    }
);