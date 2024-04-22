import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './Redux/store.js';
import App from './App.jsx'
import React from 'react'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
