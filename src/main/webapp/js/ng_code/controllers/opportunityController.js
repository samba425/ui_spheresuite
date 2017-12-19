angular
    .module('spheresuite')
    .controller('opportunityController', opportunityController);

opportunityController.$inject = ['$scope', '$rootScope', '$filter', '$location', '$localStorage', '$routeParams', 'opportunityService', 'projectService', 'commonService', 'configurationService', 'leadService', 'contactService', 'employeeService', 'Upload'];

function opportunityController($scope, $rootScope, $filter, $location, $localStorage, $routeParams, opportunityService, projectService, commonService, configurationService, leadService, contactService, employeeService, Upload) {
    var opportunityControllerScope = this;

    $rootScope.headerMenu = "Opportunities";

    opportunityControllerScope.employeeList;
    opportunityControllerScope.customerList;
	opportunityControllerScope.isFormInValid = false;
    opportunityControllerScope.isUpdate = false;
    opportunityControllerScope.endCalender = false;
    opportunityControllerScope.salesStageList;
    opportunityControllerScope.startCalender = false;
    opportunityControllerScope.limitToShow = 5;
    opportunityControllerScope.opportunity;
    opportunityControllerScope.opportunityForm;
    opportunityControllerScope.opportunityList;
    opportunityControllerScope.projectList;

    function addMoreItems() {
        opportunityControllerScope.limitToShow += 5;
    }

    opportunityControllerScope.addMoreItems = addMoreItems;
    opportunityControllerScope.addOpportunity = addOpportunity;
    opportunityControllerScope.calculateDuration = calculateDuration;
    opportunityControllerScope.decline = decline;
    opportunityControllerScope.deleteOpportunity = deleteOpportunity;
    opportunityControllerScope.editOpportunity = editOpportunity;
    opportunityControllerScope.exportData = exportData;
    opportunityControllerScope.getContact = getContact;
    opportunityControllerScope.getEmployee = getEmployee;
    opportunityControllerScope.getOpportunity = getOpportunity;
    opportunityControllerScope.getProject = getProject;
    opportunityControllerScope.getSalesStage = getSalesStage;
    opportunityControllerScope.getOpportunityType = getOpportunityType;
    opportunityControllerScope.goToEditOpportunity = goToEditOpportunity;
    opportunityControllerScope.goToOpportunities = goToOpportunities;
    opportunityControllerScope.getCustomer = getCustomer;
    opportunityControllerScope.openendCalender = openendCalender;
    opportunityControllerScope.openstartCalender = openstartCalender;
    opportunityControllerScope.gotoView = gotoView;
    opportunityControllerScope.removeItem = removeItem;
    opportunityControllerScope.arrowRotate = arrowRotate;
    
    if ($location.path() == '/opportunity/add'){
        getCustomer();
    	getEmployee();
    	getSalesStage();
        getOpportunityType();
    	delete $localStorage.spheresuite['opportunityId']; 	
    }else if ($location.path() == '/opportunity/edit'){
    	opportunityControllerScope.isUpdate = true;
        getCustomer();
    	getEmployee();
    	getSalesStage();
        getOpportunityType();
    	getOpportunity($localStorage.spheresuite.opportunityId);
    }else if ($location.path() == '/opportunity/view'){
    	getOpportunity($localStorage.spheresuite.opportunityId);
    	getProject($localStorage.spheresuite.opportunityId);
    }else if ($location.path() == '/opportunities'){
    	getOpportunity();
    	delete $localStorage.spheresuite['opportunityId']; 	
    }

	var filesName = [];
    function addOpportunity() {
    	filesName = [];
        if (opportunityControllerScope.opportunity) {
            opportunityControllerScope.spinner = true;
            commonService.formValNotManditory(opportunityControllerScope.opportunityForm, opportunityControllerScope.opportunity).then(function(data) {
                if (data) {
                	data.enddate = $filter('date')(data.enddate, "MMM dd, yyyy");
                	data.startDate = $filter('date')(data.startDate, "MMM dd, yyyy");
                	
                	if(data.file && data.file != ""){
                		for(i in data.file){
                			console.log('i name',data.file[i].name)
                			filesName.push(data.file[i].name)
                		}
            			console.log('files',filesName)
	                	Upload
						.base64DataUrl(data.file)
						.then(function(urls) {
                    		data.file = '';
							opportunity(data,urls);
						});
                	}else{
						data.file = "";
						opportunity(data);
                	}                	
                }
            }, function(err) {
                opportunityControllerScope.spinner = false;
            });
        }

    }
    
    $scope.arrowPosition = false;
    
    function arrowRotate(arrowPosition) {
        arrowPosition.arrowPosition = !arrowPosition.arrowPosition;
    }

    function opportunity(data,files){
        opportunityService.addOpportunity(data).then(function(res) {
        	console.log('addOpportunity res',res);
            if (res.successflag === 'true' && res.results) {
            	if(files && res.results != ''){
            		for(var i = 0; i < files.length; i++){
	            		opportunityService.uploadDocument({id: res.results, photo: files[i], name: filesName[i]}).then(function(res1){
							console.log('res1',i, files.length)
		            		if(i == files.length){
				                opportunityControllerScope.spinner = false;
			            		$location.path('/opportunities');
		            		}
						},function(err){
							console.log('err1',err1);
						});
            		}
            	}else{
            		opportunityControllerScope.spinner = false;
            		$location.path('/opportunities');
            	}
            } else {
                opportunityControllerScope.spinner = false;
            }
        }, function(err) {
            opportunityControllerScope.spinner = false;
        });
    }
    
    function calculateDuration(start, end){
		opportunityControllerScope.isFormInValid = false;
    	if(start && end){
    		opportunityControllerScope.opportunity.projectDuration = moment(end).diff(moment(start), 'days') + 1;
    		if(moment(end).diff(moment(start), 'days') + 1 <= 0){
    			opportunityControllerScope.isFormInValid = true;
    		}
    	}
    }

    function decline() {
        if ($location.path() == '/opportunity/edit') {
            $location.path('/opportunity/view');
        } else {
            opportunityControllerScope.opportunity = null;
            opportunityControllerScope.opportunityForm.$setPristine();
            opportunityControllerScope.productForm.$setUntouched();
            opportunityControllerScope.opportunityList = null;
            opportunityControllerScope.isUpdate = false;
        }
    }

    function deleteOpportunity(opportunityID) {
        if (opportunityID) {
            opportunityService.deleteOpportunity(opportunityID).then(function(res) {
                if (res.successflag) {
                    getOpportunity();
                }
            }, function(err) {
            });
        }
    }

    function editOpportunity() {
    	filesName = [];
        if (opportunityControllerScope.opportunity) {
            opportunityControllerScope.spinner = false;
            if(opportunityControllerScope.opportunity.file && opportunityControllerScope.opportunity.file != ""){
            	
    			console.log('opportunityControllerScope.opportunity.file',opportunityControllerScope.opportunity.file)
        		for(i in opportunityControllerScope.opportunity.fromEditFile){
        			filesName.push(opportunityControllerScope.opportunity.fromEditFile[i].name)
        		}
        		for(i in opportunityControllerScope.opportunity.file){
        			console.log('i name',opportunityControllerScope.opportunity.file[i].name)
        			filesName.push(opportunityControllerScope.opportunity.file[i].name)
        		}
    			console.log('files ',filesName)
            	Upload
				.base64DataUrl(opportunityControllerScope.opportunity.file)
				.then(function(urls) {
					opportunityControllerScope.opportunity.file = '';

	        		for(i in opportunityControllerScope.opportunity.fromEditFile){
	        			urls.push(opportunityControllerScope.opportunity.fromEditFile[i].file)
	        		}
	    			console.log('urls',urls)
					opportunityEdit(opportunityControllerScope.opportunity,urls);
				});
        	}else{
				opportunityEdit(opportunityControllerScope.opportunity,opportunityControllerScope.opportunity.fromEditFile);
        	} 
        }
    }
    
    function opportunityEdit(data,files){
    	data.fromEditFile = '';
        opportunityService.editOpportunity(data).then(function(res) {
            opportunityControllerScope.spinner = true;
            if (res.successflag === 'true') {
            	if(files){
            		if(files == ''|| files.length == 0){
		                opportunityControllerScope.spinner = false;
		                $location.path('/opportunities');
            			
            		}else{
	            		for(var i = 0; i < files.length; i++){
                            var fileName = filesName.length > 0?filesName[i]:files[i].name;
                            var fileData = (files[i].file!="" && files[i].file != undefined)?files[i].file:files[i];
                            opportunityService.uploadDocument({id: data.id, photo: fileData, name: fileName}).then(function(res1){
								console.log('res1 ',files.length)
			            		if(i == files.length){
					                opportunityControllerScope.spinner = false;
					                $location.path('/opportunities');
			            		}
							},function(err){
								console.log('err1',err1);
				                opportunityControllerScope.spinner = false;
							});
	            		}
            		}
            	}else{
            		opportunityControllerScope.spinner = false;
                    $location.path('/opportunities');
            	}
            }else{
        		opportunityControllerScope.spinner = false;
                $location.path('/opportunities');
        	}
        }, function(err) {
            opportunityControllerScope.spinner = false;
        });
    }

    function exportData() { 
        $scope.fileName = "Opportunity";
        $scope.exportData = []; 
        $scope.exportData.push(["Id", "Opportunity Name", "Opportunity Code", "Customer Id", "Display Name", "Opportunity Duration", "Start Date", "End Date", "Updatedon", "Updatedby"]);
        $scope.Filterdata = opportunityControllerScope.opportunityList;
        console.log(" $scope.Filterdata ", $scope.Filterdata )

        var firstFiter = $filter('filter')(opportunityControllerScope.opportunityList, { projectTypeName: opportunityControllerScope.opportunityType });
        $scope.Filterdata = $filter('filter')(firstFiter, opportunityControllerScope.searchName);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.projectName, value.projetCode, value.customerId, value.displayName, value.projectDuration, value.startDate, value.EndDate, value.updatedon, value.updatedBy]);
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

    function getContact(data){
    	if(data){
            opportunityControllerScope.spinner = true;
 			console.log('data',data);
        	opportunityControllerScope.contactList = '';
        	if(!opportunityControllerScope.opportunity){
        		opportunityControllerScope.opportunity = {}
        	}
        	opportunityControllerScope.opportunity.contactId = '';
        	opportunityControllerScope.opportunity.updatedBy = '';
        	if(opportunityControllerScope.customerList){
	        	for(var i = 0; i < opportunityControllerScope.customerList.length; i++){
	        		if(data == opportunityControllerScope.customerList[i].id){
	        			opportunityControllerScope.opportunity.updatedBy = opportunityControllerScope.customerList[i].empId;
	        			$("#select4").val(opportunityControllerScope.customerList[i].empId).trigger('change.select2');
	        		}
	        	}
        	}
     		contactService.getLeadContact(data).then(function(res) {
     			console.log('getContact res',res);
     			 if (res.successflag === 'true' && res.results.length > 0) {
     				 opportunityControllerScope.contactList = res.results;
     			 }
                 opportunityControllerScope.spinner = false;
     		},function (err){
                opportunityControllerScope.spinner = false;
     		});
    	}
    }

    function getCustomer() {
        opportunityControllerScope.getSpinner = true;
        leadService.getLead().then(function(res) {
        	console.log('getCustomer res',res)
            if (res.successflag === 'true' && res.results.length > 0) {
                opportunityControllerScope.customerList = res.results;
                opportunityControllerScope.getSpinner = false;
            } else {
                opportunityControllerScope.getSpinner = false;
            }
        }, function(err) {
            opportunityControllerScope.getSpinner = false;

        });
    }
    
    function getEmployee(){
        opportunityControllerScope.spinner = true;
        employeeService.getEmployee().then(function(res){
        	console.log('getEmployee res',res)
        	if(res.successflag == 'true' && res.results.length > 0){
        		opportunityControllerScope.employeeList = res.results; 
        	}
            opportunityControllerScope.spinner = false;
        },function(err){
            opportunityControllerScope.spinner = false;
        });
    	
    }
    
    function getOpportunity(data) {
        opportunityControllerScope.getSpinner = true;
        opportunityService.getOpportunity(data).then(function(res) {
        	console.log('getOpportunity res',res)
            if (res.successflag === 'true' && res.results.length > 0) {
                if ($location.path() == '/opportunity/view' || $location.path() == '/opportunity/edit') {
                	if($location.path() == '/opportunity/edit')
                	getContact(res.results[0].customerId);
                	opportunityControllerScope.opportunity = res.results[0];
                	opportunityControllerScope.opportunity.fromEditFile = angular.copy(res.results[0].file);
                	opportunityControllerScope.opportunity.file = '';
                	console.log('opportunityControllerScope.opportunity.fromEditFile',opportunityControllerScope.opportunity.fromEditFile)
                    opportunityControllerScope.getSpinner = false;
                } else {
                	opportunityControllerScope.opportunityListBackup = angular.copy(res.results);
                	if($localStorage.spheresuite.salesTargetFilter){
                        opportunityControllerScope.opportunityListBackup  = $filter('filter')(opportunityControllerScope.opportunityListBackup , {salesStageName : $localStorage.spheresuite.salesTargetFilter });
                	  delete $localStorage.spheresuite['salesTargetFilter'];
                	}
                	if(opportunityControllerScope.opportunityListBackup.length > 0 ) { 
	                opportunityControllerScope.isDataAvailable = true;
	
	            	for(var i = 0; i < opportunityControllerScope.opportunityListBackup.length; i++){
	                	opportunityControllerScope.opportunityListBackup[i].isActiveClass = false;
	                	opportunityControllerScope.opportunityListBackup[i].isSelect = false;
	            	}
	
	                opportunityControllerScope.opportunityList =  angular.copy(opportunityControllerScope.opportunityListBackup);
	            	if((opportunityControllerScope.buttonBeginFrom + opportunityControllerScope.buttonLimitToShow) * opportunityControllerScope.buttonLimitToShow >= opportunityControllerScope.opportunityList.length)
	            		opportunityControllerScope.isNextDisabled = true;
	            	
	            	opportunityControllerScope.opportunityList[0].isActiveClass = true;
                	}
	            	
                    opportunityControllerScope.getSpinner = false;
                }

            }  else {
                opportunityControllerScope.getSpinner = false;
                opportunityControllerScope.dataMsg = "Opportunity Not Available";
            }
        }, function(err) {
            opportunityControllerScope.getSpinner = false;
            opportunityControllerScope.dataMsg = "Opportunity Not Available";
        });

    }
    
    function getProject(data){
        opportunityControllerScope.spinner = true;
    	projectService.getProjectByOpportunityId(data).then(function(res){
    		console.log('getProject',res);
    		if(res.successflag == 'true' && res.results.length > 0){
    			opportunityControllerScope.projectList = res.results;
    		}
            opportunityControllerScope.spinner = false;
    	},function(err){
            opportunityControllerScope.spinner = false;
    	});
    }
    
    function getSalesStage(){
        opportunityControllerScope.spinner = true;
        configurationService.getSalesStage().then(function(res) {
        	console.log('getSalesStage',res)
            if (res.successflag == 'true' && res.results.length > 0) {
           	 opportunityControllerScope.salesStageList = res.results;
           	 opportunityControllerScope.spinner = false;
           }else{
           	 opportunityControllerScope.spinner = false;
           }
       }, function(err) {
           opportunityControllerScope.spinner = false;
       });
    }

    function getOpportunityType() {
        opportunityControllerScope.spinner = true;
        configurationService.getOpportunity().then(function(res) {
             if (res.successflag == 'true' && res.results.length > 0) {
            	 opportunityControllerScope.opportunityTypeList = res.results;
            	 opportunityControllerScope.spinner = false;
            }else{
            	 opportunityControllerScope.spinner = false;
            }
        }, function(err) {
            opportunityControllerScope.spinner = false;
        });
    }

    function goToOpportunities() {
        $location.path('/opportunities');
    }

    function goToEditOpportunity(opportunityID) {
        if (opportunityID) {
            $localStorage.spheresuite.opportunityId = opportunityID;
            $location.path('/opportunity/edit');
        }
    }

    function openstartCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        opportunityControllerScope.startCalender = !opportunityControllerScope.startCalender
    };

    function openendCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        opportunityControllerScope.endCalender = !opportunityControllerScope.endCalender
    };

    function gotoView(opportunity) {
        if (opportunity) {
            $localStorage.spheresuite.opportunityId = opportunity;
            $location.path('/opportunity/view');
        }
    }
    
    function removeItem(arr, index){
    	if(arr && index >= 0){
    		console.log('index',index, arr);
    		arr.splice(index, 1);
    	}
    }
    
    
   
    
    
    $rootScope.limitToShow = 10;
    $rootScope.beginFrom = 0;
    
    opportunityControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
    opportunityControllerScope.buttonBeginFrom = 0;
	opportunityControllerScope.isNextDisabled = false;

    opportunityControllerScope.deleteOpportunity = deleteOpportunity;
    opportunityControllerScope.gotoPage = gotoPage;
	opportunityControllerScope.searchMe = searchMe;
	opportunityControllerScope.showPrevNav = showPrevNav;
    opportunityControllerScope.showNextNav = showNextNav;
    opportunityControllerScope.toggleSelect = toggleSelect;
    
    function deleteOpportunity(){
    	opportunityControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(opportunityControllerScope.opportunityList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(opportunityControllerScope.search)
    		filteredData = $filter('filter')(filteredData, opportunityControllerScope.search);
    	if(opportunityControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, opportunityControllerScope.searchName);
    	var id = [];
		
    	for(var i = 0; i < filteredData.length; i++){
    		if(filteredData[i].isSelect){
    			id.push({id:filteredData[i].id});
    		}
    	}
		console.log('id',JSON.stringify(id));
    }
    
    function gotoPage(index, activeIndex){
    	$rootScope.beginFrom = index;
    	for(var i = 0; i < opportunityControllerScope.opportunityList.length; i++){
        	console.log(' data[i].isActiveClass', opportunityControllerScope.opportunityList[i].isActiveClass);
        	opportunityControllerScope.opportunityList[i].isActiveClass = false;
    	}
    	if(!activeIndex)
    		activeIndex = index
    	opportunityControllerScope.opportunityList[activeIndex].isActiveClass = true;
    	console.log('index',index, opportunityControllerScope.opportunityList[index].isActiveClass);
    }
    
    function searchMe(ifMobile){
    	var canEnter = false;
    	opportunityControllerScope.isNextDisabled = false;
    	for (var item in opportunityControllerScope.search){
    		if(opportunityControllerScope.search[item] != ''){
    			canEnter = true;
    		} 
    	}
    	if(ifMobile && opportunityControllerScope.searchName != ''){
    		opportunityControllerScope.opportunityList = $filter('filter')(opportunityControllerScope.opportunityListBackup, opportunityControllerScope.searchName)
    	}else if(canEnter){
    		opportunityControllerScope.opportunityList = $filter('filter')(opportunityControllerScope.opportunityListBackup, opportunityControllerScope.search);
    	}else {
    		opportunityControllerScope.opportunityList = angular.copy(opportunityControllerScope.opportunityListBackup);
    	}
    	$rootScope.beginFrom = 0;
    	for(var i = 0; i < opportunityControllerScope.opportunityList.length; i++){
        	opportunityControllerScope.opportunityList[i].isActiveClass = false;
        	opportunityControllerScope.opportunityList[i].isSelect = opportunityControllerScope.isSelect;
    	}
    	if(opportunityControllerScope.opportunityList[0])
    		opportunityControllerScope.opportunityList[0].isActiveClass = true;
    	if((opportunityControllerScope.buttonBeginFrom + opportunityControllerScope.buttonLimitToShow) * opportunityControllerScope.buttonLimitToShow >= opportunityControllerScope.opportunityList.length)
    		opportunityControllerScope.isNextDisabled = true;
    }
    
    function showPrevNav(){
		opportunityControllerScope.buttonBeginFrom -= opportunityControllerScope.buttonLimitToShow;
    	gotoPage(opportunityControllerScope.buttonBeginFrom)
		opportunityControllerScope.isNextDisabled = false;
	}
	
	function showNextNav(){
		opportunityControllerScope.buttonBeginFrom += opportunityControllerScope.buttonLimitToShow;
		gotoPage(opportunityControllerScope.buttonBeginFrom)
		if((opportunityControllerScope.buttonBeginFrom + opportunityControllerScope.buttonLimitToShow) * opportunityControllerScope.buttonLimitToShow >= opportunityControllerScope.opportunityList.length)
			opportunityControllerScope.isNextDisabled = true;
	}
    

    function toggleSelect(isSelect){
    	opportunityControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(opportunityControllerScope.opportunityList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(opportunityControllerScope.search)
    		filteredData = $filter('filter')(filteredData, opportunityControllerScope.search);
    	if(opportunityControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, opportunityControllerScope.searchName);
    	for(var i = 0; i < filteredData.length; i++){
    		filteredData[i].isSelect = isSelect;
    	}
    	console.log('toggleSelect',filteredData)
    	opportunityControllerScope.spinner = false; 		
    }
    
    

    $("#select1").select2();
    $("#select2").select2();
    $("#select3").select2();
    $("#select4").select2();
    $("#select5").select2();
}