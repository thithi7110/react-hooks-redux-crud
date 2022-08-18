/**
 * 共通コントロール（TextBox)
 */
 import React, { useState } from "react";
 import { addMessage, removeMessage } from "../../actions/common";
 import { useDispatch, useSelector } from "react-redux";
 import store from "../../store";
 
 const CustomTextSimple = React.forwardRef((props, ref) => {
 
   const [value, setValue] = useState(props.value);
   const dispatch = useDispatch();
 
   const onChange = (event) => {
     setValue(event.target.value);
 
     if (!!props.onChange) {
       props.onChange(event);
     }
 
   };
 
   const onBlur = (event) => {
 
     if (!!props.require && !event.target.value) {
       //エラーメッセージ登録
       dispatch(addMessage(props.id, props.id + ":未入力"));
     } else {
       //エラーメッセージ解除
       dispatch(removeMessage(props.id));
     }
     if (!!props.onBlur) {
       props.onBlur(event);
     }
   }
 
   let requiremark = "";
   if(!!props.require){
     requiremark = (<span className="requiremark">*</span>);
   }
 
   return (
     <>
       <input ref={ref} className={props.classname} id={props.id} type="text" value={props.value} name={props.id} onChange={onChange} onBlur={onBlur}/>{requiremark}
     </>
   );
 })
 
 export default CustomTextSimple;