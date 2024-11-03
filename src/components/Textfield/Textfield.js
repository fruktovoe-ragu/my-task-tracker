import * as React from 'react';
import { useCallback, useEffect, useState, useRef, } from 'react';
import { checkEventIsClickOrEnterPress, cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import CrossIcon from "../../icons/cross";
import Button from "../Button/Button";
import './Textfield.css';

const inputPlaceholder = 'Enter task list name';
const textareaPlaceholder = 'Enter task description';

const cn = cnCreate('text-field');
const Textfield = ({
    className,
    disabled,
    id,
    textarea = false,
    name,
    required,
    isAutoFocused = true,
    disableEnterLineBreak = false,
    onBlur,
    onChange,
    onFocus,
    onKeyUp,
    value = '',
    inputRef,
    inputMode,
    classes = {},
    dataAttrs,
}) => {
    const [inputValue, setInputValue] = useState(value);

    const fieldNode = useRef();
    const hasClearIcon = !disabled && !!inputValue;

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

    const handleIconClick = useCallback(
        e => {
            e.stopPropagation();

            const { current: field } = fieldNode;

            setInputValue('');
            field?.focus();
        },
        [],
    );

    const handleFocus = useCallback(e => {
            onFocus?.(e);
        }, [onFocus],
    );

    const handleBlur = useCallback( e => {
            onBlur?.(e);
        }, [onBlur],
    );

    const handleInputClick = e => {
        e.stopPropagation();
    }

    const commonParams = {
        ...filterDataAttrs(dataAttrs?.input),
        disabled,
        id,
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
        className: cn(
            'input', {}, classes?.input,
        )
    };

    const textareaParams = {
        ...commonParams,
        placeholder: textareaPlaceholder,
        className: cn(
            'textarea', {}, classes?.input,
        ),
    };

    const getFieldNode = node => {
        if (!node) {
            return;
        }

        fieldNode.current = node;
        inputRef?.(node);
    };

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn('', { disabled, textarea }, className)}
        >
            {textarea ? 
                <textarea
                    {...textareaParams}
                    ref={getFieldNode}
                    onKeyDown={disableEnterLineBreak ? handleTextareaKeyDown : undefined}
                /> : 
                <>
                    <input {...inputParams} ref={getFieldNode} onClick={handleInputClick} />
                    {hasClearIcon && 
                        <Button
                            className={cn('delete-button')}
                            onClick={handleIconClick}
                            {...filterDataAttrs(dataAttrs?.iconBox)}
                        >
                            <CrossIcon />
                        </Button>
                    }
                </>
            }
        </div>
    );
};

export default Textfield;