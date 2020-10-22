import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import RootReducer from './store/reducers/rootReducer'
import 'antd/dist/antd.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-credit-cards/es/styles-compiled.css'



const enhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(RootReducer,enhancer(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

