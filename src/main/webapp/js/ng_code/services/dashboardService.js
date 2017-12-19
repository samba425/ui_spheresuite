angular
    .module('spheresuite')
    .service('dashboardService', dashboardService);

dashboardService.$inject = ['constants', 'commonService'];

function dashboardService(constants, commonService) {

    var dashboardService = {
        addDashboard: addDashboard,
        getDashboard: getDashboard
    };

    return dashboardService;

    function addDashboard(data) { 
        return commonService.apiCall(constants.dashboard, data);
    }

    function getDashboard(data) { 
        if (!data){
        	return commonService.httpCallGetAll(constants.dashboard);
        }
        else { 
        	data ={ id: data };
        	return commonService.httpCallGetById(constants.dashboard, data);
        	}
    }
}