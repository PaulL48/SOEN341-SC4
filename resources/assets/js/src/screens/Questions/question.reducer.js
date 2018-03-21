import {
    SET_CURRENT_QUESTION
} from './question.type';

const initialState = {
    error: null,
    currentQuestion : {
        id : "",
        title: "",
        author: "",
        question: "",
        created_at : "",
        resolved: 0
    },
    isFetchingQuestion: false,
    searchFunctions: 'test'
};

export const questionReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_CURRENT_QUESTION.ERROR:
        return{
            ...state,
            error: action.err,
            isFetchingQuestion: false
        };
        case SET_CURRENT_QUESTION.PENDING:
        return{
            ...state,
            error: null,
            isFetchingQuestion: true,
        };
        case SET_CURRENT_QUESTION.SUCCESS:
        return{
            ...state,
            currentQuestion: action.payload.data.question[0],
            isFetchingQuestion: false
        };
        default:
        return state;
    }
};