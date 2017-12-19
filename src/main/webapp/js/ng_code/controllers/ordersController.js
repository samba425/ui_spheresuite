var app = angular.module('spheresuite')
app.controller('ordersController', ordersController);

ordersController.$inject = ['$scope', '$rootScope'];

function ordersController($scope, $rootScope) {
    var ordersControllerScope = this;

    $rootScope.headerMenu = "Orders";
}