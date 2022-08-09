/**
 * 共通コントロール（DataAccessName)
 * コードのblurで名称を取得、rowデータとして保持
 * 親コンポーネントにも渡す
 */
 import React,{useState,useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { SET_TEXT } from "../../actions/types";
 import { saveCustomTextData } from "../../actions/common";
 import store from "../../store";
 import { useForm } from "react-hook-form";
 import DataAccessNameService from "../../services/DataAccessNameService";
 import CustomTextSimple from "./CustomTextSimple";
 
 const DataAccessName = (props) => {

    //storeから取得
    const statecommon = useSelector(state => state.common);
    const dispatch = useDispatch();

    const [code,setCode] = useState('');
    const [rows,setRow] = useState([]);
    const [name,setName] = useState('');

    const onChange = (event) => {
      //dispatch(saveCustomTextData(event.target.value))
      setCode(event.target.value);      
    }

   var title = '';
   if (props.msttype == 'shohin') {
      title = "商品：";
   } else if(props.msttype == 'tokui') {          
      title = "得意先：";
   }
    
   //ここでデータアクセス
   const getData = code => {
      setName("")

      if (props.msttype == 'shohin') {
         DataAccessNameService.findByShohinCd(code)
            .then(response => {
               setRow(response.data);
               console.log(response.data);
               setName(response.data[0].shohinname)
            })
            .catch(e => {
               console.log(e);
            });
      } else if(props.msttype == 'tokui') { 
         DataAccessNameService.findByTokuiCd(code)
            .then(response => {
               setRow(response.data);
               console.log(response.data);
               setName(response.data[0].tokuiname)
            })
            .catch(e => {
               console.log(e);
            });
      }
   }

    const onBlur =(event) => {
      getData(event.target.value)
    }

     return (
     <>
        <label htmlFor={props.id}>{title}</label><CustomTextSimple id={props.id} onCustomBlur={onBlur} onCustomChange={onChange}/><p>{name}</p>
     </>
     );
 }
 
 export default DataAccessName;