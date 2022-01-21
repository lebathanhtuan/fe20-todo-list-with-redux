import { createAction } from "@reduxjs/toolkit";

export const addTaskAction = createAction("ADD_TASK");
export const deleteTaskAction = createAction("DELETE_TASK");
export const editTaskAction = createAction("EDIT_TASK");
