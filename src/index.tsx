import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {App} from './components/app/App';
import {Provider} from 'react-redux';
import {store} from './components/app/store';
import {HashRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
);
