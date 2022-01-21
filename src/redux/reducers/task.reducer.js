import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
};

const taskReducer = createReducer(initialState, {
  ADD_TASK: (state, action) => {
    return {
      ...state,
      taskList: [action.payload, ...state.taskList],
    };
  },

  DELETE_TASK: (state, action) => {
    const { id } = action.payload;
    const newTaskList = state.taskList.filter((item) => item.id !== id);
    return {
      ...state,
      taskList: newTaskList,
    };
  },

  EDIT_TASK: (state, action) => {
    const { id } = action.payload;
    const newTaskList = [...state.taskList];
    const taskIndex = newTaskList.findIndex((item) => item.id === id);
    newTaskList.splice(taskIndex, 1, action.payload);
    return {
      ...state,
      taskList: newTaskList,
    };
  },
});

export default taskReducer;
