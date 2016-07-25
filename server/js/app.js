(function() {
	'use strict';

	angular.module('StSServerApp', ['ngMaterial'])
		.controller('MainCtrl', MainCtrl);

	function MainCtrl($scope) {
		const {
			ipcRenderer
		} = require('electron');
		const _ = require('lodash');
		let vm = this;
		vm.configData;
		vm.callMethod = callMethod;
		vm.save = save;

		/*Senders*/
		ipcRenderer.send('connect');

		/*Listeners*/
		ipcRenderer.on('connect-reply', function(e, arg) {
			vm.configData = arg;
			vm.configDataModel = angular.toJson(arg, true);
		});

		/*Methods*/
		function callMethod(method, params, board) {
			if (!method || !params) return;

			switch (method) {
				case 'swap':
					if (!board) return;
					return swap(params, board);
				case 'reset':
					if (!board) return;
					return reset(params, board);
				case 'send':
					return reset(params);
				default:
					return;
			}
		}

		function reset(params, board) {
			let boardIndex = _.findIndex(vm.configData, {
				'name': board
			});
			params = params.split(',');
			params.forEach(key => {
				vm.configData[boardIndex].data.forEach((data, i) => {
					if (_.findIndex(data, o => o.key === key) !== -1) {
						vm.configData[boardIndex].data[i][_.findIndex(data, o => o.key === key)].value = 0;
					}
				});
			});
		}

		function save() {
			ipcRenderer.send('save', angular.toJson(vm.configData));
		}

		function swap(params, board) {
			let boardIndex = _.findIndex(vm.configData, {
				'name': board
			});
			params = _.chunk(params.split(','), 2);
			params.forEach(swapKeys => {
				let dataKeyIndex = [];
				swapKeys.forEach(key => {
					vm.configData[boardIndex].data.forEach((data, i) => {
						if (_.findIndex(data, o => o.key === key) !== -1) {
							dataKeyIndex.push({
								data: i,
								value: _.findIndex(data, o => o.key === key)
							});
						}
					});
				});
				let temp = vm.configData[boardIndex].data[dataKeyIndex[0].data][dataKeyIndex[0].value].value;
				vm.configData[boardIndex].data[dataKeyIndex[0].data][dataKeyIndex[0].value].value = vm.configData[boardIndex].data[dataKeyIndex[1].data][dataKeyIndex[1].value].value;
				vm.configData[boardIndex].data[dataKeyIndex[1].data][dataKeyIndex[1].value].value = temp;
			});
		}
	}
})();
