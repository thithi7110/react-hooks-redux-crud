/**
 * 共通コントロール（TextBox)
 */
 import React,{useState } from "react";
 
 const CustomTextSimple = React.forwardRef((props, ref) => {  

     const [value, setValue] = useState(props.value);
         
     const onChange = (event) => {
      setValue(event.target.value);

          if(!!props.onChange){
            props.onChange(event);
          }

     };

     const onBlur = (event) => {
        if(!!props.onBlur){
          props.onBlur(event);
        }
     }
  
     return (
     <>
        <input ref={ref} className={props.classname} id={props.id} type="text" value={props.value} name={props.id} onChange={onChange} onBlur={onBlur}
        />
     </>
     );
 })
 
 export default CustomTextSimple;