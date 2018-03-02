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

export const answerQuestion = (question_id,answer) =>{
    return Axios.request({
        method:'post',
        url:'/answer',
        data:{
            question_id,
            answer
        }
    });
};

export const getAnswers = (question_id) =>{
    return  Axios.request({
        url: '/answers',
        params:{
            question_id,
        }
    });
};


export const updateVoteCount = (id,vote) =>{
    return Axios.request({
        url:'/vote/question',
        method:'post',
        data:{
            id,
            vote
        }
    });
};

export const getVoteCount = (id) =>{
    return Axios.request({
        url:'/vote/question/count',
        params:{
            id
        }
    });
};

export const updateAnswerVoteCount = (id,vote) =>{
    return Axios.request({
        url:'/vote/answer',
        method:'post',
        data:{
            id,
            vote
        }
    });
};

export const getAnswerVoteCount = (id) =>{
    return Axios.request({
        url:'/vote/answer/count',
        params:{
            id
        }
    });
};

export const setAcceptedAnswer = (id) =>{
    return Axios.request({
        url:'/vote/answer/accepted',
        method:'post',
        data:{
            id
        }
    });
};

export const unsetAcceptedAnswer = (id) =>{
    return Axios.request({
        url:'/vote/answer/removeAccepted',
        method:'post',
        data:{
            id
        }
    });
};
