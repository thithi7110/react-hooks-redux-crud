/**
 * 共通コントロール（ドロップダウン)
 */
import React, { useState } from "react";


const CustomSelect = React.forwardRef((props, ref) => {
   //初期ステートの定義
   const initialState = {
      value: "",
      selectedValue:"",
      saveValue: "",
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
   }
   const onBlur = (event) => {
      if (!inputdata.saveValue ||
         inputdata.saveValue !== event.target.value) {

         if (!!props.onBlur) {
            props.onBlur(event);
         }
      }
   }

   const selectvalue = () => {
      
   }

   //リスト組み立て
   var opt = [];
   for(let i = 0;i < props.data.length;i++){
      opt.push(         
         <option value={props.data[i].value} selected={inputdata.value == props.data[i].value}>{props.data[i].name}</option>
      );
   }

   return (
         <select  id={props.id} name={props.id} onChange={onChange} onBlur={onBlur} ref={ref} >
            {opt}
         </select>
   );
});


export default CustomSelect;