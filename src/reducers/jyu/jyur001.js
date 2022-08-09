/**
 * チュートリアル用
 * stateを変更するためのReducer
*/
import {
  JYUAT001_ADD,
  JYUAT001_UPD,
  JYUAT001_DEL,
  JYUAT001_GET,
} from "../../actions/types";

//初期ステートは空
const initialState = [];

//チュートリアルオブジェクトとアクションを引数にもらい、アクションタイプに合わせ処理記載
const jyur001 = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case JYUAT001_ADD:
      //スプレッドで元を保持すること！！
      return [...state, payload];

    case JYUAT001_UPD:
      return state.map((upddata) => {
        if (upddata.id === payload.id) {
          return {
            ...upddata,
            ...payload,
          };
        } else {
          return upddata;
        }
      });
    case JYUAT001_GET:
      return payload;

    case JYUAT001_DEL:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
};

export default jyur001;