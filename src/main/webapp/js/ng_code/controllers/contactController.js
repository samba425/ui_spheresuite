var app =  angular.module('spheresuite')
 app.controller('contactController', contactController);

 contactController.$inject = ['$scope', '$filter', '$timeout', '$rootScope', '$location', '$localStorage', '$routeParams', 'contactService', 'configurationService', 'commonService', 'leadService'];

 function contactController($scope, $filter, $timeout, $rootScope, $location, $localStorage, $routeParams, contactService, configurationService, commonService, leadService) {
 	var contactControllerScope = this;
 	$rootScope.headerMenu = "Contacts";

 	contactControllerScope.isUpdate = false;
 	contactControllerScope.contact;
 	contactControllerScope.contactForm;
 	contactControllerScope.contactList = [];
 	contactControllerScope.limitToShow = 0;
 	contactControllerScope.chooseFileSection = true;

 	function addMoreItems() {
 		contactControllerScope.limitToShow += 1;
 	}

 	contactControllerScope.addContact = addContact;
 	contactControllerScope.decline = decline;
 	contactControllerScope.deleteContact = deleteContact;
 	contactControllerScope.declineImport = declineImport;
 	contactControllerScope.editContact = editContact;
 	contactControllerScope.exportData = exportData;
 	contactControllerScope.getContact = getContact;
 	contactControllerScope.getContactType = getContactType;
 	contactControllerScope.getSalutation = getSalutation;
 	contactControllerScope.goToEditContact = goToEditContact;
 	contactControllerScope.goToContacts = goToContacts;
 	contactControllerScope.getLeadType = getLeadType;
 	contactControllerScope.contactDetail = contactDetail;
    contactControllerScope.leadDetail = leadDetail;
 	contactControllerScope.addMoreItems = addMoreItems;
 	contactControllerScope.goToImportPage = goToImportPage;
 	
 	contactControllerScope.importContact = importContact;

 	if ($localStorage.spheresuite.id && $localStorage.spheresuite.id != '' && $location.path() != '/contact/view' && $location.path() != '/contacts') {
 		getLeadType();
 		getSalutation();
 		getContactType();
 	} else if ($location.path() == '/contacts') {
 		getContact();
 		getContactType();
 	}

 	if ($location.path() == '/contact/view' || $location.path() == '/contact/edit') {
 		getContact($localStorage.spheresuite.contactId);
 		if ($location.path() == '/contact/edit')
 			contactControllerScope.isUpdate = true;
 	} else {
 		$localStorage.spheresuite.contactId = '';

 	}

 	function addContact() { 
			contactControllerScope.spinner = true; 
 		if (contactControllerScope.contact && $localStorage.spheresuite.id && $localStorage.spheresuite.id != '') {
 			commonService.formValNotManditory(contactControllerScope.contactForm, contactControllerScope.contact).then(function(data) {
 				if (data) {
 					data.updatedBy = $localStorage.spheresuite.id;
 					contactService.addContact(data).then(function(res) {
 						if (res.successflag === 'true') {
 							contactControllerScope.spinner = false;
 							$location.path('/contacts');
 						} else{ 
 						contactControllerScope.spinner = false;
 						}
 					}, function(err) { 
 						contactControllerScope.spinner = false;
 					});
 				}else{
						contactControllerScope.spinner = false;
 				}
 			}, function(err) { 
 				contactControllerScope.spinner = false;
 			});
 		}
 	}

 	function decline() {
 		if ($location.path() === '/contact/edit') {
 			$location.path('/contact/view');
 		} else {
 			contactControllerScope.contact = null;
 			contactControllerScope.contactType = null;
 			contactControllerScope.contactForm.$setPristine();
 			contactControllerScope.contactForm.$setUntouched();
 			contactControllerScope.selectedLeadType = null;
 			contactControllerScope.contactList = null;
 			contactControllerScope.isUpdate = false;
 		}
 	}

 	function deleteContact(contactID) {
 		if (contactID) {
				contactControllerScope.spinner = true;
 			contactService.deleteContact(contactID).then(function(res) {
 				if (res.successflag == 'true' && res.results.length > 0) {
 					contactControllerScope.spinner = false;
 					getContact();
 				} else {
 					contactControllerScope.spinner = false; 
 				}
 			}, function(err) {
 				contactControllerScope.spinner = false; 
 			});
 		}
 	}
 	
 	function declineImport(){
 		contactControllerScope.feilds = null;
 		contactControllerScope.contactImportForm.$setPristine();
 		contactControllerScope.contactImportForm.$setUntouched();
 	}

 	function editContact() {
 		if (contactControllerScope.contact && $localStorage.spheresuite.id && $localStorage.spheresuite.id != '') {
				contactControllerScope.spinner = true;
 			contactControllerScope.contact.updatedBy = $localStorage.spheresuite.id;
 			contactService.editContact(contactControllerScope.contact).then(function(res) {
 				if (res.successflag === 'true') {
 					contactControllerScope.spinner = false;
 					$location.path('/contact/view');
 				} else{ 
 					contactControllerScope.spinner = false;
 				}
 			}, function(err) { 
					contactControllerScope.spinner = false;
 			});
 		}
 	}

 	function exportData() {
 		$scope.fileName = "Contacts";
 		$scope.exportData = []; 
 		$scope.exportData.push(["Id", "First Name", "Middle Name", "Last Name", "Lead Type", "Lead TypeName", "Mobile", "Mobile 1", "Phone", "Phone 1", "Phone 2", "Phone 3", "Primary Email", "Secondary Email", "Salutation Name", "Salutation", "Requirement", "Note", "Fax", "Designation", "Contacttype", "Contacttype Name", "Address1", "Address2", "Comment", "Website", "Createdon", "Updatedon"]);
 		$scope.Filterdata = contactControllerScope.contactList;

 		var firstFiter = $filter('filter')(contactControllerScope.contactList, { contacttype: contactControllerScope.contacttype });
 		$scope.Filterdata = $filter('filter')(firstFiter, contactControllerScope.searchName);
 		angular.forEach($scope.Filterdata, function(value, key) {
 			$scope.exportData.push([value.id, value.firstName, value.middleName, value.lastName, value.leadType, value.leadTypeName, value.mobile, value.mobile1, value.phone, value.phone1, value.phone2, value.phone3, value.primaryEmail, value.secondaryEmail, value.salutationName, value.salutation, value.requirement, value.note, value.fax, value.designation, value.contacttype, value.contactTypeName, value.address1, value.address2, value.comment, value.website, value.createdon, value.updatedon]);
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

 	 
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) { 
    	contactControllerScope.viewContactspinner = false;
    });
    
    
 	function getContact(data) {
 		contactControllerScope.viewContactspinner = true;
 		contactService.getContact(data).then(function(res) {
 			console.log('getContact',res);
 			 if (res.successflag === 'true' && res.results.length > 0) {
 				if ($location.path() == '/contact/view' || $location.path() == '/contact/edit') {
 					contactControllerScope.contact = res.results[0]; 
 					contactControllerScope.viewContactspinner = false;
 				} else {
 					 contactControllerScope.contactListBackup = angular.copy(res.results);
                     contactControllerScope.isDataAvailable = true;

                 	for(var i = 0; i < contactControllerScope.contactListBackup.length; i++){
                     	contactControllerScope.contactListBackup[i].isActiveClass = false;
                     	contactControllerScope.contactListBackup[i].isSelect = false;
                 	}
                 	contactControllerScope.contactList =  angular.copy(contactControllerScope.contactListBackup);
                 	if((contactControllerScope.buttonBeginFrom + contactControllerScope.buttonLimitToShow) * contactControllerScope.buttonLimitToShow >= contactControllerScope.contactList.length)
                 		contactControllerScope.isNextDisabled = true;
                 	
                 	contactControllerScope.contactList[0].isActiveClass = true;
 					contactControllerScope.viewContactspinner = false;
 					
 				}
 			} else { 
 				contactControllerScope.viewContactspinner = false;
 				contactControllerScope.dataMsg = "No Contacts Available";
 			}
 		}, function(err) { 
 			contactControllerScope.viewContactspinner = false;
 		});
 	}

 	function getContactType(data) {
 		contactControllerScope.spinner = true;
       configurationService.getContactType(data).then(function(res) {
    	   if (res.results.length === 0) {
    		   contactControllerScope.spinner = false;
    		   contactControllerScope.dataMsg =  "Contacts Not Available";
           } else if (res.successflag == 'true' && res.results.length > 0) {
 				if (data) {
 					contactControllerScope.contact = res.results;
 					contactControllerScope.spinner = false;

 				} else {
 					contactControllerScope.contactListType = res.results;
 					contactControllerScope.spinner = false; 
 				}
 			} else { 
 				contactControllerScope.spinner = false;

 			}
 		}, function(err) { 
 			contactControllerScope.spinner = false;

 		});
 	}

 	function getSalutation(data) {
           contactControllerScope.spinner = true;
 		configurationService.getSalution(data).then(function(res) {
 			if (res.successflag == 'true' && res.results.length > 0) {
 				contactControllerScope.salutationList = res.results;
 				contactControllerScope.spinner = false; 
 			} else { 
 				contactControllerScope.spinner = false; 
 			}
 		}, function(err) { 
 			contactControllerScope.spinner = false;

 		});
 	}



 	function goToEditContact(contactID) {
 		if (contactID) {
 			$localStorage.spheresuite.contactId = contactID;
 			$location.path('/contact/edit');
 		}
 	}

 	function goToContacts() {
 		$location.path('/contacts');
 	}

 	function getLeadType() {
        contactControllerScope.spinner = true;
 		leadService.getLead().then(function(res) {
 			if (res.successflag == 'true' && res.results.length > 0) {
 				contactControllerScope.leadTypeList = res.results;
 				contactControllerScope.spinner = false; 
 			} else 
 			contactControllerScope.spinner = false; 
 		}, function(err) { 
 			contactControllerScope.spinner = false;

 		});

 	}

 	function contactDetail(contact) {
 		if (contact) {
 			$localStorage.spheresuite.contactId = contact;
 			$location.path('/contact/view');
 		}
 	}

    function leadDetail(lead) {
        if (lead) {
            $localStorage.spheresuite.leadId = lead;
            $location.path('/lead/view');
        }
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
            var output = to_json(wb)
 
            var keySet;

            for (var fieldName in output){
                keySet = output[fieldName][0];
                importedDataList = output[fieldName];
                break;
            }
            contactControllerScope.fileInputFeilds = [];
            angular.forEach(keySet, function(value, key) {
            	contactControllerScope.fileInputFeilds.push(key)
            })
            $scope.$apply(function() {
            	contactControllerScope.chooseFileSection = false;
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
    
 	function goToImportPage(){
 		$location.path('/contact/import');
 	}
 	 	
 	var importedDataList;

    function importContact() {
        contactControllerScope.spinner = true;
    	var dataToSend = {
            fileData: importedDataList,
            columFields: contactControllerScope.feilds,
            updatedBy: $localStorage.spheresuite.id
        }
       contactService.importContact(dataToSend).then(function(res) {
       	if(res.successflag == 'true'){
    		declineImport();
    		$location.path('/contacts');
    	}
        contactControllerScope.spinner = false;
        }, function(err) {
            contactControllerScope.spinner = false;
        });
    }
    
    $rootScope.limitToShow = 10;
    $rootScope.beginFrom = 0;
	var id = [];
    
    contactControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
    contactControllerScope.buttonBeginFrom = 0;
    contactControllerScope.isCannotDelete = false;
	contactControllerScope.isNextDisabled = false;
	contactControllerScope.isSingleRecordToDelete = false;

	contactControllerScope.closeModal = closeModal;
    contactControllerScope.deleteContact = deleteContact;
    contactControllerScope.gotoPage = gotoPage;
	contactControllerScope.searchMe = searchMe;
	contactControllerScope.showPrevNav = showPrevNav;
    contactControllerScope.showNextNav = showNextNav;
    contactControllerScope.toggleSelect = toggleSelect;
    contactControllerScope.showDelete = showDelete;
    
    function showDelete(){
    	contactControllerScope.spinner = true;
    	contactControllerScope.isSingleRecordToDelete = false;
		contactControllerScope.isCannotDelete = false;
    	var filteredData = $filter('orderBy')(contactControllerScope.contactList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(contactControllerScope.search)
    		filteredData = $filter('filter')(filteredData, contactControllerScope.search);
    	if(contactControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, contactControllerScope.searchName);
		id = [];
    	for(var i = 0; i < filteredData.length; i++){
    		if(filteredData[i].isSelect){
    			id.push({id:filteredData[i].id});
    		}
    	}
		console.log('id',JSON.stringify(id));
    	if(id.length > 0){
    		if(id.length == 1){
    			contactControllerScope.isSingleRecordToDelete = true;
    		}
    		contactControllerScope.spinner = false;
    		$('#confirmation').modal('show');
    	}else{
    		contactControllerScope.spinner = false;
    	}
    }
    
    function closeModal(){
		$('#confirmation').modal('hide');
    }
    
    function deleteContact(){

    	if(id.length > 0){
    		contactControllerScope.isCannotDelete = false;
    		contactService.deleteContact(id).then(function(res){
    			console.log('deleteContact res',res);
    			if(res.successflag == 'true'){
    				closeModal();
    		 		getContact();
    			}else{
    				closeModal();
					if(contactControllerScope.isSingleRecordToDelete){
						contactControllerScope.isSingleRecordToDelete = false;
    		    		contactControllerScope.isCannotDelete = true;
	    				setTimeout(function(){
	        		    		contactControllerScope.isCannotDelete = true;
	            				$('#confirmation').modal('show');
	    				},1000);
    				}
    				
    					
    	    		contactControllerScope.spinner = false;
    			}
        		contactControllerScope.isSelect = false;
    		}, function(err){
        		contactControllerScope.spinner = false;
    		});
    	}
    	
    }
    
    function gotoPage(index, activeIndex){
    	$rootScope.beginFrom = index;
    	for(var i = 0; i < contactControllerScope.contactList.length; i++){
        	console.log(' data[i].isActiveClass', contactControllerScope.contactList[i].isActiveClass);
        	contactControllerScope.contactList[i].isActiveClass = false;
    	}
    	if(!activeIndex)
    		activeIndex = index
    	contactControllerScope.contactList[activeIndex].isActiveClass = true;
    	console.log('index',index, contactControllerScope.contactList[index].isActiveClass);
    }
    
    function searchMe(ifMobile){
    	var canEnter = false;
    	contactControllerScope.isNextDisabled = false;
    	for (var item in contactControllerScope.search){
    		if(contactControllerScope.search[item] != ''){
    			canEnter = true;
    		} 
    	}
    	if(ifMobile && contactControllerScope.searchName != ''){
    		contactControllerScope.contactList = $filter('filter')(contactControllerScope.contactListBackup, contactControllerScope.searchName)
    	}else if(canEnter){
    		contactControllerScope.contactList = $filter('filter')(contactControllerScope.contactListBackup, contactControllerScope.search);
    	}else {
    		contactControllerScope.contactList = angular.copy(contactControllerScope.contactListBackup);
    	}
    	$rootScope.beginFrom = 0;
    	for(var i = 0; i < contactControllerScope.contactList.length; i++){
        	contactControllerScope.contactList[i].isActiveClass = false;
        	contactControllerScope.contactList[i].isSelect = contactControllerScope.isSelect;
    	}
    	if(contactControllerScope.contactList[0])
    		contactControllerScope.contactList[0].isActiveClass = true;
    	if((contactControllerScope.buttonBeginFrom + contactControllerScope.buttonLimitToShow) * contactControllerScope.buttonLimitToShow >= contactControllerScope.contactList.length)
    		contactControllerScope.isNextDisabled = true;
    }
    
    function showPrevNav(){
		contactControllerScope.buttonBeginFrom -= contactControllerScope.buttonLimitToShow;
    	gotoPage(contactControllerScope.buttonBeginFrom)
		contactControllerScope.isNextDisabled = false;
	}
	
	function showNextNav(){
		contactControllerScope.buttonBeginFrom += contactControllerScope.buttonLimitToShow;
		gotoPage(contactControllerScope.buttonBeginFrom)
		if((contactControllerScope.buttonBeginFrom + contactControllerScope.buttonLimitToShow) * contactControllerScope.buttonLimitToShow >= contactControllerScope.contactList.length)
			contactControllerScope.isNextDisabled = true;
	}
    

    function toggleSelect(isSelect){
    	contactControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(contactControllerScope.contactList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(contactControllerScope.search)
    		filteredData = $filter('filter')(filteredData, contactControllerScope.search);
    	if(contactControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, contactControllerScope.searchName);
    	for(var i = 0; i < filteredData.length; i++){
    		filteredData[i].isSelect = isSelect;
    	}
    	console.log('toggleSelect',filteredData)
    	contactControllerScope.spinner = false; 		
    }
 	

 	$(".importSelect").select2();
 	$("#select1").select2();
 	$("#select2").select2();
 	$("#select3").select2();
 	$("#select4").select2();
 	$("#select5").select2();


 }
 
 app.directive('onFinishRender', function ($timeout) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attr) {
	            if (scope.$last === true) {
	                $timeout(function () {
	                    scope.$emit('ngRepeatFinished');
	                });
	            }
	        }
	    }
	});
