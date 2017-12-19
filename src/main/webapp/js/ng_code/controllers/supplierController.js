var app = angular.module('spheresuite')
app.controller('supplierController', supplierController);

supplierController.$inject = ['$scope', '$rootScope'];

function supplierController($scope, $rootScope) {
    var supplierControllerScope = this;

    $rootScope.headerMenu = "Supplier";
}