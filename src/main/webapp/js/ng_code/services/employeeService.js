angular
    .module('spheresuite')
    .service('employeeService', employeeService);

employeeService.$inject = ['constants', 'commonService'];

function employeeService(constants, commonService) {

   var employeeService = {
    addEmployee: addEmployee,
    addEmployeeCompensation : addEmployeeCompensation,
    deleteEmployee: deleteEmployee,
    editEmployee: editEmployee,
    getEmployee: getEmployee,
    getEmployeeCompensation: getEmployeeCompensation,
    getEmployeeByEmail: getEmployeeByEmail,
    getEmployeeId: getEmployeeId,
    importEmployee: importEmployee,
    updateCompensation: updateCompensation,
    updateCompensationDate: updateCompensationDate,
    updateProfilePic: updateProfilePic
  };

  return employeeService;

  function addEmployee(data) {
    return commonService.apiCall(constants.employeePersist, data);
  }
 
  function addEmployeeCompensation(data) {
	    return commonService.apiCall(constants.employeecompensationPersist, data);
	  }
  function deleteEmployee(data) {
    return commonService.apiCall(constants.employeeDelete, data);
  }

  function editEmployee(data) {
    return commonService.apiCall(constants.employeeUpdate, data);
  }
  
  function getEmployee(data) {
	    if (!data)
	      return commonService.httpCallGetAll(constants.employeeRetrieve);
	    else {
	    	data = { id : data };
	    	return commonService.httpCallGetById(constants.employeeRetrieveById, data);
	    }
	  }
  
  	function getEmployeeCompensation(data)  {
	    if (!data)
		      return commonService.httpCallGetAll(constants.employeeCompensationRetrieve);
		    else {
		    	data = { id : data };
		    	return commonService.httpCallGetById(constants.employeeCompensationRetrieveById, data);
		    }
  }
  
  function getEmployeeByEmail(data) {
	  if(data){
	    	data = { email : data };
	    	return commonService.httpCallGetById(constants.employeeRetrieveByMail, data);
	  }
  }

  function getEmployeeId( ) {  
      return commonService.httpCallGetAll(constants.EmployeeIdRetrieve); 
  }
 
  function importEmployee(data){
	  if(data){
		  return commonService.httpCallGetById(constants.importEmployee, data);
	  }
  }
  

  function updateCompensation(data){ 
		    return commonService.apiCall(constants.employeeCompensationUpdate, data); 
  }
  
  function updateCompensationDate(data){ 
	    return commonService.apiCall(constants.employeeCompensationUpdateDate, data); 
  }
  
  function updateProfilePic(data){
	  if(data){
		    return commonService.httpCallForUploadingImage(constants.employeeUpdateProfilePic, data);
	  }
  }
}