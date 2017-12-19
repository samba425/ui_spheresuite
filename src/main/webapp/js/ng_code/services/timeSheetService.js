angular
    .module('spheresuite')
    .service('timeSheetService', timeSheetService);

timeSheetService.$inject = ['constants', 'commonService'];

function timeSheetService(constants, commonService) {

    var leaveRequest = {
    	createTimeSheet: createTimeSheet,
    	getTimeSheet: getTimeSheet,
    	getWeeklyTimesheet: getWeeklyTimesheet,
    	editTimeSheet: editTimeSheet
    };

    return leaveRequest;

    function createTimeSheet(data) {
        return commonService.apiCall(constants.timeSheetCreate, data);
    }
    
    function getTimeSheet(data, type) {
    	if(!data){
        	return commonService.httpCallGetAll(constants.timeSheetRetrieve);
        }else {
        	data = {empId: data};
        	return commonService.httpCallGetById(constants.timeSheetRetrieveEmpTimesheet, data);
        }
    }

    function getWeeklyTimesheet(data){
    	return commonService.httpCallGetById(constants.timeSheetRetrieveEmpWeekelyTimesheet, data);
    }
    
    function editTimeSheet(data) {
        return commonService.apiCall(constants.timeSheetUpdate, data);
    }
}