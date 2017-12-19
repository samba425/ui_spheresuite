angular
    .module('spheresuite')
    .controller('usersController', usersController);

usersController.$inject = ['$scope', '$rootScope', '$localStorage', '$filter', 'userService', 'rolesService','employeeService'];

function usersController($scope, $rootScope, $localStorage, $filter, userService, rolesService,employeeService) {
    var usersControllerScope = this;
    $rootScope.headerMenu = "Users";

    usersControllerScope.divValue = 'users';
    usersControllerScope.userList = [];
    usersControllerScope.userListPending = [];
    usersControllerScope.ifNotEdit = true;
    usersControllerScope.inviteUser;
    usersControllerScope.inviteUserForm;
    usersControllerScope.roleList;
    usersControllerScope.searchByUser;

    usersControllerScope.changeDiv = changeDiv;
    usersControllerScope.changeStatus = changeStatus;
    usersControllerScope.decline = decline;
    usersControllerScope.deleteUser = deleteUser;
    usersControllerScope.getEmployee = getEmployee;
    usersControllerScope.getInviteEmployee = getInviteEmployee;
    usersControllerScope.getUser = getUser;
    usersControllerScope.getRole = getRole;
    usersControllerScope.sendInvite = sendInvite;
    usersControllerScope.showEditUser = showEditUser;
    usersControllerScope.reInvite = reInvite;
    usersControllerScope.updateRole = updateRole;
    usersControllerScope.updateUser = updateUser;

    getUser();
    getRole();
    getEmployee();

    function changeDiv(selectedDiv) {
        usersControllerScope.searchByUser = '';
        if (selectedDiv == 'users') {
            usersControllerScope.divValue = 'users';
        } else if (selectedDiv == 'invitees') {
            usersControllerScope.divValue = 'invitees';
        }
    }

    function changeStatus(user, type) {
        if (user && type) {
            usersControllerScope.spinner = true;
            if (type != 't')
                user.status = type
            else if (type == 't' && user.status == 'a')
                user.status = 'i';
            else if (type == 't' && user.status == 'i' || user.status == 'd')
                user.status = 'a';
            user.updatedBy = $localStorage.spheresuite.id;
            userService.updateUser(user).then(function(res) {
                  if (res.successflag == 'true') {
                    usersControllerScope.spinner = false;
                    getUser();
                } else {
                    usersControllerScope.spinner = false;
                }
            }, function(err) {
                usersControllerScope.spinner = false;
             });
        }
    }

    function decline() {
        $('#inviteUserModel').modal('hide');
        $('#reinviteUserModel').modal('hide');
        usersControllerScope.searchByUser = '';
        usersControllerScope.userAlreadyInvited = '';
        usersControllerScope.ifNotEdit = true;
        usersControllerScope.inviteUser = {};
        if (usersControllerScope.inviteUserForm) {
            usersControllerScope.inviteUserForm.$setPristine();
            usersControllerScope.inviteUserForm.$setUntouched();
        }
    }

    function deleteUser(userId) {
        if (userId) {
            usersControllerScope.spinner = true;
            userService.deleteUser(userId).then(function(res) {
                 if (res.successflag == 'true') {
                    getUser();                    
                    usersControllerScope.spinner = false;
                } else {
                    usersControllerScope.spinner = false;
                }
            }, function(err) {
                usersControllerScope.spinner = false;
            });
        }
    }
    
    function getEmployee() {
    	usersControllerScope.spinner1 = true;
    	  employeeService.getEmployee().then(function(res) {
              if (res.successflag == 'true' && res.results.length > 0) {
                  usersControllerScope.employeeList = res.results;
                  usersControllerScope.spinner1 = false;
              } else {
                  usersControllerScope.spinner1 = false;
              }
          }, function(err) { 
              usersControllerScope.spinner1 = false;
          });   
    } 

    function getInviteEmployee(users) {
        var userId = JSON.parse(users).id;
        usersControllerScope.userAlreadyInvited = '';
        userService.getUserById(userId).then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {  
                usersControllerScope.inviteUser.id = "";
                usersControllerScope.userAlreadyInvited = 'User Already Invited'                     
                usersControllerScope.Userspinner = false;
            }
        }, function(err) { 
            usersControllerScope.Userspinner = false;
        });  
    }    

    function getUser() {
        usersControllerScope.Userspinner = true;
        usersControllerScope.userList = [];        
        userService.getUser().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                usersControllerScope.userListPending = [];
                angular.forEach(res.results,function(val){
                	if(val.status == 'p') {                        
                		usersControllerScope.userListPending.push(val);
                	}else{
                		usersControllerScope.userList.push(val);
                	}
                });
                usersControllerScope.Userspinner = false;
            } else {
                usersControllerScope.Userspinner = false;
                usersControllerScope.noUserMsg = "Users Not Available"
            }
        }, function(err) { 
            usersControllerScope.Userspinner = false;
        });
    }

    function getRole() {
        usersControllerScope.spinner = true;
        rolesService.getRole().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                usersControllerScope.roleList = res.results; 
                usersControllerScope.spinner = false;
            } else {
                usersControllerScope.spinner = false;
            }
        }, function(err) { 
            usersControllerScope.spinner = false;
        });
    }

    function sendInvite() {
        if (usersControllerScope.inviteUser) {
            usersControllerScope.spinner = true;
            usersControllerScope.inviteUser.empId = JSON.parse(usersControllerScope.inviteUser.id).id;
            usersControllerScope.inviteUser.email= JSON.parse(usersControllerScope.inviteUser.id).companyEmail;
            usersControllerScope.inviteUser.updatedBy = $localStorage.spheresuite.id;
            delete usersControllerScope.inviteUser['id'];
            userService.sendInvite(usersControllerScope.inviteUser).then(function(res) {
                  if (res.successflag == 'true') {
                    usersControllerScope.spinner = false;
                    decline();
                    getUser();
                    getRole();
                } else {
                    usersControllerScope.spinner = false;
                }
            }, function(err) {
                usersControllerScope.spinner = false; 
            });
        }
    }

    function showEditUser(user) {
        if (user && user.status != 'd') {
            usersControllerScope.inviteUser = user;
            usersControllerScope.ifNotEdit = false;
        } else {
            decline();
        }
    }

    function reInvite(userId) {
        if (userId) {
            usersControllerScope.spinner = true;
            userService.reInvite({ id: userId }).then(function(res) {
                 if (res.successflag == 'true') {
                    $('#reinviteUserModel').modal('show');
                    usersControllerScope.reinviteInformation = 'Invitation Sent Successfully';
                     usersControllerScope.spinner = false;
                 }               

            }, function(err) {
                usersControllerScope.spinner = false;
            });
        }
    }

    function updateRole(user, roleId) {
         if (user && roleId) {
            user.roleId = roleId;
            updateUser(user);
        }
    }

    function updateUser(user) {
         if (user) {
            usersControllerScope.spinner = true;
            user.updatedBy = $localStorage.spheresuite.id;
            userService.updateUser(user).then(function(res) {
                if (res.successflag == 'true') {
                    usersControllerScope.spinner = false;
                    decline();
                    getUser();
                } else {
                    usersControllerScope.spinner = false;
                }
            }, function(err) {
                usersControllerScope.spinner = false;
               });
        }
    }


    $("#select1").select2();
    $("#select2").select2();

}