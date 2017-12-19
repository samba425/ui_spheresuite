var app = angular.module('spheresuite')
app.controller('projectInvoiceController', projectInvoiceController);

projectInvoiceController.$inject = ['$scope', '$rootScope'];

function projectInvoiceController($scope, $rootScope) {
    var projectInvoiceControllerScope = this;
    projectInvoiceControllerScope.invoiceDateCalender = false;
    projectInvoiceControllerScope.dueDateCalender = false;
    
    projectInvoiceControllerScope.addNew=addNew;
	projectInvoiceControllerScope.remove=remove;
	projectInvoiceControllerScope.checkAll = checkAll;

    projectInvoiceControllerScope.openInvoiceDateCalender = openInvoiceDateCalender;
    projectInvoiceControllerScope.openDueDateCalender = openDueDateCalender;
    
    
    function openInvoiceDateCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        projectInvoiceControllerScope.invoiceDateCalender = !projectInvoiceControllerScope.invoiceDateCalender
    };

    function openDueDateCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        projectInvoiceControllerScope.dueDateCalender = !projectInvoiceControllerScope.dueDateCalender
    };
    
    

	 $scope.orderDetails = [];

        function addNew(){
            $scope.orderDetails.push({
            'selected': $scope.selectedAll,           
            'Id':'',
            'name':'',
            'Type':'',
            'Category':'',
            'Units':'',
            'Quantity':'',
            'Price':'',
            });
        };

        function remove(){
        	var newList = [];
        	angular.forEach($scope.orderDetails,function(val, key){
        		if(!val.selected)
        			newList(val);
        	})
        	$scope.orderDetails = newList;
        	if($scope.orderDetails.length == 0){
        		$scope.selectedAll = false;
        	}
        }

        function checkAll(){
        	angular.forEach($scope.orderDetails,function(val){
        			val.selected = $scope.selectedAll;
        	});
        }
    
} 