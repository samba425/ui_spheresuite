angular
    .module('spheresuite')
    .service('companyInformationService', companyInformationService);

companyInformationService.$inject = ['constants', 'commonService'];

function companyInformationService(constants, commonService) {

    var companyInformationsService = {
    		addCompanyInformation: addCompanyInformation,
    		changePhoto: changePhoto, 
    	    changeicon: changeicon,
    		deleteCompanyInformation: deleteCompanyInformation,
    		editCompanyInformation: editCompanyInformation,
    		getCompanyInformation: getCompanyInformation
    };

    return companyInformationsService;

    function addCompanyInformation(data) {
        return commonService.apiCall(constants.companyInformationPersist, data);
    }
    
    function changePhoto(data){
        return commonService.httpCallForUploadingImage(constants.companyInformationChangePhoto, data);
    }

    function changeicon(data){
        return commonService.httpCallForUploadingImage(constants.companyInformationChangeicon, data);
    }
    
    function deleteCompanyInformation(data) {
        return commonService.apiCall(constants.companyInformationDelete, data);
    }    

    function editCompanyInformation(data) {
        return commonService.apiCall(constants.companyInformationUpdate, data);
    }

    function getCompanyInformation(data) {
        if(!data)
        	return commonService.httpCallGetAll(constants.companyInformationRetrieve);
        else{
        	data = { id: data };
        	return commonService.httpCallGetById(constants.companyInformationRetrieveById, data);
        }
    }
}