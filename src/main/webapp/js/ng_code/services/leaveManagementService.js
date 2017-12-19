angular
    .module('spheresuite')
    .service('leaveManagementService', leaveManagementService);

leaveManagementService.$inject = ['constants', 'commonService'];

function leaveManagementService(constants, commonService) {

    var leaveRequest = {
    	checkLeaveAvailability: checkLeaveAvailability,
    	createLeaveRequest: createLeaveRequest,
    	getLeaveAssingedByCompany: getLeaveAssingedByCompany,
        getLeaveRequest: getLeaveRequest,
        getLeaveStatus: getLeaveStatus,
        editLeaveRequest: editLeaveRequest
    };

    return leaveRequest;
    
    function checkLeaveAvailability(data){
        return commonService.httpCallGetById(constants.leaveManagementRetrieveAvailableLeavesByEmpId, data);
    }

    function createLeaveRequest(data) {
        return commonService.apiCall(constants.leaveManagementPersist, data);
    }
    
    function getLeaveAssingedByCompany(){
        return commonService.httpCallGetAll(constants.leaveManagementRetrieveAllActive);
    }
    
    function getLeaveRequest(data, type) {
    	if(!data){
        	return commonService.httpCallGetAll(constants.leaveManagementRetrieve);
        } else if((type && (type == 'edit' || type == 'view')) && data){
        	data = {id: data};
           	return commonService.httpCallGetById(constants.leaveManagementRetrieveById, data);
        }else {
        	data = {empId: data};
        	return commonService.httpCallGetById(constants.leaveManagementRetrieveByEmpId, data);
        }
    }
    
    function getLeaveStatus(){
    	return commonService.httpCallGetAll(constants.leaveStatusRetrieve);
    }
    
    function editLeaveRequest(data) {
        return commonService.apiCall(constants.leaveManagementUpdate, data);
    }
}