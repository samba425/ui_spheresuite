angular
    .module('spheresuite')
    .controller('menuController', menuController);

menuController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', '$route', 'menuService', 'rolesService'];

function menuController($scope, $rootScope, $location, $localStorage, $route, menuService, rolesService) {
    var menuControllerScope = this;

    $rootScope.tempMenus;
    var authorizedUser = false;
    menuControllerScope.menuItems;
    menuControllerScope.roleMenu; 
    menuControllerScope.getMenus = getMenus;
    menuControllerScope.goToUri = goToUri;

    
    
    if(!$rootScope.tempMenus || $rootScope.tempMenus.length == 0){
    	getRole();
    }
    else{
    	menuControllerScope.menuItems = $rootScope.tempMenus; 
    }
    
    
    function getMenus() {
        if (menuControllerScope.roleMenu) {
            menuControllerScope.spinner = true;
            menuService.getMenu().then(function(res) {
                if (res.successflag == 'true' && res.results.length > 0) {
                    menuControllerScope.menuItems = res.results;
                    if (menuControllerScope.roleMenu) {
                        for (var role in menuControllerScope.roleMenu) {

                            for (var menu in menuControllerScope.menuItems) {
                            	
                                if (menuControllerScope.roleMenu[role].submenu == menuControllerScope.menuItems[menu].id) {
                                    menuControllerScope.menuItems[menu].isChecked = true;
                                    menuControllerScope.menuItems[menu].isOpen = false; 
                                    menuControllerScope.menuItems[menu].isSelected = false; 
                                    if(menuControllerScope.menuItems[menu].url=="/dashboard"){
                                        menuControllerScope.menuItems[menu].isSelected = true; 
                                    }
                                } else if (menuControllerScope.menuItems[menu].submenu.length > 0) {
                                	
                                	for(var submenu in menuControllerScope.menuItems[menu].submenu){
	                                	if(menuControllerScope.menuItems[menu].submenu[submenu].subSubMenu.length > 0){

                                    		if(menuControllerScope.roleMenu[role].submenu == menuControllerScope.menuItems[menu].submenu[submenu].id){
		                                		menuControllerScope.menuItems[menu].submenu[submenu].isChecked = true;
		                                		menuControllerScope.menuItems[menu].submenu[submenu].isOpen = false;
		                                		menuControllerScope.menuItems[menu].submenu[submenu].isSelected = false;
                                    		}else if(menuControllerScope.menuItems[menu].submenu[submenu].subSubMenu.length > 0){
	
		                                    	for(var subSubMenu in menuControllerScope.menuItems[menu].submenu[submenu].subSubMenu){
		                                    		menuControllerScope.menuItems[menu].submenu[submenu].subSubMenu[subSubMenu].isSelected = false;
		                                    		if(menuControllerScope.roleMenu[role].submenu == menuControllerScope.menuItems[menu].submenu[submenu].subSubMenu[subSubMenu].id){
		                                    			menuControllerScope.menuItems[menu].submenu[submenu].subSubMenu[subSubMenu].isChecked = true;
		                                    		}
		                                    	}
	                                    	
                                    		}
	                                		
	                                	}else{
	                                		if(menuControllerScope.menuItems[menu].submenu[submenu].id == menuControllerScope.roleMenu[role].submenu){
	                                			menuControllerScope.menuItems[menu].submenu[submenu].isChecked = true;
	                                			menuControllerScope.menuItems[menu].submenu[submenu].isOpen = false;
	                                			menuControllerScope.menuItems[menu].submenu[submenu].isSelected = false;
	                                		}
	                                	}
                                	}
                                }
                                
                            }
                        }
                        
                        $rootScope.tempMenus = menuControllerScope.menuItems;
                         menuControllerScope.spinner = false;
                    }
                    
                } else {
                	  menuControllerScope.spinner = false;
                }
            }, function(err) {
                menuControllerScope.spinner = false;
            });
        }
    }
  
    function getRole() {
        if ($localStorage.spheresuite && $localStorage.spheresuite.roleId) {
            menuControllerScope.spinner = true;
            rolesService.getRole($localStorage.spheresuite.roleId).then(function(res) {
                if (res.successflag == 'true' && res.results.length > 0) {
                    menuControllerScope.roleMenu = res.results[0].menu;
                    menuControllerScope.spinner = false;
                    getMenus();
                } else {
                    menuControllerScope.spinner = false;
                }
            }, function(err) { 
                menuControllerScope.spinner = false;

            });
    	}else{
    		delete $localStorage.spheresuite;
        	$rootScope.tempMenus = null;
        	$location.path('/')
    	}
     }

   
    
    

    function goToUri(main, subMain, uri, type, event) {
    	closeMenu(main, subMain, uri, type);
    	if(type == "subSubmenu"){
    		event.stopPropagation();
			uri.isSelected = !uri.isSelected;   		
    		reRoute(uri.url);
    	}else if(type == 'submenu'){
    		event.stopPropagation();
    		if(uri.subSubMenu && uri.subSubMenu.length > 0){
    			uri.isOpen = !uri.isOpen;
    		}else{
    			uri.isSelected = !uri.isSelected;  
        		reRoute(uri.url);
    		}
    	} else if(type == 'menu'){
    		if(uri.submenu && uri.submenu.length > 0){
    			
				uri.isOpen = !uri.isOpen;
    		}else {
    			uri.isSelected = !uri.isSelected;  
        		reRoute( uri.url);
    		}
    	}       
    }
    
    
    function closeMenu(main, subMain, uri, type){
    	for (var menu in menuControllerScope.menuItems) {
            if (menuControllerScope.menuItems[menu].submenu.length > 0) {
            	for(var subMenu in menuControllerScope.menuItems[menu].submenu){
            		if(menuControllerScope.menuItems[menu].submenu[subMenu].subSubMenu.length > 0){
            			
            			if(subMain != menuControllerScope.menuItems[menu].submenu[subMenu].id){
            				menuControllerScope.menuItems[menu].submenu[subMenu].isOpen = false;
            			}			

                    	for(var subSubMenu in menuControllerScope.menuItems[menu].submenu[subMenu].subSubMenu){
                    		menuControllerScope.menuItems[menu].submenu[subMenu].subSubMenu[subSubMenu].isSelected = false;
                    	}
            			
            		}
    				menuControllerScope.menuItems[menu].submenu[subMenu].isSelected = false;
            	}
            	if(main != menuControllerScope.menuItems[menu].id){
            		menuControllerScope.menuItems[menu].isOpen = false;
            	}
            }
    		menuControllerScope.menuItems[menu].isSelected = false;
        }
    }
    
    function reRoute(url){
    	if(url){
    		$location.path(url);
    	}
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   /* function goToUri(uri) {
       for (var menu in menuControllerScope.menuItems) {
           if (menuControllerScope.menuItems[menu].submenu.length > 0 && uri.id != menuControllerScope.menuItems[menu].id) {
               menuControllerScope.menuItems[menu].isOpen = false;
           }
       }
   	if(uri.url == $location.path() && (!uri.submenu || uri.submenu.length == 0) && uri.url != '/mailbox'){
   	$route.reload();
   	}else {
       if (uri.isOpen) {
           uri.isOpen = false;
       } else if (uri.submenu && uri.submenu.length > 0) {
           uri.isOpen = true;
       } else {
       	menuControllerScope.menuItems = angular.copy($rootScope.tempMenus);
           $location.path(uri.url);
       }
       }
   }*/
    
    
    
/*    function goToUri(uri,type,event) {    	
    	if(type != 'submenu' && type != 'subSubmenu'){
	    	for (var menu in menuControllerScope.menuItems) {
            	menuControllerScope.menuItems[menu].isSelected = false;
    			if(menuControllerScope.menuItems[menu].url == uri.url){
	            	menuControllerScope.menuItems[menu].isSelected = true;
    			}
	            if (menuControllerScope.menuItems[menu].submenu.length > 0 && uri.id != menuControllerScope.menuItems[menu].id) {
	            	for(var subMenu in menuControllerScope.menuItems[menu].submenu){
	            		if(menuControllerScope.menuItems[menu].submenu[subMenu].subSubMenu.length > 0 && uri.id != menuControllerScope.menuItems[menu].submenu[subMenu].id){
	            			menuControllerScope.menuItems[menu].submenu[subMenu].isOpen = false;
	            			if(menuControllerScope.menuItems[menu].url == uri.url){
	        	            	menuControllerScope.menuItems[menu].isSelected = true;
	            			}
	            		}
	            	}
	            	menuControllerScope.menuItems[menu].isOpen = false;
	            }
	        }
    	}
    	if(type == "subSubmenu"){
    		event.stopPropagation();    		
    		reRoute(uri.url);
    	}else if(type == 'submenu'){
    		event.stopPropagation();
    		if(uri.subSubMenu && uri.subSubMenu.length > 0){

    			for(var i in uri.subSubMenu){
    				if(uri.subSubMenu[i].isOpen){
    					uri.subSubMenu[i].isOpen = false;
    				}
    			}
    			uri.isOpen = !uri.isOpen;
    		}else{
        		reRoute(uri.url);
    		}
    	} else if(type == 'menu'){
    		if(uri.submenu && uri.submenu.length > 0){
    			for(var i in uri.submenu){
    				if(uri.submenu[i].isOpen){
    					uri.submenu[i].isOpen = false;
    				}
    			}
				uri.isOpen = !uri.isOpen
    		}else {
        		reRoute(uri.url);
    		}
    	}
       
    }
    
    function reRoute(url){
    	if(url){
    		for (var menu in menuControllerScope.menuItems) {
	            if (menuControllerScope.menuItems[menu].submenu.length > 0) {
	            	for(var subMenu in menuControllerScope.menuItems[menu].submenu){
	            		if(menuControllerScope.menuItems[menu].submenu[subMenu].subSubMenu.length > 0){
	            			menuControllerScope.menuItems[menu].submenu[subMenu].isOpen = false;
	            		}
	            	}
	            	menuControllerScope.menuItems[menu].isOpen = false;
	            }
	        }
    		$location.path(url);
    	}
    }*/
    
    function checkForAccess(){
    	if($localStorage.spheresuite){
    		if($localStorage.spheresuite.token){
    	var browserUrl = $location.url();
    	  outer_loop: for (var i = 0; i < $rootScope.tempMenus.length; i++) {
          if ($rootScope.tempMenus[i].url == browserUrl) {
                 if ($rootScope.tempMenus[i].isChecked) {
                     authorizedUser = true;
                     break outer_loop;
                 } else {
                     authorizedUser = false;
                     break outer_loop;
                 }
             }
             if ($rootScope.tempMenus[i].submenu) {
                 for (var j = 0; j < $rootScope.tempMenus[i].submenu.length; j++) {

                     if ($rootScope.tempMenus[i].submenu[j].url == browserUrl) {
                         if ($rootScope.tempMenus[i].submenu[j].isChecked) {
                             authorizedUser = true;
                             break outer_loop;
                         } else {
                             authorizedUser = false;
                             break outer_loop;
                         }

                     }
                 }
             }
         }
        if (!authorizedUser) {
        	delete $localStorage.spheresuite;
        	$rootScope.tempMenus = null;
        	$location.path('/login');
         }
    		}
    	}else{
    		delete $localStorage.spheresuite;
        	$rootScope.tempMenus = null;
        	$location.path('/login');
    	}
    }
    
}