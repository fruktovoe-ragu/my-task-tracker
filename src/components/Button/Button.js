import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import './Button.css';

const cn = cnCreate('button');
const Button = ({
    className = '',
    disabled,
    children,
    onClick,
    theme = 'secondary',
}) => {
    const handleClick = React.useCallback(e => {
        if (disabled) {
            e.preventDefault();

            return;
        }

        onClick && onClick(e);
    }, [disabled, onClick]);

    return (
        <button
            type="button"
            className={cn({
                disabled,
                theme
            }, className)}
            onClick={handleClick}
            disabled={disabled}
        >
            <div className={cn('inner')}>
                {children}
            </div>
        </button>
    );
};

export default Button;