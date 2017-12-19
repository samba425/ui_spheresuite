angular
  .module('spheresuite')
  .service('userService', userService);

userService.$inject = ['constants', 'commonService','$q','$http'];

function userService(constants, commonService,$q,$http) {

  var usersService = {
	deleteUser: deleteUser,
	getActiveUser: getActiveUser,
	getUser: getUser,
  getUserById: getUserById,
    updateUser: updateUser,
    sendInvite: sendInvite,
    sendPassword: sendPassword,
    reInvite: reInvite,
    resetPassword: resetPassword,
    login: login
  };

  return usersService;

  function deleteUser(data){
	  data = {id: data};
      return commonService.httpCallGetById(constants.userDelete, data);
  }
  
  function getActiveUser() {
      return commonService.httpCallGetAll(constants.userRetrieveActive);
  }
  
  function getUser(data) {
    if (!data)
      return commonService.httpCallGetAll(constants.userRetrieve);
    else{
    	data = {id: data};
        return commonService.httpCallGetById(constants.userRetrieveById, data);    	
    }
  }

  function getUserById(data) {console.log("res service   ",  data);
    data = {id: data};
    return commonService.httpCallGetById(constants.userRetrieveById, data);
  }
  
  function updateUser(data){
      return commonService.apiCall(constants.userUpdate, data);
  }

  function sendInvite(data){
      return commonService.apiCall(constants.userPersist, data);	  
  }
  
  function sendPassword(data){
      return commonService.apiCall(constants.userSendPassword, data);	  
  }
  
  function reInvite(data){
	return commonService.httpCallGetById(constants.userResendInvite,data);  
  }
  
  function resetPassword(data){
      return commonService.apiCall(constants.userChangePassword, data);	  
  }
  
  function login(data){
	  if(data){          
		  return commonService.apiCall(constants.userLogin,data);  
	  }
  }
}
