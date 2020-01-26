import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './custom.scss'


import "@material/select/mdc-select.scss";
import "@material/dialog/mdc-dialog.scss";
import "@material/list/mdc-list.scss";
import "@material/button/mdc-button.scss";
import "@material/typography/mdc-typography.scss";
import "@material/data-table/mdc-data-table.scss";
import "@material/textfield/mdc-text-field.scss";
import "@material/chips/mdc-chips.scss";




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
