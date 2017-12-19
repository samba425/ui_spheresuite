angular
    .module('spheresuite')
    .service('emailService', emailService);

emailService.$inject = ['constants', 'commonService'];

function emailService(constants, commonService) {

    var emailServiceMethods = {
    		emailLogin: emailLogin,
    		emailLogout: emailLogout,
    		getInbox: getInbox,
    		getSentmail: getSentmail,
    		getSingleMail: getSingleMail
    }
    return emailServiceMethods;

    function emailLogin(data){
    	if(data){
            return commonService.apiCall(constants.emailLogin, data);    		
    	}
    }
    
    function emailLogout(data){
    	if(data){
    		data = {id: data};
            return commonService.apiCall(constants.emailLogout, data);    		
    	}
    }

    function getInbox(data){
    	if(!data){
    		return commonService.httpCallGetAll(constants.emailRetrieveInbox);
    	}else {
    		data = {id: data}
    		return commonService.apiCall(constants.emailRetrieveInbox, data);
    	}
    }

    function getSentmail(data){
    	if(!data){
    		return commonService.httpCallGetAll(constants.emailRetrieveSent);
    	}else{
    		data = {id: data};
    		return commonService.apiCall(constants.emailRetrieveSent, data);
    	}
    }
    
    function getSingleMail(data){
		return commonService.apiCall(constants.emailRetrieveMessage, data);
    }
}
