var app = angular.module('spheresuite')
app.controller('assignmentController', assignmentController);

assignmentController.$inject = ['$scope', '$rootScope'];

function assignmentController($scope, $rootScope) {
    var assignmentControllerScope = this;
    
    $scope.format = "MMM dd, yyyy";
    
    assignmentControllerScope.startDateCalender = false;
    assignmentControllerScope.endDateCalender = false;
    

    assignmentControllerScope.openStartDateCalender = openStartDateCalender;
    assignmentControllerScope.openEndDateCalender = openEndDateCalender;
    
    
    function openStartDateCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        assignmentControllerScope.startDateCalender = !assignmentControllerScope.startDateCalender
    };

    function openEndDateCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        assignmentControllerScope.endDateCalender = !assignmentControllerScope.endDateCalender
    };
    
    $(".select1").select2();
}