import { configureStore } from "@reduxjs/toolkit";
import { devicesReducer } from "./Reducers/devicesReducer";

export default configureStore({
  reducer: devicesReducer,
});
