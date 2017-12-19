angular
    .module('spheresuite')
    .service('opportunityService', opportunityService);

opportunityService.$inject = ['constants', 'commonService'];

function opportunityService(constants, commonService) {
    
    var opportunityService = {
        addOpportunity: addOpportunity,
        uploadDocument: uploadDocument,
        deleteOpportunity: deleteOpportunity,
        editOpportunity: editOpportunity,
        getOpportunity: getOpportunity,
        getOpportunityByCustomerId: getOpportunityByCustomerId,
        getSalesStageReportChartDetails: getSalesStageReportChartDetails
      };
    
      return opportunityService;
    
      function addOpportunity(data) {
        return commonService.apiCall(constants.opportunityPersist, data);
      }
      
      function uploadDocument(data){
          return commonService.httpCallForUploadingImage(constants.opportunityUploadDocument, data);
      }
      
    
      function deleteOpportunity(data) {
        return commonService.apiCall(constants.opportunityDelete, data);
      }
    
      function editOpportunity(data) {
        return commonService.apiCall(constants.opportunityUpdate, data);
      }
    
      function getOpportunity(data) {
        if (!data)
          return commonService.httpCallGetAll(constants.opportunityRetrieve);
        else {
        	data = { id: data };
        	return commonService.httpCallGetById(constants.opportunityRetrieveById, data);
        }
          
      }
      
      function getOpportunityByCustomerId(data){
    	  if(data){
    		  data = {id : data};
    		  return commonService.httpCallGetById(constants.opportunityRetrieveByCustomerId, data);
    	  }
      }
      
      function getSalesStageReportChartDetails(){
          return commonService.httpCallGetAll(constants.opportunityRetrieveSalesStageReportChartDetails);
      } 
}