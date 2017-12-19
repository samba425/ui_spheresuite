angular
  .module('spheresuite')
  .service('rolesService', rolesService);

rolesService.$inject = ['constants', 'commonService'];

function rolesService(constants, commonService) {

  var roleService = {
    addRole: addRole,
    editRole: editRole,
    getRole: getRole
  };

  return roleService;

  function addRole(data) {
    return commonService.apiCall(constants.rolePersist,data);
  }

  function editRole(data) {
    return commonService.apiCall(constants.roleUpdate, data);
  }

  function getRole(data) {
    if (!data)
      return commonService.httpCallGetAll(constants.roleRetrieve);
    else{
    	data= { id: data};
      return commonService.httpCallGetById(constants.roleRetrieve, data);
    }
  }
}
