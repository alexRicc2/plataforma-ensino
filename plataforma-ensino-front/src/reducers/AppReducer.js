import React from 'react';

const INITIAL_STATE = {
    token: null,
    user: {},
    collapsed: false,
    toggled: false,
    generalStyle: {},
    pagesStyles: {},
    loading: true,
    adminAsUser: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'dados':
            return {
                ...state,
                ...action.payload
            };
        
        case 'logout':
            return {
                ...state,
                token:null,
                user: {},
            };
        case 'user':
            return {
                ...state,
                user: action.payload,
            };
        case 'login':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,

            };
        case "generalStyle":
            return {
                ...state,
                generalStyle: action.payload.generalStyle
            };
        case "pagesStyles":
            return {
                ...state,
                pagesStyles: action.payload.pagesStyles
            };
        case "loading":
            return {
                ...state,
                loading: action.payload.loading
            };
        default:
            return { ...state };
    }
};
