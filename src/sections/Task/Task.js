import React, { useState } from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import { useSelector } from 'react-redux';
import store from '../../store/store';
import { EDIT_TASK, CANCEL_EDIT_TASK } from "../../store/constants";
import EditIcon from "../../icons/edit";
import EditPanel from "../EditPanel/EditPanel";
import MobileSideBlock from "../MobileSideBlock/MobileSideBlock";
import SelectChip from "../../components/SelectChip/SelectChip";
import Button from "../../components/Button/Button";
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

    const [isMobilePreviewOpened, setIsMobilePreviewOpened] = useState(false);

    const mobileSideBlockTitle = editingTaskId === id ? 'Task editing' : 'Task description';

    // Component related handlers
    // Start
    const handlePreviewClick = () => {
        setIsMobilePreviewOpened(prevState => !prevState);
    };
    // End

    // Task handlers
    // Start
    const handleEditTaskClick = () => {
        store.dispatch({
            type: EDIT_TASK,
            payload: id,
        });
    };

    const handleCancelEditTaskClick = () => {
        isMobile && setIsMobilePreviewOpened(prevState => !prevState);

        store.dispatch({
            type: CANCEL_EDIT_TASK,
        });
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
            <Button onClick={handleEditTaskClick}>
                <EditIcon />
            </Button>
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
