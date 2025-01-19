import { combineReducers } from '@reduxjs/toolkit';
import filteringSlice from './filtering';
import listDataUpdatingSlice from './dataUpdating';

const allReducers = combineReducers({
    filtering: filteringSlice,
    listDataUpdating: listDataUpdatingSlice,
});

export default allReducers;
