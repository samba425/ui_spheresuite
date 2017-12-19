angular
    .module('spheresuite')
    .controller('headerController', headerController);

headerController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', 'employeeService', 'companyInformationService'];

function headerController($scope, $rootScope, $location, $localStorage, employeeService, companyInformationService) {

 
    var headerControllerScope = this;
        
    headerControllerScope.isPhotoAvailable = false;

    if(!$rootScope.companyIcon){
    	$rootScope.companyIcon = '';
    }
    if(!$rootScope.companyLogo){
    	$rootScope.companyLogo = '';
    }
    headerControllerScope.userName;
	headerControllerScope.photo; 
    headerControllerScope.closeMenu = closeMenu;
    headerControllerScope.logout = logout;


    if ($localStorage.spheresuite && $localStorage.spheresuite.name != "" && $localStorage.spheresuite.id != ""){
        headerControllerScope.isPhotoAvailable = false;
    	headerControllerScope.userName = $localStorage.spheresuite.name;
	    	employeeService.getEmployee($localStorage.spheresuite.id).then(function(res) {
	            if (res.successflag === 'true' && res.results.length > 0 && res.results[0].photo != '') {
	            	headerControllerScope.photo = res.results[0].photo;
	                }else{
	                    headerControllerScope.isPhotoAvailable = true;
	                }
	        }, function(err) {
	            headerControllerScope.isPhotoAvailable = true;
	        });
	    	if(!$rootScope.companyIcon || $rootScope.companyIcon == '' || !$rootScope.companyLogo || $rootScope.companyLogo == ''){
		    	companyInformationService.getCompanyInformation().then(function(res){
		    		if(res.successflag == 'true' && res.results.length > 0){
		    			if(res.results[0].icon != ''){
		    				$rootScope.companyIcon = res.results[0].icon;
		    			}
		    			if(res.results[0].photo != ''){
		    				$rootScope.companyLogo = res.results[0].photo;
		    			}
		    		}else{
//			    		resetCompanyImage();
		    		}
		    	},function(res){
//		    		resetCompanyImage();
		    	});
	    	}else{
//	    		resetCompanyImage();
	    	}
    }
    
    function resetCompanyImage(){
		$rootScope.companyIcon = 'images/logo_icon.png';
		$rootScope.companyLogo = 'images/logo.png';    	
    }

    function closeMenu() {
        for (var menu in $rootScope.tempMenus) {
            if ($rootScope.tempMenus[menu].submenu.length > 0) {
            	for(var subMenu in $rootScope.tempMenus[menu].submenu){
            		if($rootScope.tempMenus[menu].submenu[subMenu].subSubMenu.length > 0){
            			$rootScope.tempMenus[menu].submenu[subMenu].isOpen = false;
            		}
            	}
                $rootScope.tempMenus[menu].isOpen = false;
            }
        }
    }

    function logout() {
        delete $localStorage.spheresuite;
        $rootScope.tempMenus = null;
        $location.path('/login');
    }

    $scope.$watch(function() {
        return $rootScope.headerMenu;
    }, function() {
        headerControllerScope.headerMenu = $rootScope.headerMenu;
    })

}