var app = angular.module('spheresuite')
app.controller('productsController', productsController);

productsController.$inject = ['$scope', '$rootScope'];

function productsController($scope, $rootScope) {
    var productsControllerScope = this;

    $rootScope.headerMenu = "Products";
}