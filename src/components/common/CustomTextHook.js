/**
 * 共通コントロール（TextBox)
 */
 import React,{useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { SET_TEXT } from "../../actions/types";
 import { saveCustomTextData } from "../../actions/common";
 import store from "../../store";
 import { useForm } from "react-hook-form";
import { toBeEnabled } from "@testing-library/jest-dom/dist/matchers";
 
 const CustomTextHook = (props) => {

    //storeから取得
    const dispatch = useDispatch();
    const statecommon = useSelector(state => state.common);

    const onChange = (event) => {
      dispatch(saveCustomTextData(props.id,event.target.value))
    }

    const onBlur = (event) => {
      if(!!props.onBlur){
        props.onBlur(event);
      }
    }
 
     return (
     <>
        <input type="text" value={"statecommon.data.text"} onChange={onChange} onBlur={onBlur}/>
     </>
     );
 }
 
 export default CustomTextHook;