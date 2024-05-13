import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {setupStore} from './app/store'
import App from './components/App/App';
import './styles/styles.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
);
