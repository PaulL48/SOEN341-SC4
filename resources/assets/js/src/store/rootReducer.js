import {combineReducers} from 'redux';
import {authReducer} from '../screens';

export const rootReducer = combineReducers({
    auth: authReducer
});