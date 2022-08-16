/**
 * 共通コントロール（DataAccessName)
 * コードのblurで名称を取得、rowデータとして保持
 * 親コンポーネントにも渡す
 */
import React, { useRef, useState, useEffect, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_TEXT } from "../../actions/types";
import { saveCustomTextData } from "../../actions/common";
import store from "../../store";
import { useForm } from "react-hook-form";
import DataAccessNameService from "../../services/DataAccessNameService";
import CustomTextSimple from "./CustomTextSimple";
import CustomModal from "./CustomModal";

const DataAccessName = React.forwardRef((props, ref) => {
   //初期ステートの定義
   const initialState = {
      code: { name: "code", value: "", ref: useRef(null), tabindex: 0 },
      name: { name: "name", value: "", ref: useRef(null), tabindex: 0 },
      rows: { name: "rows", value: [] },
      modaldata: { name: "modaldata", value: [] },
      saveValue: { name: "saveValue", value: "" },
   };
   const [inputdata, setInputdata] = useState(initialState);
   const setData = (name, value) => {
      inputdata[name].value = value;
      setInputdata({ ...inputdata });
   }


   //storeから取得
   const statecommon = useSelector(state => state.common);
   const dispatch = useDispatch();

   const onChange = (event) => {
      //dispatch(saveCustomTextData(event.target.value))
      setData("code", event.target.value);

      if (!!props.onChange) {
         props.onChange(event);
      }
   }

   var title = '';
   if (props.msttype == 'shohin') {
      title = "商品：";
   } else if (props.msttype == 'tokui') {
      title = "得意先：";
   }

   const onBlur = (event) => {
      if (!inputdata.saveValue.value ||
         inputdata.saveValue.value !== event.target.value) {

         getData(event.target.value)
         setData('saveValue', event.target.value);


         if (!!props.onBlur) {
            props.onBlur(event);
         }
      }
   }

   //ここでデータアクセス
   const getData = code => {
      setData('name', '');

      if (props.msttype == 'shohin') {
         DataAccessNameService.findByShohinCd(code)
            .then(response => {
               setData('rows', response.data);
               console.log(response.data);
               setData('name', response.data[0].shohinname);
            })
            .catch(e => {
               console.log(e);
            });
      } else if (props.msttype == 'tokui') {
         DataAccessNameService.findByTokuiCd(code)
            .then(response => {
               setData('rows', response.data);
               console.log(response.data);
               setData('name', response.data[0].tokuiname);
            })
            .catch(e => {
               console.log(e);
            });
      }
   }


   //親から呼び出せるようにしたファンクション
   useImperativeHandle(ref, () => ({
      // `focus()`メソッドを作っている
      focus: () => {
         inputdata.code.ref.current.focus();
      },
      getAlert() {
         alert("getAlert from Child");
      },
      getDataFromParent(code) {
         getData(code);
      }

   }));
   return (
      <>
         <CustomTextSimple id={props.id} value={props.value} name={props.name} onBlur={onBlur} onChange={onChange} ref={inputdata.code.ref} /><p className="dataaccessname-name">{inputdata.name.value}</p>
         {/* <CustomModal modaldata={modaldata}/> */}
      </>
   );
})

export default DataAccessName;