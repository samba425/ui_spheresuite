angular
    .module('spheresuite')
    .service('requirementService', requirementService);

requirementService.$inject = ['constants', 'commonService'];

function requirementService(constants, commonService) {

    var requirements = {
		addRequirement: addRequirement,
		editRequirement: editRequirement,
		getRequirement: getRequirement
    };

    return requirements;

    function addRequirement(data) { 
        return commonService.apiCall(constants.requirementPersist, data);
    }

    function editRequirement(data) { 
        return commonService.apiCall(constants.requirementUpdate, data);
    }

    function getRequirement(data) { 
        if(!data){
        	return commonService.httpCallGetAll(constants.requirementRetrieve);
        }else if(data && data.projectId){
        	return commonService.httpCallGetById(constants.requirementRetrieveByProjectId, data);
        }else{
        	data = {id: data};
        	return commonService.httpCallGetById(constants.requirementRetrieveById, data);
        }
    }
}