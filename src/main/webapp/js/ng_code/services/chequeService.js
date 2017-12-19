angular
    .module('spheresuite')
    .service('chequeService', chequeService);

chequeService.$inject = ['constants', 'commonService'];

function chequeService(constants, commonService) {

    var chequeService = {
        addCheque: addCheque,
        getCheque: getCheque,
        editCheque: editCheque,
        importCheque: importCheque
    };

    return chequeService;

    function addCheque(data) { 
        return commonService.apiCall(constants.ChequePersist, data);
    }
    
    function editCheque(data) { 
        return commonService.apiCall(constants.ChequeUpdate, data);
    }


    function getCheque(data) { 
    	if(!data){
    		return commonService.httpCallGetAll(constants.ChequeRetrieve);
    	}else{
    		data = { id: data };
    		return commonService.httpCallGetById(constants.ChequeRetrieveById, data);
    	}
    }
    
    function importCheque(data){
    	return commonService.httpCallGetById(constants.ChequeImport,data);
    }
}