angular
    .module('spheresuite')
    .controller('mailBoxController', mailBoxController);

mailBoxController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', 'emailService'];

function mailBoxController($scope, $rootScope, $location, $localStorage, emailService) {
    var mailBoxControllerScope = this;
	
    $rootScope.headerMenu = "Mailbox";
    
    mailBoxControllerScope.checkbox = false;
    mailBoxControllerScope.divValue = 'Inbox';
	mailBoxControllerScope.isSelectProvider = true;
    mailBoxControllerScope.isShowMail = false;
    mailBoxControllerScope.spinner = false;

    mailBoxControllerScope.currentMailIndex = 0;
    mailBoxControllerScope.inboxList = [];
    mailBoxControllerScope.loginData;
    mailBoxControllerScope.loginForm;
    mailBoxControllerScope.mail;
    mailBoxControllerScope.mailIndex = 1;
    mailBoxControllerScope.mailList = [];
    mailBoxControllerScope.mailOfCount = 0;
    mailBoxControllerScope.mailToShowCount = 10;
    mailBoxControllerScope.msg;
    mailBoxControllerScope.sentmailList = [];    
    mailBoxControllerScope.inbox;
    mailBoxControllerScope.sentmail;
    
    mailBoxControllerScope.changeDiv = changeDiv;
    mailBoxControllerScope.decline = decline;
    mailBoxControllerScope.emailLogin = emailLogin;
    mailBoxControllerScope.getInbox = getInbox;
    mailBoxControllerScope.getMails = getMails;
    mailBoxControllerScope.getNextMail = getNextMail;
    mailBoxControllerScope.getNextMailSet = getNextMailSet;
    mailBoxControllerScope.getPrevMail = getPrevMail;
    mailBoxControllerScope.getPrevMailSet = getPrevMailSet;
    mailBoxControllerScope.getSentmail = getSentmail;
    mailBoxControllerScope.isEnterKeyPressed = isEnterKeyPressed;
    mailBoxControllerScope.logout = logout;
    mailBoxControllerScope.selectProvider = selectProvider;
    mailBoxControllerScope.showMail = showMail;
    mailBoxControllerScope.showMailList = showMailList;
    mailBoxControllerScope.toggleCheck = toggleCheck;
    
    if($location.path() == '/mailbox' && $localStorage.spheresuite && $localStorage.spheresuite.id){
    	getInbox($localStorage.spheresuite.id);
    }

    function changeDiv(selectedDiv) {
    	mailBoxControllerScope.mailList = [];
        if (selectedDiv == 'Inbox') {
        	mailBoxControllerScope.divValue = 'Inbox';
            mailBoxControllerScope.isShowMail = false;
        	if(!mailBoxControllerScope.inboxList || mailBoxControllerScope.inboxList.length == 0){
        		getInbox($localStorage.spheresuite.id);
        	}else{
        		mailBoxControllerScope.mailList = angular.copy(mailBoxControllerScope.inboxList);
        	}
        } else if (selectedDiv == 'Sent Mail') {
        	mailBoxControllerScope.divValue = 'Sent Mail';
            mailBoxControllerScope.isShowMail = false;
        	if(!mailBoxControllerScope.sentmailList || mailBoxControllerScope.sentmailList.length == 0){
        		getSentmail($localStorage.spheresuite.id);
        	}else{
        		mailBoxControllerScope.mailList = angular.copy(mailBoxControllerScope.sentmailList);
        	}
        }
		mailBoxControllerScope.currentMailIndex = 0;
		if(mailBoxControllerScope.mailList.length > mailBoxControllerScope.mailToShowCount)
			mailBoxControllerScope.mailOfCount = angular.copy(mailBoxControllerScope.mailToShowCount);
		else
			mailBoxControllerScope.mailOfCount = mailBoxControllerScope.mailList.length;
	}
    
    function emailLogin(){
    	if(mailBoxControllerScope.loginData && mailBoxControllerScope.loginData.type){
            mailBoxControllerScope.spinner = true;
    		mailBoxControllerScope.loginData.id = $localStorage.spheresuite.id;
    		emailService.emailLogin(mailBoxControllerScope.loginData).then(function(res){
    			if(res.successflag == 'true'){
			    	$rootScope.configuremail = true;
    				$location.path('/mailbox');
    			}else{
			    	$rootScope.configuremail = false;
    			}
    			mailBoxControllerScope.spinner = false;
    		},function(err){
		    	$rootScope.configuremail = false;
		        mailBoxControllerScope.spinner = false;
    		});
    	}
    }
    
    function decline(){
    	mailBoxControllerScope.loginData = null;
        mailBoxControllerScope.isSelectProvider = true;
        if(mailBoxControllerScope.loginForm){
        	mailBoxControllerScope.loginForm.$setPristine();
        	mailBoxControllerScope.loginForm.$setUntouched();
        }
    }
    
    function getInbox(data){
        mailBoxControllerScope.spinner = true;
        mailBoxControllerScope.msg = '';
    	emailService.getInbox(data).then(function(res){
    		console.log("get mail",res)
    		if(res && res.successflag == 'true' && res.results.length > 0){
    			mailBoxControllerScope.inboxList = angular.copy(res.results);
    			angular.forEach(mailBoxControllerScope.inboxList,function(val){
    				val.name = val.address.substring(0,val.address.indexOf(' <'));
    				val.isChecked = mailBoxControllerScope.checkbox;    				

//    			    if(val.attachFile != ''){
//    			    	var contentType = val.contentType.substring(0, val.contentType.indexOf(';') + 1);
//    			    	val.ext = val.contentType.substring(0, contentType.indexOf('/'));
//    			    	val.attachedFile = 'data:' + contentType + 'base64,' + val.attachment;
//    			    	delete val['attachment'];
//    			    	delete val['contentType'];
//    			    }
    				
    			});
    			mailBoxControllerScope.currentMailIndex = 0;
    	    	if(mailBoxControllerScope.divValue == 'Inbox'){
    	    		mailBoxControllerScope.mailList =  angular.copy(mailBoxControllerScope.inboxList);
    	    	}
    			if(mailBoxControllerScope.inboxList.length > mailBoxControllerScope.mailToShowCount){
    				mailBoxControllerScope.mailOfCount = angular.copy(mailBoxControllerScope.mailToShowCount);
    			}
    			else{
    				mailBoxControllerScope.mailOfCount = mailBoxControllerScope.inboxList.length;
    			}
        	    mailBoxControllerScope.spinner = false;
    		}else{
    		    mailBoxControllerScope.msg = "Mails Not Available";
        		mailBoxControllerScope.mailOfCount = 0;
        	    mailBoxControllerScope.spinner = false;
    		}
    	},function(err){
		    mailBoxControllerScope.msg = "Mails Not Available";
			mailBoxControllerScope.mailOfCount = 0;
    	    mailBoxControllerScope.spinner = false;
    	});
    }
    
    function getMails(){
    	if(mailBoxControllerScope.divValue == 'Inbox'){
    		getInbox($localStorage.spheresuite.id);
    	}else if(mailBoxControllerScope.divValue == 'Sent Mail'){
        	getSentmail($localStorage.spheresuite.id);
        }
    }
    
   function getSentmail(data){
        mailBoxControllerScope.spinner = true;
        mailBoxControllerScope.msg = '';
    	emailService.getSentmail(data).then(function(res){
    		if(res.successflag == 'true' && res.results.length > 0){
    			mailBoxControllerScope.sentmailList = angular.copy(res.results);
    			angular.forEach(mailBoxControllerScope.sentmailList,function(val){
    				val.name = val.to.substring(0,val.to.indexOf(' <'));
    				val.isChecked = mailBoxControllerScope.checkbox; 				

    			    if(val.attachFile != ''){
    			    	var contentType = val.contentType.substring(0, val.contentType.indexOf(';') + 1);
    			    	val.ext = val.contentType.substring(0, contentType.indexOf('/'));
    			    	val.attachedFile = 'data:' + contentType + 'base64,' + val.attachment;
    			    	delete val['attachment'];
    			    	delete val['contentType'];
    			    }
    				
    			});
    			mailBoxControllerScope.currentMailIndex = 0;
    	    	if(mailBoxControllerScope.divValue == 'Sent Mail'){
    	    		mailBoxControllerScope.mailList = angular.copy(mailBoxControllerScope.sentmailList);
    	    	}
    			if(mailBoxControllerScope.sentmailList.length > mailBoxControllerScope.mailToShowCount){
    				mailBoxControllerScope.mailOfCount = angular.copy(mailBoxControllerScope.mailToShowCount);
    			}
    			else{
    				mailBoxControllerScope.mailOfCount = mailBoxControllerScope.sentmailList.length;
    			}
        	    mailBoxControllerScope.spinner = false;
    		}else {
    		    mailBoxControllerScope.msg = "Sent Mails Not Available";
        		mailBoxControllerScope.mailOfCount = 0;
        	    mailBoxControllerScope.spinner = false;
    		}
    	},function(err){
		    mailBoxControllerScope.msg = "Sent Mails Not Available";
    		mailBoxControllerScope.mailOfCount = 0;
    	    mailBoxControllerScope.spinner = false;
    	});
    }  

    function getNextMail(type){
        mailBoxControllerScope.spinner = true;
		if(mailBoxControllerScope.mailList.length > 0){
			showMail(mailBoxControllerScope.mailList[mailBoxControllerScope.mailIndex + 1], mailBoxControllerScope.mailIndex + 1);
			if(mailBoxControllerScope.mailIndex == mailBoxControllerScope.mailOfCount){
				getNextMailSet(type);
			}
		}
        mailBoxControllerScope.spinner = false; 
    }

    function getNextMailSet(){
        mailBoxControllerScope.spinner = true; 
    	if((mailBoxControllerScope.mailOfCount < mailBoxControllerScope.mailList.length) && !mailBoxControllerScope.isShowMail){
	    	if((mailBoxControllerScope.mailOfCount + mailBoxControllerScope.mailToShowCount) <= mailBoxControllerScope.mailList.length){
		    	mailBoxControllerScope.mailOfCount += mailBoxControllerScope.mailToShowCount;
	    	}else {
		    	mailBoxControllerScope.mailOfCount = mailBoxControllerScope.mailList.length;
		    }
	    	mailBoxControllerScope.currentMailIndex += mailBoxControllerScope.mailToShowCount;
    	}
        mailBoxControllerScope.spinner = false; 
    }
    
    
    function getPrevMail(type){
        mailBoxControllerScope.spinner = true;
		if(mailBoxControllerScope.mailList.length > 0){
			showMail(mailBoxControllerScope.mailList[mailBoxControllerScope.mailIndex - 1],mailBoxControllerScope.mailIndex - 1); 
			if(mailBoxControllerScope.mailIndex == mailBoxControllerScope.mailOfCount){
				getPrevMailSet(type);
			}
		}
        mailBoxControllerScope.spinner = false; 
    }
    
    function getPrevMailSet(){
        mailBoxControllerScope.spinner = true;
    	if((mailBoxControllerScope.currentMailIndex - mailBoxControllerScope.mailToShowCount) >= 0){
		    if(!mailBoxControllerScope.isShowMail && (mailBoxControllerScope.mailOfCount > mailBoxControllerScope.mailToShowCount) && (mailBoxControllerScope.mailOfCount %  mailBoxControllerScope.mailToShowCount) == 0){
	        	mailBoxControllerScope.mailOfCount -= mailBoxControllerScope.mailToShowCount;
	        }else{
	        	mailBoxControllerScope.mailOfCount -= mailBoxControllerScope.mailOfCount %  mailBoxControllerScope.mailToShowCount;
	        }
	    	mailBoxControllerScope.currentMailIndex -= mailBoxControllerScope.mailToShowCount;
        }
        mailBoxControllerScope.spinner = false; 
    }
    
    function isEnterKeyPressed(keyCode){
    	if(keyCode && keyCode == 13){
    		if(mailBoxControllerScope.loginData && mailBoxControllerScope.loginData.email && mailBoxControllerScope.loginData.password && keyCode){
    			emailLogin();
        	}
    	}
    }
    
    function logout(){
    	if($localStorage.spheresuite && $localStorage.spheresuite.id){
	        mailBoxControllerScope.spinner = true;
			emailService.emailLogout($localStorage.spheresuite.id).then(function(res){
		        mailBoxControllerScope.spinner = true;
				if(res.successflag == 'true'){
			    	$rootScope.configuremail = false;
					$location.path('/mailbox/configuremail');
				}
			},function(err){
		        mailBoxControllerScope.spinner = true;
			});
		}
    }
    
    function selectProvider(provider){
    	if(provider){
    		mailBoxControllerScope.loginData = {type: provider};
    		mailBoxControllerScope.isSelectProvider = false;
    	}
    }

    function showMail(uid, index){
    	if(uid && (index || index === 0)){
            mailBoxControllerScope.spinner = true;
            var data = {
            		empId: $localStorage.spheresuite.id,
            		id: uid
            }
            emailService.getSingleMail(data).then(function(res){
            	console.log('getSingleMail res',res)
            	if(res.successflag == 'true' && res.results.length > 0){
	    		    mailBoxControllerScope.mail = res.results[0];
	    		    if(mailBoxControllerScope.mail.attachFile != ''){
    			    	var contentType = mailBoxControllerScope.mail.contentType.substring(0, mailBoxControllerScope.mail.contentType.indexOf(';') + 1);
    			    	mailBoxControllerScope.mail.ext = mailBoxControllerScope.mail.contentType.substring(0, contentType.indexOf('/'));
    			    	mailBoxControllerScope.mail.attachedFile = 'data:' + contentType + 'base64,' + mailBoxControllerScope.mail.attachment;
//    			    	delete val['attachment'];
//    			    	delete val['contentType'];
    			    }
	    		    if(mailBoxControllerScope.isShowMail){
	    		    	mailBoxControllerScope.mailIndex = (mailBoxControllerScope.currentMailIndex) + index;
	    		    }else{
	    		    	mailBoxControllerScope.mailIndex = (mailBoxControllerScope.currentMailIndex - 1) + index;		    	
	    		    }
	    	    	mailBoxControllerScope.isShowMail = true;
            	}
    	        mailBoxControllerScope.spinner = false;
            },function(err){
    	        mailBoxControllerScope.spinner = false;
            	
            });    
    	}
    }
    
    function showMailList(){
    	mailBoxControllerScope.isShowMail = false;
    }
    
    function toggleCheck(type){
		angular.forEach(mailBoxControllerScope.mailList,function(val, key){
			if(mailBoxControllerScope.currentMailIndex <= key && mailBoxControllerScope.mailOfCount >= key)
				val.isChecked = mailBoxControllerScope.checkbox;
		});
    }
}  