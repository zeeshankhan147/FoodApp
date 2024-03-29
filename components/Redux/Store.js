import {createStore, applyMiddleware,compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import Thunk from 'redux-thunk';
import logger from 'redux-logger';
import Reducers from './Reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(Reducers, {}, composeEnhancers(applyMiddleware(Thunk,logger)));
