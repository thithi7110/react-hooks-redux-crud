/**
 * チュートリアル用
 * stateを変更するためのReducer
*/
import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "../actions/types";

//初期ステートは空
const initialState = [];

//チュートリアルオブジェクトとアクションを引数にもらい、アクションタイプに合わせ処理記載
const tutorialReducer = (tutorials = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TUTORIAL:
      //スプレッドで元を保持すること！！
      return [...tutorials, payload];

    case RETRIEVE_TUTORIALS:
      return payload;

    case UPDATE_TUTORIAL:
      return tutorials.map((tutorial) => {
        if (tutorial.id === payload.id) {
          return {
            ...tutorial,
            ...payload,
          };
        } else {
          return tutorial;
        }
      });

    case DELETE_TUTORIAL:
      return tutorials.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_TUTORIALS:
      return [];

    default:
      return tutorials;
  }
};

export default tutorialReducer;