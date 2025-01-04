import {
    CREATE_NEW_LIST,
    EDIT_LIST,
    CANCEL_EDIT_LIST,
    SUBMIT_LIST,
    DELETE_LIST,
    CREATE_NEW_TASK,
    EDIT_TASK,
    CANCEL_EDIT_TASK,
    SUBMIT_TASK,
    DELETE_TASK,
    CHANGE_TASK_STATUS,
    SELECT_FILTER_CHIP,
    UNSELECT_FILTER_CHIP
} from './constants';

// List data updating
export const createNewList = () => ({
    type: CREATE_NEW_LIST,
});

export const editList = id => ({
    type: EDIT_LIST,
    payload: id,
});

export const submitEditList = (content, id) => ({
    type: SUBMIT_LIST,
    payload: {
        listContent: content,
        listId: id,
    },
});

export const deleteList = id => ({
    type: DELETE_LIST,
    payload: id,
});

export const cancelEditList = () => ({
    type: CANCEL_EDIT_LIST,
});

// Task data updating
export const createNewTask = listId => ({
    type: CREATE_NEW_TASK,
    payload: listId,
});

export const editTask = taskId => ({
    type: EDIT_TASK,
    payload: taskId,
});

export const cancelEditTask = () => ({
    type: CANCEL_EDIT_TASK,
});

export const submitTask = (content, taskId, date, listId) => ({
    type: SUBMIT_TASK,
    payload: {
        content: content,
        date: date,
        taskId: taskId,
        listId: listId,
    },
});

export const deleteTask = (listId, taskId) => ({
    type: DELETE_TASK,
    payload: {
        taskId: taskId,
        listId: listId,
    }
});

export const changeTaskStatus = (value, taskId, listId) => ({
    type: CHANGE_TASK_STATUS,
    payload: {
        value: value,
        taskId: taskId,
        listId: listId,
    },
});

// Filtering
export const selectFilterChip = id => ({
    type: SELECT_FILTER_CHIP,
    payload: id,
});

export const unselectFilterChip = () => ({
    type: UNSELECT_FILTER_CHIP,
});
