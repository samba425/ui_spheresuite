var app = angular.module('spheresuite')
app.controller('employeeController', employeeController);

employeeController.$inject = ['$scope', '$rootScope', '$filter', '$location', '$localStorage', 'employeeService', 'userService', 'configurationService', 'commonService', 'Upload'];

function employeeController($scope, $rootScope, $filter, $location, $localStorage, employeeService, userService, configurationService, commonService, Upload) {
    var employeeControllerScope = this;

    if ($location.path() == '/myinfo') {
        $rootScope.headerMenu = "My Info";
    } else {
        $rootScope.headerMenu = "Employees";
    }

    $scope.format = "MMM dd, yyyy";
    
    employeeControllerScope.dummyItems = [];
    employeeControllerScope.addMoreItems = addMoreItems;
    employeeControllerScope.limitToShow = 5;
    employeeControllerScope.addMoreItems = addMoreItems;
    employeeControllerScope.limitToShowAllowance = 5;
    employeeControllerScope.allowanceList = [];
    employeeControllerScope.limitToShowDeduction = 5;
    employeeControllerScope.deductionList = [];

    employeeControllerScope.dateOfBirthCalender = false;
	employeeControllerScope.icon = false;
    employeeControllerScope.employee;
    employeeControllerScope.employeeActiveList;
    employeeControllerScope.employeeForm;
    employeeControllerScope.compensation;
    employeeControllerScope.compensationForm;
    employeeControllerScope.employeeList = [];
    employeeControllerScope.items;
    employeeControllerScope.msg;
    employeeControllerScope.pager = {};
    employeeControllerScope.searchName;
    employeeControllerScope.startCalender = false;
    employeeControllerScope.employeeSearchList = [];
    employeeControllerScope.isDataAvailable = false;
    employeeControllerScope.isUpdate = false;
    employeeControllerScope.isSearchResultFound = false;
    employeeControllerScope.chooseFileSection = true;
    employeeControllerScope.employeeSelected;
    
    employeeControllerScope.addAllowance = addAllowance;
    employeeControllerScope.addNew = addNew;
    employeeControllerScope.goToEditEmployee = goToEditEmployee;
    employeeControllerScope.addDeduction = addDeduction;
    employeeControllerScope.addEmployee = addEmployee;
    employeeControllerScope.addEmployeeCompensation = addEmployeeCompensation;
    employeeControllerScope.clearimage =clearimage;
    employeeControllerScope.decline = decline;
    employeeControllerScope.declineCompensation = declineCompensation;
    employeeControllerScope.editEmployee = editEmployee;
    employeeControllerScope.exportData = exportData;
    employeeControllerScope.getEmployee = getEmployee;
    employeeControllerScope.getEmployeeCompensation = getEmployeeCompensation;
    employeeControllerScope.getEmployeeId = getEmployeeId;
    employeeControllerScope.getEmployeeStatus = getEmployeeStatus;
    employeeControllerScope.getEmployeeUser = getEmployeeUser;
    employeeControllerScope.getDepartmentStatus = getDepartmentStatus;
    employeeControllerScope.getWorkLocationStatus = getWorkLocationStatus;
    employeeControllerScope.goBackToEmpoyee = goBackToEmpoyee;
    employeeControllerScope.goBackToEmpoyeeCompensation = goBackToEmpoyeeCompensation;
    employeeControllerScope.updateCompensationDate = updateCompensationDate;
    employeeControllerScope.updatePic = updatePic;
    employeeControllerScope.updateProfilePic = updateProfilePic;
    employeeControllerScope.viewEmployee = viewEmployee;
    employeeControllerScope.editEmployeeCompensation = editEmployeeCompensation;
    employeeControllerScope.updateCompensationCtc = updateCompensationCtc;
    employeeControllerScope.viewEmployeeCompensation = viewEmployeeCompensation;
    employeeControllerScope.opendateOfBirthCalender = opendateOfBirthCalender;
    employeeControllerScope.openImportPage = openImportPage;
    employeeControllerScope.openstartCalender = openstartCalender;
    employeeControllerScope.importEmployee = importEmployee;
    employeeControllerScope.searchByName = searchByName;
    employeeControllerScope.showSelectedEmployee = showSelectedEmployee;
    
    employeeControllerScope.isDisabled = true;
    
   function getEmployeeId() {  
        employeeService.getEmployeeId().then(function(res) { 
            employeeControllerScope.employee = { empId :  res.results }; 
	    }, function(err) { 
	    });
    }  
    
    
	function editEmployeeCompensation(employee , type){
		if(type && employee){
		employeeControllerScope.compensation = angular.copy(employee);
		if(type == 'ctc')
			employeeControllerScope.isDisabled = false;
		else if(type == 'date')
			employeeControllerScope.isDisabled = true;
		}
	}
	
    function addMoreItems() {
        /*employeeControllerScope.spinner = true;*/
        employeeControllerScope.limitToShow += 5;
//        $rootScope.limitToShow += 5;
        /*employeeControllerScope.spinner = false;*/
    }

    employeeControllerScope.format = "MMM DD YYYY"; 
    employeeControllerScope.saveShow = true;
    employeeControllerScope.saveupdate = false;
    employeeControllerScope.isUpdate = false;

    function addNew() {
    	employeeControllerScope.optionsShow = false;
    	employeeControllerScope.saveShow = true;
    	employeeControllerScope.saveupdate = false;
    }

    
    if($location.path() == '/employee/add'){
    	getEmployeeId();
        getEmployee();
    }
    
    if ($location.path() == '/myinfo') {
    	getEmployeeUser();
    } else if ($localStorage.spheresuite && $localStorage.spheresuite.id && $localStorage.spheresuite.id != '' && $location.path() != '/employee/view' && $location.path() != '/employees' &&  $location.path() != '/employee/directory') {
        getWorkLocationStatus();
        getDepartmentStatus();
        getEmployeeStatus();
        /*getEmployee();*/
    } else if ($location.path() == '/employees') {
        getEmployeeStatus();
    }

    if ($location.path() == '/employee/view' || $location.path() == '/employee/edit') {
        getEmployee($localStorage.spheresuite.viewEmployeeId);
        if ($location.path() == '/employee/edit') {
            employeeControllerScope.isUpdate = true;
            getEmployee($localStorage.spheresuite.viewEmployeeId);
            getEmployee1();
        }
    }  else if($location.path() == '/employees') {
        delete $localStorage.spheresuite['viewEmployeeId'];
        getEmployee();

    }
    
    
    
    if ($location.path() == '/employeeCompensation/view') { 
    	getEmployeeCompensation($localStorage.spheresuite.viewEmployeecomId); 
    }  else if($location.path() == '/employee/ctc') {
        delete $localStorage.spheresuite['viewEmployeeId'];
        getEmployeeCompensation();
        getActiveUser();
    } else if($location.path() == '/employee/directory'){
    	console.log('asdasd')
        getActiveUser();
    }
//    getActiveUser();

    if ($localStorage.spheresuite && $localStorage.spheresuite.name != "" && $localStorage.spheresuite.id != "" &&  $location.path() != '/employee/add' &&  $location.path() != '/employee/directory'){
    	employeeControllerScope.userName = $localStorage.spheresuite.name;
    	employeeControllerScope.icon = false;
	    	employeeService.getEmployee($localStorage.spheresuite.id).then(function(res) { 
	            if (res.successflag === 'true' && res.results.length > 0 && res.results[0].photo != '') {
	            	employeeControllerScope.photo = res.results[0].photo;
	                } else {
	                	employeeControllerScope.icon = true;
	                }
	             
	        }, function(err) {
	        	employeeControllerScope.icon = true;
	        });
    }
    
    function addAllowance(){	
    }
    
    function addEmployee() {
        employeeControllerScope.spinner = true;
        if (employeeControllerScope.employee) {
            commonService.formValNotManditory(employeeControllerScope.employeeForm, employeeControllerScope.employee).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    employeeService.addEmployee(data).then(function(res) {
                        if (res.successflag === 'true') {
                            employeeControllerScope.spinner = false;
                            $location.path('/employees');

                        } else {
                            employeeControllerScope.spinner = false;
                            employeeControllerScope.msg = res.errors;
                        }

                    }, function(err) {
                        employeeControllerScope.spinner = false;
                    });
                } else {
                    employeeControllerScope.spinner = false;
                }
            });
        } else
            employeeControllerScope.spinner = false;
    }
 
    function addEmployeeCompensation() {
        employeeControllerScope.spinner = true;
        if (employeeControllerScope.compensation) {
            commonService.formValNotManditory(employeeControllerScope.compensationForm, employeeControllerScope.compensation).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    employeeService.addEmployeeCompensation(data).then(function(res) {
                    	console.log("empcompensation",res)
                        if (res.successflag === 'true') {
                            employeeControllerScope.spinner = false; 
                            $("#employeeComp").modal('hide');
                            declineCompensation();
                            getEmployeeCompensation();
                        } else if(res.successflag === 'false') {
                        	employeeControllerScope.empCompansation = res.errors; 
                            employeeControllerScope.spinner = false;
                        } else {
                            employeeControllerScope.spinner = false;
                            employeeControllerScope.msg = res.errors;
                        }

                    }, function(err) {
                        employeeControllerScope.spinner = false;
                    });
                } else {
                    employeeControllerScope.spinner = false;
                }
            });
        } else
            employeeControllerScope.spinner = false;
    }
    
    function decline() {
        if ($location.path() === '/employee/edit') {
            $location.path('/employee/view');
        } else {
            employeeControllerScope.employee = null;
            employeeControllerScope.employeeForm.$setPristine();
            employeeControllerScope.employeeForm.$setUntouched();
            employeeControllerScope.isUpdate = false;
        }
    }
  
    
    function declineCompensation() { 
    	getEmployeeCompensation($localStorage.spheresuite.viewEmployeecomId); 
    	console.log("employeeControllerScope decline", employeeControllerScope.compensation)
            employeeControllerScope.compensation = null; 

    	employeeControllerScope.empCompansation = null;
        employeeControllerScope.compensation = { empctc : ''};
            employeeControllerScope.compensationForm.$setPristine();
            employeeControllerScope.compensationForm.$setUntouched();
    }
    
    function editEmployee() {
        employeeControllerScope.spinner = true;
         delete employeeControllerScope.employee['photo'];
        if (employeeControllerScope.employee) {
            employeeControllerScope.employee.updatedBy = $localStorage.spheresuite.id;
            employeeService.editEmployee(employeeControllerScope.employee).then(function(res) {
                if (res.successflag === 'true') {
                    $location.path('/employee/view');
                    employeeControllerScope.spinner = false;
                } else
                employeeControllerScope.spinner = false;
            }, function(err) {
                employeeControllerScope.spinner = false;
            });
        }
    }
    function updateCompensationCtc() {
    	console.log("new update compensation",employeeControllerScope.compensation)
        if (employeeControllerScope.compensation) {
            employeeControllerScope.spinner = true; 
        	commonService.formValNotManditory(employeeControllerScope.compensationForm, employeeControllerScope.compensation).then(function(data) {
                if(data){
		        	data.updatedBy = $localStorage.spheresuite.id;
		            employeeService.updateCompensation(data).then(function(res) {
		            	console.log('updateCompensationCtc res',res)
		                if (res.successflag === 'true') {
		                    employeeControllerScope.spinner = false;
		                    $("#employeeComp").modal('hide');
		                    getEmployeeCompensation($localStorage.spheresuite.viewEmployeecomId);  
		                } else
		                employeeControllerScope.spinner = false;
		            }, function(err) {
		                employeeControllerScope.spinner = false;
		            });
                }
            });
        }
    }
    
    function getActiveUser(){
        employeeControllerScope.spinner = true;
    	userService.getActiveUser().then(function(res){
    		console.log('getActiveUser res',res)
    		if(res.successflag == 'true' && res.results.length > 0){
    			employeeControllerScope.employeeActiveList = res.results;
    		}
            employeeControllerScope.spinner = false;
    	},function(err){
            employeeControllerScope.spinner = false;
    	});
    }

    function getEmployeeUser() {
        employeeControllerScope.spinner = true;
        var myUser = $localStorage.spheresuite.id;
        employeeService.getEmployee(myUser).then(function(res) {
        	console.log('getEmployee(myUser)', res)
               if (res.successflag === 'true' && res.results.length > 0) {
                    employeeControllerScope.noEmployeeDetail = true;
                    employeeControllerScope.userEmployeeList = res.results[0];
                    employeeControllerScope.spinner = false;
                }   else {
                    employeeControllerScope.spinner = false; 
                    employeeControllerScope.noEmployeeDetail = false; 
                    employeeControllerScope.dataMsg = "Information Not Avalible";
                }
        }, function(err) {
            employeeControllerScope.spinner = false;
        });
    }

    
    function exportData() {
        $scope.fileName = "Employees";
        $scope.exportData = []; 
        $scope.exportData.push(["Id", "First Name", "Middle Name", "Last Name", "Emp Id", "Emp Type", "EmptypeName", "Start Date", "Gender", "Dept", "Dept Name", "Job Desc", "company Email", "Personal Email", "Personal Contact", "Primary Contact", "WorkLocation Id", "WorkLocation City", "Pan No", "Aadhar", "DateOfBirth", "Job Desc", "ReportTo", "Title", "Createdon", "CreatedBy", "Updatedon", "UpdatedBy"]);
        $scope.Filterdata = employeeControllerScope.employeeList;
        var firstFiter = $filter('filter')(employeeControllerScope.employeeList, { empType: employeeControllerScope.empType });
        $scope.Filterdata = $filter('filter')(firstFiter, employeeControllerScope.searchName);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.firstName, value.middleName, value.lastName, value.empId, value.empType, value.emptypeName, value.startDate, value.gender, value.dept, value.deptName, value.jobDesc, value.companyEmail, value.personalEmail, value.personalContact, value.primaryContact, value.workLocation, value.workLocationCity, value.panno, value.aadhar, value.dateOfBirth, value.jobDesc, value.reportTo, value.title, value.createdon, value.createdBy, value.updatedon, value.updatedBy]);
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
    	employeeControllerScope.viewempspinner = false;
    });

    
    function getEmployee(data) {
        employeeControllerScope.viewempspinner = true;
        employeeControllerScope.isDataAvailable = false;
        employeeService.getEmployee(data).then(function(res) {
        	console.log('get employee',res)
            	   if (res.successflag == 'true' && res.results.length > 0) {
                    if ($location.path() == '/employee/edit' || $location.path() == '/employee/directory' && data != undefined) { 
                        employeeControllerScope.employee = res.results[0]; 
                        employeeControllerScope.Directoryphoto = res.results[0].photo ;

                    	console.log(" employeeControllerScope.Directoryphoto111", employeeControllerScope.employee)
                        employeeControllerScope.viewempspinner = false;
                    }  else if ($location.path() == '/employee/view' ) {
                        employeeControllerScope.employee = res.results[0]; 
                        employeeControllerScope.viewempspinner = false;
                    }else {
                        employeeControllerScope.employeeListBackup = angular.copy(res.results);
                        employeeControllerScope.isDataAvailable = true;

                    	for(var i = 0; i < employeeControllerScope.employeeListBackup.length; i++){
                        	employeeControllerScope.employeeListBackup[i].isActiveClass = false;
                        	employeeControllerScope.employeeListBackup[i].isSelect = false;
                    	}
                        employeeControllerScope.employeeList = angular.copy(employeeControllerScope.employeeListBackup);
                        console.log('employeeControllerScope.employeeList', employeeControllerScope.employeeList)
                    	if((employeeControllerScope.buttonBeginFrom + employeeControllerScope.buttonLimitToShow) * employeeControllerScope.buttonLimitToShow >= employeeControllerScope.employeeList.length)
                    		employeeControllerScope.isNextDisabled = true;
                    	
                    	employeeControllerScope.employeeList[0].isActiveClass = true;
                        employeeControllerScope.viewempspinner = false;
                    }
                }  else {
                    employeeControllerScope.viewempspinner = false;
             		employeeControllerScope.dataMsg =  "Employee Not Available";
                }
        }, function(err) {
     		employeeControllerScope.dataMsg =  "Employee Not Available";
            employeeControllerScope.viewempspinner = false;
        });
    }

    function getEmployee1(data) {
        employeeControllerScope.viewempspinner = true;
        employeeControllerScope.isDataAvailable = false;
        employeeService.getEmployee(data).then(function(res) {
            console.log('get employee',res)
                   if (res.successflag == 'true' && res.results.length > 0) {
                    
                        employeeControllerScope.employeeListBackup = angular.copy(res.results);
                        employeeControllerScope.isDataAvailable = true;

                        for(var i = 0; i < employeeControllerScope.employeeListBackup.length; i++){
                            employeeControllerScope.employeeListBackup[i].isActiveClass = false;
                            employeeControllerScope.employeeListBackup[i].isSelect = false;
                        }
                        employeeControllerScope.employeeList = angular.copy(employeeControllerScope.employeeListBackup);
                        console.log('employeeControllerScope.employeeList', employeeControllerScope.employeeList)
                                          
                }  else {
                    employeeControllerScope.viewempspinner = false;
                    employeeControllerScope.dataMsg =  "Employee Not Available";
                }
        }, function(err) {
            employeeControllerScope.dataMsg =  "Employee Not Available";
            employeeControllerScope.viewempspinner = false;
        });
    }
 
    function getEmployeeCompensation(data) {
    	employeeControllerScope.dataMsgCompensation = '';
        employeeControllerScope.viewempspinner = true;
        employeeService.getEmployeeCompensation(data).then(function(res) {
        	console.log('getEmployeeCompensation',res)
        	   if (res.successflag == 'true' && res.results.length > 0) {
        		   if(data){
                    employeeControllerScope.employeeCompensation = res.results; 
                    employeeControllerScope.viewempspinner = false;
                } else {

                    employeeControllerScope.employeeCompensationListBackup = angular.copy(res.results);
                    employeeControllerScope.isDataAvailable = true;

                	for(var i = 0; i < employeeControllerScope.employeeCompensationListBackup.length; i++){
                    	employeeControllerScope.employeeCompensationListBackup[i].isActiveClass = false;
                    	employeeControllerScope.employeeCompensationListBackup[i].isSelect = false;
                	}
                    employeeControllerScope.employeeCompensationList = angular.copy(employeeControllerScope.employeeCompensationListBackup);
                	if((employeeControllerScope.buttonBeginFrom + employeeControllerScope.buttonLimitToShow) * employeeControllerScope.buttonLimitToShow >= employeeControllerScope.employeeCompensationList.length)
                		employeeControllerScope.isNextDisabled = true;
                	
                	employeeControllerScope.employeeCompensationList[0].isActiveClass = true;
                	
                	
//                    employeeControllerScope.employeeCompensationList = res.results;
//                    console.log("two data",employeeControllerScope.employeeCompensationList)
                    employeeControllerScope.viewempspinner = false;
                }
            }  else { 
                employeeControllerScope.viewempspinner = false;
         		employeeControllerScope.dataMsgCompensation =  "Employee Compensation Not Available";
            }
        }, function(err) {
     		employeeControllerScope.dataMsgCompensation =  "Employee Compensation Not Available";
            employeeControllerScope.viewempspinner = false;
        });
    }
    
    function getWorkLocationStatus(data) {
        employeeControllerScope.viewempspinner = true;
        configurationService.getWorkLocationByStatus(data).then(function(res) {
            if (res.successflag === 'true' && res.results.length > 0) {
                employeeControllerScope.worklocationList = res.results;
            }
            employeeControllerScope.spinner = false;
        }, function(err) {
            employeeControllerScope.spinner = false;
        });
    }

    function goBackToEmpoyee() {
        $location.path('/employees');
    }

    function goBackToEmpoyeeCompensation() {
        $location.path('/employee/ctc');
    }
    
    function getDepartmentStatus(data) {
        employeeControllerScope.spinner = true;
        configurationService.getDepartmentByStatus(data).then(function(res) {
            if (res.successflag === 'true') {
                if (res.successflag && res.results.length > 0) {
                    employeeControllerScope.DepartmentList = res.results;
                }
                employeeControllerScope.spinner = false;
            }
        }, function(err) {
            employeeControllerScope.spinner = false;
        });
    }

    function getEmployeeStatus(data) {
        employeeControllerScope.spinner = true;
        configurationService.getEmployeeByStatus(data).then(function(res) {
            if (res.successflag === 'true') {
                employeeControllerScope.EmployeeTypeList = res.results;
            }
            employeeControllerScope.spinner = false;
        }, function(err) {
            employeeControllerScope.spinner = false;
        });
    }
    
    function updateCompensationDate(comp){
    	console.log('comp',comp)
    	if(comp && employeeControllerScope.compensationForm){
        	console.log("new update compensation",employeeControllerScope.compensation)
            employeeControllerScope.spinner = true; 
            	commonService.formValNotManditory(employeeControllerScope.compensationForm, comp).then(function(data) {
                    if(data){
		            	data.updatedBy = $localStorage.spheresuite.id;
		            	console.log(data)
		                employeeService.updateCompensationDate(data).then(function(res) {
		                    if (res.successflag === 'true') {
		                        employeeControllerScope.spinner = false;
		                        $("#employeeComp").modal('hide');
		                        getEmployeeCompensation($localStorage.spheresuite.viewEmployeecomId);  
		                    } else
		                    employeeControllerScope.spinner = false;
		                }, function(err) {
		                    employeeControllerScope.spinner = false;
		                });
		            }
              });
    	}
    }
    
    function updatePic(myCroppedImage) {
    	if(myCroppedImage)
    		employeeControllerScope.icon = false;
        if (myCroppedImage) {
            employeeControllerScope.spinner = true;  
                var data = {
                    id: $localStorage.spheresuite.id,
                    photo: myCroppedImage
                } 
                $('#modal').modal('hide');
                clearimage();
                  employeeService.updateProfilePic(data).then(function(res) {
                    if (res) {
                        getEmployeeUser();
                        employeeService.getEmployee($localStorage.spheresuite.id).then(function(res) { 
            	            if (res.successflag === 'true') {
            	            	employeeControllerScope.photo = res.results[0].photo;
            	                }
            	            else{
            	            	employeeControllerScope.photo = 'images/User.png'
            	            }
            	        }, function(err) {
            	            employeeControllerScope.photo = 'images/User.png'
            	        });
                        
                    }
                    employeeControllerScope.spinner = false;
                }, function(err) {
                    employeeControllerScope.spinner = false;
                });
            
        }
    }

    function updateProfilePic() {
        if (employeeControllerScope.userEmployeeList.photo && $localStorage.spheresuite && $localStorage.spheresuite.id != '') {
            employeeControllerScope.spinner = true;
            updatePic();
        }
    }

    function opendateOfBirthCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        employeeControllerScope.dateOfBirthCalender = !employeeControllerScope.dateOfBirthCalender;
    };

    function openstartCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        employeeControllerScope.startCalender = !employeeControllerScope.startCalender
    };

    function viewEmployee(data) {
        if (data) {
            $localStorage.spheresuite.viewEmployeeId = data;
            $location.path('/employee/view');
        }
    }
    function viewEmployeeCompensation(data) {
    	console.log("get com,p", data);
        if (data) {
            $localStorage.spheresuite.viewEmployeecomId = data; 
            $location.path('/employeeCompensation/view');
        }
    }

    function goToEditEmployee(employeeId) {
        if (employeeId) {
            $localStorage.spheresuite.viewEmployeeId = employeeId;
            $location.path('/employee/edit');
        }
    }
    
    function addDeduction(){
    	
    }

    function searchByName(empName) {
        employeeControllerScope.employeeSelected = '';
        if (empName && empName != '' && employeeControllerScope.employeeActiveList) {
            empName = empName.toLowerCase();
            employeeControllerScope.employeeSearchList = [];
            angular.forEach(employeeControllerScope.employeeActiveList, function(val) {
                if (val.firstName.toLowerCase().indexOf(empName) > -1 || val.middleName.toLowerCase().indexOf(empName) > -1 || val.lastName.toLowerCase().indexOf(empName) > -1) {
                    employeeControllerScope.employeeSearchList.push(val);
                }
            });
            employeeControllerScope.isSearchResultFound = true;
        } else {
            employeeControllerScope.employeeSearchList = [];
            employeeControllerScope.isSearchResultFound = false;
        }
    }

    function showSelectedEmployee(employee) {
        if (employee) {
        	console.log("get id employee",employee)
        	getEmployee(employee.id);
        	employeeControllerScope.employeeSelected = employee;
        	console.log(" employeeControllerScope.Directoryphoto", employeeControllerScope.Directoryphoto)
            employeeControllerScope.employeeSelected.photo =  employeeControllerScope.Directoryphoto;
            employeeControllerScope.isSearchResultFound = false;
            employeeControllerScope.searchName = employee.firstName + " " + employee.middleName;
            if (employee.middleName != "") {
                employeeControllerScope.searchName += " " + employee.lastName;
            } else {
                employeeControllerScope.searchName += employee.lastName;
            }
        }
    }
   

    var formdata = new FormData();
    $scope.getTheFiles = function($files) {
        angular.forEach($files, function(value, key) {
            formdata.append(key, value);
        });
    };


    $(".select1").select2();
    $(".test").select2();
    $("#select4").select2();

    function openImportPage() {

        $location.path('/employee/import');

    }

    var importedDataList;
    employeeControllerScope.declineImport = declineImport;

 	function declineImport(){
 		employeeControllerScope.feilds = null;
 		employeeControllerScope.employeeImportForm.$setPristine();
 		employeeControllerScope.employeeImportForm.$setUntouched();
 	}

    function importEmployee() {
    	employeeControllerScope.spinner = true;
        var dataToSend = {
            fileData: importedDataList,
            columFields: employeeControllerScope.feilds,
            updatedBy: $localStorage.spheresuite.id
        }
        console.log('dataToImport ',JSON.stringify(dataToSend));
        employeeService.importEmployee(dataToSend).then(function(res) {
        	employeeControllerScope.spinner = false;
        	if(res.successflag == 'true'){
        		declineImport();
        		$location.path('/employees');
        	}
        }, function(err) {
        	employeeControllerScope.spinner = false;
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
        	console.log("wb",wb);
            var output = to_json(wb)
            console.log("output",output);
            var keySet;
            for (var fieldName in output){
                keySet = output[fieldName][0];
                importedDataList = output[fieldName];
                break;
            }
            employeeControllerScope.fileInputFeilds = [];
            console.log("keySet"+keySet);
            angular.forEach(keySet, function(value, key) {
            	//console.log("key",key);
                employeeControllerScope.fileInputFeilds.push(key)
            })
            $scope.$apply(function() {
                employeeControllerScope.chooseFileSection = false;
            })

        }

        function to_json(workbook) {
        	console.log("workbook",workbook)
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                console.log("roa",roa);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            console.log("result",result)
            return result;
        }
 
    } 
   

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
        	employeeControllerScope.myImage = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    employeeControllerScope.myImage='';
    employeeControllerScope.myCroppedImage='';
     function clearimage() {
    	 employeeControllerScope.myImage='';
    	 employeeControllerScope.myCroppedImage = ''; 
    	 $("#fileInput").val('');
    }
     
     
     $rootScope.limitToShow = 10;
     $rootScope.beginFrom = 0;
     
     employeeControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
     employeeControllerScope.buttonBeginFrom = 0;
 	employeeControllerScope.isNextDisabled = false;

     employeeControllerScope.deleteEmployee = deleteEmployee;
     employeeControllerScope.gotoPage = gotoPage;
 	employeeControllerScope.searchMe = searchMe;
 	employeeControllerScope.showPrevNav = showPrevNav;
     employeeControllerScope.showNextNav = showNextNav;
     employeeControllerScope.toggleSelect = toggleSelect;
     
     function deleteEmployee(){
    	 var filteredData = $filter('orderBy')(employeeControllerScope.employeeList, '-id');
      	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
      	if(employeeControllerScope.search)
      		filteredData = $filter('filter')(filteredData, employeeControllerScope.search);
      	if(employeeControllerScope.searchName)
      		filteredData = $filter('filter')(filteredData, employeeControllerScope.searchName);
      	var id = [];
 		
     	for(var i = 0; i < filterData.length; i++){
     		if(filterData[i].isSelect){
     			id.push({id:filterData[i].id});
     		}
     	}
 		console.log('id',JSON.stringify(id));
     }
     
     function gotoPage(type, index, activeIndex){
    	 var list, backupList;
    	 if(type == 'compo') {
    		 list =  employeeControllerScope.employeeCompensationList;
    	 }else{
    		 list =  employeeControllerScope.employeeList;
    	 }
     	$rootScope.beginFrom = index;
     	for(var i = 0; i < list.length; i++){
         	list[i].isActiveClass = false;
     	}
     	if(!activeIndex)
     		activeIndex = index
     		list[activeIndex].isActiveClass = true;
     }
     
     function searchMe(type, ifMobile){
    	 var list, backupList;
    	 if(type == 'compo') {
    		 list =  employeeControllerScope.employeeCompensationList;
    		 listBackup =  employeeControllerScope.employeeCompensationListBackup;
    	 }else{
    		 list =  employeeControllerScope.employeeList;
    		 listBackup =  employeeControllerScope.employeeListBackup;
    	 }
     	var canEnter = false;
     	employeeControllerScope.isNextDisabled = false;
     	for (var item in employeeControllerScope.search){
     		if(employeeControllerScope.search[item] != ''){
     			canEnter = true;
     		} 
     	}
     	if(ifMobile && employeeControllerScope.searchName != ''){
     		list = $filter('filter')(employeeControllerScope.listBackup, employeeControllerScope.searchName)
     	}else if(canEnter){
     		list = $filter('filter')(employeeControllerScope.listBackup, employeeControllerScope.search);
     	}else {
     		list = angular.copy(employeeControllerScope.listBackup);
     	}
     	$rootScope.beginFrom = 0;
    	for(var i = 0; i < list.length; i++){
    		list[i].isActiveClass = false;
    		list[i].isSelect = employeeControllerScope.isSelect;
    	}
    	if(list[0])
    		list[0].isActiveClass = true;
     	if((employeeControllerScope.buttonBeginFrom + employeeControllerScope.buttonLimitToShow) * employeeControllerScope.buttonLimitToShow >= list.length)
     		employeeControllerScope.isNextDisabled = true;
     	
     }
     
     function showPrevNav(){
     		employeeControllerScope.buttonBeginFrom -= employeeControllerScope.buttonLimitToShow;
         	gotoPage(employeeControllerScope.buttonBeginFrom)
     		employeeControllerScope.isNextDisabled = false;
     }
     
     function showNextNav(type){
    	 if(type == 'compo') {
    		 list =  employeeControllerScope.employeeCompensationList;
    	 }else{
    		 list =  employeeControllerScope.employeeList;
    	 }
     	employeeControllerScope.buttonBeginFrom += employeeControllerScope.buttonLimitToShow;
     	gotoPage(employeeControllerScope.buttonBeginFrom)
     	if((employeeControllerScope.buttonBeginFrom + employeeControllerScope.buttonLimitToShow) * employeeControllerScope.buttonLimitToShow >= list.length)
     		employeeControllerScope.isNextDisabled = true;
     }
     

     function toggleSelect(isSelect){
    	employeeControllerScope.spinner = true;
     	var filteredData = $filter('orderBy')(employeeControllerScope.employeeList, '-id');
     	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
     	if(employeeControllerScope.search)
     		filteredData = $filter('filter')(filteredData, employeeControllerScope.search);
     	if(employeeControllerScope.searchName)
     		filteredData = $filter('filter')(filteredData, employeeControllerScope.searchName);
     	for(var i = 0; i < filteredData.length; i++){
     		filteredData[i].isSelect = isSelect;
     	}
     	console.log('toggleSelect',filteredData)
    	 
     	employeeControllerScope.spinner = false; 		
     }
     
     
     
}
app.directive('spheresuitenavigation', function() {
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.scope = {
            'listItem' : "=",
            'restrictTo' : '@'
        }

    directive.template = '<button ng-repeat="i in listItem" ng-if="$index % restrictTo == 0" ng-click="employeeControllerScope.gotoPage($index)"><span ng-if="$index == 0">{{$index + 1}}</span><span ng-if="$index != 0">{{$index / restrictTo + 1}}</span></button>';
    return directive;
})