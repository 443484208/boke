




import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import Root from './router/router';

import * as serviceWorker from './serviceWorker';
import './App.css';
import './css/element-ui.css';
const mountNode = document.getElementById('root');
ReactDOM.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>,
    mountNode
);
serviceWorker.unregister();
