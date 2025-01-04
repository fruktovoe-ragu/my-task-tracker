import { combineReducers } from '@reduxjs/toolkit';
import filteringReducer from './filtering';
import { listDataUpdatingReducer } from './dataUpdating';

const allReducers = combineReducers({
    filtering: filteringReducer,
    listDataUpdating: listDataUpdatingReducer,
});

export default allReducers;
