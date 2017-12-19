var app = angular.module('spheresuite')
app.controller('leaveManagementController', leaveManagementController);

leaveManagementController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', '$filter', 'commonService', 'configurationService', 'leaveManagementService'];

function leaveManagementController($scope, $rootScope, $location, $localStorage, $filter, commonService, configurationService, leaveManagementService) {
    var leaveManagementControllerScope = this;

    $rootScope.headerMenu = "Leave Management";
    
    $scope.format = "MMM dd, yyyy";

    leaveManagementControllerScope.checkLeave = {days: 0};
    leaveManagementControllerScope.leaveAssignedByCompanyList = [];
    leaveManagementControllerScope.isCompanyEdit = false;
    leaveManagementControllerScope.isHideEdit = false;
    leaveManagementControllerScope.isOpenFromDate = false;
    leaveManagementControllerScope.isOpenToDate = false;
    leaveManagementControllerScope.isUpdate = false;
	leaveManagementControllerScope.isFormValid = false;
    leaveManagementControllerScope.leaveManagement;
    leaveManagementControllerScope.leaveManagementForm;
    leaveManagementControllerScope.leaveManagementList;
    leaveManagementControllerScope.leaveRequestTypeList;
    leaveManagementControllerScope.leaveStatusList;
    leaveManagementControllerScope.limitToShow = 5;
    
    leaveManagementControllerScope.addMoreItems = addMoreItems;
    leaveManagementControllerScope.checkLeaveAvailability = checkLeaveAvailability;
    leaveManagementControllerScope.createLeaveRequest = createLeaveRequest;
    leaveManagementControllerScope.decline = decline;
    leaveManagementControllerScope.editLeaveRequest = editLeaveRequest;
    leaveManagementControllerScope.exportData = exportData;
    leaveManagementControllerScope.getDateDifference = getDateDifference;
    leaveManagementControllerScope.getLeaveAssingedByCompany = getLeaveAssingedByCompany;
    leaveManagementControllerScope.getLeaveRequest = getLeaveRequest;
    leaveManagementControllerScope.getLeaveRequestType = getLeaveRequestType;  
    leaveManagementControllerScope.getLeaveStatus = getLeaveStatus;    
    leaveManagementControllerScope.goToEditLeaveRequest = goToEditLeaveRequest;
    leaveManagementControllerScope.goToRequest = goToRequest;
    leaveManagementControllerScope.goToView = goToView;
    leaveManagementControllerScope.openFromCalender = openFromCalender;
    leaveManagementControllerScope.openToCalender = openToCalender;
    leaveManagementControllerScope.checkEmptyList = checkEmptyList;
    leaveManagementControllerScope.checkEmptyListLeaveStatus = checkEmptyListLeaveStatus;
    
    if($location.path() == '/leaves'){
    	delete $localStorage.spheresuite['leaveRequestId'];
    	getLeaveRequest($localStorage.spheresuite.id);
    }else if($location.path() == '/leave/companiesrequests'){
    	delete $localStorage.spheresuite['leaveRequestId'];
    	getLeaveRequest();
    }else if($location.path() == '/leave/edit' || $location.path() == '/leave/companiesrequest/edit'){
    	if($location.path() == '/leave/companiesrequest/edit'){
    	    leaveManagementControllerScope.isCompanyEdit = true;
    	}else{
            getLeaveRequestType();
            getLeaveAssingedByCompany();
    	}
		leaveManagementControllerScope.isUpdate = true;
        getLeaveRequest($localStorage.spheresuite.leaveRequestId, 'edit');
    }else if($location.path() == '/leave/view' || $location.path() == '/leave/companiesrequest/view'){
    	getLeaveRequest($localStorage.spheresuite.leaveRequestId, 'view');
    }else if($location.path() == '/leave/add'){
    	getLeaveRequestType();
        getLeaveAssingedByCompany();
    	delete $localStorage.spheresuite['leaveRequestId'];
    }else if($location.path() == '/leave/status'){
    	getLeaveStatus();
    	delete $localStorage.spheresuite['leaveRequestId'];
    }
    
    function addMoreItems(){
    	leaveManagementControllerScope.limitToShow += 5;
    }
    
    function checkLeaveAvailability(id){
    	if(id){
			leaveManagementControllerScope.msg = "";
			leaveManagementControllerScope.errMsg = "";
			leaveManagementControllerScope.spinner = true;
			leaveManagementControllerScope.isFormValid = false;
    		leaveManagementControllerScope.checkLeave = {days: 0};
    		var data;
			for(var i = 0; i < leaveManagementControllerScope.leaveAssignedByCompanyList.length; i++){
				if(leaveManagementControllerScope.leaveAssignedByCompanyList[i].type == id){
			    	leaveManagementControllerScope.checkLeave = leaveManagementControllerScope.leaveAssignedByCompanyList[i];
					leaveManagementControllerScope.checkLeave.leaveTaken = 0;
					data = {
							empId: $localStorage.spheresuite.id,
							leaveTypeFromDate: leaveManagementControllerScope.checkLeave.fromDate,
							leaveTypeToDate: leaveManagementControllerScope.checkLeave.toDate,
							type: id
					}
				}
			}
			if(data){
				leaveManagementService.checkLeaveAvailability(data).then(function(res){
			    	if(res.successflag == 'true' && res.results.length > 0){
						leaveManagementControllerScope.checkLeave.leaveTaken = res.results[0].count;
					}
					leaveManagementControllerScope.msg = "You have taken "+leaveManagementControllerScope.checkLeave.leaveTaken+ " of "+leaveManagementControllerScope.checkLeave.days + " " + leaveManagementControllerScope.checkLeave.typeName + " leaves";
					if(leaveManagementControllerScope.checkLeave.leaveTaken == leaveManagementControllerScope.checkLeave.days){
						leaveManagementControllerScope.errMsg = "Leave will consider has LOP";
					}
					leaveManagementControllerScope.isFormValid = true;
		    		leaveManagementControllerScope.spinner = false;
				},function(err){
					leaveManagementControllerScope.msg = "";
					leaveManagementControllerScope.errMsg = "";
		    		leaveManagementControllerScope.spinner = false;
					leaveManagementControllerScope.isFormValid = false;
				});
			}else{
				leaveManagementControllerScope.msg = '';
				leaveManagementControllerScope.errMsg = "Leave can not be taken";
				leaveManagementControllerScope.isFormValid = false;
				leaveManagementControllerScope.spinner = false;
			}
    	}
    }
    
    function createLeaveRequest(){
    	if(leaveManagementControllerScope.leaveManagement){
    		leaveManagementControllerScope.spinner = true;
	        commonService.formValNotManditory(leaveManagementControllerScope.leaveManagementForm, leaveManagementControllerScope.leaveManagement).then(function(data) {
	        	if(data){
	        		data.updatedBy = $localStorage.spheresuite.id;
	        		data.status = 'p';
	        		data.comment = '';
	        		data.leaveTypeFromDate = leaveManagementControllerScope.checkLeave.fromDate;
	        		data.leaveTypeToDate = leaveManagementControllerScope.checkLeave.toDate;
	        		if(data.leaveday == "Multiple"){
	        			delete data['hours'];
	        			delete data['date'];
		        		data.fromDate = $filter('date')(data.fromDate, "dd MM yyyy");
		        		data.toDate = $filter('date')(data.toDate, "dd MM yyyy");
	        		}else if(data.leaveday == "Partial" || data.leaveday == "Single"){
	        			delete data['fromDate'];
	        			delete data['toDate'];
		        		data.date = $filter('date')(data.date, "dd MM yyyy");
	        		}
	        		if(data.leaveday == "Single"){
	        			delete data['hours'];
		        	}
	        		leaveManagementService.createLeaveRequest(data).then(function(res){
	        	    	if(res.successflag == 'true'){
	        	    		leaveManagementControllerScope.spinner = false;
	        				decline();
	        				$location.path('/leaves');
	        			}else{
	        	    		leaveManagementControllerScope.spinner = false;
	        			}
	        		},function(err){
	            		leaveManagementControllerScope.spinner = false;
	        		});
	        	}
	        },function(err){
	    		leaveManagementControllerScope.spinner = false;
	        });    		
    	}
    }
    
    function decline(){
    	if($location.path() == '/leave/companiesrequest/edit'){
    		$location.path('/leave/companiesrequest/view');
    	}else{
			leaveManagementControllerScope.isFormValid = false;
    		leaveManagementControllerScope.leaveManagement = null;
    		leaveManagementControllerScope.leaveManagementForm.$setPristine();
    		leaveManagementControllerScope.leaveManagementForm.$setUntouched();
    	}
    }
    
    function checkEmptyList(){
    	leaveManagementControllerScope.msg = '';
    	if(leaveManagementControllerScope.search && leaveManagementControllerScope.leaveManagementList){
    		var len = ($filter('filter')(leaveManagementControllerScope.leaveManagementList, leaveManagementControllerScope.search)).length;
    			
    		if(len == 0)
    			leaveManagementControllerScope.msg = 'Leave Not Available';
    	}
    }
    
    function checkEmptyListLeaveStatus(){
    	leaveManagementControllerScope.msg = '';
    	if(leaveManagementControllerScope.search && leaveManagementControllerScope.leaveStatusList){
    		var len = ($filter('filter')(leaveManagementControllerScope.leaveStatusList, leaveManagementControllerScope.search)).length;
    			
    		if(len == 0)
    			leaveManagementControllerScope.msg = 'Leave Status Not Available';
    	}
    }
    
    
    
    function editLeaveRequest(){
    	if(leaveManagementControllerScope.leaveManagement){
    		leaveManagementControllerScope.spinner = true;
    		leaveManagementControllerScope.leaveManagement.updatedBy = $localStorage.spheresuite.id;
    		if(leaveManagementControllerScope.leaveManagement.leaveday == "Multiple"){
    			delete leaveManagementControllerScope.leaveManagement['hours'];
    			delete leaveManagementControllerScope.leaveManagement['date'];
    			leaveManagementControllerScope.leaveManagement.fromDate = $filter('date')(leaveManagementControllerScope.leaveManagement.fromDate, "dd MM yyyy");
    			leaveManagementControllerScope.leaveManagement.toDate = $filter('date')(leaveManagementControllerScope.leaveManagement.toDate, "dd MM yyyy");
    		}else if(leaveManagementControllerScope.leaveManagement.leaveday == "Partial" || leaveManagementControllerScope.leaveManagement.leaveday == "Single"){
    			delete leaveManagementControllerScope.leaveManagement['fromDate'];
    			delete leaveManagementControllerScope.leaveManagement['toDate'];
    			leaveManagementControllerScope.leaveManagement.date = $filter('date')(leaveManagementControllerScope.leaveManagement.date, "dd MM yyyy");
    		}
    		if(leaveManagementControllerScope.leaveManagement.leaveday == "Single"){
    			delete leaveManagementControllerScope.leaveManagement['hours'];
        	}
    		if($location.path() == '/leave/edit'){
    			leaveManagementControllerScope.leaveManagement.status = 'p';
    		}
    		leaveManagementService.editLeaveRequest(leaveManagementControllerScope.leaveManagement).then(function(res){
    	    	if(res.successflag == 'true'){
    	    		leaveManagementControllerScope.spinner = false;
    				decline();
    				if($location.path() == '/leave/companiesrequest/edit'){
    					$location.path('/leave/companiesrequests');
    				}else if($location.path() == '/leave/edit'){
    					$location.path('/leave/view');
    				}
    			}else{
    	    		leaveManagementControllerScope.spinner = false;
    			}
    		},function(err){
        		leaveManagementControllerScope.spinner = false;
    		});
    	}
    }
    
    function getDateDifference(from, to){
    	if(from && to){
    		from = moment(from);
    		to = moment(to);
    		console.log("leaveManagementControllerScope.checkLeave",leaveManagementControllerScope.checkLeave);
    		console.log("leaveManagementControllerScope.checkLeave.leaveTaken + to.diff(from, 'days')",leaveManagementControllerScope.checkLeave.leaveTaken + to.diff(from, 'days'));
    		if(leaveManagementControllerScope.checkLeave && (leaveManagementControllerScope.checkLeave.leaveTaken + to.diff(from, 'days')) > leaveManagementControllerScope.checkLeave.days){
    			var diff = (leaveManagementControllerScope.checkLeave.leaveTaken + to.diff(from, 'days')) - leaveManagementControllerScope.checkLeave.days;
    			leaveManagementControllerScope.errMsg = "You will be considered " + diff +" days of LOP from "+ to.diff(from, 'days')+ " days";
    		}
    	}
    }
    
    function getLeaveAssingedByCompany(){
		leaveManagementControllerScope.leaveAssignedByCompanyList = [];
		leaveManagementControllerScope.spinner = true;
		leaveManagementService.getLeaveAssingedByCompany().then(function(res){
			if(res.successflag == 'true' && res.results.length > 0){
				leaveManagementControllerScope.leaveAssignedByCompanyList = res.results;
			}
    		leaveManagementControllerScope.spinner = false;
		},function(err){
    		leaveManagementControllerScope.spinner = false;
		});
    }
    
    function getLeaveRequest(data, type){
		leaveManagementControllerScope.msg = '';
		leaveManagementControllerScope.getSpinner = true;
		leaveManagementService.getLeaveRequest(data, type).then(function(res){
			console.log('getLeaveRequest res',res)
			if(res.successflag == 'true' && res.results.length > 0){
				console.log(moment("2017 11 20"))
				if($location.path() == '/leave/edit' || $location.path() == '/leave/view' || $location.path() == '/leave/companiesrequest/view' || $location.path() == '/leave/companiesrequest/edit'){
					leaveManagementControllerScope.leaveManagement = res.results[0];
					if($location.path() == '/leave/view' && leaveManagementControllerScope.leaveManagement.status == 'p' || leaveManagementControllerScope.leaveManagement.status == 'a' || leaveManagementControllerScope.leaveManagement.status == 'r'){
						leaveManagementControllerScope.isHideEdit = false;
					}else if($location.path() == '/leave/companiesrequest/view' && leaveManagementControllerScope.leaveManagement.status == 'a' || leaveManagementControllerScope.leaveManagement.status == 'r'){
						leaveManagementControllerScope.isHideEdit = false;
					}else{
						leaveManagementControllerScope.isHideEdit = true;
					}
				}else{
					leaveManagementControllerScope.leaveManagementList = res.results;
				}
				leaveManagementControllerScope.getSpinner = false;
			}else{
				leaveManagementControllerScope.msg = 'Leaves Request Not Available';
				leaveManagementControllerScope.getSpinner = false;
			}
		},function(err){
			leaveManagementControllerScope.msg = 'Leaves Request Not Available';
			leaveManagementControllerScope.getSpinner = false;
		});
    }
    
    function getLeaveRequestType(){
		leaveManagementControllerScope.spinner = true;
		configurationService.getmanageLeaves().then(function(res){
			if(res.successflag == 'true' && res.results.length > 0){
			    leaveManagementControllerScope.leaveRequestTypeList = res.results;
			}
			leaveManagementControllerScope.spinner = false;
		},function(err){
				leaveManagementControllerScope.spinner = false;
		});
    }
    
    function getLeaveStatus(){
		leaveManagementControllerScope.msg = '';
		leaveManagementControllerScope.spinner = true;
		leaveManagementService.getLeaveStatus().then(function(res){
			if(res.successflag == 'true' && res.results.length > 0){
				console.log('getLeaveStatus res',res);
				leaveManagementControllerScope.leaveStatusList = [];
				
				
				var results = angular.copy(res.results);
//				var leaveManagementControllerScope.leaveStatusList = [];
				
				angular.forEach(results,function(val){
					var found = false;
					console.log('newList',leaveManagementControllerScope.leaveStatusList)
					for(var i = 0; i < leaveManagementControllerScope.leaveStatusList.length; i++){
						if(leaveManagementControllerScope.leaveStatusList[i].empId == val.empId){
							var typeFound = false;
							for(var j = 0; j < leaveManagementControllerScope.leaveStatusList[i].types.length; j++){
								if(leaveManagementControllerScope.leaveStatusList[i].types[j].type == val.type){
									leaveManagementControllerScope.leaveStatusList[i].types[j].usedLeaves += val.usedLeaves;
//									leaveManagementControllerScope.leaveStatusList[i].total += val.usedLeaves;
									typeFound = true;
								}
							}
							if(!typeFound){
//								leaveManagementControllerScope.leaveStatusList[i].total += val.usedLeaves;
								leaveManagementControllerScope.leaveStatusList[i].types.push({type : val.type, typeName : val.typeName, usedLeaves : val.usedLeaves, days : val.days});
							}
							found = true;
						}
					}
					if(!found){
						leaveManagementControllerScope.leaveStatusList.push({
							empId : val.empId,
							designation : val.designation,
							name : val.name,
//							total: val.usedLeaves,
							types : [{
								type : val.type,
								typeName : val.typeName,
								usedLeaves : val.usedLeaves,
								days : val.days
							}]
						});
					}
				});
				
				console.log('leaveManagementControllerScope.leaveStatusList',leaveManagementControllerScope.leaveStatusList);
				leaveManagementControllerScope.spinner = false;
			}else{
				leaveManagementControllerScope.msg = "Leave Status Not Available";
				leaveManagementControllerScope.spinner = false;
			}
		},function(err){
			leaveManagementControllerScope.msg = "Leave Status Not Available";
			leaveManagementControllerScope.spinner = false;
		});
    }
    
    function goToEditLeaveRequest(){
		if($location.path() == '/leave/view'){
			$location.path('/leave/edit');
		}else if($location.path() == '/leave/companiesrequest/view'){
	    	$location.path('/leave/companiesrequest/edit');
		}
    }
    function goToRequest(){
		if($location.path() == '/leave/view'){
			$location.path('/leaves');
		}else if($location.path() == '/leave/companiesrequest/view'){
			$location.path('/leave/companiesrequests');
		}    	
    }
    
    function goToView(id){
    	if(id){
    		$localStorage.spheresuite.leaveRequestId = id;
    		if($location.path() == '/leaves'){
    			$location.path('/leave/view');
    		}else if($location.path() == '/leave/companiesrequests'){
    			$location.path('/leave/companiesrequest/view');
    		}
    	}
    }
    
    function openFromCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        leaveManagementControllerScope.isOpenFromDate = !leaveManagementControllerScope.isOpenFromDate;
    }
    
    function openToCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        leaveManagementControllerScope.isOpenToDate = !leaveManagementControllerScope.isOpenToDate;
    }
    
    function exportData() {
        $scope.fileName = "Leave Request";
        $scope.exportData = []; 
        $scope.exportData.push(["Id", "Created By", "Created On", "Leave Day", "Date", "From Date", "To Date", "Hours", "Status", "Type", "Type Name", "Description For Leave", "Comment", "Updatedon", "UpdatedBy"]);
        $scope.Filterdata = leaveManagementControllerScope.leaveManagementList;
        var firstFiter = $filter('filter')(leaveManagementControllerScope.leaveManagementList, { status: leaveManagementControllerScope.status });
        $scope.Filterdata = $filter('filter')(firstFiter, leaveManagementControllerScope.search);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.createdBy, value.createdon, value.leaveday, value.date, value.fromDate, value.toDate, value.hours, value.status, value.type, value.typeName, value.desc, value.comment, value.updatedon, value.updatedBy]);
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
    
    $('.select1').select2();
}