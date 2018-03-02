import {CURRENT_USER,CURRENT_USER_LOGGED_IN,SIGN_OUT} from './auth.type';

import {checkCurrentuser,checkIfUserIsLoggedIn,userSignout} from '../../api';

export const setCurrentUserAction = () =>{
    return dispatch => {
        dispatch({type: CURRENT_USER.PENDING});
        checkCurrentuser().then((res)=>{
            dispatch({type: CURRENT_USER.SUCCESS, res});
            dispatch({type: CURRENT_USER_LOGGED_IN.PENDING});
            checkIfUserIsLoggedIn().then((res)=>{
                dispatch({type: CURRENT_USER_LOGGED_IN.SUCCESS,data:res.data.check});
            }).catch((err)=>{
                dispatch({type: CURRENT_USER_LOGGED_IN.ERROR,data:err});
            });
        }).catch((err)=>{
            dispatch({type:CURRENT_USER.ERROR,err});
        });
    };
};

export const signOutAction = () =>{
    return dispatch => {
        dispatch({type: SIGN_OUT.PENDING});
        userSignout().then((res)=>{
            dispatch({type: SIGN_OUT.SUCCESS, res});
        }).catch((err)=>{
            dispatch({type:SIGN_OUT.ERROR,err});
        });
    };
};