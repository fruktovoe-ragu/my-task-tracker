import React, { useState, useEffect } from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import CheckIcon from "../../icons/check";
import './FilterChip.css';

const cn = cnCreate('filter-chip');
const FilterChip = ({
    className = '',
    chosenStatus,
    value,
    children,
    onClick,
}) => {
    const handleClick = () => {
        onClick?.(value);
    }

    return (
        <button 
            className={cn('', { chosen: chosenStatus === value, theme: value }, className)}
            type="button"
            aria-pressed={chosenStatus === value}
            onClick={handleClick}
        >
            <div className={cn('inner')}>
                {chosenStatus === value && <CheckIcon />}
                <p className={cn('text')}>{children}</p>
            </div>
        </button>
    )
};

export default FilterChip;