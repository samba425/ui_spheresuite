angular
    .module('spheresuite')
    .service('holidayService', holidayService);

holidayService.$inject = ['constants', 'commonService'];

function holidayService(constants, commonService) {

    var holidayService = {
    	addHoliday: addHoliday,
        getHoliday: getHoliday,
        updateHoliday: updateHoliday
    };

    return holidayService;

    function addHoliday(data) {
        return commonService.apiCall(constants.holidayPersist, data);
    }
    
    function getHoliday(data) {
        if(!data){
        	return commonService.httpCallGetAll(constants.holidayRetrieve);
        } else {
        	data = {id: data};
        	return commonService.httpCallGetById(constants.holidayRetrieveById, data);
        }
    }
    

    function updateHoliday(data) {
        return commonService.apiCall(constants.holidayUpdate, data);
    }
}