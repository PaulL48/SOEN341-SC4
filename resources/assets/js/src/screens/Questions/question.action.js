import {
    SET_CURRENT_QUESTION
} from './question.type'

import {
    getQuestion
} from '../../api'

export const getQuestionAction = (id) =>{
    return dispatch => {
        dispatch({type: SET_CURRENT_QUESTION.PENDING });
        getQuestion(id).then((res)=>{
            dispatch({type: SET_CURRENT_QUESTION.SUCCESS, payload: res})
        }).catch((err)=>{
            dispatch({type: SET_CURRENT_QUESTION.ERROR, payload: res})
        })
    }
}