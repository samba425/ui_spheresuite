angular
    .module('spheresuite')
    .service('hrRequestService', hrRequestService);

hrRequestService.$inject = ['constants', 'commonService'];

function hrRequestService(constants, commonService) {

    var hrsRequest = {
    	acceptRequest: acceptRequest,
    	createHrRequest: createHrRequest,
        getHrRequest: getHrRequest,
        editHrRequest: editHrRequest
    };

    return hrsRequest;
    
    function acceptRequest(data){
    	return commonService.apiCall(constants.hrAcceptRequest, data);
    }

    function createHrRequest(data) {
        return commonService.apiCall(constants.hrRequestPersist, data);
    }
    
    function getHrRequest(data, type) {
    	if(!data){
        	return commonService.httpCallGetAll(constants.hrRequestRetrieve);
        } else if((type && (type == 'edit' || type == 'view')) && data){
        	data = {id: data};
           	return commonService.httpCallGetById(constants.hrRequestRetrieveById, data);
        }else {
        	data = {empId: data};
        	return commonService.httpCallGetById(constants.hrRequestRetrieveByEmpId, data);
        }
    }
    
    function editHrRequest(data) {
        return commonService.apiCall(constants.hrRequestUpdate, data);
    }
}