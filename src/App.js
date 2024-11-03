import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import PlusIcon from "./icons/plus";
import Header from './sections/Header/Header';
import EditPanel from "./sections/EditPanel/EditPanel";
import TaskList from "./sections/TaskList/TaskList";
import Button from "./components/Button/Button";
import './App.css';

export const statuses = [
  {
      content: 'To do',
      value: 'todo',
  }, {
      content: 'Doing',
      value: 'doing',
  }, {
      content: 'Done',
      value: 'done',
  }
];

const cn = cnCreate('task-tracker-app');
const App = () => {
  const [taskLists, setTaskLists] = useState(() => {
    const savedTaskLists = localStorage.getItem("taskLists");
    
    return savedTaskLists ? JSON.parse(savedTaskLists) : [];
  });
  const [editingListId, setEditingListId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [chosenStatusId, setChosenStatusId] = useState(() => {
    const savedFilterChipsState = localStorage.getItem("filterChipState");
    
    return savedFilterChipsState ? JSON.parse(savedFilterChipsState) : '';
  });

  useEffect(() => {
      localStorage.setItem("filterChipState", JSON.stringify(chosenStatusId));
  }, [chosenStatusId]);

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }, [taskLists]);

  const updateEntityArr = (entitiesArr, newItemId, newItemContent, updatedItemContent) => {
    const existingEntity = entitiesArr.find(item => item.id === newItemId);

    if (existingEntity) {
        return entitiesArr.map(item => 
            item.id === newItemId ? { ...item, ...updatedItemContent } : item
        );
    } else {
        return [...entitiesArr, newItemContent];
    }
  };

  const handleFilterChipClick = value => {
    setChosenStatusId(value);
  };

  // List handlers
  // Start
  const handleCreateListClick = (newList) => () => {
    newList === 'newList' && setEditingListId(0);
    setEditingTaskId(null);
  }

  const handleEditListClick = listId => {
    setEditingListId(listId);
    setEditingTaskId(null);
  }

  const handleSubmitListClick = (content, id) => {
    setTaskLists((prevLists) => {
      const newList = {
          listName: content,
          id: id,
          tasksList: [],
      };
      const listUpdates = {
        listName: content,
      }
      return updateEntityArr(prevLists, id, newList, listUpdates);
    });
    setEditingListId(null);
  };

  const handleDeleteListClick = id => {
    const updatedTaskLists = taskLists.filter(list => list.id !== id);

    setTaskLists(updatedTaskLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };

  const handleCancelCreateListClick = () => {
    setEditingListId(null);
  }
  // End

  // Task handlers
  // Start
  const handleCreateTaskClick = (newTask) => {
    newTask === 'newTask' && setEditingTaskId(0);
    setEditingListId(null);
  }

  const handleEditTaskClick = taskId => {
    setEditingTaskId(taskId);
    setEditingListId(null);
  };

  const handleCancelCreateTaskClick = () => {
    setEditingTaskId(null);
  };

  const handleSubmitTaskClick = (content, taskId, date, listId) => {
    const newTask = {
      description: content,
      id: taskId,
      date: date,
    }

    const taskUpdates = {
      description: content,
      date: date,
    }

    setTaskLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasksList: updateEntityArr(list.tasksList, taskId, newTask, taskUpdates),
          };
        }
        return list;
      })
    });
    setEditingTaskId(null);
  };

  const handleDeleteTaskClick = (listId, taskId) => {
    const certainList = taskLists.find(list => list.id === listId);
    const updatedTaskLists = certainList.tasksList.filter(task => task.id !== taskId);

    setTaskLists((prevLists) => {
      const listUpdates = {
        tasksList: updatedTaskLists,
      }
      return updateEntityArr(prevLists, listId, certainList, listUpdates);
    });
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };
  // End

  const renderListContainer = () => (
    <div className={cn('lists-container')}>
      {taskLists.map((list) => (
          <TaskList
            key={list.id}
            editingListId={editingListId}
            editingTaskId={editingTaskId}
            taskListData={list}
            onEditListClick={handleEditListClick}
            onCancelListClick={handleCancelCreateListClick}
            onSubmitListClick={handleSubmitListClick}
            onDeleteListClick={handleDeleteListClick}
            onCreateTaskClick={handleCreateTaskClick}
            onEditTaskClick={handleEditTaskClick}
            onCancelTaskClick={handleCancelCreateTaskClick}
            onSubmitTaskClick={handleSubmitTaskClick}
            onDelteTaskClick={handleDeleteTaskClick}
          />
        ))}
        <div className={cn('future-list-container', { 'edit-mode': editingListId === 0 })}>
          <EditPanel
            onSubmitClick={handleSubmitListClick}
            onCancelClick={handleCancelCreateListClick}
            editingEntityId={editingListId}
            isEditMode={editingListId === 0}
            type="list"
          >
            <Button
              className={cn('create-list-button')}
              theme='wide'
              onClick={handleCreateListClick('newList')}
            >
              <PlusIcon /> 
              Task list
            </Button>
          </EditPanel>
        </div>
    </div>
  );

  return (
    <div className={cn('')}>
      <Header
        onCreateTaskList={handleCreateListClick('newList')}
        onFilterChipClick={handleFilterChipClick}
        chosenStatus={chosenStatusId}
      />
      <main className={cn('main')}>
        {!taskLists.length ?
          <div className={cn('empty-state-container', { 'edit-mode': editingListId === 0 })}>
            {editingListId === 0 && <h2 className={cn('title')}>Create your first task list</h2>}
            <EditPanel
              onSubmitClick={handleSubmitListClick}
              onCancelClick={handleCancelCreateListClick}
              isEditMode={editingListId === 0}
            >
              <div className={cn('empty-state')}>
                <div className={cn('empty-state-content')}>
                  <h2 className={cn('empty-state-title')}>Get started on your productivity journey!</h2>
                  <p className={cn('empty-state-text')}>
                    Create your first task list to begin tracking and organizing your tasks.
                  </p>
                </div>
                <Button
                  className={cn('empty-state-button')}
                  theme='primary'
                  onClick={handleCreateListClick('newList')}>
                    <PlusIcon fill="#FFFFFF" />
                    Task list
                </Button>
              </div> 
            </EditPanel>
          </div> :
          renderListContainer()
        }
      </main>
    </div>
  );
}

export default App;
