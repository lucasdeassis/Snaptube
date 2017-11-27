import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import query from './reducers/reducer_snap_query';

ReactDOM.render(<App store={createStore(query)} />, document.getElementById('root'));
