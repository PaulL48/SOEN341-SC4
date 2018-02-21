import Axios from 'axios';

export const userSignout = () =>{
    return Axios.request({
        url:'/logout',
        method:'post',
    });
};

export const checkIfUserIsLoggedIn = () =>{
    return Axios.get('/check');
};

export const checkCurrentuser = () =>{
    return Axios.request({
        url:'/checkUser'
    });
};



