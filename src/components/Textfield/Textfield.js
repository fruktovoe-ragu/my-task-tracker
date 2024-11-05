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
const maxLimitExceededMessage = 'The maximum of letter limit was exceeded!';
const invalidInputMessage = 'Only Unicode symbols are allowed';
const maxLimitExceededAndInvalidInputMessage = '1. The maximum of letter limit was exceeded! \n 2.Only Unicode symbols are allowed';

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
    isError = false,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(false);
    const [isErrorDescriptionOpened, setIsErrorDescriptionOpened] = useState(true);

    const fieldNode = useRef();
    const inValid = isMaxLimitExceeded || isError;
    const maxLength = 60;

    const checkSymbolMaxLimit = useCallback((value = '') => {
        if (value.length > maxLength) {
            setIsMaxLimitExceeded(true);
        } else {
            setIsMaxLimitExceeded(false);
        }
    }, [maxLength]);

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
        setInputValue(e.target.value);

        !textarea && checkSymbolMaxLimit(e.target.value);
        onChange?.(e);
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

    const handleCancelClick = useCallback(
        e => {
            e.stopPropagation();

            const { current: field } = fieldNode;

            setInputValue('');
            setIsMaxLimitExceeded(false);
            
            field?.focus();
        },
        [],
    );

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

    const renderErrorMessage = () => {
        switch (true) {
            case isMaxLimitExceeded:
                return maxLimitExceededMessage;
            case isError:
                return invalidInputMessage;
            default:
                return maxLimitExceededAndInvalidInputMessage;
        }
    } 

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
                    <p className={b('error-text')}>{renderErrorMessage()}</p>
                </div>
            }
        </div>
    );
};

export default Textfield;