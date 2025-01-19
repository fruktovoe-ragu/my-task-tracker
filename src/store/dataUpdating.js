import { createSlice } from "@reduxjs/toolkit";
import { statuses } from '../App';
import updateDataCodeArr from '../utils/updateDataCode';

const initialState = {
    taskLists: (() => {
        const savedTaskLists = localStorage.getItem("taskLists");

        return savedTaskLists ? JSON.parse(savedTaskLists) : [];
    })(),
    editingListId: null,
    editingTaskId: null,
};

const listDataUpdatingSlice = createSlice({
    name: 'listDataUpdating',
    initialState,
    reducers: {
        createNewList: state => {
            state.editingListId = 0;
            state.editingTaskId = null;
        },
        editList: (state, action) => {
            state.editingListId = action.payload;
            state.editingTaskId = null;
        },
        cancelEditList: state => {
            state.editingListId = null;
        },
        submitList: (state, action) => {
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

            state.editingListId = null;
            state.taskLists = updatedTaskLists;
        },
        deleteList: (state, action) => {
            const { taskLists } = state;
            const listId = action.payload;

            const updatedTaskLists = taskLists.filter(list => list.id !== listId);

            localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

            state.taskLists = updatedTaskLists;
        },
        createNewTask: (state, action) => {
            const listId = action.payload;

            state.editingListId = null;
            state.editingTaskId = listId;
        },
        editTask: (state, action) => {
            const taskId = action.payload;

            state.editingListId = null;
            state.editingTaskId = taskId;
        },
        cancelEditTask: state => {
            state.editingTaskId = null;
        },
        submitTask: (state, action) => {
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

            const updatedTaskLists = taskLists.map(list => {
                if (list.id === listId) {
                    return {
                        ...list,
                        tasksList: updateDataCodeArr(list.tasksList, taskId, newTask, taskUpdates),
                    };
                }
                return list;
            });

            localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

            state.editingTaskId = null;
            state.taskLists = updatedTaskLists;
        },
        deleteTask: (state, action) => {
            const { taskLists } = state;
            const { taskId, listId } = action.payload;

            const certainList = taskLists.find(list => list.id === listId);
            const filteredTaskLists = certainList.tasksList.filter(task => task.id !== taskId);

            const listUpdates = {
                tasksList: filteredTaskLists,
            };

            localStorage.setItem("taskLists", JSON.stringify(filteredTaskLists));

            state.taskLists = updateDataCodeArr(taskLists, listId, certainList, listUpdates);
        },
        changeTaskStatus: (state, action) => {
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

            state.taskLists = updatedTaskLists;
        },
    },
})

export const {
    createNewList, editList, cancelEditList, submitList, deleteList,
    createNewTask, editTask, cancelEditTask, submitTask, deleteTask, changeTaskStatus,
} = listDataUpdatingSlice.actions;
export default listDataUpdatingSlice.reducer;
