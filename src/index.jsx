import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import App from './App';

const appState = new AppState();

const register = function(name , bussUrl){
    console.log('Registering client ',name,' to ',bussUrl);
    var io = require('socket.io-client');
    // var middleware = require('socketio-wildcard')();
    // io().use(middleware);
    var socket = io.connect(bussUrl, {reconnect: true});
    console.log('Connected client ',name,' to ',bussUrl);
    socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
        console.log('Connected'); // data will be 'woot'
        socket.emit('REGISTER_CLIENT',name);
        console.log('Sent REGISTER_CLIENT client ',name,' to ',bussUrl);
    });

    var patch = require('socketio-wildcard')(io.Manager);
    patch(socket);

    //socket.on('*', function(){ /* … */ })

    return socket;
};

var buss = register('crib-ui', 'http://127.0.0.1:8900');
appState.setBuss(buss);
// module.exports = function(config){
//     config.scheduler.forEach(function (cronItem) {
//         console.log('Setting up CRON event: ' + cronItem.id + 'with date str: ' + cronItem.date);
//         var job = new cronJob(cronItem.date, function () {
//             console.log('Cron triggering event: ' + cronItem.id);
//             buss.emit(cronItem.id, cronItem.args);
//         }, null, true);
//     });
// };


// buss.on('*',function(data) {
//     console.log('GOT an EVENT_1', data);
// });

render(
  <AppContainer>
    <App appState={appState} />
  </AppContainer>,
  document.getElementById('root')
);


if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp appState={appState} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
