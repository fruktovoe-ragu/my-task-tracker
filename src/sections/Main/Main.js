import React from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import PlusIcon from "../../icons/plus";
import EditPanel from "../../sections/EditPanel/EditPanel";
import EmptyState from "../../sections/EmptyState/EmptyState";
import TaskList from "../../sections/TaskList/TaskList";
import Button from "../../components/Button/Button";
import './Main.css';

const b = block('main');
const Main = ({
    taskLists,
    editingListId,
    editingTaskId,
    chosenStatusId,
    onTaskStatusChange,
    onCreateListClick,
    onEditListClick,
    onCancelListClick,
    onSubmitListClick,
    onDeleteListClick,
    onCreateTaskClick,
    onEditTaskClick,
    onCancelTaskClick,
    onSubmitTaskClick,
    onDeleteTaskClick,
}) => {
  const { isMobile } = useAppContext();

  const renderEntryScreen = () => (
    editingListId === 0 ? 
      <div className={b('create-new-list-container')}>
        <h2 className={b('title')}>Create your first task list</h2>
        <EditPanel
          onSubmitClick={onSubmitListClick}
          onCancelClick={onCancelListClick}
        />
      </div> :
      <EmptyState onCreateListClick={onCreateListClick} />
  );

  const renderListsContainer = () => (
    <div className={b('lists-container')}>
      {taskLists.map((list) => (
          <TaskList
            key={list.id}
            editingListId={editingListId}
            editingTaskId={editingTaskId}
            chosenStatusId={chosenStatusId}
            taskListData={list}
            onEditListClick={onEditListClick}
            onCancelListClick={onCancelListClick}
            onSubmitListClick={onSubmitListClick}
            onDeleteListClick={onDeleteListClick}
            onCreateTaskClick={onCreateTaskClick}
            onEditTaskClick={onEditTaskClick}
            onCancelTaskClick={onCancelTaskClick}
            onSubmitTaskClick={onSubmitTaskClick}
            onDeleteTaskClick={onDeleteTaskClick}
            onTaskStatusChange={onTaskStatusChange}
          />
        ))}
        {editingListId === 0 ?
          <div className={b('future-list-container')}>
            <EditPanel
              onSubmitClick={onSubmitListClick}
              onCancelClick={onCancelListClick}
              editingEntityId={editingListId}
              type="list"
            />
          </div> :
          <Button
            className={b('create-list-button')}
            theme={'wide'}
            onClick={onCreateListClick}
            isCentered={isMobile}
          >
            <PlusIcon fill={isMobile ? "#FFFFFF" : '#101D46'} /> 
            Task list
          </Button>
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
