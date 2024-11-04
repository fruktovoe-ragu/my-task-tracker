import React from 'react';
import { block } from 'bem-cn';
import './Button.css';

const b = block('button');
const Button = ({
    className = '',
    disabled,
    children,
    onClick,
    isCentered,
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
            className={b({
                disabled,
                theme,
                centered: isCentered,
            }).mix(className)}
            onClick={handleClick}
            disabled={disabled}
        >
            <div className={b('inner')}>
                {children}
            </div>
        </button>
    );
};

export default Button;