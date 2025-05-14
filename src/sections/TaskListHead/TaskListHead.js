import React, { useState, useEffect, useRef } from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import { useSelector, useDispatch } from 'react-redux';
import { editList, deleteList, cancelEditList, submitList } from '../../store/dataUpdating';
import ChevronDownIcon from "../../icons/chevron-down";
import ChevronUpIcon from "../../icons/chevron-up";
import EditPanel from "../EditPanel/EditPanel";
import MobileSideBlock from "../MobileSideBlock/MobileSideBlock";
import Menu from "../../components/Menu/Menu";
import './TaskListHead.css';

const b = block('task-list-head');
const TaskList = ({
    taskListData,
    isCollapseOpened,
    onTitleClick,
}) => {
    const { isMobile } = useAppContext();
    const { editingListId } = useSelector(state => state.listDataUpdating);
    const dispatch = useDispatch();

    const [isTitleHovered, setIsTitleHovered] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isMobilePreviewOpened, setIsMobilePreviewOpened] = useState(false);

    const { listName, id: listId } = taskListData;

    const innerContainerRef = useRef(null);

    const isListEditing = editingListId === listId;

    const handleClickOutside = e => {
        if (innerContainerRef.current && !innerContainerRef.current.contains(e.target)) {
            setIsTitleHovered(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    const handleContentMouseEnter = () => {
        setIsTitleHovered(true);
    };

    const handleContentMouseLeave = () => {
        !isMenuOpened && setIsTitleHovered(false);
    };

    const handleMenuClick = isOpened => {
        setIsMenuOpened(isOpened);
        setIsTitleHovered(isOpened);
    };

    const handlePreviewCancelClick = () => {
        setIsMobilePreviewOpened(false);
      }

    // List handlers
    // Start
    const handleEditListClick = () => {
        dispatch(editList(listId));

        setIsMenuOpened(false);
        setIsMobilePreviewOpened(true);
    };

    const handleCancelEditListClick = () => {
        dispatch(cancelEditList());
    };

    const handleSubmitListClick = (value, id) => {
        dispatch(submitList({
          listContent: value, listId: id,
        }));
    };

    const handleDeleteListClick = () => {
        dispatch(deleteList(listId));

        setIsMenuOpened(false);
    };
    // End

    // Render functions
    // Start
    const renderListHeadInner = () => (
        <div
            className={b('inner', { hovered: isTitleHovered })}
            ref={innerContainerRef}
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={handleContentMouseLeave}
        >
            <h2 className={b('title')}>{listName}</h2>
            <div className={b('actions-container')}>
                <Menu
                    onMenuClick={handleMenuClick}
                    onEditClick={handleEditListClick}
                    onDeleteClick={handleDeleteListClick}
                />
            </div>
        </div>
    );

    const renderListEditPanel = () => (
        <EditPanel
            onSubmitClick={handleSubmitListClick}
            onCancelClick={handleCancelEditListClick}
            onDeleteClick={handleDeleteListClick}
            entityContent={listName}
            entityId={listId}
        />
    );
    // End

    return (
        <div
            className={b()}
            onClick={onTitleClick}
            onKeyDown={onTitleClick}
            tabIndex="0"
        >
            {!isMobile && isListEditing ?
                renderListEditPanel() :
                renderListHeadInner()
            }
            {isMobile && isMobilePreviewOpened && isListEditing &&
                <MobileSideBlock titleContent='List editing' onCancelClick={handlePreviewCancelClick}>
                    {isListEditing && renderListEditPanel()}
                </MobileSideBlock>
            }
            <div className={b('collapse-icon-container')}>
                {isCollapseOpened ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
        </div>
    );
};

export default TaskList;
