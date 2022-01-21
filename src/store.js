import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./redux/reducers/task.reducer";

export default configureStore({
  reducer: {
    taskReducer,
  },
});
