/**
 * 受発注入力画面
*/
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addJyuchuInf, getDataById } from "../../actions/jyu/jyua001";
import CustomTextSimple from "../common/CustomTextSimple";
import DataAccessName from "../common/DataAccessName";
import CustomModal from "../common/CustomModal";
import CustomDateSimple from "../common/CustomDateSimple";
import { keyfocuscontrol,formatDateToText } from "../../util/util";
import jyus001 from "../../services/jyus001";
import CustomSelect from "../common/CustomSelect";

const Jyuc001 = (props) => {

  //初期ステートの定義
  /**
   * <e1>:{name:<e2>,value:<e3>,ref:useRef(null)}
   * e1:要素の名前
   * name:基本は<e2>に<e1>と同じ名称を入れておく、コード上で何度もリテラル記述することを防ぐため
   * value:<e3>に初期値
   * ref:コントロールフォーカスなどのDOM操作で使用
   */
  const initialState = {
    id: { name: "id", value: null, ref: useRef(null), tabindex: 0 },
    tokuicd: { name: "tokuicd", value: "", ref: useRef(null), tabindex: 1 },
    shincd: { name: "shincd", value: "", ref: useRef(null), tabindex: 2 },
    jyuchuymd: { name: "jyuchuymd", value: "", ref: useRef(null), tabindex: 3 },
    suryo: { name: "suryo", value: 0, ref: useRef(null), tabindex: 4 },
    situryo: { name: "situryo", value: 0, ref: useRef(null), tabindex: 5 },
    tani: { name: "tani", value: "0", ref: useRef(null), tabindex: 6 },
    tanka: { name: "tanka", value: 0, ref: useRef(null), tabindex: 7 },
    kingaku: { name: "kingaku", value: 0, ref: useRef(null), tabindex: 8 },
    submitted: { name: "submitted", value: 0, ref: useRef(null), tabindex: 9 },
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

  const calckingaku = (tanka, suryo) => {
    var kingaku = tanka * suryo;

    //inputdataのkingakuオブジェクトのvalueを更新し、元のinputdataにマージ
    inputdata.kingaku.value = kingaku;
    setInputdata({ ...inputdata, ...inputdata.kingaku });
  }

  //ロストフォーカスイベント
  const handleBlur = event => {
    const { name, value } = event.target;
    switch (name) {
      case inputdata.id.name:
        _getDataById(inputdata.id.value);
      case inputdata.tanka.name:
        calckingaku(inputdata.tanka.value, inputdata.suryo.value);
        ;
      case inputdata.suryo.name:
        calckingaku(inputdata.tanka.value, inputdata.suryo.value);
        ;
      case inputdata.kingaku.name:
        ;
      default:
        console.log("");
        ;
    }
  };

  //データ取得処理
  const _getDataById = () => {
    

    inputdata.tokuicd.value = initialState.tokuicd.value;
    inputdata.shincd.value = initialState.shincd.value;
    inputdata.jyuchuymd.value = initialState.jyuchuymd.value;
    inputdata.suryo.value = initialState.suryo.value;
    inputdata.situryo.value = initialState.situryo.value;
    inputdata.tani.value = initialState.tani.value;
    inputdata.tanka.value = initialState.tanka.value;
    inputdata.kingaku.value = initialState.kingaku.value;

    setInputdata({ ...inputdata });

    //if(!!inputdata.tokuicd.ref.current) inputdata.tokuicd.ref.current.getAlert()


    jyus001.findById(inputdata.id.value)
      .then(response => {


        console.log(response.data);
        if (!!response.data && response.data.length > 0) {
          var row = response.data[0];
          inputdata.tokuicd.value = row.tokuicd;
          if(!!inputdata.tokuicd.ref.current) inputdata.tokuicd.ref.current.getDataFromParent(inputdata.tokuicd.value)
          inputdata.shincd.value = row.shincd;
          if(!!inputdata.shincd.ref.current) inputdata.shincd.ref.current.getDataFromParent(inputdata.shincd.value)
          inputdata.jyuchuymd.value = formatDateToText(row.jyuchuymd);
          inputdata.suryo.value = row.suryo;
          inputdata.situryo.value = row.situryo;
          inputdata.tani.value = row.tani;
          inputdata.tanka.value = row.tanka;
          inputdata.kingaku.value = row.kingaku;

          setInputdata({ ...inputdata });

          
        }

      })
      .catch(e => {
        console.log(e);
      });

  }


  //登録処理
  const saveJyuchuinf = () => {
    var updateobj = {
      id: !!inputdata.id.value ? inputdata.id.value : "",
      tokuicd: inputdata.tokuicd.value,
      shincd: inputdata.shincd.value,
      jyuchuymd: inputdata.jyuchuymd.value,
      suryo: inputdata.suryo.value,
      situryo: inputdata.situryo.value,
      tani: inputdata.tani.value,
      tanka: inputdata.tanka.value,
      kingaku: inputdata.kingaku.value,
    }

    //アクション呼び出し
    dispatch(addJyuchuInf(updateobj))
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

  const inputEl = useRef(null);
  const setInitFocus = () => {
    inputdata.jyuchuymd.ref.current.focus();

  }
  //キーダウンイベント
  const hadleKeyDown = (event) => {
    keyfocuscontrol(document, event.keyCode, inputdata);
  }

  useEffect(() => {
    document.addEventListener("keydown", { inputdata: inputdata, handleEvent: hadleKeyDown }, false);
  }, []);


  //子コンポーネントにinputdataの各オブジェクトごと渡した方がすっきりする気がするけど、
  //コンポーネントの種類によって渡したいデータ異なるので、冗長だけどhtmlに指定していく
  return (
    <div className="submit-form">
      {/* 登録済かで切り替える */}
      {submitted ? (
        <div>
          <h4>登録・更新完了</h4>
          <button className="btn btn-success" onClick={newdata}>
            戻る
          </button>
        </div>
      ) : (
        <div>
          <div><label htmlFor={inputdata.id.name}>受注番号</label><CustomTextSimple id={inputdata.id.name} value={inputdata.id.value} ref={inputdata.id.ref} onBlur={handleBlur} onChange={handleInputChange} /></div>
          <DataAccessName msttype="tokui" id={inputdata.tokuicd.name} value={inputdata.tokuicd.value} ref={inputdata.tokuicd.ref} onBlur={handleBlur} onChange={handleInputChange} />
          <DataAccessName msttype="shohin" id={inputdata.shincd.name} value={inputdata.shincd.value} ref={inputdata.shincd.ref} onBlur={handleBlur} onChange={handleInputChange} />
          <div><label htmlFor={inputdata.jyuchuymd.name}>受注日</label><CustomDateSimple id={inputdata.jyuchuymd.name} value={inputdata.jyuchuymd.value} ref={inputdata.jyuchuymd.ref} onBlur={handleBlur} onChange={handleInputChange} /></div>
          <div><label htmlFor={inputdata.suryo.name}>数量</label><CustomTextSimple classname="inputtype-number" id={inputdata.suryo.name} value={inputdata.suryo.value} ref={inputdata.suryo.ref} onBlur={handleBlur} onChange={handleInputChange} /></div>
          <div><label htmlFor={inputdata.situryo.name}>質量</label><CustomTextSimple classname="inputtype-number" id={inputdata.situryo.name} value={inputdata.situryo.value} ref={inputdata.situryo.ref} onBlur={handleBlur} onChange={handleInputChange} /></div>
          {/* <div><label htmlFor={inputdata.tani.name}>単位</label><CustomSelect id={inputdata.tani.name} value={inputdata.tani.value} ref={inputdata.tani.ref} onBlur={handleBlur} onChange={handleInputChange} data={[{value:"1",name:"CS"},{value:"2",name:"BL"},{value:"3",name:"PS"}]}/></div> */}
          <div><label htmlFor={inputdata.tani.name}>単位</label><CustomTextSimple classname="inputtype-number" id={inputdata.tani.name} value={inputdata.tani.value} ref={inputdata.tani.ref} onBlur={handleBlur} onChange={handleInputChange}/></div>
          <div><label htmlFor={inputdata.tanka.name}>単価</label><CustomTextSimple classname="inputtype-number" id={inputdata.tanka.name} value={inputdata.tanka.value} ref={inputdata.tanka.ref} onBlur={handleBlur} onChange={handleInputChange} /></div>
          <div><label htmlFor={inputdata.kingaku.name}>金額</label><CustomTextSimple classname="inputtype-number" id={inputdata.kingaku.name} value={inputdata.kingaku.value} ref={inputdata.kingaku.ref} onBlur={handleBlur} onChange={handleInputChange} /></div>

          <div>
            <CustomModal />
          </div>
          {/* <input ref={inputEl} type="text" value="aaa"/> */}

          <div>
            <button onClick={saveJyuchuinf} className="btn btn-success">確定</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jyuc001;
