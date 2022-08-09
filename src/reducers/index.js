import { combineReducers } from "redux";
import tutorials from "./tutorials";
import jyur001 from "./jyu/jyur001";
import {commonReducer as common} from "./common";

const rootReducer = combineReducers({
  tutorials,
  common,
  jyur001
});

export default rootReducer;