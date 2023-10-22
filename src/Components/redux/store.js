import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CompanyReducer, ProjectReducer } from "./reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootreducer = combineReducers({ company: CompanyReducer, projects: ProjectReducer })
const compstore = configureStore({ reducer: rootreducer, middleware: [thunk, logger] })
export default compstore;