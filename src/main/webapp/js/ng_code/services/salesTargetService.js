angular
    .module('spheresuite')
    .service('salesTargetService', salesTargetService);

salesTargetService.$inject = ['constants', 'commonService'];

function salesTargetService(constants, commonService) {

    var reportsService = {
    		addSales: addSales,
    		editSales: editSales,
    		getSalesReport: getSalesReport
    };

    return reportsService;

    function addSales(data) { 
        return commonService.apiCall(constants.salesPersist, data);
    }
    
    function editSales(data) { 
        return commonService.apiCall(constants.salesUpdate, data);
    }

    function getSalesReport(data) { 
        if(!data){
        	return commonService.httpCallGetAll(constants.salesRetrieve);
        }else{
//        	return commonService.httpCallGetById(constants.salesRetrieveSalesByDate, data);
        }
    }
}