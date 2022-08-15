/**
 * メニュー画面
 * 
 */
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

//TBD参照一括して読み込めないか？
import AddTutorial from "./components/sample/AddTutorial";
import Tutorial from "./components/sample/Tutorial";
import TutorialsList from "./components/sample/TutorialsList";
import Jyuc001 from "./components/jyu/Jyuc001";
import Sample001 from "./components/sample/Sample001";

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  var routeselm = [];
  var swithelm = [];
  //TBD権限に合わせ外部から取得?
  const menudata = [
    // {path:"/tutorials",swithpath:["/", "/tutorials"],title:"チュートリアル",component:TutorialsList},
    // {path:"/add",swithpath:"/add",title:"登録",component:AddTutorial},
    // {path:"/Sample001",swithpath:"/Sample001",title:"受注入力",component:Sample001},
    { path: "/Jyuc001", swithpath: "/Jyuc001", title: "受注入力", component: Jyuc001 },
  ];

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

  return (

    <>
      {!isAuthenticated ? (
        <div>
          <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/" className="navbar-brand">
                〇〇システム
              </a>
              <button onClick={loginWithRedirect}>Log in</button>
            </nav>
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
                  logout({ returnTo: window.location.origin });
                }}
              >
                Log out
              </button>
              <div className="navbar-nav mr-auto">
                {routeselm}
              </div>
            </nav>

            <div className="container mt-3">
              <Switch>
                {swithelm}
              </Switch>
            </div>
          </Router>
        </div>

      )}
    </>
  );
}

export default App;
