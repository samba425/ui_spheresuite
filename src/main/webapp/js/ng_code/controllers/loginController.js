angular
    .module('spheresuite')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', '$routeParams', 'userService'];

function loginController($scope, $rootScope, $location, $localStorage, $routeParams, userService) {


	$rootScope.headerMenu='';
	
    var loginControllerScope = this;

    loginControllerScope.isWrongCredential = false;
    loginControllerScope.loginDiv = true;
    loginControllerScope.resetPasswordDiv = false;
    loginControllerScope.spinner = false;
    loginControllerScope.isPasswordSent = false;

    loginControllerScope.email;
    loginControllerScope.loginForm;
    loginControllerScope.sendPasswordForm;

    loginControllerScope.clearErrorMsg = clearErrorMsg;
    loginControllerScope.keyPress = keyPress;
    loginControllerScope.login = login;
    loginControllerScope.showForgotPassword = showForgotPassword;
    loginControllerScope.sendPassword = sendPassword;
    


    function clearErrorMsg() {
        loginControllerScope.isWrongCredential = false;
        loginControllerScope.isPasswordSent = false;
    }
    
    function keyPress(code, fun){
    	if(code && code == 13){
    		if(fun == 'reset'){
    			sendPassword();
    		}else if(fun == 'login'){
    			login();
    		}
    	}
    }

    function login() {
    	clearErrorMsg();
        loginControllerScope.spinner = true;
        if (!loginControllerScope.user) {
            loginControllerScope.isWrongCredential = true;
            loginControllerScope.spinner = false;
            loginControllerScope.msg = 'Kindly Enter Email & Password';
        } else if (!loginControllerScope.user.email || loginControllerScope.user.email == '') {
            loginControllerScope.isWrongCredential = true;
			loginControllerScope.msg= 'Kindly Enter Email';
    		loginControllerScope.spinner = false;
    	} else if (!loginControllerScope.user.password || loginControllerScope.user.password == '') {
            loginControllerScope.isWrongCredential = true;
			loginControllerScope.msg= 'Kindly Enter Password';
    		loginControllerScope.spinner = false;
    	} else if(loginControllerScope.user.email && loginControllerScope.user.password){
    		loginControllerScope.spinner = true;
    		userService.login(loginControllerScope.user).then(function(res){
    			if(res.successflag === 'true' &&  res.results.length > 0 ){
    				var params;
    				if($localStorage.approveOffer && $localStorage.approveOffer.empId && $localStorage.approveOffer.offerId){
    					params = $localStorage.approveOffer;
    					delete $localStorage.approveOffer;
    				}
    		    	$localStorage.spheresuite = angular.copy(res.results[0]);
    		    	$localStorage.spheresuite.token =  res.token; 
    	        	delete $localStorage.spheresuite['menu'];
    	        	if (params){
    	        		$location.path('/offer/edit/'+params.empId+'/'+params.empId);
    	        	}else{
    	        		setTimeout(function(){ 
            				loginControllerScope.spinner = false; 
    	        		},1000)
    	        		$location.path('/dashboard');
    	        	}
    			}
    			else{
    			    loginControllerScope.isWrongCredential = true;
    				loginControllerScope.msg= 'Invalid Username / Password';
    				loginControllerScope.spinner = false;
    			}
    		},function(err){
    			loginControllerScope.spinner = false;
    		});
    	}
    }

    function showForgotPassword(val) {
        loginControllerScope.spinner = true;
        if (!val) {
            val = false;
            clearErrorMsg();
        }
        loginControllerScope.loginDiv = val;
        loginControllerScope.resetPasswordSuccessMsgDiv = val;
        loginControllerScope.resetPasswordDiv = !val;
        loginControllerScope.spinner = false;
    }

    function sendPassword() {
        if (loginControllerScope.email) {
            loginControllerScope.spinner = true;
            userService.sendPassword({ email: loginControllerScope.email }).then(function(res) {
                if (res.successflag === 'true') {
                	loginControllerScope.sendPasswordForm.$setPristine();
                	loginControllerScope.sendPasswordForm.$setUntouched();
                    loginControllerScope.isWrongCredential = true;
                    loginControllerScope.isPasswordSent = true;
                    loginControllerScope.msg = 'Password Has Been Sent To Your Registred Email';
                    showForgotPassword(true);
                    loginControllerScope.spinner = false;
                } else {
                    loginControllerScope.isWrongCredential = true;
                    loginControllerScope.msg = res.errors;
                    loginControllerScope.spinner = false;
                }
            }, function(err) {
                loginControllerScope.spinner = false;
            });
        } else {
            loginControllerScope.isWrongCredential = true;
            loginControllerScope.msg = 'Invalid Email';
        }
    }
}