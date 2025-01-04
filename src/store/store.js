import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../reducers/index';

const store = configureStore({
    reducer: allReducers,
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
})

export default store;
