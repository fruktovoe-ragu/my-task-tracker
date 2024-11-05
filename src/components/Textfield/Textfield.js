import * as React from 'react';
import { useCallback, useEffect, useState, useRef, } from 'react';
import { block } from 'bem-cn';
import { checkEventIsClickOrEnterPress } from '../../utils/checkEvent';
import CrossIcon from "../../icons/cross";
import WarningIcon from "../../icons/warning-full";
import Button from "../Button/Button";
import './Textfield.css';

const inputPlaceholder = 'Enter task list name';
const textareaPlaceholder = 'Enter task description';
const maxLimitExceededMessage = 'The maximum of letter limit was exceeded.';
const invalidInputMessage = 'Only Unicode symbols are allowed.';

const b = block('text-field');
const Textfield = ({
    className,
    textarea = false,
    name,
    required,
    isAutoFocused = true,
    onBlur,
    onChange,
    onFocus,
    onKeyUp,
    value = '',
    inputRef,
    inputMode,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorDescriptionOpened, setIsErrorDescriptionOpened] = useState(true);

    const fieldNode = useRef();
    const inValid = isMaxLimitExceeded || isError;
    const maxLength = 60;

    const checkSymbolMaxLimit = useCallback((value = '') => {
        setIsMaxLimitExceeded(value.length > maxLength);
    }, [maxLength]);

    const validateValue = value => {
        const unicodeLettersPattern = /^[\p{L}]*$/u;
        const isUnicode = unicodeLettersPattern.test(value);

        setIsError(!isUnicode);
    }

    useEffect(() => {
        if (!textarea || !fieldNode.current) {
            return;
        }
    }, [inputValue, textarea]);

    useEffect(() => {
        checkSymbolMaxLimit(value);
    }, [checkSymbolMaxLimit]);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = e => {
        const value = e.target.value;

        setInputValue(value);

        !textarea && setIsMaxLimitExceeded(value.length > maxLength);
        !textarea && validateValue(value);

        onChange?.(e, inValid);
    };

    const handleTextareaKeyDown = e => {
        checkEventIsClickOrEnterPress(e) && !e.shiftKey && e.preventDefault();
    };

    const handleFocus = useCallback(e => {
            onFocus?.(e);
            moveCaretAtEnd(e);
        }, [onFocus],
    );

    const handleBlur = useCallback( e => {
            onBlur?.(e);
        }, [onBlur],
    );

    const handleInputClick = e => {
        e.stopPropagation();
    }

    const handleCancelClick = e => {
        e.stopPropagation();

        const { current: field } = fieldNode;

        setInputValue('');
        setIsMaxLimitExceeded(false);
        
        field?.focus();
        onChange?.(e, inValid);
    };

    const handleWarningClick = e => {
        e.stopPropagation();

        setIsErrorDescriptionOpened(prevState => !prevState);
    }

    const moveCaretAtEnd = e => {
        const valueLength = e.target.value.length;

        e.target.setSelectionRange(valueLength, valueLength);
    }

    const commonParams = {
        name,
        value: inputValue,
        onChange: handleInputChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onKeyUp,
        required,
        inputMode,
        autoFocus: isAutoFocused,
    };

    const inputParams = {
        ...commonParams,
        placeholder: inputPlaceholder,
        className: b('input', { invalid: inValid })
    };

    const textareaParams = {
        ...commonParams,
        placeholder: textareaPlaceholder,
        className: b('textarea'),
    };

    const getFieldNode = node => {
        if (!node) {
            return;
        }

        fieldNode.current = node;
        inputRef?.(node);
    };

    return (
        <div className={b({ textarea }).mix(className)}>
            {textarea ? 
                <textarea
                    {...textareaParams}
                    ref={getFieldNode}
                    onKeyDown={handleTextareaKeyDown}
                /> : 
                <input {...inputParams} ref={getFieldNode} onClick={handleInputClick} />
            }
            <div className={b('actions')}>
                {!!inputValue && 
                    <Button
                        className={b('delete-button')}
                        onClick={handleCancelClick}
                    >
                        <CrossIcon />
                    </Button>
                }
                {inValid && 
                    <Button
                        className={b('warning-button')}
                        onClick={handleWarningClick}
                    >
                        <WarningIcon />
                    </Button>
                }
            </div>
            {inValid && isErrorDescriptionOpened && 
                <div className={b('error-text-popup')}>
                    {isError && <p className={b('error-text')}>{invalidInputMessage}</p>}
                    {isMaxLimitExceeded && <p className={b('error-text')}>{maxLimitExceededMessage}</p>}
                </div>
            }
        </div>
    );
};

export default Textfield;