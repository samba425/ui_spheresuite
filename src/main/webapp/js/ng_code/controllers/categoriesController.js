var app = angular.module('spheresuite')
app.controller('categoriesController', categoriesController);

categoriesController.$inject = ['$scope', '$rootScope'];

function categoriesController($scope, $rootScope) {
    var categoriesControllerScope = this;

    $rootScope.headerMenu = "Categories";
}