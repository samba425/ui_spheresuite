angular
    .module('spheresuite')
    .service('reportService', reportService);

reportService.$inject = ['constants', 'commonService'];

function reportService(constants, commonService) {

    var reportsService = {
        addreport: addreport,
        getreport: getreport
    };

    return reportsService;

    function addreport(data) { 
        return commonService.apiCall(constants.report, data);
    }

    function getreport(data) { 
        if(!data){
        	return commonService.httpCallGetAll(constants.report);
        }else{
        	data = {id: data};
        	return commonService.httpCallGetById(constants.report, data);
        }
    }
}