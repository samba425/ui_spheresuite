angular
    .module('spheresuite')
    .service('warehouseService', warehouseService);

warehouseService.$inject = ['constants', 'commonService'];

function warehouseService(constants, commonService) {

    var warehouseServices = {
    		addWarehouse: addWarehouse,
    		editWarehouse: editWarehouse,
    		getWarehouse: getWarehouse
    }
    return warehouseServices;

    function addWarehouse(data){
    	return commonService.apiCall(constants.warehousePersist, data);
    }
    
    function editWarehouse(data){
    	return commonService.apiCall(constants.warehouseUpdate, data);
    }
    
    function getWarehouse(data) {
    	if(!data){
        	return commonService.httpCallGetAll(constants.warehouseRetrieve);
        } else {
        	data = {id: data};
           	return commonService.httpCallGetById(constants.warehouseRetrieveById, data);
        }
    }    
    
}