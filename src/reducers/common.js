/**
 * @summary CustomTextbox用Reducer
 * @author:kenji naito
*/
import {
  REMOVE_TEXT,
  SET_TEXT
} from "../actions/types";

//初期ステート
const initialState = [];
// [{id:"0",
//   data:{text: "",
//   maxLength:50}
// }];

//アクションタイプとpayloadを引数にもらい、アクションタイプに合わせ処理記載
export const commonReducer = (common = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TEXT:
      //値を更新し、useEffect動かすために新規配列作成
      let isFind = false;
      common.map((row) => {
        if (row.id === payload.id) {
          row.data = payload.data;
          isFind = true;
        }
      });
      if (!isFind) {
        common.push(payload);
      }
      const newcommon = [...common];

      return newcommon;
    case REMOVE_TEXT:
      //値を削除
      return [...common.filter((item) => item.id !== payload)];

    default:
      return common;
  }
};
