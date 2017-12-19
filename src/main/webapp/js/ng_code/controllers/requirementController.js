angular
    .module('spheresuite')
    .controller('requirementController', requirementController);

requirementController.$inject = ['$rootScope', '$scope', '$filter', '$location', '$localStorage', 'commonService', 'leadService', 'opportunityService', 'requirementService'];

function requirementController($rootScope, $scope, $filter, $location, $localStorage, commonService, leadService, opportunityService, requirementService) {
	
	var requirementControllerScope = this;

    $rootScope.headerMenu = "Requirements";
    $scope.format = "MMM dd, yyyy";
    
    requirementControllerScope.customerList;
    requirementControllerScope.isCalenderOpen = false;
    requirementControllerScope.isUpdate = false;
    requirementControllerScope.msg = '';
    requirementControllerScope.projectList;
    requirementControllerScope.requirement;
    requirementControllerScope.requirementForm;
    requirementControllerScope.requirementList;
    
    requirementControllerScope.addRequirement = addRequirement;
    requirementControllerScope.decline = decline;
    requirementControllerScope.editRequirement = editRequirement;
    requirementControllerScope.exportData = exportData;
    requirementControllerScope.getCustomer = getCustomer;
    requirementControllerScope.getOpportunity = getOpportunity;
    requirementControllerScope.getRequirement = getRequirement;
    requirementControllerScope.gotoEdit = gotoEdit;
    requirementControllerScope.gotoView = gotoView;
    requirementControllerScope.opendateCalender = opendateCalender;
    
    if($location.path() == '/requirement/add'){
    	delete $localStorage.spheresuite['requirementId'];
    	getCustomer('C');
    }else if($location.path() == '/requirement/edit'){
        requirementControllerScope.isUpdate = true;
    	getRequirement($localStorage.spheresuite.requirementId);
    	getCustomer('C');
    }else if($location.path() == '/requirement/view'){
    	getRequirement($localStorage.spheresuite.requirementId);
    }else if($location.path() == '/requirements'){
    	delete $localStorage.spheresuite['requirementId'];
    	getRequirement(); 
    }
    
    function addRequirement(){
    	if(requirementControllerScope.requirement){
    		requirementControllerScope.spinner = true;
	   		 commonService.formValNotManditory(requirementControllerScope.requirementForm, requirementControllerScope.requirement).then(function(data) {
	                if (data) {
	                    data.updatedBy = $localStorage.spheresuite.id;
	            		if(data.joiningDate != ''){
	            			data.joiningDate = $filter('date')(data.joiningDate, 'MMM dd, yyyy');
	            		}
	                    requirementService.addRequirement(data).then(function(res){
	                   	if(res.successflag == 'true'){
		       	       		 decline();
		       		       	 requirementControllerScope.spinner = false;
		       	       		 $location.path('/requirements');
		       	       	 }else{
		       		       	 requirementControllerScope.spinner = false;
		       	       	 }
                    },function(err){
                   	 requirementControllerScope.spinner = false;
                    });
                }else{
            		requirementControllerScope.spinner = false;
                }
	   		 });
    	}
    }
    
    function decline(){
    	if($location.path() == '/requirement/edit'){
    		$location.path('/requirement/view');
    	}else if($location.path() == '/requirement/add') {
    		requirementControllerScope.requirement = null;
    		requirementControllerScope.requirementForm.$setPristine();
    		requirementControllerScope.requirementForm.$setUntouched();
    	}
    }
    
    function editRequirement(requirement){
    	if(requirement){
    		if(requirement.status == "O"){
    			requirement.status = "C"
    		}else if(requirement.status == "C"){
        			requirement.status = "O"
        	}
    		requirementControllerScope.requirement = requirement;
    	}
    	if(requirementControllerScope.requirement){
    		requirementControllerScope.spinner = true;
    		requirementControllerScope.requirement.updatedBy = $localStorage.spheresuite.id;
    		requirementControllerScope.requirement.joiningDate = $filter('date')(requirementControllerScope.requirement.joiningDate, 'MMM dd, yyyy');
	        requirementService.editRequirement(requirementControllerScope.requirement).then(function(res){
	       	 if(res.successflag == 'true'){
	       		 decline();
		       	 requirementControllerScope.spinner = false;
	       		 $location.path('/requirements');
	       	 }else{
		       	 requirementControllerScope.spinner = false;
	       	 }
	        },function(err){
	       	 requirementControllerScope.spinner = false;
	        });
    	}
    }
    
    function exportData(){
    	$scope.fileName = $rootScope.headerMenu;
        $scope.exportData = [];
        // Headers:
        $scope.exportData.push(["Id", "Name", "Cost", "Customer Id", "Cutomer Name", "Job Desc", "Joining Date", "Max Exp", "Min Exp", "No Of Posititon", "Notice Period", "Project Id", "Project Name", "Status", "Comment", "Updated By", "Updated On"]);
        $scope.Filterdata = requirementControllerScope.requirementList;

        var firstFiter = $filter('filter')(requirementControllerScope.requirementList, { status : requirementControllerScope.customer });
        $scope.Filterdata = $filter('filter')(firstFiter, requirementControllerScope.searchName);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.name, value.cost, value.customerId, value.cutomerName, value.jobDesc, value.joiningDate, value.maxExp, value.minExp, value.noofPosititon, value.noticePeriod, value.projectId, value.projectName, value.status, value.comment, value.updatedBy, value.updatedon]);
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
    
    function getCustomer(type) {
    	requirementControllerScope.spinner = true;
        leadService.getLeadByType(type).then(function(res) {
        	if (res.successflag == 'true' && res.results.length > 0) {
                requirementControllerScope.customerList = res.results;
                requirementControllerScope.spinner = false;
            } else {
                requirementControllerScope.spinner = false;
            }
        }, function(err) {
            requirementControllerScope.spinner = false;
        });
    }
    
    function getOpportunity(data){
    	requirementControllerScope.projectList = '';
    	if(requirementControllerScope.requirement && requirementControllerScope.requirement.projectId){
    		requirementControllerScope.requirement.projectId = '';
    	}
    	requirementControllerScope.spinner = true;
        opportunityService.getOpportunity(data).then(function(res) {
        	if (res.successflag == 'true' && res.results.length > 0) {
        		requirementControllerScope.projectList = res.results;
        		requirementControllerScope.spinner = false;
        	}else{
        		requirementControllerScope.spinner = false;
        	}
        },function(err){
            requirementControllerScope.spinner = false;
        });
    }
    
    function getRequirement(data){
		requirementControllerScope.msg = '';
		requirementControllerScope.getSpinner = true;
        requirementService.getRequirement(data).then(function(res){
		   	 if(res.successflag == 'true' && res.results.length > 0){
		   		 if(data){
		   			 getOpportunity(res.results[0].customerId);
		   			 requirementControllerScope.requirement = res.results[0];
		   		 }else{
		   			 

	                    requirementControllerScope.requirementListBackup = angular.copy(res.results);
	                    requirementControllerScope.isDataAvailable = true;

	                	for(var i = 0; i < requirementControllerScope.requirementListBackup.length; i++){
	                    	requirementControllerScope.requirementListBackup[i].isActiveClass = false;
	                    	requirementControllerScope.requirementListBackup[i].isSelect = false;
	                	}

	                    requirementControllerScope.requirementList =  angular.copy(requirementControllerScope.requirementListBackup);
	                	if((requirementControllerScope.buttonBeginFrom + requirementControllerScope.buttonLimitToShow) * requirementControllerScope.buttonLimitToShow >= requirementControllerScope.requirementList.length)
	                		requirementControllerScope.isNextDisabled = true;
	                	
	                	requirementControllerScope.requirementList[0].isActiveClass = true;
		   			 
		   		 }
		       	 requirementControllerScope.getSpinner = false;
		   	 }else{
		 		requirementControllerScope.msg = 'Requirement Not Available';
		       	 requirementControllerScope.getSpinner = false;
		   	 }
        },function(err){
     		requirementControllerScope.msg = 'Requirement Not Available';
     		requirementControllerScope.getSpinner = false;
        });
    }
    
    function gotoEdit(){
    	$location.path('/requirement/edit');
    }
    
    function gotoView(id){
    	if(id){
    		$localStorage.spheresuite.requirementId = id;
    		$location.path('/requirement/view');
    	}else{
    		$location.path('/requirements');
    	}
    }
    

    function opendateCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        requirementControllerScope.isCalenderOpen = !requirementControllerScope.isCalenderOpen;
    };

    
    
 
    
    $rootScope.limitToShow = 10;
    $rootScope.beginFrom = 0;
//	var id = [];
    
    requirementControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
    requirementControllerScope.buttonBeginFrom = 0;
//	requirementControllerScope.isCannotDelete = false;
	requirementControllerScope.isNextDisabled = false;
//	requirementControllerScope.isSingleRecordToDelete = false;
	
//	requirementControllerScope.closeModal = closeModal;
//    requirementControllerScope.deleteRequirement = deleteRequirement;
    requirementControllerScope.gotoPage = gotoPage;
	requirementControllerScope.searchMe = searchMe;
	requirementControllerScope.showPrevNav = showPrevNav;
    requirementControllerScope.showNextNav = showNextNav;
    requirementControllerScope.toggleSelect = toggleSelect;
//    requirementControllerScope.showDelete = showDelete;
    
//    function showDelete(){
//    	requirementControllerScope.spinner = true;
//    	requirementControllerScope.isSingleRecordToDelete = false;
//		requirementControllerScope.isCannotDelete = false;
//    	var filteredData = $filter('orderBy')(requirementControllerScope.requirementList, '-id');
//    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
//    	if(requirementControllerScope.search)
//    		filteredData = $filter('filter')(filteredData, requirementControllerScope.search);
//    	if(requirementControllerScope.searchName)
//    		filteredData = $filter('filter')(filteredData, requirementControllerScope.searchName);
//		id = [];
//    	for(var i = 0; i < filteredData.length; i++){
//    		if(filteredData[i].isSelect){
//    			id.push({id:filteredData[i].id});
//    		}
//    	}
//		console.log('id',JSON.stringify(id));
//    	if(id.length > 0){
//    		if(id.length == 1){
//    			requirementControllerScope.isSingleRecordToDelete = true;
//    		}
//    		requirementControllerScope.spinner = false;
//    		$('#confirmation').modal('show');
//    	}else{
//    		requirementControllerScope.spinner = false;
//    	}
//    }
//    
//    function closeModal(){
//		$('#confirmation').modal('hide');
//    }
//    
//    function deleteRequirement(){
//
//		console.log('deleteRequirement');
//    	if(id.length > 0){
//    		requirementControllerScope.isCannotDelete = false;
//    		requirementService.deleteRequirement(id).then(function(res){
//    			console.log('deleteLead res',res);
//    			if(res.successflag == 'true'){
//    				$('#confirmation').modal('hide');
//    				getLead({ type: $scope.type });
//    			}else{
//    				$('#confirmation').modal('hide');
//					if(requirementControllerScope.isSingleRecordToDelete){
//						requirementControllerScope.isSingleRecordToDelete = false;
//    		    		requirementControllerScope.isCannotDelete = true;
//	    				setTimeout(function(){
//	        		    		requirementControllerScope.isCannotDelete = true;
//	            				$('#confirmation').modal('show');
//	    				},1000);
//    				}
//    				
//    					
//    	    		requirementControllerScope.spinner = false;
//    			}
//        		requirementControllerScope.isSelect = false;
//    		}, function(err){
//        		requirementControllerScope.spinner = false;
//    		});
//    	}
//    	
//    }
    
    function gotoPage(index, activeIndex){
    	$rootScope.beginFrom = index;
    	for(var i = 0; i < requirementControllerScope.requirementList.length; i++){
        	console.log(' data[i].isActiveClass', requirementControllerScope.requirementList[i].isActiveClass);
        	requirementControllerScope.requirementList[i].isActiveClass = false;
    	}
    	if(!activeIndex)
    		activeIndex = index
    	requirementControllerScope.requirementList[activeIndex].isActiveClass = true;
    	console.log('index',index, requirementControllerScope.requirementList[index].isActiveClass);
    }
    
    function searchMe(ifMobile){
    	var canEnter = false;
    	requirementControllerScope.isNextDisabled = false;
    	for (var item in requirementControllerScope.search){
    		if(requirementControllerScope.search[item] != ''){
    			canEnter = true;
    		} 
    	}
    	if(ifMobile && requirementControllerScope.searchName != ''){
    		requirementControllerScope.requirementList = $filter('filter')(requirementControllerScope.requirementListBackup, requirementControllerScope.searchName)
    	}else if(canEnter){
    		requirementControllerScope.requirementList = $filter('filter')(requirementControllerScope.requirementListBackup, requirementControllerScope.search);
    	}else {
    		requirementControllerScope.requirementList = angular.copy(requirementControllerScope.requirementListBackup);
    	}
    	$rootScope.beginFrom = 0;
    	for(var i = 0; i < requirementControllerScope.requirementList.length; i++){
        	requirementControllerScope.requirementList[i].isActiveClass = false;
        	requirementControllerScope.requirementList[i].isSelect = requirementControllerScope.isSelect;
    	}
    	if(requirementControllerScope.requirementList[0])
    		requirementControllerScope.requirementList[0].isActiveClass = true;
    	if((requirementControllerScope.buttonBeginFrom + requirementControllerScope.buttonLimitToShow) * requirementControllerScope.buttonLimitToShow >= requirementControllerScope.requirementList.length)
    		requirementControllerScope.isNextDisabled = true;
    }
    
    function showPrevNav(){
		requirementControllerScope.buttonBeginFrom -= requirementControllerScope.buttonLimitToShow;
    	gotoPage(requirementControllerScope.buttonBeginFrom)
		requirementControllerScope.isNextDisabled = false;
	}
	
	function showNextNav(){
		requirementControllerScope.buttonBeginFrom += requirementControllerScope.buttonLimitToShow;
		gotoPage(requirementControllerScope.buttonBeginFrom)
		if((requirementControllerScope.buttonBeginFrom + requirementControllerScope.buttonLimitToShow) * requirementControllerScope.buttonLimitToShow >= requirementControllerScope.requirementList.length)
			requirementControllerScope.isNextDisabled = true;
	}
    

    function toggleSelect(isSelect){
    	requirementControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(requirementControllerScope.requirementList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(requirementControllerScope.search)
    		filteredData = $filter('filter')(filteredData, requirementControllerScope.search);
    	if(requirementControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, requirementControllerScope.searchName);
    	for(var i = 0; i < filteredData.length; i++){
    		filteredData[i].isSelect = isSelect;
    	}
    	console.log('toggleSelect',filteredData)
    	requirementControllerScope.spinner = false; 		
    }
    
    $('.select1').select2();
}