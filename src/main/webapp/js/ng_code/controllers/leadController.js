angular
    .module('spheresuite')
    .controller('leadController', leadController);

leadController.$inject = ['$scope', '$rootScope', '$filter', '$localStorage', '$location', '$timeout', 'leadService','opportunityService', 'configurationService', 'commonService', 'contactService', 'userService', 'Upload', 'constants'];

function leadController($scope, $rootScope, $filter, $localStorage, $location, $timeout, leadService, opportunityService,configurationService, commonService, contactService, userService, Upload, constants) {
    var leadControllerScope = this;

    if ($location.path()=="/leads" || $location.path()=="/lead/add" || $location.path()=="/lead/view" || $location.path()=="/lead/edit" || $location.path()=="/lead/import") {
        $rootScope.headerMenu = "Leads";
        $scope.type = "L";
        leadControllerScope.uri = 'lead';
        leadControllerScope.subMenu = 'Lead';
    } else if ($location.path()=="/customers" || $location.path()=="/customer/add" || $location.path()=="/customer/view" || $location.path()=="/customer/edit" || $location.path()=="/customer/import") {
        $rootScope.headerMenu = "Customers";
        $scope.type = "C";
        leadControllerScope.uri = 'customer';
        leadControllerScope.subMenu = 'Customer';
    } else if ($location.path()=="/vendors" || $location.path()=="/vendor/add" || $location.path()=="/vendor/view" || $location.path()=="/vendor/edit" || $location.path()=="/vendor/import") {
        $rootScope.headerMenu = "Vendor";
        $scope.type = "V";
        leadControllerScope.uri = 'vendor';
        leadControllerScope.subMenu = 'Vendor';
    } else if ($location.path()=="/lead/transfer") {
        $rootScope.headerMenu = "Transfer Lead"; 
        leadControllerScope.subMenu = 'Lead';
        $scope.type = "L";  
    } else if ($location.path()=="/customer/transfer") {
        $rootScope.headerMenu = "Transfer Customer"; 
        leadControllerScope.subMenu = 'Customer';
        $scope.type = "C";
    }

    leadControllerScope.getOppertunity = getOppertunity;
    if($location.path()=="/customer/view" || $location.path()=="/lead/view"){ 
    	getOppertunity();
    	var customerid = $localStorage.spheresuite.leadId; 
        function getOppertunity(customerid) {  
        	opportunityService.getOpportunityByCustomerId($localStorage.spheresuite.leadId).then(function(res) { 
                if (res.successflag == 'true' && res.results.length > 0) {
                    leadControllerScope.OppertunityList = res.results; 
                } else { 
                }
            }, function(err) { 
            });
        }
    }
    $scope.arrowPosition = false;
    
    leadControllerScope.activeUserList;
    leadControllerScope.chooseFileSection = true;
    leadControllerScope.contact;
    leadControllerScope.contactForm;
    leadControllerScope.contactTypeList;
    leadControllerScope.email;
    leadControllerScope.emailForm;
    leadControllerScope.emailList;
    leadControllerScope.leadList;
    leadControllerScope.isErrMsg = false;
    leadControllerScope.format = "YYYY-MM-DD";
    leadControllerScope.hour = [];
    leadControllerScope.isAddLead = true;
    leadControllerScope.isBcc = false;
    leadControllerScope.isCc = false;
    leadControllerScope.isUpdate = false;
    leadControllerScope.isPresent = false;
    leadControllerScope.isLeadTranformFromDate = false;
    leadControllerScope.isLeadTranformToDate = false;
    leadControllerScope.leadContactList;
    leadControllerScope.leadDateCalender = false;
    leadControllerScope.leadForm;
    leadControllerScope.leadIndustryList;
    leadControllerScope.leadStatusList;
    leadControllerScope.leadList;
    leadControllerScope.leadListByEmp;
    leadControllerScope.leadType;
    leadControllerScope.leadTypeList;
    leadControllerScope.logActivity = { date : moment().format('YYYY-MM-DD'), hour: moment().format('HH'), min: moment().format('mm')};
    leadControllerScope.logActivityForm;
    leadControllerScope.logActivityList;
    leadControllerScope.min = [];
    leadControllerScope.note;
    leadControllerScope.noteForm;
    leadControllerScope.noteList;
    leadControllerScope.salutationList;
    leadControllerScope.searchByEmployeeName;
    leadControllerScope.searchByLeadName;
    leadControllerScope.selectedLeadType;
    leadControllerScope.schedule = { date : moment().format('YYYY-MM-DD'), hour: moment().format('HH'), min: moment().format('mm') };
    leadControllerScope.scheduleForm;
    leadControllerScope.scheduleList;
    leadControllerScope.task = { date: moment().format('YYYY-MM-DD'), hour: moment().format('HH'), min: moment().format('mm') };
    leadControllerScope.taskForm;
    leadControllerScope.taskList;
    leadControllerScope.transfer;
    leadControllerScope.transferForm;
    leadControllerScope.transferLeadList;
    leadControllerScope.convertAsCustomer;
    leadControllerScope.convertAsCustomerForm;

    leadControllerScope.addAttendee = addAttendee;
    leadControllerScope.addLogActivity = addLogActivity;
    leadControllerScope.addNote = addNote;
    leadControllerScope.addTask = addTask;
    leadControllerScope.addSchedule = addSchedule;
    leadControllerScope.arrowRotate = arrowRotate;
    leadControllerScope.checkTransferLeadFromAndTo = checkTransferLeadFromAndTo;
    leadControllerScope.createLead = createLead;
    leadControllerScope.convertCustomer = convertCustomer;
    leadControllerScope.editLead = editLead;
    leadControllerScope.decline = decline;
    leadControllerScope.declineContact = declineContact;
    leadControllerScope.declineConvertCustomer = declineConvertCustomer;
    leadControllerScope.declineEmail = declineEmail;
    leadControllerScope.declineImport = declineImport;
    leadControllerScope.declineLogActivity = declineLogActivity;
    leadControllerScope.declineNote = declineNote;
    leadControllerScope.declineTask = declineTask;
    leadControllerScope.declineTransferLead = declineTransferLead;
    leadControllerScope.declineSchedule = declineSchedule;
    leadControllerScope.emailLink = $rootScope.appUrl + constants.leadEmailRetrieveById;
    leadControllerScope.exportData = exportData;
    leadControllerScope.getActiveUser = getActiveUser;
    leadControllerScope.getEmail = getEmail;
    leadControllerScope.getContactType = getContactType;
    leadControllerScope.getIndustry = getIndustry;
    leadControllerScope.getLead = getLead;
    leadControllerScope.getLeadByEmp = getLeadByEmp;
    leadControllerScope.getLeadContact = getLeadContact;
    leadControllerScope.getLeadStatus = getLeadStatus;
    leadControllerScope.getLeadType = getLeadType;
    leadControllerScope.getLogActivity = getLogActivity;
    leadControllerScope.getNote = getLeadType;
    leadControllerScope.getSalution = getSalution;
    leadControllerScope.getSchedule = getSchedule;
    leadControllerScope.getTask = getTask;
    leadControllerScope.getTransferLead = getTransferLead;
    leadControllerScope.goToEditLead = goToEditLead;
    leadControllerScope.goToImportPage = goToImportPage;
    leadControllerScope.goToViewLeads = goToViewLeads;
    leadControllerScope.goToEditContact =goToEditContact;
    leadControllerScope.goToEditOpportunity =goToEditOpportunity;
    leadControllerScope.importLead = importLead;
    leadControllerScope.leadCalender = leadCalender;
    leadControllerScope.leadDetail = leadDetail;
    leadControllerScope.openTransferFromDate = openTransferFromDate;
    leadControllerScope.openTransferToDate = openTransferToDate;
    leadControllerScope.revokeLeadTransfer = revokeLeadTransfer;
    leadControllerScope.sendEmail = sendEmail;
    leadControllerScope.switchTab = switchTab;
    leadControllerScope.toggleBetweenLeadAndContact = toggleBetweenLeadAndContact;
    leadControllerScope.toggleCc = toggleCc;
    leadControllerScope.toggleBcc = toggleBcc;
    leadControllerScope.transferLead = transferLead;
    leadControllerScope.addMoreItems = addMoreItems; 
    leadControllerScope.updatePic = updatePic;
//    leadControllerScope.updateProfilePic = updateProfilePic;
    leadControllerScope.clearimage =clearimage;
    leadControllerScope.updateTaskStatus =updateTaskStatus;

    
 	function goToEditContact(contactID) {
 		if (contactID) {
 			$localStorage.spheresuite.contactId = contactID;
 			$location.path('/contact/edit');
 		}
 	}
    function goToEditOpportunity(opportunityID) {
        if (opportunityID) {
            $localStorage.spheresuite.opportunityId = opportunityID;
            $location.path('/opportunity/edit');
        }
    }

 	
    if ($localStorage.spheresuite) {
        if ($localStorage.spheresuite.id && (($location.path() != '/lead/view' && $location.path() != '/leads') || ($location.path() != '/vendor/view' && $location.path() != '/vendors') || ($location.path() != '/customer/view' && $location.path() != '/customers'))) {
            getContactType();
            getIndustry();
            getLeadStatus();
            getLeadType();
            getSalution();
        } else if ($location.path() == '/leads' || $location.path() == '/vendors' || $location.path() == '/customers') {
            getLeadType();
            delete $localStorage.spheresuite['leadId'];
        }
    }
    

    if ($localStorage.spheresuite && $localStorage.spheresuite.leadId && $localStorage.spheresuite.leadId != '' && (($location.path() == '/lead/view' || $location.path() == '/lead/edit') || ($location.path() == '/vendor/view' || $location.path() == '/vendor/edit') || ($location.path() == '/customer/view' || $location.path() == '/customer/edit'))) {
        getLead($localStorage.spheresuite.leadId);
        if ($location.path() == '/lead/view' || $location.path() == '/vendor/view' || $location.path() == '/customer/view') {
            getLeadContact($localStorage.spheresuite.leadId);
            getEmail($localStorage.spheresuite.leadId);
            getLogActivity($localStorage.spheresuite.leadId);
            getNote($localStorage.spheresuite.leadId);
            getTask($localStorage.spheresuite.leadId);
            getSchedule($localStorage.spheresuite.leadId);
            timeData()
        } else if ($location.path() == '/lead/edit' || $location.path() == '/vendor/edit' || $location.path() == '/customer/edit') {
            leadControllerScope.isUpdate = true;
        }
    } else if ($location.path()=="/lead/transfer" ||$location.path()=="/customer/transfer") {
        delete $localStorage.spheresuite['leadId'];
        getActiveUser();
//        getLead({ type: $scope.type });
        getTransferLead({ type: $scope.type });
    } else if ($localStorage.spheresuite) {
        delete $localStorage.spheresuite['leadId'];
        if($location.path() != "/lead/import" && $location.path() != "/vendor/import" && $location.path() != "/customer/import"){
        	getLead({ type: $scope.type });
        }
    }

    function timeData(){
	    for(i = 0; i<24; i++){
	    	if(i<10){
	    		leadControllerScope.hour.push('0'+i);
	    	}else {
	    		leadControllerScope.hour.push(i);
	    	}
	    }
	    
	    for(i = 0; i<60; i++){
	    	if(i<10){
	    		leadControllerScope.min.push('0'+i);
	    	}else {
	    		leadControllerScope.min.push(i);
	    	}
	    }
    }

    function addAttendee(attendee) {
        leadControllerScope.spinner = true;
        leadControllerScope.isPresent = false;
        if (attendee && leadControllerScope.schedule && leadControllerScope.schedule.contactList) {
            if (leadControllerScope.schedule.contactList.indexOf(attendee) == -1) {
                leadControllerScope.schedule.contactList.push(attendee);
                leadControllerScope.email = '';
            } else {
                leadControllerScope.isPresent = true;
            }
        } else {
            if (!leadControllerScope.schedule) {
                leadControllerScope.schedule = { contactList: [] };
                leadControllerScope.schedule.contactList.push(attendee);
            } else if (leadControllerScope.schedule && !leadControllerScope.schedule.contactList) {
                leadControllerScope.schedule.contactList = [];
                leadControllerScope.schedule.contactList.push(attendee);
            }
            leadControllerScope.email = '';
        }
        leadControllerScope.spinner = false;
    }

    function addLogActivity() {
        if (leadControllerScope.logActivity && $localStorage.spheresuite && $localStorage.spheresuite.leadId) {
            leadControllerScope.spinner = true;
            commonService.formValNotManditory(leadControllerScope.logActivityForm, leadControllerScope.logActivity).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    data.leadId = $localStorage.spheresuite.leadId;
                    data.time = data.hour + ' : ' + data.min;
                    leadService.addLogActivity(data).then(function(res) {
                        if (res.successflag == 'true') {
                            declineLogActivity();
                            getLogActivity($localStorage.spheresuite.leadId);
                            leadControllerScope.spinner = false;
                        } else {
                            leadControllerScope.spinner = false;
                        }
                    }, function(err) {
                        leadControllerScope.spinner = false;
                    });
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    leadControllerScope.limitToShow = 2;

    function addMoreItems() {
        leadControllerScope.limitToShow += 1;
    }


    function addNote() {
        if (leadControllerScope.note && $localStorage.spheresuite && $localStorage.spheresuite.leadId) {
            leadControllerScope.spinner = true;
            commonService.formValNotManditory(leadControllerScope.noteForm, leadControllerScope.note).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    data.leadId = $localStorage.spheresuite.leadId;
                    leadService.addNote(data).then(function(res) {
                        if (res.successflag == 'true') {
                            declineNote();
                            getNote($localStorage.spheresuite.leadId);
                            leadControllerScope.spinner = false;
                        } else {
                            leadControllerScope.spinner = false;
                        }
                    }, function(err) {
                        leadControllerScope.spinner = false;
                    });
                } else
                    leadControllerScope.spinner = false;
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function addSchedule() {
        if (leadControllerScope.schedule && $localStorage.spheresuite && $localStorage.spheresuite.leadId) {
            leadControllerScope.spinner = true;
            commonService.formValNotManditory(leadControllerScope.scheduleForm, leadControllerScope.schedule).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    data.leadId = $localStorage.spheresuite.leadId;
                    data.time = data.hour + ' : ' + data.min;
                    leadService.addSchedule(data).then(function(res) {
                        if (res.successflag == 'true') {
                            declineSchedule();
                            getSchedule($localStorage.spheresuite.leadId);
                            leadControllerScope.spinner = false;
                        } else {
                            leadControllerScope.spinner = false;
                        }
                    }, function(err) {
                        leadControllerScope.spinner = false;
                    });
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function addTask() {
        if (leadControllerScope.task && $localStorage.spheresuite && $localStorage.spheresuite.leadId) {
            leadControllerScope.spinner = true;
            commonService.formValNotManditory(leadControllerScope.taskForm, leadControllerScope.task).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    data.leadId = $localStorage.spheresuite.leadId;
                    data.time = data.hour + ' : ' + data.min;
                    leadService.addTask(data).then(function(res) {
                        if (res.successflag == 'true') {
                            declineTask();
                            getTask($localStorage.spheresuite.leadId);
                            leadControllerScope.spinner = false;
                        } else {
                            leadControllerScope.spinner = false;
                        }
                    }, function(err) {
                        leadControllerScope.spinner = false;
                    });
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function arrowRotate(arrowPosition) {
        arrowPosition.arrowPosition = !arrowPosition.arrowPosition;
    }
    
    function checkTransferLeadFromAndTo(){
    	if(leadControllerScope.transfer.transferTo && leadControllerScope.transfer.transferFrom){
    		leadControllerScope.isErrMsg = false;
    		if(leadControllerScope.transfer.transferTo == leadControllerScope.transfer.transferFrom){
    			leadControllerScope.isErrMsg = true;
    			return false;
    		}else{
    			return true;
    		}
    	}
    	return false;
    }

    function createLead(isSkip) {
    	  var pic; 
      	if(leadControllerScope.leadphoto && leadControllerScope.leadphoto != ''){
      		console.log("leadControllerScope.leadphoto",leadControllerScope.leadphoto)
      		pic = angular.copy(leadControllerScope.leadphoto);
      		delete leadControllerScope.lead['photo'];
      	}      	
        if (leadControllerScope.lead && $localStorage.spheresuite) {
            leadControllerScope.spinner = true;
            commonService.formValNotManditory(leadControllerScope.leadForm,leadControllerScope.lead).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    if ($location.path() == '/lead/add')
                        data.type = "L";
                    else if ($location.path() == '/customer/add')
                        data.type = "C";
                    else if ($location.path() == '/vendor/add')
                        data.type = "V";

                    if (isSkip) {
                        data.skip = 'yes';
                        leadControllerScope.contact = [];
                    } else {
                        data.skip = 'no';
                    }
                    commonService.formValNotManditory(leadControllerScope.contactForm, leadControllerScope.contact).then(function(data2) {
                        if (data2) {
                            angular.forEach(data2, function(val, key) {
                                data[key] = val;
                            });
                            leadService.addLead(data).then(function(res) {
                                if (res.successflag == 'true') { 
                                	console.log("res i am getting",res)
                                	if(pic)
                                		updatePic(pic,res.results);
                                	else {
                                		   leadControllerScope.spinner = false;
                                           if ($location.path()=="/leads" || $location.path()=="/lead/add" || $location.path()=="/lead/view" || $location.path()=="/lead/edit") {
                                               $location.path('/leads');
                                           } else if ($location.path()=="/customers" || $location.path()=="/customer/add" || $location.path()=="/customer/view" || $location.path()=="/customer/edit") {
                                               $location.path('/customers');
                                           } else if ($location.path()=="/vendors" || $location.path()=="/vendor/add" || $location.path()=="/customer/view" || $location.path()=="/vendor/edit") {
                                               $location.path('/vendors');
                                           }
                                	}
                                 
                                   
                                } else {
                                    leadControllerScope.spinner = false;
                                }
                            }, function(err) {
                                leadControllerScope.spinner = false;
                            });
                        } else {
                            leadControllerScope.spinner = false;
                        }
                    });
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function convertCustomer() {
        if (leadControllerScope.convertAsCustomer && $localStorage.spheresuite && $localStorage.spheresuite.leadId) {
            leadControllerScope.spinner = true;
            leadControllerScope.convertAsCustomer.id = $localStorage.spheresuite.leadId;
            leadService.convertCustomer(leadControllerScope.convertAsCustomer).then(function(res) {
                if (res.successflag == 'true') {
                    $('#convertAsCustomer').modal('hide');
                    declineConvertCustomer();
                    delete $localStorage.spheresuite['leadId'];
                    $timeout(function() {
                        leadControllerScope.spinner = false;
                        $location.path('/customers')
                    }, 1000);

                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }


    function editLead() {
  	  var pic; 
    	if(leadControllerScope.lead.photo && leadControllerScope.lead.photo != ''){
    		console.log("leadControllerScope.leadphoto",leadControllerScope.lead.photo)
    		pic = angular.copy(leadControllerScope.lead.photo);
    		delete leadControllerScope.lead['photo'];
    	} 
        if (leadControllerScope.lead && $localStorage.spheresuite.id && $localStorage.spheresuite.id != '') {
            leadControllerScope.spinner = true;
            leadControllerScope.lead.updatedBy = $localStorage.spheresuite.id;
            leadService.editLead(leadControllerScope.lead).then(function(res) {
            	
                if (res.successflag == 'true') {
                  	if(pic)
                		updatePic(pic,leadControllerScope.lead.id);
                	else {
                		 leadControllerScope.spinner = false;
                         if ($location.path()=="/leads" || $location.path()=="/lead/add" || $location.path()=="/lead/view" || $location.path()=="/lead/edit") {
                             $location.path('/lead/view');
                         } else if ($location.path()=="/customers" || $location.path()=="/customer/add" || $location.path()=="/customer/view" || $location.path()=="/customer/edit") {
                             $location.path('/customer/view');
                         } else if ($location.path()=="/vendors" || $location.path()=="/vendor/add" || $location.path()=="/customer/view" || $location.path()=="/vendor/edit") {
                             $location.path('/vendor/view');
                         }
                	}
                   
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function decline() {
        if ($location.path() == '/lead/edit') {
            $location.path('/lead/view');
        } else if ($location.path() == '/vendor/edit') {
            $location.path('/vendor/view');
        } else if ($location.path() == '/customer/edit') {
            $location.path('/customer/view');
        } else { 
            leadControllerScope.lead = null;
            leadControllerScope.leadType = null;
            leadControllerScope.leadForm.$setPristine();
            leadControllerScope.leadForm.$setUntouched();
            leadControllerScope.selectedLeadType = null;
            leadControllerScope.leadList = null;
            leadControllerScope.isUpdate = false;
            leadControllerScope.isAddLead = true;

            leadControllerScope.leadphoto = "";
        } 
    }

    function declineContact() { 
        leadControllerScope.contact = null;
        leadControllerScope.contactForm.$setPristine();
        leadControllerScope.contactForm.$setUntouched();
    }

    function declineEmail() {
        leadControllerScope.email = null;
        leadControllerScope.emailForm.$setPristine();
        leadControllerScope.emailForm.$setUntouched();
        leadControllerScope.isCc = false;
        leadControllerScope.isBcc = false;
    }
    
    function declineImport(){
    	leadControllerScope.lead = null;
    	leadControllerScope.importForm.$setPristine();
    	leadControllerScope.importForm.$setUntouched();
    }

    function declineLogActivity() {
        leadControllerScope.logActivityForm.$setPristine();
        leadControllerScope.logActivityForm.$setUntouched();
        leadControllerScope.logActivity = { type: '', status: '', date: moment().format('YYYY-MM-DD'), hour:moment().format('HH'), min: moment().format('mm') };
        $("#logActivityLogStatus").val(null).trigger('change.select2');
        $("#logActivityLogType").val(null).trigger('change.select2');
        $("#logActivityHour").val(moment().format('HH')).trigger('change.select2');
        $("#logActivityMin").val(moment().format('mm')).trigger('change.select2');
    }

    function declineNote() {
        leadControllerScope.note = null;
        leadControllerScope.noteForm.$setPristine();
        leadControllerScope.noteForm.$setUntouched();
    }

    function declineTask() {
        leadControllerScope.taskForm.$setPristine();
        leadControllerScope.taskForm.$setUntouched();
        leadControllerScope.task = { date: moment().format('YYYY-MM-DD'), hour:moment().format('HH'), min: moment().format('mm') };
        $("#taskHour").val(moment().format('HH')).trigger('change.select2');
        $("#taskMin").val(moment().format('mm')).trigger('change.select2');
    }
    
    function declineTransferLead(){
    	leadControllerScope.transfer = null;
        leadControllerScope.leadListByEmp = null;
        leadControllerScope.transferForm.$setPristine();
        leadControllerScope.transferForm.$setUntouched();
        $(".select").val(null).trigger('change.select2');
    }
    
    function declineSchedule() {
        leadControllerScope.email = '';
        leadControllerScope.scheduleForm.$setPristine();
        leadControllerScope.scheduleForm.$setUntouched();
        leadControllerScope.schedule =  { date: moment().format('YYYY-MM-DD'), hour:moment().format('HH'), min: moment().format('mm') };
        $("#scheduleHour").val(moment().format('HH')).trigger('change.select2');
        $("#scheduleMin").val(moment().format('mm')).trigger('change.select2');
    }

    function declineConvertCustomer() {
        leadControllerScope.convertAsCustomer = null;
        leadControllerScope.convertAsCustomerForm.$setPristine();
        leadControllerScope.convertAsCustomerForm.$setUntouched();
    }

    function exportData() {
        $scope.fileName = $rootScope.headerMenu;
        $scope.exportData = [];
        // Headers:
        $scope.exportData.push(["Id", "Name", "Industry", "Industry Name", "Type", "Type Name", "Mobile", "Phone", "Email", "Source", "Status", "Status Name", "Address", "Comment", "Updated By", "Updated On"]);
        $scope.Filterdata = leadControllerScope.leadList;

        var firstFiter = $filter('filter')(leadControllerScope.leadList, { leadType: leadControllerScope.leadType });
        $scope.Filterdata = $filter('filter')(firstFiter, leadControllerScope.searchName);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.name, value.industry, value.industryName, value.leadType, value.leadTypeName, value.mobile, value.phone, value.email, value.source, value.status, value.statusName, value.address, value.comment, value.updatedBy, value.updatedon]);
        });

        function datenum(v, date1904) {
            if (date1904) v += 1462;
            var epoch = Date.parse(v);
            return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        };

        function getSheet(data, opts) {
            var ws = {};
            var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
            for (var R = 0; R != data.length; ++R) {
                for (var C = 0; C != data[R].length; ++C) {
                    if (range.s.r > R) range.s.r = R;
                    if (range.s.c > C) range.s.c = C;
                    if (range.e.r < R) range.e.r = R;
                    if (range.e.c < C) range.e.c = C;
                    var cell = { v: data[R][C] };
                    if (cell.v == null) continue;
                    var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                    if (typeof cell.v === 'number') cell.t = 'n';
                    else if (typeof cell.v === 'boolean') cell.t = 'b';
                    else if (cell.v instanceof Date) {
                        cell.t = 'n';
                        cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    } else cell.t = 's';

                    ws[cell_ref] = cell;
                }
            }
            if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            return ws;
        };

        function Workbook() {
            if (!(this instanceof Workbook)) return new Workbook();
            this.SheetNames = [];
            this.Sheets = {};
        }

        var wb = new Workbook(),
            ws = getSheet($scope.exportData);
        /* add worksheet to workbook */
        wb.SheetNames.push($scope.fileName);
        wb.Sheets[$scope.fileName] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), $scope.fileName + '.xlsx');
    }
    
    function getActiveUser(){
    	leadControllerScope.transferSpinner = true;
        userService.getActiveUser().then(function(res) {
        	if (res.successflag === 'true' && res.results.length > 0) {
        		leadControllerScope.activeUserList = res.results;
                leadControllerScope.transferSpinner = false;
        	}else {
               	leadControllerScope.transferSpinner = false;
            }
        }, function(err) {
        	leadControllerScope.transferSpinner = false;
        });
    }


    function getContactType() {
        leadControllerScope.spinner = true;
        configurationService.getContactType().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                leadControllerScope.contactTypeList = res.results;
                leadControllerScope.spinner = false;
            } else {
                leadControllerScope.spinner = false;
            }
        }, function(err) {
            leadControllerScope.spinner = false;
        });
    }

    function getIndustry() {
        leadControllerScope.spinner = true;
        configurationService.getIndustryType().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                leadControllerScope.leadIndustryList = res.results;
                leadControllerScope.spinner = false;
            } else {
                leadControllerScope.spinner = false;
            }
        }, function(err) {
            leadControllerScope.spinner = false;
        });
    }

    function getEmail(data) {
        data = '100101';
        leadControllerScope.spinner = true;
        leadService.getEmail(data).then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                leadControllerScope.emailList = res.results;
                leadControllerScope.spinner = false;
            } else {
                leadControllerScope.spinner = false;
            }
        }, function(err) {
            leadControllerScope.spinner = false;
        });
    }

    function getLead(lead) {
    	leadControllerScope.viewSpinner = true;
        leadService.getLead(lead).then(function(res) {
        	console.log('getLead res',res)
        	if (res.successflag == 'true' && res.results.length > 0) {
                if ($location.path() == '/lead/view' || $location.path() == '/lead/edit' || $location.path() == '/customer/view' || $location.path() == '/customer/edit' || $location.path() == '/vendor/view' || $location.path() == '/vendor/edit') {
                    leadControllerScope.lead = res.results[0];
                    /*leadControllerScope.lead.statusName = 'aa'*/
                    leadControllerScope.viewSpinner = false;
                } else {
                    leadControllerScope.leadListBackup = angular.copy(res.results);
                    leadControllerScope.isDataAvailable = true;

                	for(var i = 0; i < leadControllerScope.leadListBackup.length; i++){
                    	leadControllerScope.leadListBackup[i].isActiveClass = false;
                    	leadControllerScope.leadListBackup[i].isSelect = false;
                	}

                    leadControllerScope.leadList =  angular.copy(leadControllerScope.leadListBackup);
                	if((leadControllerScope.buttonBeginFrom + leadControllerScope.buttonLimitToShow) * leadControllerScope.buttonLimitToShow >= leadControllerScope.leadList.length)
                		leadControllerScope.isNextDisabled = true;
                	
                	leadControllerScope.leadList[0].isActiveClass = true;
                    leadControllerScope.viewSpinner = false;
                }
            } else {
                leadControllerScope.viewSpinner = false;
                leadControllerScope.dataMsg = leadControllerScope.subMenu + "s Not Available";
            }
        }, function(err) {
            leadControllerScope.viewSpinner = false;
        });
    }
    
    function getLeadByEmp(leadId){
    	if(leadId){
    		leadControllerScope.spinner = true;
            leadService.getLeadByEmp(leadId,$scope.type).then(function(res) {
            	if (res.successflag == 'true' && res.results.length > 0) {
            		leadControllerScope.leadListByEmp = res.results;
            		leadControllerScope.spinner = false;
            	}else{
                    leadControllerScope.spinner = false;
            	}
            },function(err){
                leadControllerScope.spinner = false;
            });
            checkTransferLeadFromAndTo();
    	}
    }

    function getLeadContact(data) {
        if (data) {
            leadControllerScope.spinner = true;
            contactService.getLeadContact(data).then(function(res) {
                if (res.successflag == 'true' && res.results.length > 0) {
                    leadControllerScope.leadContactList = res.results;
                    leadControllerScope.spinner = false;
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function getLeadStatus() {
        leadControllerScope.spinner = true;
        configurationService.getLeadStatus().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                leadControllerScope.leadStatusList = res.results;
                leadControllerScope.spinner = false;
            } else {
                leadControllerScope.spinner = false;
            }
        }, function(err) {
            leadControllerScope.spinner = false;
        });
    }

    function getLeadType() {
        leadControllerScope.spinner = true;
        configurationService.getLeadType().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                leadControllerScope.leadTypeList = res.results;
                leadControllerScope.spinner = false;
            } else {
                leadControllerScope.spinner = false;
            }
        }, function(err) {
            leadControllerScope.spinner = false;
        });
    }

    function getLogActivity(data) {
        if (data) {
            leadControllerScope.spinner = true;
            leadService.getLogActivity(data).then(function(res) {
                if (res.successflag == 'true' && res.results.length > 0) {
                    leadControllerScope.logActivityList = res.results;
                    leadControllerScope.spinner = false;
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function getNote(data) {
        if (data) {
            leadControllerScope.spinner = true;
            leadService.getNote(data).then(function(res) {
                if (res.successflag == 'true' && res.results.length > 0) {
                    leadControllerScope.noteList = res.results;
                    leadControllerScope.spinner = false;
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function getSalution() {
        leadControllerScope.spinner = true;
        configurationService.getSalution().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                leadControllerScope.salutationList = res.results;
                leadControllerScope.spinner = false;
            } else {
                leadControllerScope.spinner = false;
            }
        }, function(err) {
            leadControllerScope.spinner = false;
        });
    }

    function getSchedule(data) {
        if (data) {
            leadControllerScope.spinner = true;
            leadService.getSchedule(data).then(function(res) {
                if (res.successflag == 'true' && res.results.length > 0) {
                    leadControllerScope.scheduleList = res.results;
                    leadControllerScope.spinner = false;
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }

    function getSource() {
        leadControllerScope.spinner = true;
        leadService.getSource().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                leadControllerScope.spinner = false;
            } else {
                leadControllerScope.spinner = false;
            }
        }, function(err) {
            leadControllerScope.spinner = false;
        });
    }


    function getTask(data) {
        if (data) {
            leadControllerScope.spinner = true;
            leadService.getTask(data).then(function(res) {
                if (res.successflag == 'true' && res.results.length > 0) {
                    leadControllerScope.taskList = res.results;
                    leadControllerScope.spinner = false;
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }
    
    function getTransferLead(data){
    	if(data){
	    	leadControllerScope.getTransferLeadSpinner = true;
	    	leadControllerScope.dataMsg = '';
	        leadService.getTransferLead(data).then(function(res) {
	        	console.log('getTransferLead res',res)
	            if (res.successflag == 'true' && res.results.length > 0) {
	                leadControllerScope.transferLeadList = res.results;
	                var today = new Date();
	                angular.forEach(leadControllerScope.transferLeadList, function(val){
	                	var fromDate = new Date(val.fromDate);
	                	var toDate = new Date(val.toDate);
	                	if(dateDiffInDays(fromDate,today) >= 0 && dateDiffInDays(toDate,today) <= 0){
	                		val.isRevoke = true;
	                	}else{
	                		val.isRevoke = false;
	                	}
	                });
	                leadControllerScope.getTransferLeadSpinner = false;
	            } else {
	            	if($location.path()=="/customer/transfer") {
	            		leadControllerScope.dataMsg = 'No Customers Available';
		                leadControllerScope.getTransferLeadSpinner = false;
	            	} else {
	            		leadControllerScope.dataMsg = 'No Leads Available';
		                leadControllerScope.getTransferLeadSpinner = false;
	            	}
	            	
	            }
	        }, function(err) {
	        	if($location.path()=="/customer/transfer") {
            		leadControllerScope.dataMsg = 'No Customers Available';
	                leadControllerScope.getTransferLeadSpinner = false;
            	} else {
            		leadControllerScope.dataMsg = 'No Leads Available';
	                leadControllerScope.getTransferLeadSpinner = false;
            	}
	        });
    	}
    }
    
    
    function dateDiffInDays(a, b) {
    	var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    	// Discard the time and time-zone information.
    	var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    	var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
	}

    function goToEditLead(lead) {
        if (lead) {
            $localStorage.spheresuite.leadId = lead;
            if ($location.path()=="/leads" || $location.path()=="/lead/add" || $location.path()=="/lead/view" || $location.path()=="/lead/edit") {
                $location.path('/lead/edit');
            } else if ($location.path()=="/customers" || $location.path()=="/customer/add" || $location.path()=="/customer/view" || $location.path()=="/customer/edit") {
                $location.path('/customer/edit');
            } else if ($location.path()=="/vendors" || $location.path()=="/vendor/add" || $location.path()=="/vendor/view" || $location.path()=="/vendor/edit") {
                $location.path('/vendor/edit');
            }
        }
    }
    
    function goToImportPage(){
    	if ($location.path()=="/leads"){
    		$location.path('/lead/import');
    	}else if ($location.path()=="/customers"){
    		$location.path('/customer/import');
    	}else if ($location.path()=="/vendors"){
    		$location.path('/vendor/import');
    	}
    }

    function goToViewLeads() {
        if ($location.path()=="/leads" || $location.path()=="/lead/add" || $location.path()=="/lead/view" || $location.path()=="/lead/edit") {
            $location.path('/leads');
        } else if ($location.path()=="/customers" || $location.path()=="/customer/add" || $location.path()=="/customer/view" || $location.path()=="/customer/edit") {
            $location.path('/customers');
        } else if ($location.path()=="/vendors" || $location.path()=="/vendor/add" || $location.path()=="/vendor/view" || $location.path()=="/vendor/edit") {
            $location.path('/vendors');
        }
    }
    /*
    function importLead(){
    	
    }*/

    function leadCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        leadControllerScope.leadDateCalender = !leadControllerScope.leadDateCalender;
    }

    function leadDetail(lead) {
        if (lead) {
            $localStorage.spheresuite.leadId = lead;
            if ($location.path()=="/leads" || $location.path()=="/lead/add" || $location.path()=="/lead/view" || $location.path()=="/lead/edit" || $location.path()=="/lead/transfer") {
                $location.path('/lead/view');
            } else if ($location.path()=="/customers" || $location.path()=="/customer/add" || $location.path()=="/customer/view" || $location.path()=="/customer/edit") {
                $location.path('/customer/view');
            } else if ($location.path()=="/vendors" || $location.path()=="/vendor/add" || $location.path()=="/customer/view" || $location.path()=="/vendor/edit") {
                $location.path('/vendor/view');
            }
        }
    }
    
    function openTransferFromDate($event) {
        $event.preventDefault();
        $event.stopPropagation();
        leadControllerScope.isLeadTranformFromDate = !leadControllerScope.isLeadTranformFromDate;
    }
    
    function openTransferToDate($event) {
        $event.preventDefault();
        $event.stopPropagation();
        leadControllerScope.isLeadTranformToDate = !leadControllerScope.isLeadTranformToDate;
    }
    
    function revokeLeadTransfer(leadId){
    	if(leadId){
            leadControllerScope.spinner = true;
    		leadService.revokeLeadTransfer({id:leadId,updatedBy:$localStorage.spheresuite.id}).then(function(res){
    			if(res.successflag == 'true'){
    				getTransferLead({ type: $scope.type });
    			}
	            leadControllerScope.spinner = false;
    		},function(err){
	            leadControllerScope.spinner = false;
    		});
    	}
    }
    
    function sendEmail() {
        if (leadControllerScope.email) {
            leadControllerScope.spinner = true;
            leadService.sendEmail(leadControllerScope.email).then(function(res) {
                if (res.successflag == 'true') {
                    declineEmail();
                    leadControllerScope.spinner = false;
                } else {
                    leadControllerScope.spinner = false;
                }
            }, function(err) {
                leadControllerScope.spinner = false;
            });
        }
    }
    
    function switchTab(){
    	declineEmail();
    	declineTask();
    	declineSchedule();
    	declineEmail();
    	declineLogActivity();
    }

    function toggleCc() {
        leadControllerScope.isCc = !leadControllerScope.isCc;
    }

    function toggleBcc() {
        leadControllerScope.isBcc = !leadControllerScope.isBcc;
    }

    function toggleBetweenLeadAndContact() {
        leadControllerScope.isAddLead = !leadControllerScope.isAddLead;
    }
    
    function transferLead(){
    	if(leadControllerScope.transfer && checkTransferLeadFromAndTo()){
            leadControllerScope.spinner = true;
            commonService.formValNotManditory(leadControllerScope.transferForm, leadControllerScope.transfer).then(function(data) {
            	if(data){
            		data.updatedBy = $localStorage.spheresuite.id;
            		data.fromDate = $filter('date')(data.fromDate, "yyyy-MM-dd");
  	  	            data.toDate = $filter('date')(data.toDate, "yyyy-MM-dd");
		            leadService.transferLead(data,$scope.type).then(function(res){
		            	if(res.successflag == 'true'){
		            		declineTransferLead();
		            		getTransferLead({ type: $scope.type });
		                    leadControllerScope.spinner = false;
		            	}else {
		            		leadControllerScope.spinner = false;
		            	}
		            },function(err){
		                leadControllerScope.spinner = false;
		            });
            	}
		    	});
            }
    }
    
    
    function updatePic(myCroppedImage,results) { 
    	console.log("pic function",myCroppedImage)
        if (myCroppedImage) {   
                var data = {
                    id: results,
                    photo: myCroppedImage
                }   
                  leadService.updateProfilePic(data).then(function(res) {
                	  console.log("my image came",res)
                	   if ($location.path()=="/leads" || $location.path()=="/lead/add" || $location.path()=="/lead/view" || $location.path()=="/lead/edit") {
                                        $location.path('/leads');
                                    } else if ($location.path()=="/customers" || $location.path()=="/customer/add" || $location.path()=="/customer/view" || $location.path()=="/customer/edit") {
                                        $location.path('/customers');
                                    } else if ($location.path()=="/vendors" || $location.path()=="/vendor/add" || $location.path()=="/customer/view" || $location.path()=="/vendor/edit") {
                                        $location.path('/vendors');
                                    }
//                    if (res) {
//                        getEmployeeUser();
//                        employeeService.getEmployee($localStorage.spheresuite.id).then(function(res) { 
//                        	console.log("image upload",res)
//            	            if (res.successflag === 'true') {
//            	            	leadControllerScope.photo = res.results[0].photo;
//            	                }
//            	            else{
//            	            	leadControllerScope.photo = 'images/User.png'
//            	            }
//            	        }, function(err) {
//            	        	leadControllerScope.photo = 'images/User.png'
//            	        });
//                        
//                    }
                    leadControllerScope.spinner = false;
                }, function(err) {
                	leadControllerScope.spinner = false;
                });
            
        }
    }

//    function updateProfilePic() {
//        if (leadControllerScope.userEmployeeList.photo && $localStorage.spheresuite && $localStorage.spheresuite.id != '') {
//        	leadControllerScope.spinner = true;
//            updatePic();
//
//        }
//    }
    
    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
        	  leadControllerScope.myImage = evt.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
      leadControllerScope.leadphoto;
      leadControllerScope.myImage='';
      leadControllerScope.myCroppedImage='';
       function clearimage() {
    	   console.log("mycrop",leadControllerScope.myCroppedImage)
  	   leadControllerScope.leadphoto   = leadControllerScope.myCroppedImage = leadControllerScope.myImage;
    	     leadControllerScope.myImage='';
    	   leadControllerScope.myCroppedImage = ''; 
      	 $("#fileInput").val('');
         $('#modal').modal('hide');
      }    

    $('.select1').select2();
    $("#logActivityLogType").select2();
    $("#logActivityLogStatus").select2();
    $("#logActivityHour").select2();
    $("#logActivityMin").select2();
    $("#scheduleHour").select2();
    $("#scheduleMin").select2();
    $("#taskHour").select2();
    $("#taskMin").select2();

    $('#datetimepicker2').datetimepicker({ timepicker: false, format: 'M d, Y' });
    $('#datetimepicker3').datetimepicker({ datepicker: false, format: 'H:i' });
    $('#datetimepicker4').datetimepicker({ timepicker: false, format: 'M d, Y' });
    $('#datetimepicker5').datetimepicker({ datepicker: false, format: 'H:i' });
    $('#datetimepicker6').datetimepicker({ timepicker: false, format: 'M d, Y' });
    $('#datetimepicker7').datetimepicker({ datepicker: false, format: 'H:i' });

    $('#datetimepicker2').on('changeDate', function(ev) {
        $(this).datetimepicker('hide');
    });
    $('#datetimepicker3').on('changeTime', function(ev) {
        $(this).datetimepicker('hide');
    });
    $('#datetimepicker4').on('changeDate', function(ev) {
        $(this).datetimepicker('hide');
    });
    $('#datetimepicker5').on('changeTime', function(ev) {
        $(this).datetimepicker('hide');
    });
    $('#datetimepicker6').on('changeDate', function(ev) {
        $(this).datetimepicker('hide');
    });
    $('#datetimepicker7').on('changeTime', function(ev) {
        $(this).datetimepicker('hide');
    });
    
//In view lead checkbox to be enabled in task list.
    function updateTaskStatus(data, leadId) {
        var data = {
            id: data,
            status: "D",
            updatedBy: $localStorage.spheresuite.id

        }
        leadService.editTaskStatus(data).then(function(res) {
            if (res.successflag === 'true') {
                getTask(leadId);
                if (leadControllerScope.taskList.length == 1) {
                    leadControllerScope.taskList = null;
                }

            } else {
            }
        }, function(err) {
        });
    }
    
    
    //import data
    


    var formdata = new FormData();
    $scope.getTheFiles = function($files) {
        angular.forEach($files, function(value, key) {
            formdata.append(key, value);
        });
    };


    $(".select1").select2();
    $(".test").select2();
    $("#select4").select2();

    var importedDataList;

    function importLead() {
    	leadControllerScope.spinner = true;
        var dataToSend = {
            fileData: importedDataList,
            columFields: leadControllerScope.lead,
            type: $scope.type,
            updatedBy : $localStorage.spheresuite.id
        }
        leadService.importLead(dataToSend).then(function(res) {
        	if(res.successflag == 'true'){
        		declineImport();
        		if($location.path() == '/lead/import'){
        			$location.path('/leads');
        		}else if($location.path() == '/customer/import'){
        			$location.path('/customers');
        		}else if($location.path() == '/vendor/import'){
        			$location.path('/vendors');
        		}
        	}
        	leadControllerScope.spinner = false;
        }, function(err) {
        	leadControllerScope.spinner = false;
        });
    }

    $scope.selectedFile = null;
    
    $scope.loadFile = function(files) {
        $scope.selectedFile = files[0];
    }
    
    $scope.handleFile = function() {
        if ($scope.selectedFile) {
            var reader = new FileReader();
            var name = $scope.selectedFile.name;
            reader.onload = function(e) {
                var data = e.target.result; 
                var arr = String.fromCharCode.apply(null, new Uint8Array(data));
                var wb = XLSX.read(btoa(arr), { type: 'base64' });
                process_wb(wb);
            }; 
            reader.readAsArrayBuffer($scope.selectedFile);
        }


        function process_wb(wb) { 
            var output = to_json(wb);
            var keySet;
            for (var fieldName in output){
                keySet = output[fieldName][0];
                importedDataList = output[fieldName];
                break;
            }
            leadControllerScope.fileInputFields = [];
            angular.forEach(keySet, function(value, key) {
                leadControllerScope.fileInputFields.push(key)
            })
            $scope.$apply(function() {
                leadControllerScope.chooseFileSection = false;
            })

        }

        function to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }
    }  
    $rootScope.limitToShow = 10;
    $rootScope.beginFrom = 0;
	var id = [];
    
    leadControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
    leadControllerScope.buttonBeginFrom = 0;
	leadControllerScope.isCannotDelete = false;
	leadControllerScope.isNextDisabled = false;
	leadControllerScope.isSingleRecordToDelete = false;
	
	leadControllerScope.closeModal = closeModal;
    leadControllerScope.deleteLead = deleteLead;
    leadControllerScope.gotoPage = gotoPage;
	leadControllerScope.searchMe = searchMe;
	leadControllerScope.showPrevNav = showPrevNav;
    leadControllerScope.showNextNav = showNextNav;
    leadControllerScope.toggleSelect = toggleSelect;
    leadControllerScope.showDelete = showDelete;
    
    function showDelete(){
    	leadControllerScope.spinner = true;
    	leadControllerScope.isSingleRecordToDelete = false;
		leadControllerScope.isCannotDelete = false;
    	var filteredData = $filter('orderBy')(leadControllerScope.leadList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(leadControllerScope.search)
    		filteredData = $filter('filter')(filteredData, leadControllerScope.search);
    	if(leadControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, leadControllerScope.searchName);
		id = [];
    	for(var i = 0; i < filteredData.length; i++){
    		if(filteredData[i].isSelect){
    			id.push({id:filteredData[i].id});
    		}
    	}
		console.log('id',JSON.stringify(id));
    	if(id.length > 0){
    		if(id.length == 1){
    			leadControllerScope.isSingleRecordToDelete = true;
    		}
    		leadControllerScope.spinner = false;
    		$('#confirmation').modal('show');
    	}else{
    		leadControllerScope.spinner = false;
    	}
    }
    
    function closeModal(){
		$('#confirmation').modal('hide');
    }
    
    function deleteLead(){

		console.log('deleteLead');
    	if(id.length > 0){
    		leadControllerScope.isCannotDelete = false;
    		leadService.deleteLead(id).then(function(res){
    			console.log('deleteLead res',res);
    			if(res.successflag == 'true'){
    				$('#confirmation').modal('hide');
    				getLead({ type: $scope.type });
    			}else{
    				$('#confirmation').modal('hide');
					if(leadControllerScope.isSingleRecordToDelete){
						leadControllerScope.isSingleRecordToDelete = false;
    		    		leadControllerScope.isCannotDelete = true;
	    				setTimeout(function(){
	        		    		leadControllerScope.isCannotDelete = true;
	            				$('#confirmation').modal('show');
	    				},1000);
    				}
    				
    					
    	    		leadControllerScope.spinner = false;
    			}
        		leadControllerScope.isSelect = false;
    		}, function(err){
        		leadControllerScope.spinner = false;
    		});
    	}
    	
    }
    
    function gotoPage(index, activeIndex){
    	$rootScope.beginFrom = index;
    	for(var i = 0; i < leadControllerScope.leadList.length; i++){
        	console.log(' data[i].isActiveClass', leadControllerScope.leadList[i].isActiveClass);
        	leadControllerScope.leadList[i].isActiveClass = false;
    	}
    	if(!activeIndex)
    		activeIndex = index
    	leadControllerScope.leadList[activeIndex].isActiveClass = true;
    	console.log('index',index, leadControllerScope.leadList[index].isActiveClass);
    }
    
    function searchMe(ifMobile){
    	var canEnter = false;
    	leadControllerScope.isNextDisabled = false;
    	for (var item in leadControllerScope.search){
    		if(leadControllerScope.search[item] != ''){
    			canEnter = true;
    		} 
    	}
    	if(ifMobile && leadControllerScope.searchName != ''){
    		leadControllerScope.leadList = $filter('filter')(leadControllerScope.leadListBackup, leadControllerScope.searchName)
    	}else if(canEnter){
    		leadControllerScope.leadList = $filter('filter')(leadControllerScope.leadListBackup, leadControllerScope.search);
    	}else {
    		leadControllerScope.leadList = angular.copy(leadControllerScope.leadListBackup);
    	}
    	$rootScope.beginFrom = 0;
    	for(var i = 0; i < leadControllerScope.leadList.length; i++){
        	leadControllerScope.leadList[i].isActiveClass = false;
        	leadControllerScope.leadList[i].isSelect = leadControllerScope.isSelect;
    	}
    	if(leadControllerScope.leadList[0])
    		leadControllerScope.leadList[0].isActiveClass = true;
    	if((leadControllerScope.buttonBeginFrom + leadControllerScope.buttonLimitToShow) * leadControllerScope.buttonLimitToShow >= leadControllerScope.leadList.length)
    		leadControllerScope.isNextDisabled = true;
    }
    
    function showPrevNav(){
		leadControllerScope.buttonBeginFrom -= leadControllerScope.buttonLimitToShow;
    	gotoPage(leadControllerScope.buttonBeginFrom)
		leadControllerScope.isNextDisabled = false;
	}
	
	function showNextNav(){
		leadControllerScope.buttonBeginFrom += leadControllerScope.buttonLimitToShow;
		gotoPage(leadControllerScope.buttonBeginFrom)
		if((leadControllerScope.buttonBeginFrom + leadControllerScope.buttonLimitToShow) * leadControllerScope.buttonLimitToShow >= leadControllerScope.leadList.length)
			leadControllerScope.isNextDisabled = true;
	}
    

    function toggleSelect(isSelect){
    	leadControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(leadControllerScope.leadList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(leadControllerScope.search)
    		filteredData = $filter('filter')(filteredData, leadControllerScope.search);
    	if(leadControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, leadControllerScope.searchName);
    	for(var i = 0; i < filteredData.length; i++){
    		filteredData[i].isSelect = isSelect;
    	}
    	console.log('toggleSelect',filteredData)
    	leadControllerScope.spinner = false; 		
    }
    
    
}