import * as React from 'react';
import { useCallback, useEffect, useState, useRef, } from 'react';
import { block } from 'bem-cn';
import { checkEventIsClickOrEnterPress } from '../../utils/checkEvent';
import CrossIcon from "../../icons/cross";
import { Button } from "@fruktovoe-ragu/symmetricci";
import './Textfield.css';

const inputPlaceholder = 'Enter task list name';
const textareaPlaceholder = 'Enter task description';

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
    errorMessage = '',
}) => {
    const [inputValue, setInputValue] = useState(value);

    const fieldNode = useRef();

    useEffect(() => {
        if (!textarea || !fieldNode.current) {
            return;
        }
    }, [inputValue, textarea]);


    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = e => {
        setInputValue(e.target.value);

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

    const handleCancelClick = e => {
        e.stopPropagation();

        const { current: field } = fieldNode;

        setInputValue('');

        field?.focus();
        onChange?.(e);
    };

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
        className: b('input', { invalid: !!errorMessage })
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
            {!!inputValue &&
                <div className={b('actions')}>
                    <Button
                        variant="neutral"
                        size="small"
                        icon={<CrossIcon />}
                        onClick={handleCancelClick}
                    />
                </div>
            }
            {!!errorMessage &&
                <div className={b('error-text-popup')}>
                    {!!errorMessage && <p dangerouslySetInnerHTML={{ __html: errorMessage }} />}
                </div>
            }
        </div>
    );
};

export default Textfield;
