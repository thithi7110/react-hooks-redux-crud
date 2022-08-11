/**
 * 共通コントロール（TextBox)
 */
import React, { useState } from "react";

const CustomDateSimple = React.forwardRef((props, ref) => {
   //初期ステートの定義
   const initialState = {
      value: "",
   };
   const [inputdata, setInputdata] = useState(initialState);
   const setData = (name, value) => {
      setInputdata({ ...inputdata, [name]: value });
   }

   const onChange = (event) => {
      setData("value", event.target.value);

      if (!!props.onChange) {
         props.onChange(event);
      }

   };

   const onBlur = (event) => {
      if (!!props.onBlur) {
         props.onBlur(event);
      }
   }

   return (
      <>
         <input text-align={props.textAlign} id={props.id} type="date" value={props.value} name={props.id} onChange={onChange} onBlur={onBlur} ref={ref} />
      </>
   );
})

export default CustomDateSimple;