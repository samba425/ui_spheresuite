angular
    .module('spheresuite')
    .controller('changePasswordController', changePasswordController);

changePasswordController.$inject = ['$scope','$rootScope', '$routeParams', '$location', 'userService'];

function changePasswordController($scope,$rootScope, $routeParams, $location, userService) {

	$rootScope.headerMenu='';
    var changePasswordControllerScope = this;

    changePasswordControllerScope.showTempPassField = true;
    changePasswordControllerScope.spinner = false;
    changePasswordControllerScope.isTypeIsNew = true;
    changePasswordControllerScope.urlParams;
    changePasswordControllerScope.successMsg;
    changePasswordControllerScope.resetForm;
    
    changePasswordControllerScope.goTologin = goTologin;
    changePasswordControllerScope.keyPress = keyPress;
    changePasswordControllerScope.resetPassword = resetPassword;

    if ($routeParams.temppassword && $routeParams.email && $routeParams.type) {
        changePasswordControllerScope.urlParams = {
            temppassword: $routeParams.temppassword,
            email: $routeParams.email
        }
        if ($routeParams.type == 'F')
            changePasswordControllerScope.isTypeIsNew = false;
        if ($routeParams.temppassword)
            changePasswordControllerScope.showTempPassField = false;
    } else changePasswordControllerScope.urlParams = null;

    function goTologin(){
        $location.path('/login');
    }
    
    function keyPress(code){
    	if(code && code == 13 && $scope.confirmpassword == changePasswordControllerScope.urlParams.newpassword){
    		resetPassword();
    	}
    }
    
    function resetPassword() {
        if (changePasswordControllerScope.urlParams &&  changePasswordControllerScope.confirmpassword == changePasswordControllerScope.urlParams.newpassword) {
            changePasswordControllerScope.spinner = true;
            userService.resetPassword(changePasswordControllerScope.urlParams).then(function(res) {
                if (res.successflag === "true") {
                    changePasswordControllerScope.urlParams = null;
                    changePasswordControllerScope.spinner = false;
                    changePasswordControllerScope.successMsg = 'Your password have been changed successfully, Kindly login';
                }
                changePasswordControllerScope.spinner = false;
            }, function(err) {
                changePasswordControllerScope.spinner = false;
            });
        }
    }


}