var app = angular.module('spheresuite')
app.controller('timeSheetController', timeSheetController);

timeSheetController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', '$filter', 'commonService', 'configurationService', 'timeSheetService'];

function timeSheetController($scope, $rootScope, $location, $localStorage, $filter, commonService, configurationService, timeSheetService) {
    var timeSheetControllerScope = this;

    $rootScope.headerMenu = "Timesheets";
    
    $scope.format = "MMM dd, yyyy";

    timeSheetControllerScope.limitToShow = 5;
    timeSheetControllerScope.msg = '';
    timeSheetControllerScope.isDateCalenderOpen = false;
    timeSheetControllerScope.isCompanyUpdate = false;
    timeSheetControllerScope.isUpdate = false;
    timeSheetControllerScope.isShowEditButton = false;
    timeSheetControllerScope.isShowTimeSheetField = false;
	timeSheetControllerScope.isSubmitAvailable = false;
    timeSheetControllerScope.timeSheet;
    timeSheetControllerScope.timeSheetForm;
    timeSheetControllerScope.timeSheetGetList;
    timeSheetControllerScope.timeSheetList = [];
    timeSheetControllerScope.timeSheetTypeList;

    timeSheetControllerScope.addMoreItems = addMoreItems;
    timeSheetControllerScope.createTimeSheet = createTimeSheet;
    timeSheetControllerScope.dateSelected = dateSelected;
    timeSheetControllerScope.decline = decline;
    timeSheetControllerScope.getTimeSheet = getTimeSheet;
    timeSheetControllerScope.editTimeSheet = editTimeSheet;
    timeSheetControllerScope.getTimeSheetType = getTimeSheetType;
    timeSheetControllerScope.goBack = goBack;
    timeSheetControllerScope.gotoEdit = gotoEdit;
    timeSheetControllerScope.gotoView = gotoView;
    timeSheetControllerScope.openDateCalender = openDateCalender;
    timeSheetControllerScope.checkEmptyList = checkEmptyList;
    
    if($location.path() == '/timesheet/add'){
    	getTimeSheetType();
    }else if($location.path() == '/timesheet/edit' || $location.path() == '/timesheet/companiestimesheet/edit'){
    	timeSheetControllerScope.isUpdate = true;
    	getTimeSheetType();
    	if($location.path() == '/timesheet/companiestimesheet/edit'){
        	dateSelected($localStorage.spheresuite.timeSheet.weekenddate, $localStorage.spheresuite.timeSheet.empId);
    		timeSheetControllerScope.isCompanyUpdate = true;
    	}else{
        	dateSelected($localStorage.spheresuite.timeSheet.weekenddate);
    	}
    }else if($location.path() == '/timesheet/view'){
    	dateSelected($localStorage.spheresuite.timeSheet.weekenddate);
    }else if($location.path() == '/timesheet/companiestimesheet/view'){
    	dateSelected($localStorage.spheresuite.timeSheet.weekenddate,$localStorage.spheresuite.timeSheet.empId);
    }else if($location.path() == '/timesheets'){
    	delete $localStorage.spheresuite['timesheet'];
    	getTimeSheet($localStorage.spheresuite.id);
    }else if( $location.path() == '/timesheet/companiestimesheets'){
    	delete $localStorage.spheresuite['timesheet'];
    	getTimeSheet();
    }
    
    function addMoreItems(){
    	timeSheetControllerScope.limitToShow += 5;
    }
    
    function createTimeSheet(){
    	timeSheetControllerScope.msg = '';
    	if(timeSheetControllerScope.timeSheet && timeSheetControllerScope.timeSheetList){
    		timeSheetControllerScope.spinner = true;
    		timeSheetControllerScope.timeSheet.weekenddate = $filter('date')(timeSheetControllerScope.timeSheet.weekenddate, 'MMM dd, yyyy');
    		timeSheetControllerScope.timeSheet.updatedBy = $localStorage.spheresuite.id;
    		timeSheetControllerScope.timeSheet.empId = $localStorage.spheresuite.id;
    		timeSheetControllerScope.timeSheet.status = 'd';
    		timeSheetControllerScope.timeSheet.timeSheetList = [];
    		
    		var newObj = [];
    		var canSave = true;

    		console.log('timeSheetControllerScope.timeSheetList',timeSheetControllerScope.timeSheetList);
			delete timeSheetControllerScope.timeSheet['selectedDate'];
    		angular.forEach(timeSheetControllerScope.timeSheetList,function(val){
    			if(val.isNew && !val.isDisabled && val.type != '' && val.hours != ''){
    				if(parseInt(val.hours) <= 0){
    					canSave = false;
    				}
    				delete val['isDisabled'];
    				delete val['isNew'];
    				delete val['$$hashKey'];
    				if(!val.desc){
    					val.desc = '';
    				}
    				newObj.push(val);
    			}
    		});
    		if(newObj.length > 0 && canSave){
	    		timeSheetControllerScope.timeSheet.timeSheetList = newObj;
	    		console.log('createTimeSheet',timeSheetControllerScope.timeSheet);
	    		timeSheetService.createTimeSheet(timeSheetControllerScope.timeSheet).then(function(res){
	    			if(res.successflag == 'true'){
	    				decline();
	    				$location.path('/timesheets')
	    			}
	        		timeSheetControllerScope.spinner = false;
	    		},function(err){
	        		timeSheetControllerScope.spinner = false;
	    		});
    		}else{
        		timeSheetControllerScope.spinner = false;
        		if(!canSave){
        			timeSheetControllerScope.msg = "Kindly Enter Valid Hours";
        		}else{
	    			timeSheetControllerScope.msg = "Enter New Timesheet And Try Again";
	    		}
    		}
    	}
    }
    
    function dateSelected(date, empId){
    	if(date){
    		timeSheetControllerScope.spinner = true;
			timeSheetControllerScope.isSubmitAvailable = false;
    		timeSheetControllerScope.timeSheetList = [];
    		var startDate = moment(date).startOf('isoWeek').isoWeekday(1);
	    	for (var i=0; i<6; i++) {	    		
	    		timeSheetControllerScope.timeSheetList.push({
	    			date: startDate.format('MMM DD, YYYY ( ddd )'),
	    			type: '', 
	    			hours: '',
	    			description: '',
	    			isDisabled: true,
	    			isNew: true
	    		});

	    		// was before "moment(new Date()).diff(startDate, 'days').toString() > 0"
		    	if(Number(moment(new Date()).diff(startDate, 'days')) > 0 || moment(startDate).isSame(new Date(),'day')){
		    		timeSheetControllerScope.timeSheetList[i].isDisabled = false;
	    		}
		    	startDate.add(1, 'd');

	    	}
	    	if(!empId){
	    		empId = $localStorage.spheresuite.id;
	    	}
	    	var data = {weekenddate: moment(date).isoWeekday(6).format('MMM DD, YYYY'),empId: empId};

    		timeSheetService.getWeeklyTimesheet(data).then(function(res){
    			console.log('getWeeklyTimesheet',res);
    			if(res.successflag == 'true' && res.results.length > 0){
    				timeSheetControllerScope.isSubmitAvailable = true;
    				angular.forEach(res.results, function(val){
    					for(var i = 0; i < timeSheetControllerScope.timeSheetList.length; i++){
    						if(moment(timeSheetControllerScope.timeSheetList[i].date).isSame(moment(val.date),'day')){
    							timeSheetControllerScope.timeSheetList[i].type = val.type;
    							timeSheetControllerScope.timeSheetList[i].typeName = val.typeName;
    							timeSheetControllerScope.timeSheetList[i].hours = parseInt(val.hours);
    							timeSheetControllerScope.timeSheetList[i].description = val.description;
    							timeSheetControllerScope.timeSheetList[i].id = val.id;
    							timeSheetControllerScope.timeSheetList[i].status = val.status;

        						if($location.path() == '/timesheet/edit'){
        							timeSheetControllerScope.timeSheetList[i].isDisabled = false;
        						}else{
        							timeSheetControllerScope.timeSheetList[i].isDisabled = true;
        						}
    							timeSheetControllerScope.timeSheetList[i].isNew = false;
    							break;
    						}
    					}
    				});
    				if($location.path() == '/timesheet/view' || $location.path() == '/timesheet/companiestimesheet/view' || $location.path() == '/timesheet/companiestimesheet/edit' || $location.path() == '/timesheet/edit'){
    					timeSheetControllerScope.timeSheet = {
    							weekenddate : $localStorage.spheresuite.timeSheet.weekenddate,
    							status : $localStorage.spheresuite.timeSheet.status,
    							empId : $localStorage.spheresuite.timeSheet.empId,
    							empName : $localStorage.spheresuite.timeSheet.empName,
    							total : $localStorage.spheresuite.timeSheet.total,
    							timeSheetList: timeSheetControllerScope.timeSheetList 
    					}
    					var status = angular.copy(timeSheetControllerScope.timeSheet.status);
    					if($location.path() == '/timesheet/view' && ( status == 'o' || status == 'd')){
    						timeSheetControllerScope.isShowEditButton = true;
    					}else if($location.path() == '/timesheet/companiestimesheet/view' && (status == 'd' || status == 'o' || status == 's')){
    						timeSheetControllerScope.isShowEditButton = true;
    					}
    					status = null;
    				}
    		    	timeSheetControllerScope.spinner = false;
    			}else{
    		    	timeSheetControllerScope.spinner = false;
    			}
    		},function(err){
    	    	timeSheetControllerScope.spinner = false;
    		})
	    	startDate = '';
	    	timeSheetControllerScope.isShowTimeSheetField = true;
			timeSheetControllerScope.timeSheet={weekenddate : moment(date).startOf('isoWeek').isoWeekday(6).format('MMM DD, YYYY')};
    	}
    }
    
    function decline(){
    	if($location.path() == '/timesheet/edit'){
    		$location.path('/timesheets');
    	}else if($location.path() == '/timesheet/companiestimesheet/edit'){
        		$location.path('/timesheet/companiestimesheets');
        }else{
			timeSheetControllerScope.isShowTimeSheetField = false;
			timeSheetControllerScope.timeSheet = null;
			timeSheetControllerScope.timeSheetList = [];
			timeSheetControllerScope.timeSheetForm.$setPristine();
			timeSheetControllerScope.timeSheetForm.$setUntouched();
    	}
    }
    
    function checkEmptyList(){
    	console.log("====");
    	 timeSheetControllerScope.msg = '';
    	if(timeSheetControllerScope.search && timeSheetControllerScope.timeSheetGetList){
    		var len = ($filter('filter')(timeSheetControllerScope.timeSheetGetList, timeSheetControllerScope.search)).length;
    			
    		if(len == 0)
    			timeSheetControllerScope.msg = 'Time Sheet Not Available';
    	}
    }
    
    function editTimeSheet(status){
    	timeSheetControllerScope.msg = '';
    	if(timeSheetControllerScope.timeSheet && timeSheetControllerScope.timeSheetList){
	    	timeSheetControllerScope.spinner = true;   	
    		var newArr = [];
    		var canSave = true;
    		angular.forEach(timeSheetControllerScope.timeSheetList,function(val){
    			if(val.type != '' && val.hours != ''){
    				if(parseInt(val.hours) <= 0){
    					canSave = false;
    				}
					delete val['isDisabled'];
					delete val['isNew'];
					delete val['$$hashKey'];
					if(!val.description){
						val.description = '';
					}
					newArr.push(val);
    			}
    		});
    		console.log('timeSheetControllerScope.timeSheet',timeSheetControllerScope.timeSheet)
    		if(newArr.length > 0 && canSave){
	    		timeSheetControllerScope.timeSheet.timeSheetList = newArr;
	    		timeSheetControllerScope.timeSheet.updatedBy = $localStorage.spheresuite.id;
	    		if($localStorage.spheresuite.timeSheet && $localStorage.spheresuite.timeSheet.empId){
	    			timeSheetControllerScope.timeSheet.empId = $localStorage.spheresuite.timeSheet.empId;
	    		}
	    		if(!status){
	    			timeSheetControllerScope.timeSheet.status = $localStorage.spheresuite.timeSheet.status;
	    		}else{
	    			timeSheetControllerScope.timeSheet.status = status;
	    		} 
	    		
	    		timeSheetService.editTimeSheet(timeSheetControllerScope.timeSheet).then(function(res){
	    			console.log('updates res',res);
	    	    	timeSheetControllerScope.spinner = false;
	    			if(res.successflag == 'true'){
	    				if($location.path() == '/timesheet/companiestimesheet/edit'){
	    					$location.path('/timesheet/companiestimesheets');
	    				}else{
	    					$location.path('/timesheets');
	    				}
	    			}
	    		},function(err){
	    			timeSheetControllerScope.spinner = false;
    	    	});
	    	}else{
	    		if(!canSave){
	    			timeSheetControllerScope.msg = "Kindly Enter Valid Hours";
	    		}else{
	    			timeSheetControllerScope.msg = "Enter New Timesheet And Try Again";
	    		}
    	    	timeSheetControllerScope.spinner = false;
	    	}
    	}
    }
    
    function getTimeSheet(data){
    	timeSheetControllerScope.getSpinner = true;
    	timeSheetService.getTimeSheet(data).then(function(res){
    		console.log('getTimeSheet',res);
    		if(res.successflag == 'true' &&  res.results.length > 0){
    			if($location.path() == '/timesheet/view'|| $location.path() == '/timesheet/companiestimesheet/view'){
    				timeSheetControllerScope.timeSheet = res.results[0];
    				console.log('timeSheetControllerScope.timeSheet',timeSheetControllerScope.timeSheet);
    			}else {
    				timeSheetControllerScope.timeSheetGetList = [];
    				for(var i = 0; i < res.results.length; i++){
    					timeSheetControllerScope.timeSheetGetList[i] = angular.copy(res.results[i]);
    					timeSheetControllerScope.timeSheetGetList[i].timeSheetList = [];
    					for(var j = 0; j < res.results[i].timeSheetList.length; j++){
    						var found = false;
    						for(var k = 0; k < timeSheetControllerScope.timeSheetGetList[i].timeSheetList.length; k++){
            					if(timeSheetControllerScope.timeSheetGetList[i].timeSheetList[k].type == res.results[i].timeSheetList[j].type){
            						timeSheetControllerScope.timeSheetGetList[i].timeSheetList[k].hours = parseInt(timeSheetControllerScope.timeSheetGetList[i].timeSheetList[k].hours) + parseInt(res.results[i].timeSheetList[j].hours);
            						found = true;
            					}	
    						}
    						if(!found){
    							timeSheetControllerScope.timeSheetGetList[i].timeSheetList.push(res.results[i].timeSheetList[j]);
    						}
    					}
    				}
    				console.log('timeSheetControllerScope.timeSheetGetList',timeSheetControllerScope.timeSheetGetList);
    			}
    	    	timeSheetControllerScope.getSpinner = false;
    		}else{
    			timeSheetControllerScope.msg = 'Timesheets not available';
    	    	timeSheetControllerScope.getSpinner = false;
    		}
    	},function(err){
			timeSheetControllerScope.msg = 'Timesheets not available';
	    	timeSheetControllerScope.getSpinner = false;
    	})
    }
    
    
    function getTimeSheetType(){
    	timeSheetControllerScope.spinner = true;
    	configurationService.getTimeSheetType().then(function(res){
    		console.log('getTimeSheetType res',res)
    		if(res.successflag == 'true' && res.results.length > 0){
    			timeSheetControllerScope.timeSheetTypeList = res.results; 
    		}
    		timeSheetControllerScope.spinner = false;
    	},function(err){
    		timeSheetControllerScope.spinner = false;	
    	});
    }
    
    function goBack(){
    	if($location.path() == '/timesheet/view'){
    		$location.path('/timesheets');
    	}else if($location.path() == '/timesheet/companiestimesheet/view'){
        		$location.path('/timesheet/companiestimesheets');
    	}
    }
    
    function gotoEdit(weekenddate, empId, status){
    	$localStorage.spheresuite.timeSheet = {weekenddate: weekenddate, empId: empId, status: status};
    	if($location.path() == '/timesheet/view'){
    		$location.path('/timesheet/edit');
    	}else if($location.path() == '/timesheet/companiestimesheet/view'){
    		$location.path('/timesheet/companiestimesheet/edit');
    	}
    }
    
    function gotoView(weekenddate, empId, empName, status, total){
    	console.log('total',total)
    	$localStorage.spheresuite.timeSheet = {weekenddate: weekenddate, empId: empId, empName: empName, status: status, total: total};
    	if($location.path() == '/timesheets'){
    		$location.path('/timesheet/view');
    	}else if($location.path() == '/timesheet/companiestimesheets'){
    		$location.path('/timesheet/companiestimesheet/view');
    	}
    }
    
    function openDateCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        timeSheetControllerScope.isDateCalenderOpen = !timeSheetControllerScope.isDateCalenderOpen;
    }
    
    $('.select1').select2();
}