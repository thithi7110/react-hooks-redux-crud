/**
 * チュートリアル用
 * stateを変更するためのReducer
*/
import {
  DATAACCESSNAME_GET,
} from "../../actions/types";

//初期ステートは空
const initialState = [];

//チュートリアルオブジェクトとアクションを引数にもらい、アクションタイプに合わせ処理記載
const DataAccessNameReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DATAACCESSNAME_GET:
      return payload;

    default:
      return state;
  }
};

export default DataAccessNameReducer;