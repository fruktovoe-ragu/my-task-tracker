import React from 'react';
import { block } from 'bem-cn';
import { useSelector } from 'react-redux';
import store from '../../store/store';
import { SELECT_FILTER_CHIP } from "../../store/constants";
import CheckIcon from "../../icons/check";
import './FilterChip.css';

const b = block('filter-chip');
const FilterChip = ({
    className = '',
    value = '',
    children,
}) => {
    const currentChipValue = useSelector(state => state.filtering).chosenStatusId;

    const handleClick = () => {
        store.dispatch((dispatch, getState) => {
            const prevValue = getState().filtering.chosenStatusId;
            const newValue = prevValue === value ? '' : value;

            dispatch({
                type: SELECT_FILTER_CHIP,
                payload: newValue,
            })
        });
    };

    return (
        <button
            className={b({ chosen: currentChipValue === value, theme: value }).mix(className)}
            type="button"
            aria-pressed={currentChipValue === value}
            onClick={handleClick}
        >
            <div className={b('inner')}>
                {currentChipValue === value && <CheckIcon />}
                <p className={b('text')}>{children}</p>
            </div>
        </button>
    )
};

export default FilterChip;
