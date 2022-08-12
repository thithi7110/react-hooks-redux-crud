import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    // domain={REACT_APP_AUTH0_DOMAIN}
    // clientId={REACT_APP_AUTH0_CLIENT_ID}
    // redirectUri={window.location.origin}
    domain={'dev-ecr7fp9x.us.auth0.com'}
    clientId={'mgAyVqTnmXaJaIC8q7enQywFhu5teait'}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
