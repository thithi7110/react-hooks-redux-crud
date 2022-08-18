/**
 * アクション
 * componentから呼ばれる
*/

//アクションタイプからimport
import {
  REMOVE_TEXT,
  SET_TEXT
} from "./types";


//メッセージ保持
export const addMessage = (id,text) =>  {
    //state変更のためにreducersに渡す
    return{
      type: SET_TEXT,
      payload: {
          id:id,
          data:text
      },
    };
};
//メッセージ削除
export const removeMessage = (id) =>  {
    //state変更のためにreducersに渡す
    return{
      type: REMOVE_TEXT,
      payload: id,
    };
};