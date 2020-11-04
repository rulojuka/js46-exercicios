import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Sobre from './Sobre';
import reportWebVitals from './reportWebVitals';

function roteia(endereco){
  console.log("ASDASDASDADS",endereco)
  if(endereco	===	'/sobre')	{
    return <Sobre	/>
    }	else	{
    return <App	/>
    }
}

ReactDOM.render(
  <React.StrictMode>
    { roteia(window.location.pathname) }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
