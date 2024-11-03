import React, { useState, useEffect } from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import CrossIcon from "../../icons/cross";
import Textfield from "../../components/Textfield/Textfield";
import Button from "../../components/Button/Button";
import './EditPanel.css';

const cn = cnCreate('edit-panel');
const EditPanel = ({
    onSubmitClick,
    onCancelClick,
    isEditMode = false,
    entityContent = '',
    entityId = '',
    className = '',
    type = 'list',
    children,
}) => {
    const [inputValue, setInputValue] = useState(entityContent);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}.${month}.${year}`;
    };

    const handleOnChange = e => {
        setInputValue(e.target.value);
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

    return (
        <section className={cn('', className)}>
            {!isEditMode ?
                children :
                <form className={cn('form')}>
                    <Textfield
                        className={cn('textfield')}
                        onChange={handleOnChange}
                        value={inputValue}
                        textarea={type === 'task'}
                    />
                    <div className={cn('actions-container')}>
                        <Button
                            className={cn('save-button')}
                            onClick={handleSaveClick}
                            theme='primary'
                        >
                            Save
                        </Button>
                        <Button
                            className={cn('cancel-button')}
                            onClick={handleCancelClick}
                        >
                            <CrossIcon />
                        </Button>
                    </div>      
                </form>
            }
        </section>
    );
};

export default EditPanel;