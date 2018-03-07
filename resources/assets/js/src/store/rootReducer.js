import {combineReducers} from 'redux';
import {authReducer,questionReducer} from '../screens';

export const rootReducer = combineReducers({
    auth: authReducer,
    question: questionReducer
});