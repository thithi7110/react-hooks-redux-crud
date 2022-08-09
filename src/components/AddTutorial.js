/**
 * 登録画面
*/
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../actions/tutorials";
import CustomText from "./common/CustomText";
import CustomTextSimple from "./common/CustomTextSimple";
import CustomTextHook from "./common/CustomTextHook";

const AddTutorial = () => {
  //初期ステートの定義
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
    titletext:""
  };
  
  //state設定用の関数定義　useStateに初期ステートを渡しておく
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [titletext, setTitletext] = useState("");

  const [simpleText1, setSimpleText1] = useState("");
  const [simpleText2, setSimpleText2] = useState("");

  //dispatchを宣言しておく
  const dispatch = useDispatch();

  //入力変更時に実行されるイベント
  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleInputChangeSimpleText1 = event => {
    setSimpleText1(event.target.value);
  }  
  const handleInputChangeSimpleText2 = event => {
    setSimpleText2(event.target.value);
  }

  const onBlurSimpleText1 = event => {
    //ブラー
    console.log(event.target.value);
  }



  //登録処理
  const saveTutorial = () => {
    //stateをプレーンなオブジェクトに展開
    const { title, description } = tutorial;

    //アクション呼び出し
    dispatch(createTutorial(title, description))
      .then(data => {
        setTutorial({
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

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {/* 登録済かで切り替える */}
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <CustomTextSimple id="simple-text1" setParentValue={handleInputChangeSimpleText1} onBlur={onBlurSimpleText1}/><p>親：{simpleText1}</p>
          <CustomTextSimple id="simple-text2" setParentValue={handleInputChangeSimpleText2}/><p>親：{simpleText2}</p>
          {/* <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div> */}

          <p>Hook</p>
          <div border="solid">
            <p>CustomTextHook１</p>
            <CustomTextHook id="hogeCustom1"/>
            <p>CustomTextHook２</p>
            <CustomTextHook id="hogeCustom2"/>
            <p>CustomTextHook　ーー</p>
          </div>
          <CustomText name="タイトル" title="タイトル" value="" onChange={setTitletext}/>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
