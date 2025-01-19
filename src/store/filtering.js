import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chosenStatusValue: (() => {
        const savedFilterChipsState = localStorage.getItem("filterChipState");

        return savedFilterChipsState ? JSON.parse(savedFilterChipsState) : '';
    })(),
};

const filteringSlice = createSlice({
    name: 'filtering',
    initialState,
    reducers: {
        selectFilterChip: (state, action) => {
            const { payload: value } = action;
            let newState;

            if (state.chosenStatusValue === value) {
                newState = '';
            } else {
                newState = value;
            }

            localStorage.setItem("filterChipState", JSON.stringify(newState));
            state.chosenStatusValue = newState;
        },
    },
});

export const { selectFilterChip } = filteringSlice.actions;
export default filteringSlice.reducer;
