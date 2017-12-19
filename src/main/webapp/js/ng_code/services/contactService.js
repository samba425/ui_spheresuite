angular
    .module('spheresuite')
    .service('contactService', contactService);

contactService.$inject = ['constants', 'commonService', '$localStorage'];

function contactService(constants, commonService, $localStorage) {

    var contactsService = {
        addContact: addContact,
        deleteContact: deleteContact,
        getContact: getContact,
        getLeadContact: getLeadContact,
        editContact:editContact ,
        importContact: importContact
    };

    return contactsService;

    function addContact(data) {
        return commonService.apiCall(constants.contactPersist, data);
    }

    function deleteContact(data) {
    	if(data){
    		data = {ids : data, updatedBy: $localStorage.spheresuite.id};
            return commonService.apiCall(constants.contactDelete, data);	
    	}
    }
    
    function editContact(data) {
        return commonService.apiCall(constants.contactUpdate, data);
    }

    function getContact(data) {
        if (!data)
            return commonService.httpCallGetAll(constants.contactRetrieve);
        else { 
        	data ={ id: data };
        	return commonService.httpCallGetById(constants.contactRetrieveById, data);
        }
    }
    
    function getLeadContact(data) {
        if (data){
        	data = { id: data };
        	return commonService.httpCallGetById(constants.contactRetrieveByLeadId, data);
        }
    }
    
    function importContact (data){
  	  if(data){
  		  return commonService.httpCallGetById(constants.importContact, data);
  	  }
    }
}