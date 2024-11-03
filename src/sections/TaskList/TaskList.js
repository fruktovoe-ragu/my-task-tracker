import React, { useState, useEffect } from 'react';
import { cnCreate, checkEventIsClickOrEnterPress } from '@megafon/ui-helpers';
import ChevronDownIcon from "../../icons/chevron-down";
import ChevronUpIcon from "../../icons/chevron-up";
import EditIcon from "../../icons/edit";
import PlusIcon from "../../icons/plus";
import DeleteIcon from "../../icons/delete";
import Collapse from "../../components/Collapse/Collapse";
import Button from "../../components/Button/Button";
import Task from "../../components/Task/Task";
import EditPanel from "../EditPanel/EditPanel";
import './TaskList.css';

const cn = cnCreate('task-list');
const TaskList = ({
    editingListId,
    editingTaskId,
    taskListData,
    onEditListClick,
    onCancelListClick,
    onSubmitListClick,
    onDeleteListClick,
    onCreateTaskClick,
    onEditTaskClick,
    onCancelTaskClick,
    onSubmitTaskClick,
    onDelteTaskClick,
}) => {
    const [isCollapseOpened, setIsCollapseOpened] = useState(true);
    const { listName, id: listId, tasksList = [] } = taskListData;

    const handleTitleClick = e => {
        if (checkEventIsClickOrEnterPress(e)) {
            setIsCollapseOpened(!isCollapseOpened);
        }
    };

    // List handlers
    // Start
    const handleEditListClick = e => {
        e.stopPropagation();

        onEditListClick?.(listId);
    }

    const handleDeleteListClick = e => {
        e.stopPropagation();

        onDeleteListClick?.(listId);
    }
    // End

    // Task handlers
    // Start
    const handleCreateTaskClick = newTask => e => {
        e.stopPropagation(); 
        
        onCreateTaskClick?.(newTask);
    };

    const handlerSubmitTaskClick = (content, taskId, date) => {
        onSubmitTaskClick?.(content, taskId, date, listId);
    };

    const handleDelteTaskClick = taskId => {
        onDelteTaskClick?.(listId, taskId);
    };
    // End

    const renderTaskContainer = () => (
        <ul className={cn('tasks-container')}>
            {tasksList.map(({ description, id, status, date }) => (
                <Task
                    key={id}
                    id={id}
                    description={description}
                    status={status}
                    date={date}
                    editingTaskId={editingTaskId}
                    onEditClick={onEditTaskClick}
                    onDelteClick={handleDelteTaskClick}
                    onSubmitClick={handlerSubmitTaskClick}
                    onCancelClick={onCancelTaskClick}
                />
            ))}
        </ul>
    );

    return (
        <section className={cn('')}>
            <div 
                className={cn('head')}
                onClick={handleTitleClick}
                onKeyDown={handleTitleClick}
            >
                <EditPanel
                    onSubmitClick={onSubmitListClick}
                    onCancelClick={onCancelListClick}
                    isEditMode={editingListId === listId}
                    entityContent={listName}
                    entityId={listId}
                >
                    <div className={cn('head-inner')}>
                        <h2 className={cn('title')}>{listName}</h2>
                        <div className={cn('actions-container')}>
                            <Button
                                theme='primary'
                                onClick={handleCreateTaskClick('newTask')}
                            >
                                <PlusIcon fill="#FFFFFF" />
                                New task
                            </Button>
                            <Button onClick={handleEditListClick}>
                                <EditIcon />
                            </Button>
                            <Button onClick={handleDeleteListClick}>
                                <DeleteIcon />
                            </Button>
                        </div>
                    </div>
                </EditPanel>
                {isCollapseOpened ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
            <Collapse isOpened={isCollapseOpened}>
                <div className={cn('inner-content')}>
                    {!!tasksList.length && renderTaskContainer()}
                    <div className={cn('future-task-container', { 'edit-mode': editingTaskId === 0 })}>
                        <EditPanel
                            onSubmitClick={handlerSubmitTaskClick}
                            onCancelClick={onCancelTaskClick}
                            isEditMode={editingTaskId === 0}
                            type="task"
                        >
                            <Button
                                className={cn('add-task-button')}
                                onClick={handleCreateTaskClick('newTask')}
                                theme='wide'
                            >
                                <PlusIcon /> 
                                New task
                            </Button>
                        </EditPanel>
                    </div>
                </div>
            </Collapse>
        </section>
    );
};

export default TaskList;