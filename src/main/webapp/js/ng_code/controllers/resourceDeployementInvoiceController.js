var app = angular.module('spheresuite')
app.controller('resourceDeployementInvoiceController', resourceDeployementInvoiceController);

resourceDeployementInvoiceController.$inject = ['$scope', '$rootScope'];

function resourceDeployementInvoiceController($scope, $rootScope) {
    var resourceDeployementInvoiceControllerScope = this;
    
    resourceDeployementInvoiceControllerScope.invoiceMonthCalender = false;
    resourceDeployementInvoiceControllerScope.invoiceCalender = false;
    resourceDeployementInvoiceControllerScope.dueDateCalender = false;
    

    resourceDeployementInvoiceControllerScope.openInvoiceCalender = openInvoiceCalender;
    resourceDeployementInvoiceControllerScope.openInvoiceMonthCalender = openInvoiceMonthCalender;
    resourceDeployementInvoiceControllerScope.openInvoiceDueCalender = openInvoiceDueCalender;
    
    
    function openInvoiceMonthCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        resourceDeployementInvoiceControllerScope.invoiceMonthCalender = !resourceDeployementInvoiceControllerScope.invoiceMonthCalender
    };

    function openInvoiceCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        resourceDeployementInvoiceControllerScope.invoiceCalender = !resourceDeployementInvoiceControllerScope.invoiceCalender
    };
    function openInvoiceDueCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        resourceDeployementInvoiceControllerScope.dueDateCalender = !resourceDeployementInvoiceControllerScope.dueDateCalender
    };
    
    $(".select1").select2();
} 