angular.module('spheresuite').controller('rolesController', rolesController);

rolesController.$inject = ['$scope', '$rootScope', '$localStorage', 'rolesService', 'menuService'];

function rolesController($scope, $rootScope, $localStorage, rolesService, menuService) {

    var rolesControllerScope = this;
    $rootScope.headerMenu = "Roles";

    rolesControllerScope.isEditRole = true;
    rolesControllerScope.isLoggedIn = false;
    rolesControllerScope.isUpdate = true;
    rolesControllerScope.employeeRoleForm;
    rolesControllerScope.role;
    rolesControllerScope.roleData;
    rolesControllerScope.roleList;

    rolesControllerScope.addRole = addRole;
    rolesControllerScope.addRoleModel = addRoleModel;
    rolesControllerScope.changeParentCheckbox = changeParentCheckbox;
    rolesControllerScope.changeChildCheckbox = changeChildCheckbox;
    rolesControllerScope.decline = decline;
    rolesControllerScope.declineEdit = declineEdit;
    rolesControllerScope.declineModal = declineModal;
    rolesControllerScope.editRole = editRole;
    rolesControllerScope.getMenus = getMenus;
    rolesControllerScope.getRole = getRole;
    rolesControllerScope.isUpdateClicked = isUpdateClicked;
    rolesControllerScope.selectedRoleFun = selectedRoleFun;

    getMenus();

    function addRole() {
        if (rolesControllerScope.newRole) {
            rolesControllerScope.spinner = true;
            rolesControllerScope.newRole.updatedBy = $localStorage.spheresuite.id;
            rolesService.addRole(rolesControllerScope.newRole).then(function(res) {
                decline();
            	if (res.successflag == 'true') {
                    getRole();
                }else{
                    rolesControllerScope.spinner = true;                	
                }
            }, function(err) {
                rolesControllerScope.spinner = true;
            });
        }
        $('#employeeRoles').modal('hide');

    }

    function addRoleModel() {
        rolesControllerScope.role = {};
    }

    function changeParentCheckbox(subMenuDetails, parentIndex, checkedStatus, type) {
        if (subMenuDetails && parentIndex >= 0 && type) {
        	if(type == "main"){
	            for (var i = 0; i < subMenuDetails.length; i++) {
	            	subMenuDetails[i].isChecked = checkedStatus;
	            	if(subMenuDetails[i].subSubMenu && subMenuDetails[i].subSubMenu.length > 0){
	            		for(var j = 0; j < subMenuDetails[i].subSubMenu.length; j++){
	            			subMenuDetails[i].subSubMenu[j].isChecked  = checkedStatus;
	            		}
	            	}
	            }
        	}else if(type == "submenu"){
	            for (var i = 0; i < subMenuDetails.length; i++) {
	                subMenuDetails[i].isChecked = checkedStatus;
	            }
        	}
        }
    }

    function changeChildCheckbox(checkedStatus, parentIndex, parentOfParentIndex) {
        if (parentIndex >= 0) {
            var checkedMenus = false;
            if(parentOfParentIndex == undefined){
	            for (var i = 0; i < rolesControllerScope.menuItems[parentIndex].submenu.length; i++) {
	                if (rolesControllerScope.menuItems[parentIndex].submenu[i].isChecked) {
	                    checkedMenus = true;
	                    break;
	                }
	            }	        	
	            if (checkedMenus){
	            	rolesControllerScope.menuItems[parentIndex].isChecked = true;
	            }else if(!checkedMenus){
	            	rolesControllerScope.menuItems[parentIndex].isChecked = false;
	            }
            }else if(parentOfParentIndex >= 0){
            	var checkedSubMenus = false;
            	var mainMenuCheckedCount = 0;
            	var subMenu = rolesControllerScope.menuItems[parentOfParentIndex].submenu[parentIndex].subSubMenu;
  	           	for (var submenuIndex = 0; submenuIndex < subMenu.length; submenuIndex++) {
  	        	   if(subMenu[submenuIndex] && subMenu[submenuIndex].isChecked){
  	        		 checkedSubMenus = true;
  	        	   }
  	           	}
	  	        if(!checkedSubMenus){
	  	           var mainMenu = rolesControllerScope.menuItems[parentOfParentIndex].submenu;
	  	           	for (var mainMenuIndex = 0; mainMenuIndex < mainMenu.length; mainMenuIndex++) {
	  	        	   if(mainMenu[mainMenuIndex] && mainMenu[mainMenuIndex].isChecked){
	  	        		 mainMenuCheckedCount++;	  	        		 
	  	        	   }
	  	           	}
	  	        }  	           
  	           if(checkedSubMenus){
  	        	   rolesControllerScope.menuItems[parentOfParentIndex].isChecked = true;
  	        	   rolesControllerScope.menuItems[parentOfParentIndex].submenu[parentIndex].isChecked = true;
  	           }else if(mainMenuCheckedCount == 1){
  	        	   rolesControllerScope.menuItems[parentOfParentIndex].isChecked = false;
  	        	   rolesControllerScope.menuItems[parentOfParentIndex].submenu[parentIndex].isChecked = false;
  	           }else if(mainMenuCheckedCount > 1){
  	        	   rolesControllerScope.menuItems[parentOfParentIndex].submenu[parentIndex].isChecked = false;
  	           }
            }
        }

    }

    function decline() {
        angular.forEach(rolesControllerScope.menuItems, function(menu) {
            angular.forEach(menu.submenu, function(submenu) {
                submenu.isChecked = false;
                angular.forEach(submenu.subSubMenu, function(subSubMenu) {
                	subSubMenu.isChecked = false;
                });
            });
            menu.isChecked = false;
        });
        if (rolesControllerScope.employeeRoleForm) {
            rolesControllerScope.employeeRoleForm.$setPristine();
            rolesControllerScope.employeeRoleForm.$setUntouched();
        }
        rolesControllerScope.isEditRole = true;
        rolesControllerScope.newRole = null;
        rolesControllerScope.isLoggedIn = false;
    }

    function declineEdit() {
        rolesControllerScope.isUpdate = true;
        rolesControllerScope.isEditRole = !rolesControllerScope.isEditRole;
        selectedRoleFun(rolesControllerScope.roleData.id);
    }
    
    function declineModal(){
    	rolesControllerScope.newRole = null;
    	rolesControllerScope.employeeRoleForm.$setPristine();
    	rolesControllerScope.employeeRoleForm.$setUntouched();
    }

    function editRole() {
        rolesControllerScope.spinner = true;

        rolesControllerScope.role.id = JSON.parse(rolesControllerScope.role.name);
        rolesControllerScope.role.menu = [];
        angular.forEach(rolesControllerScope.menuItems, function(menu) {
            if (menu.isChecked && menu.submenu.length > 0) {
                rolesControllerScope.role.menu.push({ submenu: menu.id });
                angular.forEach(menu.submenu, function(submenu) {
                    if (submenu.isChecked) {
                        rolesControllerScope.role.menu.push({ submenu: submenu.id });
                    }
                    if(submenu.subSubMenu && submenu.subSubMenu.length > 0){
                        angular.forEach(submenu.subSubMenu, function(subSubMenu) {
                        	if(subSubMenu.isChecked){
                                rolesControllerScope.role.menu.push({ submenu: subSubMenu.id });
                        	}
                        });
                    }
                });
            } else if (menu.isChecked) {
                rolesControllerScope.role.menu.push({ submenu: menu.id });
            }
        });
        if (rolesControllerScope.role) {
        	rolesControllerScope.role.updatedBy = $localStorage.spheresuite.id;
            rolesService.editRole(rolesControllerScope.role).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    declineEdit()
                    getRole();
                    rolesControllerScope.roleData = null;
                    rolesControllerScope.role = null;
                    rolesControllerScope.spinner = false;
                } else { 
                    rolesControllerScope.spinner = false;
                }
            }, function(err) { 
                rolesControllerScope.spinner = false;
            });
        } else {
            rolesControllerScope.spinner = false;
        }
    }

    function getMenus() {
        rolesControllerScope.spinner = true;
        menuService.getMenu().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                rolesControllerScope.menuItems = res.results;
                rolesControllerScope.spinner = false;
                getRole(); 
            } else
                rolesControllerScope.spinner = false;
        }, function(err) { 
            rolesControllerScope.spinner = false;
        });
    }

    function getRole() {
        rolesControllerScope.spinner = true;
        rolesService.getRole().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                rolesControllerScope.roleList = res.results;
                if ($localStorage.spheresuite && $localStorage.spheresuite.roleId){
                	selectedRoleFun($localStorage.spheresuite.roleId);
                }
                rolesControllerScope.spinner = false;
            } else { 
                rolesControllerScope.spinner = false;
            }
        }, function(err) { 
            rolesControllerScope.spinner = false;
        });
    }

    function isUpdateClicked() {
        rolesControllerScope.isUpdate = !rolesControllerScope.isUpdate;
        rolesControllerScope.isEditRole = !rolesControllerScope.isEditRole;
    }

    function selectedRoleFun(data) { 
        if (data) {
            rolesControllerScope.spinner = true;
            rolesService.getRole(data).then(function(res) {
            	rolesControllerScope.roleData = []
                if (res.successflag == 'true' && res.results.length > 0) {
                    rolesControllerScope.roleData = res.results[0]; 
                    decline();
                    if (rolesControllerScope.roleData) {
                        angular.forEach(rolesControllerScope.roleData.menu, function(role) {
                            angular.forEach(rolesControllerScope.menuItems, function(menu) {
                                if (menu.submenu.length > 0) {
                                    angular.forEach(menu.submenu, function(submenu) {
                                        if (submenu.subSubMenu.length > 0) {
                                            angular.forEach(submenu.subSubMenu, function(subSubMenu) {
                                                if (role.submenu == subSubMenu.id) {
                                                	subSubMenu.isChecked = true;
                                                }
                                            });
                                        }
                                        if (role.submenu == submenu.id) {
                                            submenu.isChecked = true;
                                        }
                                    });
                                }
                                if (role.submenu == menu.id) {
                                    menu.isChecked = true;
                                }
                            });
                        });
                        if (!rolesControllerScope.role)
                            rolesControllerScope.role = { name: $localStorage.spheresuite.roleId };
                        rolesControllerScope.spinner = false;
                    } else
                        rolesControllerScope.spinner = false;
                }
            }, function(err) { 
                rolesControllerScope.spinner = false;

            });
        }
    }

    $("#select1").select2();
}