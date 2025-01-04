import React, { useState, useEffect, useCallback } from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import DeleteIcon from "../../icons/delete";
import Textfield from "../../components/Textfield/Textfield";
import Button from "../../components/Button/Button";
import './EditPanel.css';

const maxLimitExceededMessage = 'The maximum of letter limit was exceeded.';
const invalidFormatMessage = 'Only Unicode symbols are allowed.';
const inputErrorsLibrary = {
    limitExceeded: maxLimitExceededMessage,
    invalidFormat: invalidFormatMessage,
    both: `${maxLimitExceededMessage} <br /> ${invalidFormatMessage}`,
};

const b = block('edit-panel');
const EditPanel = ({
    onSubmitClick,
    onCancelClick,
    onDeleteClick,
    entityContent = '',
    entityId = '',
    className = '',
    type = 'list',
}) => {
    const { isMobile } = useAppContext();

    const [inputValue, setInputValue] = useState(entityContent);
    const [invalidInputMessage, setInvalidInputMessage] = useState('');
    const maxLength = 60;

    const detectInvalidInput = value => {
        switch (true) {
            case type === 'list' && checkSymbolMaxLimit(value) && validateValue(value):
                setInvalidInputMessage(inputErrorsLibrary.both);
                break;
            case type === 'list' && checkSymbolMaxLimit(value):
                setInvalidInputMessage(inputErrorsLibrary.limitExceeded);
                break;
            case type === 'list' && validateValue(value):
                setInvalidInputMessage(inputErrorsLibrary.invalidFormat);
                break;
            default:
                setInvalidInputMessage('');
                break;
        }
    }

    useEffect(() => {
        detectInvalidInput(inputValue);
    }, [detectInvalidInput]);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };

    const checkSymbolMaxLimit = useCallback((value = '') => {
        return value.length > maxLength;
    }, [maxLength]);

    const validateValue = value => {
        const unicodeLettersPattern = /^[\p{L}]*$/u;
        const isUnicode = unicodeLettersPattern.test(value);

        return !isUnicode;
    }

    const handleOnChange = e => {
        setInputValue(e.target.value);

        detectInvalidInput(e.target.value);
    };

    const handleSaveClick = e => {
        e.stopPropagation();

        const createdAt = new Date();
        const id = !!entityId ? entityId : Date.now();

        onSubmitClick?.(inputValue, id, formatDate(createdAt));
    };

    const handleCancelClick = e => {
        e.stopPropagation();

        !entityId && setInputValue('');
        onCancelClick?.();
    };

    const renderDeleteButton = () => (
        <Button
            className={b('delete-button')}
            onClick={onDeleteClick}
        >
            <DeleteIcon />
        </Button>
    );

    return (
        <section className={b({ mobile: isMobile }).mix(className)}>
            <form className={b('form')}>
                {!!entityId && !isMobile && renderDeleteButton()}
                <div className={b('textfield-container')}>
                    <Textfield
                        className={b('textfield')}
                        onChange={handleOnChange}
                        value={entityContent}
                        textarea={type === 'task'}
                        errorMessage={invalidInputMessage}
                    />
                </div>
                <div className={b('actions-container')}>
                    {!!entityId && isMobile && renderDeleteButton()}
                    <Button
                        className={b('save-button')}
                        isCentered={isMobile}
                        onClick={handleSaveClick}
                        theme='primary'
                        disabled={!!invalidInputMessage}
                    >
                        Save
                    </Button>
                    <Button
                        className={b('cancel-button')}
                        isCentered={isMobile}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default EditPanel;
