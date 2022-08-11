/**
 * アクション
 * componentから呼ばれる
*/

//アクションタイプからimport
import {
  JYUAT001_ADD,
  JYUAT001_DEL,
  JYUAT001_UPD,
  JYUAT001_GET,
} from "../types";

//サーバ側のサービスimport
import jyus001 from "../../services/jyus001";

//チュートリアル登録処理
export const addJyuchuInf = (inputdata) => async (dispatch) => {
  try {
    //サーバ側のサービスの非同期呼び出し、引数に登録内容
    const res = await jyus001.create({ 
      ...inputdata
    });

    //state変更のためにreducersに渡す
    dispatch({
      type: JYUAT001_ADD,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveJyuchuinf = () => async (dispatch) => {
  try {
    const res = await jyus001.getAll();

    dispatch({
      type: JYUAT001_GET,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateJyuchuinf = (id, data) => async (dispatch) => {
  try {
    const res = await jyus001.update(id, data);

    dispatch({
      type: JYUAT001_UPD,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    await jyus001.remove(id);

    dispatch({
      type: JYUAT001_DEL,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDataById = (id) => async (dispatch) => {
  try {
    const res = await jyus001.findById(id);

    dispatch({
      type: JYUAT001_GET,
      payload: res.data,
    });

    
  } catch (err) {
    console.log(err);
  }
};
