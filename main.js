import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/app/App';

'use strict';

var appMountNode = document.getElementById('app');
ReactDOM.render(<App url="data.json" />, appMountNode);