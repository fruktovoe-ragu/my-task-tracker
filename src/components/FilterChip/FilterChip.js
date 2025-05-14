import React from 'react';
import { block } from 'bem-cn';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilterChip } from '../../store/filtering';
import CheckIcon from "../../icons/check";
import './FilterChip.css';

const b = block('filter-chip');
const FilterChip = ({
    className = '',
    value = '',
    children,
}) => {
    const currentChipValue = useSelector(state => state.filtering.chosenStatusValue);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(selectFilterChip(value));
    };

    return (
        <button
            className={b({ chosen: currentChipValue === value, theme: value }).mix(className)}
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
