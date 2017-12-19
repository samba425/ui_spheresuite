angular
    .module('spheresuite')
    .service('hrPolicyService', hrPolicyService);

hrPolicyService.$inject = ['constants', 'commonService'];

function hrPolicyService(constants, commonService) {

    var hrsService = {
    	addHrPolicy: addHrPolicy,
        getHrPolicy: getHrPolicy,
        updateHrPolicy: updateHrPolicy
    };

    return hrsService;

    function addHrPolicy(data) {
        return commonService.apiCall(constants.hrPolicyPersist, data);
    }
    
    function getHrPolicy(data) {
        if(!data){
        	return commonService.httpCallGetAll(constants.hrPolicyRetrieve);
        } else {
        	data = {id: data};
        	return commonService.httpCallGetById(constants.hrPolicyRetrieveById, data);
        }
    }
    

    function updateHrPolicy(data) {
        return commonService.apiCall(constants.hrPolicyUpdate, data);
    }
}