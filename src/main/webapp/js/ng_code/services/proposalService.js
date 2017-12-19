angular
    .module('spheresuite')
    .service('proposalService', proposalService);

proposalService.$inject = ['constants', 'commonService'];

function proposalService(constants, commonService) {
    
    var proposalService = {
        addProposal: addProposal,
        changeicon: changeicon,
        editProposal: editProposal,
        getProposal: getProposal
      };
    
      return proposalService;
    
      function addProposal(data) {
        return commonService.apiCall(constants.proposalPersist, data);
      }    
      
      function changeicon(data){
          return commonService.httpCallForUploadingImage(constants.proposalChangeicon, data);
      }
      
      function editProposal(data) {
        return commonService.apiCall(constants.proposalUpdate, data);
      }
    
      function getProposal(data) {
        if (!data)
          return commonService.httpCallGetAll(constants.proposalRetrieve);
        else {
        	data = { id: data };
        	return commonService.httpCallGetById(constants.proposalRetrieveById, data);
        }          
      }
}