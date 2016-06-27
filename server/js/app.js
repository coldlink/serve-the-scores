(function () {
  'use strict';

  angular.module('StSServerApp', ['ngMaterial'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl ($scope) {
      const {ipcRenderer} = require('electron');
      let vm = this;
      vm.tabs = [];
      vm.save = save;

      /*Senders*/
      ipcRenderer.send('connect');

      /*Listeners*/
      ipcRenderer.on('connect-reply', function (e, arg) {
        let keys = Object.keys(arg)
        keys.forEach(elem => {
          vm.tabs.push({
            title: elem,
            data: arg[elem]
          });
        });
      });

      /*Methods*/
      function save() {
        let obj = {};
        vm.tabs.forEach(elem => {
          console.log(elem.data);
          let keys = Object.keys(elem.data);
          obj[elem.title] = {};
          keys.forEach(key => obj[elem.title][key] = elem.data[key]);
        });
        console.log(obj);
        ipcRenderer.send('save', obj);
      }
  }
})();
