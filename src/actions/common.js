/**
 * アクション
 * componentから呼ばれる
*/

//アクションタイプからimport
import {
  SET_TEXT
} from "./types";


//カスタムテキストのデータ保持
export const saveCustomTextData = (id,text) =>  {
    //state変更のためにreducersに渡す
    return{
      type: SET_TEXT,
      payload: {
          id:id,
          data:{
            text: text,
            maxLength:50
          }
      },
    };
};