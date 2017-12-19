angular
    .module('spheresuite')
    .service('billService', billService);

billService.$inject = ['constants', 'commonService'];

function billService(constants, commonService) {

    var billsService = {
        addBill: addBill,
        getBill: getBill,
        editBill: editBill,
        importBill: importBill,
        getBillNumber:getBillNumber
    };

    return billsService;

    function addBill(data) { 
        return commonService.apiCall(constants.billPersist, data);
    }
    
    function editBill(data) { 
        return commonService.apiCall(constants.billUpdate, data);
    }


    function getBill(data) { 
    	if(!data){
    		return commonService.httpCallGetAll(constants.billRetrieve);
    	}else{
    		data = { id: data };
    		return commonService.httpCallGetById(constants.billRetrieveById, data);
    	}
    }
    
    function getBillNumber( ) {  
    		return commonService.httpCallGetAll(constants.billNumber); 
    }
    
    function importBill(data){
    	return commonService.httpCallGetById(constants.billImport,data);
    }
}