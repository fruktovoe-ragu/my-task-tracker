import { SELECT_FILTER_CHIP } from "../store/constants";

const initialFilteringState = {
    chosenStatusId: (() => {
        const savedFilterChipsState = localStorage.getItem("filterChipState");

        return savedFilterChipsState ? JSON.parse(savedFilterChipsState) : '';
    })(),
};

const filteringReducer = (state = initialFilteringState, action) => {
    switch (action.type) {
        case SELECT_FILTER_CHIP: {
            const newState = { ...state, chosenStatusId: action.payload };

            localStorage.setItem("filterChipState", JSON.stringify(newState.chosenStatusId));

            return newState;
        }
        default:
            return state;
    }
};

export default filteringReducer;
