angular
    .module('spheresuite')
    .service('projectService', projectService);

projectService.$inject = ['constants', 'commonService'];

function projectService(constants, commonService) {
    
    var projectService = {
        addProject: addProject,
        deleteProject: deleteProject,
        editProject: editProject,
        getProject: getProject,
        getProjectByOpportunityId: getProjectByOpportunityId
      };
    
      return projectService;
    
      function addProject(data) {
        return commonService.apiCall(constants.projectPersist, data);
      }
    
      function deleteProject(data) {
        return commonService.apiCall(constants.projectDelete, data);
      }
    
      function editProject(data) {
        return commonService.apiCall(constants.projectUpdate, data);
      }
    
      function getProject(data) {
        if (!data)
          return commonService.httpCallGetAll(constants.projectRetrieve);
        else {
        	data = { id: data };
        	return commonService.httpCallGetById(constants.projectRetrieveById, data);
        }
      }
      
      function getProjectByOpportunityId(data){
    	  if(data){
    		  data = {id : data};
    		  return commonService.httpCallGetById(constants.projectRetrieveByOpportunityId, data);
    	  }
      }
}