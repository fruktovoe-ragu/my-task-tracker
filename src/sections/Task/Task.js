import React, { useState } from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import { useSelector, useDispatch } from 'react-redux';
import { editTask, cancelEditTask } from '../../store/dataUpdating';
import EditPanel from "../EditPanel/EditPanel";
import MobileSideBlock from "../MobileSideBlock/MobileSideBlock";
import SelectChip from "../../components/SelectChip/SelectChip";
import Menu from "../../components/Menu/Menu";
import Button from "../../components/Button/Button";
import DeleteIcon from "../../icons/delete";
import EditIcon from "../../icons/edit";
import './Task.css';

const b = block('task');
const Task = ({
    className = '',
    id,
    description,
    status,
    date,
    onSubmitClick,
    onDeleteClick,
    onTaskStatusChange,
}) => {
    const { isMobile } = useAppContext();
    const { editingTaskId } = useSelector(state => state.listDataUpdating);
    const dispatch = useDispatch();

    const [isMobilePreviewOpened, setIsMobilePreviewOpened] = useState(false);

    const mobileSideBlockTitle = editingTaskId === id ? 'Task editing' : 'Task description';

    // Handler functions
    // Start
    const handlePreviewClick = () => {
        setIsMobilePreviewOpened(prevState => !prevState);
    };

    const handleEditTaskClick = () => {
       dispatch(editTask(id));
    };

    const handleCancelEditTaskClick = () => {
        isMobile && setIsMobilePreviewOpened(prevState => !prevState);

        dispatch(cancelEditTask());
    }

    const handleDeleteTaskClick = () => {
        onDeleteClick?.(id);
    };

    const handleTaskStatusChange = value => {
        onTaskStatusChange?.(value, id);
    };
    // End

    // Render functions
    // Start
    const renderStatusContainer = (disabled = false) => (
        <div className={b('status-container')}>
            <SelectChip status={status} disabled={disabled} onValueChange={handleTaskStatusChange} />
        </div>
    );

    const renderDescriptionContainer = () => (
        <div className={b('description-container')}>
            <p className={b('description')}>{description}</p>
        </div>
    );

    const renderDateContainer = () => (
        <div className={b('date-container')}>
            <p className={b('date')}>{date}</p>
        </div>
    );

    const renderActionsContainer = () => (
        <div className={b('actions-container')}>
            {isMobile ?
                <>
                    <Button onClick={handleEditTaskClick}>
                        <EditIcon />
                    </Button>
                    <Button
                        className={b('delete-button')}
                        onClick={handleDeleteTaskClick}
                    >
                        <DeleteIcon />
                    </Button>
                </> :
                <Menu
                    position="top-left"
                    onEditClick={handleEditTaskClick}
                    onDeleteClick={handleDeleteTaskClick}
                />
            }
        </div>
    );

    const renderEditPanel = () => (
        <EditPanel
            onSubmitClick={onSubmitClick}
            onCancelClick={handleCancelEditTaskClick}
            onDeleteClick={handleDeleteTaskClick}
            entityContent={description}
            entityId={id}
            className={b('edit-panel')}
            type="task"
        />
    );
    // End

    return (
        <li className={b({}).mix(className)}>
            {!isMobile &&
                <>
                    {editingTaskId === id ?
                        renderEditPanel() :
                        <div className={b('inner')}>
                            {renderStatusContainer()}
                            {renderDescriptionContainer()}
                            {renderDateContainer()}
                            {renderActionsContainer()}
                        </div>
                    }
                </>
            }
            {isMobile &&
                <div className={b('mobile-preview')} onClick={handlePreviewClick}>
                    {renderDescriptionContainer()}
                    <div className={b('bottom-section')}>
                        {renderDateContainer()}
                        {renderStatusContainer(true)}
                    </div>
                </div>
            }
            {isMobile && isMobilePreviewOpened &&
                <MobileSideBlock titleContent={mobileSideBlockTitle} onCancelClick={handlePreviewClick}>
                    {editingTaskId === id ?
                        renderEditPanel() :
                        <div className={b('mobile-full-view')}>
                            {renderDescriptionContainer()}
                            <div className={b('bottom-section')}>
                                {renderDateContainer()}
                                {renderStatusContainer()}
                                {renderActionsContainer()}
                            </div>
                        </div>
                    }
                </MobileSideBlock>
            }
        </li>
    );
};

export default Task;
