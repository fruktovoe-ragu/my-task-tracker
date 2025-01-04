import React, { useState } from 'react';
import { checkEventIsClickOrEnterPress } from '../../utils/checkEvent';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import { useSelector } from 'react-redux';
import store from '../../store/store';
import {
    EDIT_LIST,
    DELETE_LIST,
    CREATE_NEW_TASK,
    CANCEL_EDIT_TASK,
    SUBMIT_TASK,
    DELETE_TASK,
    CHANGE_TASK_STATUS,
} from "../../store/constants";
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
    taskListData,
    onCancelListClick,
    onSubmitListClick,
}) => {
    const { isMobile } = useAppContext();
    const currentChipValue = useSelector(state => state.filtering).chosenStatusId;
    const { editingTaskId, editingListId } = useSelector(state => state.listDataUpdating);

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

        store.dispatch({
            type: EDIT_LIST,
            payload: listId,
        });
    }

    const handleDeleteListClick = e => {
        e.stopPropagation();

        store.dispatch({
            type: DELETE_LIST,
            payload: listId,
        });
    };
    // End

    // Task handlers
    // Start
    const handleCreateTaskClick = e => {
        e.stopPropagation();

        store.dispatch({
            type: CREATE_NEW_TASK,
            payload: listId,
        });

        isMobile && setIsMobilePreviewOpened(prevState => !prevState);
    };

    const handleCancelEditTaskClick = () => {
        isMobile && setIsMobilePreviewOpened(prevState => !prevState);

        store.dispatch({
            type: CANCEL_EDIT_TASK,
        });
    }

    const handlerSubmitTaskClick = (content, taskId, date) => {
        isMobile && setIsMobilePreviewOpened(prevState => !prevState);

        store.dispatch({
            type: SUBMIT_TASK,
            payload: {
                content: content,
                date: date,
                taskId: taskId,
                listId: listId,
            },
        });
    };

    const handleDeleteTaskClick = taskId => {
        store.dispatch({
            type: DELETE_TASK,
            payload: {
                taskId: taskId,
                listId: listId,
            }
        });
    };

    const handleTaskStatusChange = (value, taskId) => {
        store.dispatch({
            type: CHANGE_TASK_STATUS,
            payload: {
                value: value,
                taskId: taskId,
                listId: listId,
            },
        });
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
                        onClick={handleCreateTaskClick}
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
                const isTaskShown = currentChipValue === status || currentChipValue === '';

                return (
                    isTaskShown &&
                    <Task
                        key={id}
                        id={id}
                        description={description}
                        status={status}
                        date={date}
                        onDeleteClick={handleDeleteTaskClick}
                        onSubmitClick={handlerSubmitTaskClick}
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
            onCancelClick={handleCancelEditTaskClick}
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
                                onClick={handleCreateTaskClick}
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
