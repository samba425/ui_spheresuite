angular
    .module('spheresuite')
    .controller('projectController', projectController);

projectController.$inject = ['$scope', '$rootScope', '$filter', '$location', '$localStorage', '$routeParams', 'opportunityService','projectService', 'commonService', 'configurationService', 'leadService', 'contactService', 'employeeService'];

function projectController($scope, $rootScope, $filter, $location, $localStorage, $routeParams, opportunityService,projectService, commonService, configurationService, leadService, contactService, employeeService) {
    var projectControllerScope = this;

    $rootScope.headerMenu = "Projects";

    projectControllerScope.employeeList;
    projectControllerScope.gstList;
    projectControllerScope.project;
    projectControllerScope.projectForm;
    projectControllerScope.projectList;
    projectControllerScope.customerList;
    projectControllerScope.isFormInValid = false;
    projectControllerScope.isUpdate = false;
    projectControllerScope.endCalender = false;
    projectControllerScope.startCalender = false;
    projectControllerScope.limitToShow = 5;


    function addMoreItems() {
    	projectControllerScope.limitToShow += 5;
    }

    projectControllerScope.addMoreItems = addMoreItems;
    projectControllerScope.addProject = addProject;
    projectControllerScope.calculateDuration = calculateDuration;
    projectControllerScope.decline = decline;
    projectControllerScope.deleteProject = deleteProject;
    projectControllerScope.editProject = editProject;
    projectControllerScope.exportData = exportData;
    projectControllerScope.getContact = getContact;
    projectControllerScope.getEmployee = getEmployee;
    projectControllerScope.getGstTax = getGstTax;
    projectControllerScope.getProject = getProject;
    projectControllerScope.getProjectType = getProjectType;
    projectControllerScope.goToEditProject = goToEditProject;
    projectControllerScope.goToProjects = goToProjects;
//    projectControllerScope.getCustomer = getCustomer;
    projectControllerScope.openendCalender = openendCalender;
    projectControllerScope.openstartCalender = openstartCalender;
    projectControllerScope.gotoView = gotoView;
    projectControllerScope.getOpportunityType = getOpportunityType;

    
    if ($location.path() == '/project/add'){
//        getCustomer();
    	getEmployee();
        getProjectType();
        getOpportunityType();
        getGstTax()
    	delete $localStorage.spheresuite['projectId']; 	
    }else if ($location.path() == '/project/edit'){
    	projectControllerScope.isUpdate = true;
//        getCustomer();
    	getEmployee(); 
        getProjectType();
        getOpportunityType();
        getGstTax();
    	getProject($localStorage.spheresuite.projectId);
    }else if ($location.path() == '/project/view'){
    	getProject($localStorage.spheresuite.projectId);
    }else if ($location.path() == '/projects'){
    	getProject();
    	delete $localStorage.spheresuite['projectId']; 	
    }

    function addProject() {
    	console.log("projectControllerScope.project",projectControllerScope.project)
        if (projectControllerScope.project) {
        	projectControllerScope.spinner = true;
            commonService.formValNotManditory(projectControllerScope.projectForm, projectControllerScope.project).then(function(data) {
                if (data) {
                	data.enddate = $filter('date')(data.enddate, "MMM dd, yyyy");
                	data.startDate = $filter('date')(data.startDate, "MMM dd, yyyy");
                    projectService.addProject(data).then(function(res) {
                    	console.log('projectControllerScope res',res);
                        if (res.successflag === 'true') {
                        	projectControllerScope.spinner = false;
                            $location.path('/projects');
                        } else {
                        	projectControllerScope.spinner = false;
                        }
                    }, function(err) {
                    	projectControllerScope.spinner = false;
                    });
                }
            }, function(err) {
            	projectControllerScope.spinner = false;
            });
        }

    }
    function getOpportunityType(data) {
    	projectControllerScope.spinner = true;
    	opportunityService.getOpportunity(data).then(function(res) {
    		 console.log("oppertyites",res)
             if (res.successflag == 'true' && res.results.length > 0) {
            	 projectControllerScope.opportunityTypeList = res.results;
            	 projectControllerScope.spinner = false;
            }else{
            	projectControllerScope.spinner = false;
            }
        }, function(err) {
        	projectControllerScope.spinner = false;
        });
    }
    

    
    function calculateDuration(start, end){
    	projectControllerScope.isFormInValid = false;
    	if(start && end){
    		projectControllerScope.project.projectDuration = moment(end).diff(moment(start), 'days') + 1;
    		if(moment(end).diff(moment(start), 'days') + 1 <= 0){
    			projectControllerScope.isFormInValid = true;
    		}
    	}
    }

    function decline() {
        if ($location.path() == '/project/edit') {
            $location.path('/project/view');
        } else {
        	projectControllerScope.project = null;
        	projectControllerScope.projectForm.$setPristine();
        	projectControllerScope.projectForm.$setUntouched();
        	projectControllerScope.projectList = null;
        	projectControllerScope.isUpdate = false;
        }
    }

    function deleteProject(projectID) {
        if (projectID) {
            opportunityService.deleteProject(projectID).then(function(res) {
                if (res.successflag) {
                    getProject();
                }
            }, function(err) {
            });
        }
    }

    function editProject() {
    	console.log("projectControllerScope.project",projectControllerScope.project)
        if (projectControllerScope.project) {
        	projectControllerScope.spinner = false;
            projectService.editProject(projectControllerScope.project).then(function(res) {
            	projectControllerScope.spinner = false;
                if (res.successflag === 'true') {
                    $location.path('/project/view');
                }
            }, function(err) {
            	projectControllerScope.spinner = false;
            });
        }
    }

    function exportData() { 
        $scope.fileName = "Project";
        $scope.exportData = []; 
        $scope.exportData.push(["Id", "Project Name", "Project Code", "Customer Id", "Display Name", "Project Duration", "Start Date", "End Date", "Updatedon", "Updatedby"]);
        $scope.Filterdata = projectControllerScope.projectList;

        var firstFiter = $filter('filter')(projectControllerScope.projectList, { projectTypeName: projectControllerScope.projectType });
        $scope.Filterdata = $filter('filter')(firstFiter, projectControllerScope.searchName);
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
 			console.log('data',data);
 			projectControllerScope.contactList = '';
        	if(!projectControllerScope.project){
        		projectControllerScope.project = {}
        	}
//        	projectControllerScope.project.contactId = '';
        	projectControllerScope.project.updatedBy = '';
        	if(projectControllerScope.employeeList)
        	for(var i = 0; i < projectControllerScope.customerList.length; i++){
        		if(data == projectControllerScope.customerList[i].id){
        			projectControllerScope.project.updatedBy = projectControllerScope.customerList[i].empId;
        			$("#select4").val(projectControllerScope.customerList[i].empId).trigger('change.select2');
        		}
        	}
        	projectControllerScope.spinner = true;
     		contactService.getLeadContact(data).then(function(res) {
     			console.log('getContact res',res);
     			 if (res.successflag === 'true' && res.results.length > 0) {
     				projectControllerScope.contactList = res.results;
     			 }
     			projectControllerScope.spinner = false;
     		},function (err){
     			projectControllerScope.spinner = false;
     		});
    	}
    }

//    function getCustomer() {
//    	projectControllerScope.getSpinner = true;
//        leadService.getLead().then(function(res) {
//        	console.log('getCustomer res',res)
//            if (res.successflag === 'true' && res.results.length > 0) {
//            	projectControllerScope.customerList = res.results;
//            	projectControllerScope.getSpinner = false;
//            } else {
//            	projectControllerScope.getSpinner = false;
//            }
//        }, function(err) {
//        	projectControllerScope.getSpinner = false;
//
//        });
//    }
    
    function getEmployee(){
    	projectControllerScope.spinner = true;
        employeeService.getEmployee().then(function(res){
        	console.log('getEmployee res',res)
        	if(res.successflag == 'true' && res.results.length > 0){
        		projectControllerScope.employeeList = res.results; 
        	}
        	projectControllerScope.spinner = false;
        },function(err){
        	projectControllerScope.spinner = false;
        });
    }
    
    function getGstTax(){
    	projectControllerScope.spinner = true;
        configurationService.getGstTax().then(function(res){
        	console.log('getGstTax res',res)
        	if(res.successflag == 'true' && res.results.length > 0){
        		projectControllerScope.gstList = res.results; 
        	}
        	projectControllerScope.spinner = false;
        },function(err){
        	projectControllerScope.spinner = false;
        });
    }
    
    
    function getProject(data) {
    	projectControllerScope.spinner = true;
        projectService.getProject(data).then(function(res) {
        	console.log('getProject res',res)
            if (res.successflag === 'true' && res.results.length > 0) {
                if ($location.path() == '/project/view' || $location.path() == '/project/edit') {
                	if($location.path() == '/project/edit')
                	getContact(res.results[0].customerId);
                	projectControllerScope.project = res.results[0];
                	console.log("edit page",projectControllerScope.project)
                	projectControllerScope.spinner = false;
                } else {
                	
                	 projectControllerScope.projectListBackup = angular.copy(res.results);
                     projectControllerScope.isDataAvailable = true;

                 	for(var i = 0; i < projectControllerScope.projectListBackup.length; i++){
                     	projectControllerScope.projectListBackup[i].isActiveClass = false;
                     	projectControllerScope.projectListBackup[i].isSelect = false;
                 	}

                     projectControllerScope.projectList =  angular.copy(projectControllerScope.projectListBackup);
                 	if((projectControllerScope.buttonBeginFrom + projectControllerScope.buttonLimitToShow) * projectControllerScope.buttonLimitToShow >= projectControllerScope.projectList.length)
                 		projectControllerScope.isNextDisabled = true;
                 	
                 	projectControllerScope.projectList[0].isActiveClass = true;
                	
                	
                	projectControllerScope.spinner = false;
                }

            }  else {
            	projectControllerScope.spinner = false;
            	projectControllerScope.dataMsg = "Project Not Available";
            }
        }, function(err) {
        	projectControllerScope.spinner = false;
            projectControllerScope.dataMsg = "Project Not Available";
        });

    }

    function getProjectType() {
    	projectControllerScope.spinner = true;
        configurationService.getOpportunity().then(function(res) {
             if (res.successflag == 'true' && res.results.length > 0) {
            	 projectControllerScope.projectTypeList = res.results;
            	 projectControllerScope.spinner = false;
            }else{
            	projectControllerScope.spinner = false;
            }
        }, function(err) {
        	projectControllerScope.spinner = false;
        });
    }


    function goToProjects() {
        $location.path('/projects');
    }


    function goToEditProject(projectID) {
        if (projectID) {
            $localStorage.spheresuite.projectId = projectID;
            $location.path('/project/edit');
        }
    }

    function openstartCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        projectControllerScope.startCalender = !projectControllerScope.startCalender
    };

    function openendCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        projectControllerScope.endCalender = !projectControllerScope.endCalender
    };

    function gotoView(project) {
        if (project) {
            $localStorage.spheresuite.projectId = project;
            $location.path('/project/view');
        }
    }
    
    

    $rootScope.limitToShow = 10;
    $rootScope.beginFrom = 0;
    
    projectControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
    projectControllerScope.buttonBeginFrom = 0;
	projectControllerScope.isNextDisabled = false;

    projectControllerScope.deleteProject = deleteProject;
    projectControllerScope.gotoPage = gotoPage;
	projectControllerScope.searchMe = searchMe;
	projectControllerScope.showPrevNav = showPrevNav;
    projectControllerScope.showNextNav = showNextNav;
    projectControllerScope.toggleSelect = toggleSelect;
    
    function deleteProject(){
    	projectControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(projectControllerScope.projectList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(projectControllerScope.search)
    		filteredData = $filter('filter')(filteredData, projectControllerScope.search);
    	if(projectControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, projectControllerScope.searchName);
    	var id = [];
		
    	for(var i = 0; i < filteredData.length; i++){
    		if(filteredData[i].isSelect){
    			id.push({id:filteredData[i].id});
    		}
    	}
		console.log('id',JSON.stringify(id));
    	projectControllerScope.spinner = false;
    }
    
    function gotoPage(index, activeIndex){
    	$rootScope.beginFrom = index;
    	for(var i = 0; i < projectControllerScope.projectList.length; i++){
        	console.log(' data[i].isActiveClass', projectControllerScope.projectList[i].isActiveClass);
        	projectControllerScope.projectList[i].isActiveClass = false;
    	}
    	if(!activeIndex)
    		activeIndex = index
    	projectControllerScope.projectList[activeIndex].isActiveClass = true;
    	console.log('index',index, projectControllerScope.projectList[index].isActiveClass);
    }
    
    function searchMe(ifMobile){
    	var canEnter = false;
    	projectControllerScope.isNextDisabled = false;
    	for (var item in projectControllerScope.search){
    		if(projectControllerScope.search[item] != ''){
    			canEnter = true;
    		} 
    	}
    	if(ifMobile && projectControllerScope.searchName != ''){
    		projectControllerScope.projectList = $filter('filter')(projectControllerScope.projectListBackup, projectControllerScope.searchName)
    	}else if(canEnter){
    		projectControllerScope.projectList = $filter('filter')(projectControllerScope.projectListBackup, projectControllerScope.search);
    	}else {
    		projectControllerScope.projectList = angular.copy(projectControllerScope.projectListBackup);
    	}
    	$rootScope.beginFrom = 0;
    	for(var i = 0; i < projectControllerScope.projectList.length; i++){
        	projectControllerScope.projectList[i].isActiveClass = false;
        	projectControllerScope.projectList[i].isSelect = projectControllerScope.isSelect;
    	}
    	if(projectControllerScope.projectList[0])
    		projectControllerScope.projectList[0].isActiveClass = true;
    	if((projectControllerScope.buttonBeginFrom + projectControllerScope.buttonLimitToShow) * projectControllerScope.buttonLimitToShow >= projectControllerScope.projectList.length)
    		projectControllerScope.isNextDisabled = true;
    }
    
    function showPrevNav(){
		projectControllerScope.buttonBeginFrom -= projectControllerScope.buttonLimitToShow;
    	gotoPage(projectControllerScope.buttonBeginFrom)
		projectControllerScope.isNextDisabled = false;
	}
	
	function showNextNav(){
		projectControllerScope.buttonBeginFrom += projectControllerScope.buttonLimitToShow;
		gotoPage(projectControllerScope.buttonBeginFrom)
		if((projectControllerScope.buttonBeginFrom + projectControllerScope.buttonLimitToShow) * projectControllerScope.buttonLimitToShow >= projectControllerScope.projectList.length)
			projectControllerScope.isNextDisabled = true;
	}
    

    function toggleSelect(isSelect){
    	projectControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(projectControllerScope.projectList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(projectControllerScope.search)
    		filteredData = $filter('filter')(filteredData, projectControllerScope.search);
    	if(projectControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, projectControllerScope.searchName);
    	for(var i = 0; i < filteredData.length; i++){
    		filteredData[i].isSelect = isSelect;
    	}
    	console.log('toggleSelect',filteredData)
    	projectControllerScope.spinner = false; 		
    }
	
    
    

    $("#select1").select2();
    $("#select2").select2();
    $("#select3").select2();
    $("#select4").select2();
    $("#select5").select2();
}