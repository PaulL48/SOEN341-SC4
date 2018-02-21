import {createStore,applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web 
import {rootReducer} from './rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore =  () => {
    let store = createStore(persistedReducer,applyMiddleware(logger,thunk));
    let persistor = persistStore(store);
    return { store, persistor };
  };
