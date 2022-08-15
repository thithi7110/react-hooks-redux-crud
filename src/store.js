/**
 * ステート管理用のStore
*/
import { createStore, applyMiddleware,compose } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';//非同期処理用
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//ストアを作成
const store = createStore(
  rootReducer,
  initialState,
  //ミドルウェア登録。現状はthunkのみ
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;