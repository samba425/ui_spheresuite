angular
    .module('spheresuite')
    .service('menuService', menuService);

menuService.$inject = ['constants', 'commonService'];

function menuService(constants, commonService) {

    var menusService = {
        getMenu: getMenu
    };

    return menusService;

    function getMenu(data) {
    	if(!data){
    		return commonService.httpCallGetAll(constants.menuRetrieve);
    	}else{
    		data = {id: data};
    		return commonService.httpCallGetById(constants.menuRetrieve, data);
    	}
    }
}