import {
    CURRENT_USER,
    CURRENT_USER_LOGGED_IN,
    SIGN_OUT
} from './auth.type';

const initialState = {
    error: null,
    isLoggingIn: false,
    isSigningOut: false,
    isLoggedIn: false,
    currentUser:{
        user :{
            name: ""
        }
    }
};

export const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case CURRENT_USER.ERROR:
        return{
            ...state,
            error: action.err,
            isLoggingIn: false
        };
        case CURRENT_USER.PENDING:
        return{
            ...state,
            error: null,
            isLoggingIn: true,
        };
        case CURRENT_USER.SUCCESS:
        return{
            ...state,
            currentUser: action.res.data,
            isLoggingIn: false
        };
        case CURRENT_USER_LOGGED_IN.ERROR:
        return{
            ...state,
            error: action.err
        };
        case CURRENT_USER_LOGGED_IN.PENDING:
        return{
            ...state,
            error: null,
        };
        case CURRENT_USER_LOGGED_IN.SUCCESS:
        return{
            ...state,
            isLoggedIn: action.data
        };
        case SIGN_OUT.ERROR:
        return{
            ...state,
            error: action.err
        };
        case SIGN_OUT.PENDING:
        return{
            ...state,
            error: null,
            isSigningOut: true
        };
        case SIGN_OUT.SUCCESS:
        return{
            ...initialState,
        };
        default:
        return state;
    }
};