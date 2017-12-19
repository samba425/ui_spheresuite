angular
    .module('spheresuite')
    .controller('reportController', reportController);

reportController.$inject = ['$scope', '$rootScope', 'reportService'];

function reportController($scope, $rootScope, reportService) {
    var reportControllerScope = this;
    $rootScope.headerMenu= "Reports"; 

}