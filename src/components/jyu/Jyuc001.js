/**
 * 受発注入力画面
*/
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addJyuchuInf } from "../../actions/jyu/jyua001";
import CustomTextSimple from "../common/CustomTextSimple";
import DataAccessName from "../common/DataAccessName";

const Jyuc001 = () => {
  //初期ステートの定義
  const initialState = {
    id: null,
    title: "",
    description: "",
    published: false,
    titletext:"",
    tanka:0,
    suryo:0,
    kingaku:0,
  };
  
  //state設定用の関数定義　useStateに初期ステートを渡しておく
  const [inputdata, setInputdata] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [titletext, setTitletext] = useState("");

  //dispatchを宣言しておく
  const dispatch = useDispatch();

  //入力変更時に実行されるイベント
  const handleInputChange = event => {
    const { name, value } = event.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const calckingaku = (tanka,suryo) => {
    var kingaku = tanka * suryo;
    setInputdata({ ...inputdata, ['kingaku']: kingaku });
  }

  //ロストフォーカスイベント
  const handleBlur = event => {
    const { name, value } = event.target;
    switch(name){
      case "tanka":
        calckingaku(inputdata.tanka,inputdata.suryo);
      ;
      case "suryo":
        calckingaku(inputdata.tanka,inputdata.suryo);
      ;
      case "kingaku":
      ;
      default:
        console.log(inputdata.kingaku);
      ;
    }
  };


  //登録処理
  const saveJyuchuinf = () => {
    //stateをプレーンなオブジェクトに展開
    const { title, description } = inputdata;

    //アクション呼び出し
    dispatch(addJyuchuInf(title, description))
      .then(data => {
        setInputdata({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
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
          <DataAccessName msttype="tokui" id="tokuiname1"/>
          <DataAccessName msttype="shohin" id="shohinname1"/>
          <div><label htmlFor="customTextTanka1">単価</label><CustomTextSimple id="customTextTanka1" name="tanka" value={inputdata.tanka} onCustomBlur={handleBlur} onCustomChange={handleInputChange}/></div>
          <div><label htmlFor="customTextSuryo1">数量</label><CustomTextSimple id="customTextSuryo1" name="suryo" value={inputdata.suryo} onCustomBlur={handleBlur} onCustomChange={handleInputChange}/></div>
          <div><label htmlFor="customTextKingaku1">金額</label><CustomTextSimple id="customTextKingaku1" name="kingaku" value={inputdata.kingaku} onCustomBlur={handleBlur} onCustomChange={handleInputChange}/></div>
          <p>{inputdata.kingaku}</p>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={inputdata.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={inputdata.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveJyuchuinf} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Jyuc001;
