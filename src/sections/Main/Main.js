import React from 'react';
import { block } from 'bem-cn';
import useAppContext from '../../context/useAppContext';
import { useSelector } from 'react-redux';
import store from '../../store/store';
import {
  SUBMIT_LIST,
  CANCEL_EDIT_LIST,
  CREATE_NEW_LIST,
} from "../../store/constants";
import PlusIcon from "../../icons/plus";
import EditPanel from "../../sections/EditPanel/EditPanel";
import EmptyState from "../../sections/EmptyState/EmptyState";
import TaskList from "../../sections/TaskList/TaskList";
import Button from "../../components/Button/Button";
import './Main.css';

const b = block('main');
const Main = () => {
  const { isMobile } = useAppContext();
  const { editingListId, taskLists } = useSelector(state => state.listDataUpdating);

  const handleSubmitListClick = (value, id) => {
    store.dispatch({
        type: SUBMIT_LIST,
        payload: {
            listContent: value, listId: id
        },
    });
  };

  const handleCreateListClick = () => {
    store.dispatch({
      type: CREATE_NEW_LIST,
    });
  };

  const handleCancelListClick = () => {
    store.dispatch({
      type: CANCEL_EDIT_LIST,
    });
  };

  const renderEntryScreen = () => (
    editingListId === 0 ?
      <div className={b('create-new-list-container')}>
        <h2 className={b('title')}>Create your first task list</h2>
        <EditPanel
          onSubmitClick={handleSubmitListClick}
          onCancelClick={handleCancelListClick}
        />
      </div> :
      <EmptyState onCreateListClick={handleCreateListClick} />
  );

  const renderListsContainer = () => (
    <div className={b('lists-container')}>
      {taskLists.map((list) => (
          <TaskList
            key={list.id}
            taskListData={list}
            onCancelListClick={handleCancelListClick}
            onSubmitListClick={handleSubmitListClick}
          />
        ))}
        {editingListId === 0 ?
          <div className={b('future-list-container')}>
            <EditPanel
              onSubmitClick={handleSubmitListClick}
              onCancelClick={handleCancelListClick}
              entityId={editingListId}
              type="list"
            />
          </div> :
          <Button
            className={b('create-list-button')}
            theme={'wide'}
            onClick={handleCreateListClick}
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
