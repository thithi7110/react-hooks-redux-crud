/**
 * アクション
 * componentから呼ばれる
*/

//アクションタイプからimport
import {
    DATAACCESSNAME_GET,
  } from "../types";
  
  //サーバ側のサービスimport
  import DataAccessNameService from "../../services/DataAccessNameService";
  
  //データ取得
  export const retrieveShohin = (shohincd) => async (dispatch) => {
    try {
      const res = await DataAccessNameService.findByShohinCd(shohincd)
  
      dispatch({
        type: DATAACCESSNAME_GET,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const retrieveTokui = (tokuicd) => async (dispatch) => {
    try {
      const res = await DataAccessNameService.findByTokuiCd(tokuicd)
  
      dispatch({
        type: DATAACCESSNAME_GET,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };