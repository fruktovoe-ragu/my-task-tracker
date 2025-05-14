import React, { useState } from 'react';
import { checkEventIsClickOrEnterPress } from '../../utils/checkEvent';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import { useSelector, useDispatch } from 'react-redux';
import {
   createNewTask, cancelEditTask, submitTask, deleteTask, changeTaskStatus,
} from '../../store/dataUpdating';
import PlusIcon from "../../icons/plus";
import MobileSideBlock from "../../sections/MobileSideBlock/MobileSideBlock";
import EditPanel from "../../sections/EditPanel/EditPanel";
import TaskListHead from "../TaskListHead/TaskListHead";
import Task from "../Task/Task";
import Collapse from "../../components/Collapse/Collapse";
import { Button } from "@fruktovoe-ragu/symmetricci";
import './TaskList.css';

const b = block('task-list');
const TaskList = ({
    taskListData,
}) => {
    const { isMobile } = useAppContext();
    const currentChipValue = useSelector(state => state.filtering.chosenStatusValue);
    const { editingTaskId } = useSelector(state => state.listDataUpdating);
    const dispatch = useDispatch();

    const [isCollapseOpened, setIsCollapseOpened] = useState(true);
    const [isMobilePreviewOpened, setIsMobilePreviewOpened] = useState(false);

    const { id: listId, tasksList = [] } = taskListData;

    // Component related handlers
    const handleTitleClick = e => {
        if (e.target.closest('.menu')) {
            return;
        }
        if (checkEventIsClickOrEnterPress(e)) {
            setIsCollapseOpened(!isCollapseOpened);
        }
    };

    const handlePreviewClick = () => {
        setIsMobilePreviewOpened(prevState => !prevState);
    };
    // End

    // Task handlers
    // Start
    const handleCreateTaskClick = e => {
        e.stopPropagation();

        dispatch(createNewTask(listId));

        isMobile && setIsMobilePreviewOpened(prevState => !prevState);
    };

    const handleCancelEditTaskClick = () => {
        isMobile && setIsMobilePreviewOpened(prevState => !prevState);

        dispatch(cancelEditTask());
    }

    const handlerSubmitTaskClick = (content, taskId, date) => {
        isMobile && setIsMobilePreviewOpened(false);

        dispatch(submitTask({
            content: content,
            date: date,
            taskId: taskId,
            listId: listId,
        }));
    };

    const handleDeleteTaskClick = taskId => {
        dispatch(deleteTask({
            taskId: taskId,
            listId: listId,
        }));
    };

    const handleTaskStatusChange = (value, taskId) => {
        dispatch(changeTaskStatus({
            value: value,
            taskId: taskId,
            listId: listId,
        }));
    };
    // End

    // Render functions
    // Start
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
            <TaskListHead
                taskListData={taskListData}
                isCollapseOpened={isCollapseOpened}
                onTitleClick={handleTitleClick}
            />
            <Collapse isOpened={isCollapseOpened}>
                <div className={b('inner-content')}>
                    {!!tasksList.length && renderTaskContainer()}
                    <div className={b('future-task-container')}>
                        {editingTaskId === listId && !isMobile ?
                            renderTaskEditPanel() :
                            <Button
                                className={b('add-task-button')}
                                variant="neutral"
                                size="big"
                                fullWidth
                                icon={<PlusIcon />}
                                onClick={handleCreateTaskClick}
                            >
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
