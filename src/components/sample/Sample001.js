/**
 * 受発注入力画面
*/
import React, { useRef, useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addJyuchuInf } from "../../actions/jyu/jyua001";
import CustomTextSimple from "../common/CustomTextSimple";
import DataAccessName from "../common/DataAccessName";
import CustomModal from "../common/CustomModal";
import CustomDateSimple from "../common/CustomDateSimple";
import ReactDOM from 'react-dom';

const Jyuc001 = () => {
  //初期ステートの定義
  /**
   * <e1>:{name:<e2>,value:<e3>,ref:useRef(null)}
   * e1:要素の名前
   * name:基本は<e2>に<e1>と同じ名称を入れておく、コード上で何度もリテラル記述することを防ぐため
   * value:<e3>に初期値
   * ref:コントロールフォーカスなどのDOM操作で使用
   */
  const initialState = {
    id:{name:"id",value:null,ref:useRef(null)},
    tokuicd:{name:"tokuicd",value:"",ref:useRef(null)},
    shincd:{name:"shincd",value:"",ref:useRef(null)} ,
    jyuchuymd:{name:"jyuchuymd",value:"",ref:useRef(null)} ,
    suryo:{name:"suryo",value:0,ref:useRef(null)},
    situryo:{name:"situryo",value:0,ref:useRef(null)},
    tani:{name:"tani",value:"0",ref:useRef(null)},
    tanka:{name:"tanka",value:0,ref:useRef(null)},
    kingaku:{name:"kingaku",value:0,ref:useRef(null)},
    submitted:{name:"submitted",value:0,ref:useRef(null)},
  };

  console.log(initialState[initialState.shincd.name].name)

  //state設定用の関数定義　useStateに初期ステートを渡しておく
  const [inputdata, setInputdata] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  //dispatchを宣言しておく
  const dispatch = useDispatch();

  //入力変更時に実行されるイベント
  const handleInputChange = event => {
    const { name, value } = event.target;
    const changeobj = inputdata[name];
    changeobj.value = value;
    setInputdata({ ...inputdata, ...changeobj });
  };

  const calckingaku = (tanka,suryo) => {
    var kingaku = tanka * suryo;

    //inputdataのkingakuオブジェクトのvalueを更新し、元のinputdataにマージ
    inputdata.kingaku.value = kingaku;
    setInputdata({ ...inputdata, ...inputdata.kingaku });
  }

  //ロストフォーカスイベント
  const handleBlur = event => {
    const { name, value } = event.target;
    switch(name){
      case inputdata.tanka.name:
        calckingaku(inputdata.tanka.value,inputdata.suryo.value);
      ;
      case inputdata.suryo.name:
        calckingaku(inputdata.tanka.value,inputdata.suryo.value);
      ;
      case inputdata.kingaku.name:
      ;
      default:
        console.log("");
      ;
    }
  };


  //登録処理
  const saveJyuchuinf = () => {

    //アクション呼び出し
    dispatch(addJyuchuInf(inputdata))
      .then(data => {
        setInputdata({
          ...inputdata
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newdata = () => {
    setInputdata(initialState);
    setSubmitted(false);
  };

  const onKeyDown = (event) => {
    console.log(event.keyCode);
  }

  const inputEl = useRef(null);
  const setInitFocus = () => {
    inputdata.jyuchuymd.ref.current.focus();

  }

  const hadleKeyDown = (event) => {
    console.log(event.keyCode);
  }

  useEffect(() => {
    document.addEventListener("keydown", hadleKeyDown, false);
  }, []);

  //子コンポーネントにinputdataの各オブジェクトごと渡した方がすっきりする気がするけど、
  //コンポーネントの種類によって渡したいデータ異なるので、冗長だけどhtmlに指定していく
  return (
    <div className="submit-form">
      {/* 登録済かで切り替える */}
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newdata}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <DataAccessName msttype="tokui" id={inputdata.tokuicd.name} ref={inputdata.tokuicd.ref}/>
          <DataAccessName msttype="shohin" id={inputdata.shincd.name} ref={inputdata.shincd.ref}/>
          <div><label htmlFor={inputdata.jyuchuymd.name}>受注日</label><CustomDateSimple id={inputdata.jyuchuymd.name} value={inputdata.jyuchuymd.value} ref={inputdata.jyuchuymd.ref} onBlur={handleBlur} onChange={handleInputChange}/></div>
          <div><label htmlFor={inputdata.suryo.name}>数量</label><CustomTextSimple classname={inputdata.suryo.name} id={inputdata.suryo.name} value={inputdata.suryo.value} ref={inputdata.suryo.ref}  onBlur={handleBlur} onChange={handleInputChange}/></div>
          <div><label htmlFor={inputdata.situryo.name}>質量</label><CustomTextSimple classname="inputtype-number" id={inputdata.situryo.name} value={inputdata.situryo.value} ref={inputdata.situryo.ref}  onBlur={handleBlur} onChange={handleInputChange}/></div>
          <div><label htmlFor={inputdata.tani.name}>単位</label><CustomTextSimple id={inputdata.tani.name} value={inputdata.tani.value} ref={inputdata.tani.ref}  onBlur={handleBlur} onChange={handleInputChange}/></div>          
          <div><label htmlFor={inputdata.tanka.name}>単価</label><CustomTextSimple classname="inputtype-number" id={inputdata.tanka.name} value={inputdata.tanka.value} ref={inputdata.tanka.ref}  onBlur={handleBlur} onChange={handleInputChange}/></div>
          <div><label htmlFor={inputdata.kingaku.name}>金額</label><CustomTextSimple classname="inputtype-number" id={inputdata.kingaku.name} value={inputdata.kingaku.value} ref={inputdata.kingaku.ref}  onBlur={handleBlur} onChange={handleInputChange}/></div>
          
          <div>
            <CustomModal />
          </div>
        {/* <input ref={inputEl} type="text" value="aaa"/> */}

          <button onClick={setInitFocus}></button>

          <button onClick={saveJyuchuinf} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Jyuc001;
