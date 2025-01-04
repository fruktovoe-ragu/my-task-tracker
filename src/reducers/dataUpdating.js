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
} from "../store/constants";
import { statuses } from '../App';
import updateDataCodeArr from '../utils/updateDataCode';

const initialDataState = {
    taskLists: (() => {
        const savedTaskLists = localStorage.getItem("taskLists");

        return savedTaskLists ? JSON.parse(savedTaskLists) : [];
    })(),
    editingListId: null,
    editingTaskId: null,
};

export const listDataUpdatingReducer = (state = initialDataState, action) => {
    switch (action.type) {
        // List
        case CREATE_NEW_LIST: {
            return {
                ...state,
                editingListId: 0,
                editingTaskId: null,
            };
        }
        case EDIT_LIST: {
            return {
                ...state,
                editingListId: action.payload,
                editingTaskId: null,
            };
        }
        case CANCEL_EDIT_LIST: {
            return {
                ...state,
                editingListId: null,
            };
        }
        case SUBMIT_LIST: {
            const { taskLists } = state;
            const { listContent, listId } = action.payload;

            const newList = {
                listName: listContent,
                id: listId,
                tasksList: [],
            };
            const listUpdates = {
              listName: listContent,
            };

            const updatedTaskLists = updateDataCodeArr(taskLists, listId, newList, listUpdates)

            localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

            return {
                ...state,
                editingListId: null,
                taskLists: updatedTaskLists,
            };
        }
        case DELETE_LIST: {
            const { taskLists } = state;
            const listId = action.payload;

            const updatedTaskLists = taskLists.filter(list => list.id !== listId);

            localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

            return {
                ...state,
                taskLists: updatedTaskLists,
            };
        };
        // Task
        case CREATE_NEW_TASK: {
            const listId = action.payload;

            return {
                ...state,
                editingListId: null,
                editingTaskId: listId,
            };
        }
        case EDIT_TASK: {
            const taskId = action.payload;

            return {
                ...state,
                editingListId: null,
                editingTaskId: taskId,
            };
        }
        case CANCEL_EDIT_TASK: {
            return {
                ...state,
                editingTaskId: null,
            };
        }
        case SUBMIT_TASK: {
            const { taskLists } = state;
            const { content, date, taskId, listId } = action.payload;

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

            const updatedTaskLists = taskLists.map((list) => {
                if (list.id === listId) {
                    return {
                        ...list,
                        tasksList: updateDataCodeArr(list.tasksList, taskId, newTask, taskUpdates),
                    };
                }
                return list;
            });

            localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

            return {
                ...state,
                taskLists: updatedTaskLists,
                editingTaskId: null,
            };
        }
        case DELETE_TASK: {
            const { taskLists } = state;
            const { taskId, listId } = action.payload;

            const certainList = taskLists.find(list => list.id === listId);
            const filteredTaskLists = certainList.tasksList.filter(task => task.id !== taskId);

            const listUpdates = {
                tasksList: filteredTaskLists,
            };

            localStorage.setItem("taskLists", JSON.stringify(filteredTaskLists));

            return {
                ...state,
                taskLists: updateDataCodeArr(taskLists, listId, certainList, listUpdates),
            };
        }
        case CHANGE_TASK_STATUS: {
            const { taskLists } = state;
            const { value, taskId, listId } = action.payload;

            const taskUpdates = {
                status: value,
            };

            const updatedTaskLists = taskLists.map((list) => {
                if (list.id === listId) {
                    return {
                    ...list,
                    tasksList: updateDataCodeArr(list.tasksList, taskId, {}, taskUpdates),
                    };
                }
                return list;
            });

            return {
                ...state,
                taskLists: updatedTaskLists,
            };
        }
        default:
            return state;
    }
};
