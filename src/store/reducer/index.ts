import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";

const rootReducer: any = combineReducers({
   loginReducer: loginReducer,
   registerReducer: registerReducer
});

export default rootReducer;