var app = angular.module('spheresuite')
app.controller('myCompensationController', myCompensationController);

myCompensationController.$inject = ['$scope', '$rootScope', '$filter', '$location', '$localStorage', 'employeeService', 'payrollService', 'commonService', 'Upload'];

function myCompensationController($scope, $rootScope, $filter, $location, $localStorage, employeeService, payrollService, commonService, Upload) {
	var myCompensationControllerScope = this;
	$rootScope.headerMenu = "My Compensation";
	myCompensationControllerScope.getEmployeeUser = getEmployeeUser;
	myCompensationControllerScope.getEmpId = getEmpId;
	getEmployeeUser();
	getEmpId();

	function getEmployeeUser() {
		var myUser = $localStorage.spheresuite.id;
		myCompensationControllerScope.spinner = true;
		employeeService.getEmployee(myUser).then(function (res) {
			if (res.successflag === 'true' && res.results.length > 0) {
				myCompensationControllerScope.noEmployeeDetail = true;
				myCompensationControllerScope.userEmployeeList = res.results[0];
				myCompensationControllerScope.spinner = false;
			} else {
				myCompensationControllerScope.spinner = false;
				myCompensationControllerScope.noEmployeeDetail = false;
				myCompensationControllerScope.dataMsg = "Information Not Avalible";
			}
		}, function (err) {
			myCompensationControllerScope.spinner = false;
		});
	}

	function getEmpId() {
		var myUser = $localStorage.spheresuite.id;
		if (myUser) {
			payrollService.getLeadByEmp(myUser).then(function (res) {

				if (res.successflag == 'true' && res.results.length > 0) {
					myCompensationControllerScope.CtcShow = true;
					myCompensationControllerScope.leadListByEmp = res.results[0];
					console.log("payrollctc", myCompensationControllerScope.leadListByEmp);
					var earlength = myCompensationControllerScope.leadListByEmp.employeeCompensationEarningList.length
					var dudlength = myCompensationControllerScope.leadListByEmp.employeeCompensationDeductionList.length
					var arr = [];
					var len;
					if (earlength > dudlength) {
						arr = myCompensationControllerScope.leadListByEmp.employeeCompensationDeductionList;
						len = earlength;
					} else if (earlength < dudlength) {
						arr = myCompensationControllerScope.leadListByEmp.employeeCompensationEarningList;
						len = dudlength;
					} if (arr.length > 0) {
						for (var i = arr.length - 1; i < dudlength; i++) {
							arr.push({
								allowanceId: "-",
								monthly: "0",
								deductionId: "-",
								ytd: "0"
							});
						}
					}
					myCompensationControllerScope.spinner = false;
				} else {
					myCompensationControllerScope.CtcShow = false;
					myCompensationControllerScope.leadListByEmp = [];
					myCompensationControllerScope.ctcMsg = "Compensation Details Not Available";
					myCompensationControllerScope.spinner = false;
				}
			}, function (err) {
				myCompensationControllerScope.spinner = false;
			});;
		}
	}





}