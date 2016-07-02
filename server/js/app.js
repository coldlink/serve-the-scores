(function () {
  'use strict';

  angular.module('StSServerApp', ['ngMaterial'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl ($scope) {
      const {ipcRenderer} = require('electron');
      let vm = this;
      vm.configData;
      vm.save = save;

      /*Senders*/
      ipcRenderer.send('connect');

      /*Listeners*/
      ipcRenderer.on('connect-reply', function (e, arg) {
        vm.configData = arg;
      });

      /*Methods*/
      function save() {
        ipcRenderer.send('save', vm.configData);
      }
  }
})();
