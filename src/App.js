/**
 * メニュー画面
 * 
 */
import { React, useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

import { keyfocuscontrol, formatDateToText } from "./util/util";

//TBD参照一括して読み込めないか？
import Jyuc001 from "./components/jyu/Jyuc001";
import jyus001 from "./services/jyus001";
import CustomTextSimple from "./components/common/CustomTextSimple";
import store from "./store";
import { useSelector } from "react-redux";
import { set } from "lodash";

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  let initialState = {
    userid: { name: "userid", value: "", ref: useRef(null), tabindex: 0 },
    passwordInput: { name: "passwordInput", value: "", ref: useRef(null), tabindex: 1 }
  }
  const [inputdata, setInputdata] = useState(initialState);
  const [userdata, setUserData] = useState(null);
  const [msg, setMsg] = useState("init");


  let { common } = useSelector(state => state.common);

  //入力変更時に実行されるイベント
  const handleInputChange = event => {
    const { name, value } = event.target;
    const changeobj = inputdata[name];
    changeobj.value = value;
    setInputdata({ ...inputdata, ...changeobj });
  };
  //キーダウンイベント
  const hadleKeyDown = (event) => {
    if(!localStorage.getItem("USERDATA")){
      keyfocuscontrol(document, event, inputdata);
    }
  }
  
  useEffect(() => {
    if(!localStorage.getItem("USERDATA")){
      //ログアウト
      setUserData(null);
    }

    document.addEventListener("keydown", { inputdata: inputdata, handleEvent: hadleKeyDown }, false);  //初期状態の確認
    let _userdata = localStorage.getItem("USERDATA");
    if (!!_userdata) {
      setUserData(_userdata);
    }
    //メッセージ取得
    common = store.getState().common;
    if (!!common) {
      let _msg="";
      common.map((row) => {

        _msg = _msg+"  "+row.data;
      })
      setMsg(_msg);
    }
  },[store.getState().common],userdata);


  //ロストフォーカスイベント
  const handleBlur = event => {
    const { name, value } = event.target;
    switch (name) {
      case inputdata.userid.name:
      case inputdata.passwordInput.name:
        ;
      default:
        console.log("");
        ;
    }
  };

  var routeselm = [];
  var swithelm = [];
  //TBD権限に合わせ外部から取得?
  const menudata = [
    // {path:"/tutorials",swithpath:["/", "/tutorials"],title:"チュートリアル",component:TutorialsList},
    // {path:"/add",swithpath:"/add",title:"登録",component:AddTutorial},
    // {path:"/Sample001",swithpath:"/Sample001",title:"受注入力",component:Sample001},
    { path: "/Jyuc001", swithpath: "/Jyuc001", title: "受注入力", component: Jyuc001 },
  ];

  //ログイン
  const login = () => {

    jyus001.login({ userid: inputdata.userid.value, password: inputdata.passwordInput.value })
      .then(response => {
        console.log(response.data);
        if (!!response.data && response.data.length > 0) {
          //ログインできた場合はローカルストレージに保存
          localStorage.setItem("USERDATA", response.data);
          setUserData(response.data);
          return
        }
        else {
          setUserData(null);
          alert('ログインに失敗しました。');
        }
      })
      .catch(e => {
        console.log(e);
        setUserData(null);
      });
  }




  //メニュー作成
  for (let i = 0; i < menudata.length; i++) {
    routeselm.push(
      <li className="nav-item">
        <Link to={menudata[i].path} className="nav-link">
          {menudata[i].title}
        </Link>
      </li>
    );

    swithelm.push(
      <Route exact path={menudata[i].swithpath} component={menudata[i].component} />
    );

  }

  // return (
  //   <Router>
  //     <nav className="navbar navbar-expand navbar-dark bg-dark">
  //       <a href="/tutorials" className="navbar-brand">
  //         〇〇システム
  //       </a>
  //       <div className="navbar-nav mr-auto">
  //         {routeselm}
  //       </div>
  //     </nav>

  //     <div className="container mt-3">
  //       <Switch>
  //         {swithelm}
  //       </Switch>
  //     </div>
  //   </Router>
  // );
  let errormsg = "";
  let state = store.getState();
  if (!!state.common.data) {
    errormsg = state.common.data.text;
  }

  return (

    <>
      {/* {!isAuthenticated ? ( */}
      {!userdata ? (
        <div>
          <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/" className="navbar-brand">
                〇〇システム
              </a>
            </nav>
            <div>
              <div ><label class="title-label" htmlFor={inputdata.userid.name}>ID:</label><CustomTextSimple id={inputdata.userid.name} value={inputdata.userid.value} ref={inputdata.userid.ref} onBlur={handleBlur} onChange={handleInputChange} /></div>
              <div ><label class="title-label" htmlFor={inputdata.passwordInput.name}>パスワード</label><CustomTextSimple id={inputdata.passwordInput.name} value={inputdata.passwordInput.value} ref={inputdata.passwordInput.ref} onBlur={handleBlur} onChange={handleInputChange} /></div>
              {/* <button onClick={loginWithRedirect}>Log in</button> */}
              <button onClick={login}>ログイン</button>
            </div>
          </Router>
        </div>
      ) : (
        <div>
          <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/" className="navbar-brand">
                〇〇システム
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem("USERDATA");
                  setUserData(null);
                }}
              >
                ログアウト
              </button>
              <div className="navbar-nav mr-auto">
                {routeselm}
                <p>ログインユーザ：</p>
              </div>
            </nav>

            <div className="container mt-3">
              <Switch>
                {swithelm}
              </Switch>
            </div>
            <footer className="footer">
              <p>{msg}</p>
            </footer>
          </Router>
        </div>

      )}
    </>
  );
}

export default App;
