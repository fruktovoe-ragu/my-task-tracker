import React, { useState, useEffect } from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import EditIcon from "../../icons/edit";
import DeleteIcon from "../../icons/delete";
import EditPanel from "../../sections/EditPanel/EditPanel";
import SelectChip from "../SelectChip/SelectChip";
import Button from "../Button/Button";
import './Task.css';

const cn = cnCreate('task');
const Task = ({
    className = '',
    id,
    description,
    status,
    date,
    editingTaskId,
    onEditClick,
    onCancelClick,
    onSubmitClick,
    onDelteClick,
}) => {
    const handleEditTaskClick = () => {
        onEditClick?.(id);
    };

    const handleDeleteTaskClick = () => {
        onDelteClick?.(id);
    };

    return (
        <li className={cn('', className)}>
            <EditPanel
                onSubmitClick={onSubmitClick}
                onCancelClick={onCancelClick}
                entityContent={description}
                entityId={id}
                isEditMode={editingTaskId === id}
                className={cn('edit-panel')}
                type="task"
            >
                <div className={cn('inner')}>
                    <div className={cn('status-container')}>
                        <SelectChip status={status} />
                    </div>
                    <div className={cn('description-container')}>
                        <p className={cn('description')}>{description}</p>
                    </div>
                    <div className={cn('date-container')}>
                        <p className={cn('date')}>{date}</p>
                    </div>
                    <div className={cn('actions-container')}>
                        <Button onClick={handleEditTaskClick}>
                            <EditIcon />
                        </Button>
                        <Button onClick={handleDeleteTaskClick}>
                            <DeleteIcon />
                        </Button>
                    </div>
                </div>
            </EditPanel>
        </li>
    );
};

export default Task;