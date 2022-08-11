/**
 * 共通コントロール（TextBox)
 */
 import React,{useState } from "react";
 
 const CustomModal = (props) => {

  const [show,setShow] = useState(false);

  const onClick = (event) => {
    setShow(!show);
  }

  if (show) {
    return (
    <>
      <button onClick={onClick}>Click</button>
      <div className="overlay">
          <div className="content">
            <p>これがモーダルウィンドウです★</p>
            <input></input>
            <p><button onClick={onClick}>close</button></p>
          </div>
      </div>
    </>
    )
  } else {
    return (
      <button onClick={onClick}>Click</button>
    );
  };
 }
 
 export default CustomModal;