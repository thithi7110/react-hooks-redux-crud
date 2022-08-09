/**
 * 共通コントロール（TextBox)
 */
 import React,{useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { SET_TEXT } from "../../actions/types";
 import { saveCustomTextData } from "../../actions/common";
 import { useForm } from "react-hook-form";
 
 const CustomText = (props) => {

 
     //const [form, setForm] = useState({firstName: '', lastName: '', email: ''});
     const [name, setName] = useState('');
     const { register, handleSubmit, formState: { errors } } = useForm();//★form
    
    //submit
     const onSubmit = data => { 
        console.log(data.name2) 
        console.log(data.email) 
    }
     
     const handleNameChange = (event) => {
         setName(event.target.value);
     };
     //これでonChangeイベントを動的に扱えるので条件分岐不要
    // const handleChange = (input) => e => {
    //     setForm({...form, [input] : e.target.value});
    // };
     
   var text = useSelector((state) => state.text);
   const dispatch = useDispatch();
  
     //テキスト設定
     const setText = (event) => {
         //stateをプレーンなオブジェクトに展開
         const { text } = {text:event.target.value};
     
         //アクション呼び出し
         dispatch(saveCustomTextData(text));
       };
 
     return (
     <>
         <div className="form-group">
            <input type="text" value={name} onChange={handleNameChange} />
            <p>{name}</p>
             {/* <button onClick={() => setValue(value+1)}>
                 {value}
             </button> */}
    {/* <form onSubmit={handleSubmit}>
             <input type="text" value={firstName} onChange={handleChange('firstName')} />
            <input type="text" value={lastName} onChange={handleChange('lastName')} />
            <input type="text" value={email} onChange={handleChange('email')} />
            <input type="submit" value="Submit" />
    </form> */}
             {/* <input type="text" value={value} onChange={() => setValue}></input> */}
             {/* <p>{value}</p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name2', { required: true })} />
                { errors.name2 && <span className="text-danger">名前は1文字以上</span> }
                <input { ...register('email', { required: true })} />
                { errors.email && <span className="text-danger">Emailは1文字以上</span> }
                 <div>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
             <p>{!!text ? text : 'null' }</p>
             <label htmlFor={props.name}>{props.title}</label>
             <input
               type="text"
               className="form-control"
               id={props.title}
               required
               value="ほげ"
               onChange={setText}
             //   onChange={(e) => props.setTitletext(e.target.value)}
             // onChange={event =>
             //     dispatch({ type: SET_TEXT, payload: event.target.value })
             // }
               name={props.name}
             />
           </div>
           <button onClick={setText} className="btn btn-success">
             Submit
           </button>
     </>
     );
 }
 
 export default CustomText;