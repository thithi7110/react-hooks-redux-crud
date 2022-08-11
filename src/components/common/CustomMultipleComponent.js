/**
 * 共通コントロール（TextBox複数)
 */
 import React,{useState } from "react";
 
 const CustomMultipleComponent = React.forwardRef((props, ref) => {
  //初期ステートの定義
  const initialState = {
    value: "",
  };
  const [inputdata, setInputdata] = useState(initialState);
  const setData = (name,value) => {
     setInputdata({...inputdata,[name]:value});
  }
         
     const onChange = (event) => {
      setData("value",event.target.value);

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
        <input text-align={props.textAlign} id={props.id} type="text" value={props.value} name={props.id} onChange={onChange} onBlur={onBlur} ref={ref[0]}/>
        <input text-align={props.textAlign} id={props.id+"second"} type="text" value={props.value} name={props.id} onChange={onChange} onBlur={onBlur} ref={ref[1]}/>
     </>
     );
 })
 
 export default CustomMultipleComponent;