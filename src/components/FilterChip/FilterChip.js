import React from 'react';
import { block } from 'bem-cn';
import CheckIcon from "../../icons/check";
import './FilterChip.css';

const b = block('filter-chip');
const FilterChip = ({
    className = '',
    chosenStatus = '',
    value = '',
    children,
    onClick,
}) => {
    const handleClick = () => {
        onClick?.(value);
    };

    return (
        <button 
            className={b({ chosen: chosenStatus === value, theme: value }).mix(className)}
            type="button"
            aria-pressed={chosenStatus === value}
            onClick={handleClick}
        >
            <div className={b('inner')}>
                {chosenStatus === value && <CheckIcon />}
                <p className={b('text')}>{children}</p>
            </div>
        </button>
    )
};

export default FilterChip;