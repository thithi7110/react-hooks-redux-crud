/**
 * @summary CustomTextbox用Reducer
 * @author:kenji naito
*/
import {
  SET_TEXT
} from "../actions/types";

//初期ステート
const initialState = []
// [{id:"0",
//   data:{text: "",
//   maxLength:50}
// }];

//アクションタイプとpayloadを引数にもらい、アクションタイプに合わせ処理記載
export const commonReducer = (common = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TEXT:
      //スプレッドで元を保持＋pyaloadをスプレッドで展開してマージ
      return {...common, ...payload};

    default:
      return common;
  }
};
