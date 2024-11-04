import React, { useState, useEffect } from 'react';
import { block } from 'bem-cn';
import AppContext from './context/AppContext';
import Header from './sections/Header/Header';
import Main from './sections/Main/Main';
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

const b = block('task-tracker-app');
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
    setChosenStatusId(prevValue => (prevValue === value ? '' : value));
  };

  // List handlers
  // Start
  const handleCreateListClick = () => {
    setEditingListId(0);
    setEditingTaskId(null);
  };

  const handleEditListClick = listId => {
    setEditingListId(listId);
    setEditingTaskId(null);
  };

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

  const handleCancelListClick = () => {
    setEditingListId(null);
  };
  // End

  // Task handlers
  // Start
  const handleCreateTaskClick = (newTask, listId) => {
    newTask === 'newTask' && setEditingTaskId(listId);
    setEditingListId(null);
  };

  const handleEditTaskClick = taskId => {
    setEditingTaskId(taskId);
    setEditingListId(null);
  };

  const handleCancelTaskClick = () => {
    setEditingTaskId(null);
  };

  const handleSubmitTaskClick = (content, taskId, date, listId) => {
    const newTask = {
      status: statuses[0].value,
      description: content,
      id: taskId,
      date: date,
    };

    const taskUpdates = {
      description: content,
      date: date,
    };

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

  const handleTaskStatusChange = (value, taskId, listId) => {
    const taskUpdates = {
      status: value,
    };

    setTaskLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasksList: updateEntityArr(list.tasksList, taskId, {}, taskUpdates),
          };
        }
        return list;
      })
    });
  };
  // End

  return (
    <AppContext>
      <div className={b()}>
        <Header
          chosenStatus={chosenStatusId}
          onCreateTaskList={handleCreateListClick}
          onFilterChipClick={handleFilterChipClick}
        />
        <Main 
          taskLists={taskLists}
          editingListId={editingListId}
          editingTaskId={editingTaskId}
          chosenStatusId={chosenStatusId}
          onTaskStatusChange={handleTaskStatusChange}
          onCreateListClick={handleCreateListClick}
          onEditListClick={handleEditListClick}
          onCancelListClick={handleCancelListClick}
          onSubmitListClick={handleSubmitListClick}
          onDeleteListClick={handleDeleteListClick}
          onCreateTaskClick={handleCreateTaskClick}
          onEditTaskClick={handleEditTaskClick}
          onCancelTaskClick={handleCancelTaskClick}
          onSubmitTaskClick={handleSubmitTaskClick}
          onDeleteTaskClick={handleDeleteTaskClick}
        />
      </div>
    </AppContext>
  );
}

export default App;
