

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './lib/react/reportWebVitals';

import './styling/index.css';

import L from 'leaflet';
import { ToastContainer } from 'react-toastify';
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

ReactDOM.render(

  <React.StrictMode>
      <ToastContainer />
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();