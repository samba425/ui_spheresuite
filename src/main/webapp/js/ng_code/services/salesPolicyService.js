angular
    .module('spheresuite')
    .service('salesPolicyService', salesPolicyService);

salesPolicyService.$inject = ['constants', 'commonService'];

function salesPolicyService(constants, commonService) {

    var salessService = {
    	addSalesPolicy: addSalesPolicy,
        getSalesPolicy: getSalesPolicy,
        updateSalesPolicy: updateSalesPolicy
    };

    return salessService;

    function addSalesPolicy(data) {
        return commonService.apiCall(constants.salesPolicyPersist, data);
    }
    
    function getSalesPolicy(data) {
        if(!data){
        	return commonService.httpCallGetAll(constants.salesPolicyRetrieve);
        } else {
        	data = {id: data};
        	return commonService.httpCallGetById(constants.salesPolicyRetrieveById, data);
        }
    }    

    function updateSalesPolicy(data) {
        return commonService.apiCall(constants.salesPolicyUpdate, data);
    }
}