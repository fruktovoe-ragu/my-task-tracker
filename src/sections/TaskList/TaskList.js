import React, { useState } from 'react';
import { checkEventIsClickOrEnterPress } from '../../utils/checkEvent';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import ChevronDownIcon from "../../icons/chevron-down";
import ChevronUpIcon from "../../icons/chevron-up";
import EditIcon from "../../icons/edit";
import PlusIcon from "../../icons/plus";
import MobileSideBlock from "../../sections/MobileSideBlock/MobileSideBlock";
import EditPanel from "../../sections/EditPanel/EditPanel";
import Task from "../Task/Task";
import Collapse from "../../components/Collapse/Collapse";
import Button from "../../components/Button/Button";
import './TaskList.css';

const b = block('task-list');
const TaskList = ({
    editingListId,
    editingTaskId,
    chosenStatusId,
    taskListData,
    onEditListClick,
    onCancelListClick,
    onSubmitListClick,
    onDeleteListClick,
    onCreateTaskClick,
    onEditTaskClick,
    onCancelTaskClick,
    onSubmitTaskClick,
    onDeleteTaskClick,
    onTaskStatusChange,
}) => {
    const { isMobile } = useAppContext();

    const [isCollapseOpened, setIsCollapseOpened] = useState(true);
    const [isMobilePreviewOpened, setIsMobilePreviewOpened] = useState(false);

    const { listName, id: listId, tasksList = [] } = taskListData;

    // Component related handlers
    const handleTitleClick = e => {
        if (checkEventIsClickOrEnterPress(e)) {
            setIsCollapseOpened(!isCollapseOpened);
        }
    };

    const handlePreviewClick = () => {
        setIsMobilePreviewOpened(prevState => !prevState);
    };
    // End

    // List handlers
    // Start
    const handleEditListClick = e => {
        e.stopPropagation();

        onEditListClick?.(listId);
    }

    const handleDeleteListClick = e => {
        e.stopPropagation();

        onDeleteListClick?.(listId);
    };
    // End

    // Task handlers
    // Start
    const handleCreateTaskClick = newTask => e => {
        e.stopPropagation();
        
        isMobile && setIsMobilePreviewOpened(prevState => !prevState);
        
        onCreateTaskClick?.(newTask, listId);
    };

    const handlerSubmitTaskClick = (content, taskId, date) => {
        isMobile && setIsMobilePreviewOpened(prevState => !prevState);

        onSubmitTaskClick?.(content, taskId, date, listId);
    };

    const handleCancelTaskClick = () => {
        isMobile && setIsMobilePreviewOpened(prevState => !prevState);

        onCancelTaskClick?.();
    }

    const handleDeleteTaskClick = taskId => {
        onDeleteTaskClick?.(listId, taskId);
    };

    const handleTaskStatusChange = (value, taskId) => {
        onTaskStatusChange?.(value, taskId, listId);
    };
    // End
    
    // Render functions
    // Start
    const renderListHeadInner = () => (
        <div className={b('head-inner')}>
            <h2 className={b('title')}>{listName}</h2>
            <div className={b('actions-container')}>
                <Button onClick={handleEditListClick}>
                    <EditIcon />
                </Button>
                {!isMobile &&
                    <Button
                        theme='primary'
                        onClick={handleCreateTaskClick('newTask')}
                    >
                        <PlusIcon fill="#FFFFFF" />
                        New task
                    </Button>
                }
            </div>
        </div>
    );

    const renderTaskContainer = () => (
        <ul className={b('tasks-container')}>
            {tasksList.map(({ description, id, status, date }) => {
                const isTaskShown = chosenStatusId === status || chosenStatusId === '';

                return (
                    isTaskShown && 
                    <Task
                        key={id}
                        id={id}
                        description={description}
                        status={status}
                        date={date}
                        editingTaskId={editingTaskId}
                        onEditClick={onEditTaskClick}
                        onDeleteClick={handleDeleteTaskClick}
                        onSubmitClick={handlerSubmitTaskClick}
                        onCancelClick={onCancelTaskClick}
                        onTaskStatusChange={handleTaskStatusChange}
                    />
                )
            })}
        </ul>
    );

    const renderListEditPanel = () => (
        <EditPanel
            onSubmitClick={onSubmitListClick}
            onCancelClick={onCancelListClick}
            onDeleteClick={handleDeleteListClick}
            entityContent={listName}
            entityId={listId}
        />
    );

    const renderTaskEditPanel = () => (
        <EditPanel
            className={b('edit-panel')}
            onSubmitClick={handlerSubmitTaskClick}
            onCancelClick={handleCancelTaskClick}
            type="task"
        />
    );
    // End

    return (
        <section className={b()}>
            <div 
                className={b('head')}
                onClick={handleTitleClick}
                onKeyDown={handleTitleClick}
            >
                {editingListId === listId ?
                    renderListEditPanel() :
                    renderListHeadInner()
                }
                <div className={b('collapse-icon-container')}>
                    {isCollapseOpened ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </div>
            </div>
            <Collapse isOpened={isCollapseOpened}>
                <div className={b('inner-content')}>
                    {!!tasksList.length && renderTaskContainer()}
                    <div className={b('future-task-container')}>
                        {editingTaskId === listId && !isMobile ?
                            renderTaskEditPanel() :
                            <Button
                                className={b('add-task-button')}
                                onClick={handleCreateTaskClick('newTask')}
                                theme='wide'
                            >
                                <PlusIcon /> 
                                New task
                            </Button>
                        }
                    </div>
                </div>
            </Collapse>
            {isMobile && isMobilePreviewOpened &&
                <MobileSideBlock
                    titleContent='Create a new task' 
                    onCancelClick={handlePreviewClick}
                >
                    {renderTaskEditPanel()}
                </MobileSideBlock>
            }

            
        </section>
    );
};

export default TaskList;