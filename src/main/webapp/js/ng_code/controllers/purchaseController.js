var app = angular.module('spheresuite')
app.controller('warehouseControllerController', warehouseControllerController);

warehouseControllerController.$inject = ['$scope', '$rootScope'];

function warehouseControllerController($scope, $rootScope) {
    var warehouseControllerControllerScope = this;

    $rootScope.headerMenu = "Warehouses";
}