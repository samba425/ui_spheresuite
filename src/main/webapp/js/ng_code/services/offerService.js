angular
    .module('spheresuite')
    .service('offerService', offerService);

offerService.$inject = ['constants', 'commonService'];

function offerService(constants, commonService) {

    var offers = {
		addOffer: addOffer,
		editOffer: editOffer,
		getOffer: getOffer
    };

    return offers;

    function addOffer(data) { 
        return commonService.apiCall(constants.offerPersist, data);
    }

    function editOffer(data) { 
        return commonService.apiCall(constants.offerUpdate, data);
    }

    function getOffer(data) { 
        if(!data){
        	return commonService.httpCallGetAll(constants.offerRetrieve);
        }else{
        	data = {id: data};
        	return commonService.httpCallGetById(constants.offerRetrieveById, data);
        }
    }
}