/**
 * 共通コントロール（TextBox)
 */
 import React,{useState } from "react";
 
 const CustomTextSimple = (props) => {

     const [value, setValue] = useState(props.value);
         
     const onChange = (event) => {
      setValue(event.target.value);

          if(!!props.onCustomChange){
            props.onCustomChange(event);
          }

     };

     const onBlur = (event) => {
        if(!!props.onCustomBlur){
          props.onCustomBlur(event);
        }
     }
  
     return (
     <>
        <input id={props.id} type="text" value={props.value} name={props.name} onChange={onChange} onBlur={onBlur}/>
     </>
     );
 }
 
 export default CustomTextSimple;