import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/LoginSlice"
import getCourseReducer from "./slices/CoursesSlice"
import adminStatus from "./slices/AdminSlice";
export const store = configureStore({
    reducer: {
        login: loginReducer,
        getCourse: getCourseReducer,
        adminStatus: adminStatus,
    }
}) 
