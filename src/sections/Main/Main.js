import React, { useState } from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import { useSelector, useDispatch } from 'react-redux';
import { createNewList, submitList, cancelEditList } from '../../store/dataUpdating';
import PlusIcon from "../../icons/plus";
import EditPanel from "../../sections/EditPanel/EditPanel";
import EmptyState from "../../sections/EmptyState/EmptyState";
import TaskList from "../../sections/TaskList/TaskList";
import MobileSideBlock from "../../sections/MobileSideBlock/MobileSideBlock";
import { Button } from "@fruktovoe-ragu/symmetricci";
import './Main.css';

const b = block('main');
const Main = () => {
  const { isMobile } = useAppContext();
  const { editingListId, taskLists } = useSelector(state => state.listDataUpdating);
  const dispatch = useDispatch();

  const [isMobilePreviewOpened, setIsMobilePreviewOpened] = useState(false);

  const isListEditing = editingListId === 0;

  const handleSubmitListClick = (value, id) => {
    dispatch(submitList({
      listContent: value, listId: id,
    }));
  };

  const handleCreateListClick = () => {
    dispatch(createNewList());

    setIsMobilePreviewOpened(true);
  };

  const handleCancelEditListClick = () => {
    dispatch(cancelEditList());
  };

  const handlePreviewCancelClick = () => {
    setIsMobilePreviewOpened(false);
  }

  const renderEntryScreen = () => (
    editingListId === 0 ?
      <div className={b('create-new-list-container')}>
        <h2 className={b('title')}>Create your first task list</h2>
        <EditPanel
          onSubmitClick={handleSubmitListClick}
          onCancelClick={handleCancelEditListClick}
          type="list"
        />
      </div> :
      <EmptyState onCreateListClick={handleCreateListClick} />
  );

  const renderListEditPanel = () => (
    <EditPanel
      onSubmitClick={handleSubmitListClick}
      onCancelClick={handleCancelEditListClick}
      entityId={editingListId}
      type="list"
    />
  );

  const renderListsContainer = () => (
    <div className={b('lists-container')}>
      {taskLists.map((list) => (
        <TaskList
          key={list.id}
          taskListData={list}
        />
      ))}
      {!isMobile && isListEditing ?
        <div className={b('future-list-container')}>
          {renderListEditPanel()}
        </div> :
        <div className={b('button-container')}>
          <Button
            variant={isMobile ? "brand1" : "neutral"}
            rank={isMobile ? "primary" : "secondary"}
            size={isMobile ? "normal" : "big"}
            fullWidth
            icon={<PlusIcon fill={isMobile ? "#FFFFFF" : '#101D46'} />}
            onClick={handleCreateListClick}
          >
            Task list
          </Button>
        </div>
      }
      {isMobile && isMobilePreviewOpened && isListEditing &&
        <MobileSideBlock titleContent="Create a new task list" onCancelClick={handlePreviewCancelClick}>
            {renderListEditPanel()}
        </MobileSideBlock>
      }
    </div>
  );

  return (
    <main className={b()}>
        {!taskLists.length ? renderEntryScreen() : renderListsContainer()}
    </main>
  );
}

export default Main;
