angular
    .module('spheresuite')
    .controller('mainController', mainController);

mainController.$inject = ['$rootScope'];

function mainController($rootScope) {	
	$rootScope.appUrl = document.getElementById('apiurl').value;
}