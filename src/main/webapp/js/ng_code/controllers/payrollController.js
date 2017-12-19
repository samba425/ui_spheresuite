var app = angular.module('spheresuite')
app.controller('payrollController', payrollController);

payrollController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', '$filter', 'commonService', 'configurationService', 'payrollService', 'userService'];

function payrollController($scope, $rootScope, $location, $localStorage, $filter, commonService, configurationService, payrollService, userService) {
	var payrollControllerScope = this;

	$rootScope.headerMenu = "Payroll";

	$scope.format = "MMM dd, yyyy";
	$scope.format1 = "MMM YYYY";


	payrollControllerScope.allowance;
	payrollControllerScope.minDate = new Date();
	payrollControllerScope.allowanceForm;
	payrollControllerScope.allowanceTypeList;
	payrollControllerScope.allowanceList = [];
	payrollControllerScope.allowanceMsg = '';
	payrollControllerScope.deduction;
	payrollControllerScope.deductionForm;
	payrollControllerScope.deductionTypeList;
	payrollControllerScope.deductionList = [];
	payrollControllerScope.deductionMsg = '';
	payrollControllerScope.employeeCompensationEarningList = [];
	payrollControllerScope.employeeCompensationDeductionList = []
	payrollControllerScope.isEdit = false;
	payrollControllerScope.limitToShowAllowance = 5;
	payrollControllerScope.limitToShowDeduction = 5;
	payrollControllerScope.isEffectiveFrom = false;
	payrollControllerScope.isEffectiveTo = false;
	payrollControllerScope.isPayrollDetail = false;
	payrollControllerScope.isRunPayroll = false;
	payrollControllerScope.earningMonth = 0;
	payrollControllerScope.earningYear = 0;
	payrollControllerScope.deductionMonth = 0;
	payrollControllerScope.deductionYear = 0;
	payrollControllerScope.runPayroll;
	payrollControllerScope.runPayrollForm;
	payrollControllerScope.runPayrollList;

	payrollControllerScope.addAllowance = addAllowance;
	payrollControllerScope.addDeduction = addDeduction;
	payrollControllerScope.addMoreAllowance = addMoreAllowance;
	payrollControllerScope.addMoreDeduction = addMoreDeduction;
	payrollControllerScope.addNewEarningsField = addNewEarningsField;
	payrollControllerScope.addNewDeductionField = addNewDeductionField;
	payrollControllerScope.closeModal = closeModal;
	payrollControllerScope.declineAllowance = declineAllowance;
	payrollControllerScope.declineDeduction = declineDeduction;
	payrollControllerScope.editAllowance = editAllowance;
	payrollControllerScope.editDeduction = editDeduction;
	payrollControllerScope.getActiveUser = getActiveUser;
	payrollControllerScope.getAllowance = getAllowance;
	payrollControllerScope.getAllowanceById = getAllowanceById;
	payrollControllerScope.getAllowanceType = getAllowanceType;
	payrollControllerScope.getDeduction = getDeduction;
	payrollControllerScope.getDeductionType = getDeductionType;
	payrollControllerScope.getDeductionById = getDeductionById;
	payrollControllerScope.getEarningsType = getEarningsType;
	payrollControllerScope.getEmpId = getEmpId;
	payrollControllerScope.getRunPayroll = getRunPayroll;
	payrollControllerScope.hidePayroll = hidePayroll;
	payrollControllerScope.getRunPayrollMonthly= getRunPayrollMonthly;
	payrollControllerScope.gotoRunPayroll = gotoRunPayroll;
	payrollControllerScope.openAllowanceModal = openAllowanceModal;
	payrollControllerScope.openDeductionModal = openDeductionModal;
	payrollControllerScope.openEffectiveFromCalender = openEffectiveFromCalender;
	payrollControllerScope.openEffectiveToCalender = openEffectiveToCalender;
	payrollControllerScope.processPayroll = processPayroll;
	payrollControllerScope.resetAllowanceAmount = resetAllowanceAmount;
	payrollControllerScope.resetDeductionAmount = resetDeductionAmount;
	payrollControllerScope.submitPayroll = submitPayroll;
	payrollControllerScope.updateEmployeeCompensation = updateEmployeeCompensation;
	payrollControllerScope.viewPayrollDetail = viewPayrollDetail;
	payrollControllerScope.goToPayroll=goToPayroll;

	payrollControllerScope.minDate = moment(payrollControllerScope.minDate).format('MMM YYYY');
	console.log(payrollControllerScope.minDate);
	if ($location.path() == '/payroll/settings') {
		getAllowance();
		getDeduction();
		getAllowanceType();
		getDeductionType();
	} else if ($location.path() == '/employee/compensation') {
		getAllowance();
		getDeduction();
		getActiveUser();
	} else if ($location.path() == '/payroll/run') {

	}else if($location.path() == '/payroll/detail'){
		getRunPayrollMonthly($localStorage.spheresuite.runPayrollDate, 'monthly');
	}

	function addAllowance() {
		if (payrollControllerScope.allowance) {
			payrollControllerScope.spinner = true;
			commonService.formValNotManditory(payrollControllerScope.allowanceForm, payrollControllerScope.allowance).then(function (data) {
				if (data) {
					data.updatedBy = $localStorage.spheresuite.id;
					console.log('data', data)
					payrollService.addAllowance(data).then(function (res) {
						console.log('addAllowance res', res)
						if (res.successflag == 'true') {
							declineAllowance();
							getAllowance();
							$('#allowance').modal('hide');
						}
						payrollControllerScope.spinner = false;
					}, function (err) {
						payrollControllerScope.spinner = false;
					});
				} else {
					payrollControllerScope.spinner = false;
				}
			});
		}
	}

	function addDeduction() {
		if (payrollControllerScope.deduction) {
			payrollControllerScope.spinner = true;
			commonService.formValNotManditory(payrollControllerScope.deductionForm, payrollControllerScope.deduction).then(function (data) {
				if (data) {
					data.updatedBy = $localStorage.spheresuite.id;
					payrollService.addDeduction(data).then(function (res) {
						if (res.successflag == 'true') {
							declineDeduction();
							getDeduction();
							$('#deduction').modal('hide');
						}
						payrollControllerScope.spinner = false;
					}, function (err) {
						payrollControllerScope.spinner = false;
					});
				} else {
					payrollControllerScope.spinner = false;
				}
			});
		}
	}


	function hidePayroll() {
		payrollControllerScope.isRunPayroll = false;
	}
	
	function addMoreAllowance() {
		payrollControllerScope.limitToShowAllowance += 5;
	}

	function addMoreDeduction() {
		payrollControllerScope.limitToShowDeduction += 5;
	}

	function addNewEarningsField() {
		payrollControllerScope.employeeCompensationEarningList.push({
			allowanceId: "",
			monthly: "",
			ytd: ""
		});
	}

	function addNewDeductionField() {
		payrollControllerScope.employeeCompensationDeductionList.push({
			deductionId: "",
			monthly: "",
			ytd: ""
		});
	}

	function closeModal() {
		$('#confirmation').modal('hide');
	}

	function editAllowance() {
		if (payrollControllerScope.allowance) {
			payrollControllerScope.spinner = true;
			payrollControllerScope.allowance.updatedBy = $localStorage.spheresuite.id;
			if (payrollControllerScope.allowance.taxable == 'y') {
				payrollControllerScope.allowance.maxLimit = '';
			}
			payrollService.editAllowance(payrollControllerScope.allowance).then(function (res) {
				if (res.successflag == 'true') {
					declineAllowance();
					getAllowance();
					$('#allowance').modal('hide');
				}
				payrollControllerScope.spinner = false;
			}, function (err) {
				payrollControllerScope.spinner = false;
			});
		}
	}
	
	 function goToPayroll() {
	       // if ($location.path()=="/leads" || $location.path()=="/lead/add" || $location.path()=="/lead/view" || $location.path()=="/lead/edit") {
	            $location.path('/payroll/run');
	        //} 
	    }

	function editDeduction() {
		if (payrollControllerScope.deduction) {
			payrollControllerScope.spinner = true;
			payrollControllerScope.deduction.updatedBy = $localStorage.spheresuite.id;
			payrollService.editDeduction(payrollControllerScope.deduction).then(function (res) {
				if (res.successflag == 'true') {
					declineDeduction();
					getDeduction();
					$('#deduction').modal('hide');
				}
				payrollControllerScope.spinner = false;
			}, function (err) {
				payrollControllerScope.spinner = false;
			});
		}
	}

	function declineAllowance() {
		payrollControllerScope.allowance = null;
		payrollControllerScope.allowanceForm.$setPristine();
		payrollControllerScope.allowanceForm.$setUntouched();
		payrollControllerScope.isEdit = false;
	}

	function declineDeduction() {
		payrollControllerScope.deduction = null;
		payrollControllerScope.deductionForm.$setPristine();
		payrollControllerScope.deductionForm.$setUntouched();
		payrollControllerScope.isEdit = false;
	}


	function getActiveUser() {
		payrollControllerScope.getActiveUserSpinner = true;
		userService.getActiveUser().then(function (res) {
			if (res.successflag === 'true' && res.results.length > 0) {
				payrollControllerScope.activeUserList = res.results;
				console.log("payrollControllerScope.activeUserList", payrollControllerScope.activeUserList)
				payrollControllerScope.getActiveUserSpinner = false;
			} else {
				payrollControllerScope.getActiveUserSpinner = false;
			}
		}, function (err) {
			payrollControllerScope.getActiveUserSpinner = false;
		});
	}

	function getEmpId(empId) {
		if (empId) {
			payrollControllerScope.spinner = true;
			payrollControllerScope.hasAllowanceSelectedAlreadyMsg = '';
			payrollControllerScope.hasDeductionSelectedAlreadyMsg = '';
			payrollControllerScope.employeeCompensationEarningList = [{
				allowanceId: "",
				monthly: "",
				ytd: ""
			}];
			payrollControllerScope.employeeCompensationDeductionList = [{
				deductionId: "",
				monthly: "",
				ytd: ""
			}];
			payrollService.getLeadByEmp(empId).then(function (res) {

				if (res.successflag == 'true' && res.results.length > 0) {
					payrollControllerScope.leadListByEmp = res.results[0];
					if (res.results[0].employeeCompensationEarningList != '' && res.results[0].employeeCompensationEarningList != '[]')
						payrollControllerScope.employeeCompensationEarningList = res.results[0].employeeCompensationEarningList;
					if (res.results[0].employeeCompensationDeductionList != '' && res.results[0].employeeCompensationDeductionList != '[]')
						payrollControllerScope.employeeCompensationDeductionList = res.results[0].employeeCompensationDeductionList;
					payrollControllerScope.earningMonth = parseFloat(res.results[0].earningMonth);
					payrollControllerScope.earningYear = parseFloat(res.results[0].earningYear);
					payrollControllerScope.deductionMonth = parseFloat(res.results[0].deductionMonth);
					payrollControllerScope.deductionYear = parseFloat(res.results[0].deductionYear);
					payrollControllerScope.earning = true;
					payrollControllerScope.spinner = false;
				} else {
					payrollControllerScope.earning = false;
					payrollControllerScope.leadListByEmp = [];
					payrollControllerScope.ctcMsg = "Employee CTC Not Avaliable";
					payrollControllerScope.spinner = false;
				}
			}, function (err) {
				payrollControllerScope.spinner = false;
			});;
		}
	}

	function getAllowanceById(allowance, ctc) {
		if (allowance && ctc) {
			payrollControllerScope.earningMonth = 0;
			payrollControllerScope.earningYear = 0
			payrollControllerScope.hasAllowanceSelectedAlreadyMsg = '';
			payrollControllerScope.spinner = true;
			var canEnter = true;
			if (payrollControllerScope.employeeCompensationEarningList.length > 1) {
				for (var i = 0; i < payrollControllerScope.employeeCompensationEarningList.length; i++) {
					if (allowance.allowanceId == payrollControllerScope.employeeCompensationEarningList[i].allowanceId && payrollControllerScope.employeeCompensationEarningList[i].monthly != '') {
						allowance.monthly = '';
						allowance.ytd = '';
						canEnter = false;
					}
					if (payrollControllerScope.employeeCompensationEarningList[i].monthly != '') {
						payrollControllerScope.earningMonth += parseFloat(payrollControllerScope.employeeCompensationEarningList[i].monthly);
						payrollControllerScope.earningYear += parseFloat(payrollControllerScope.employeeCompensationEarningList[i].ytd);
					}
				}
			} else {
				for (var i = 0; i < payrollControllerScope.allowanceList.length; i++) {
					if (payrollControllerScope.allowanceList[i].id == allowance.allowanceId && payrollControllerScope.allowanceList[i].name.toLowerCase() != 'basic') {
						canEnter = false;
						payrollControllerScope.modalMsg = 'Please ensure basic is selected';
						$('#confirmation').modal('show');
						break;
					}
				}
			}

			if (canEnter) {
				payrollService.getAllowanceById(allowance.allowanceId, ctc).then(function (res) {
					if (res.successflag == 'true' && res.results.length > 0) {
						allowance.monthly = res.results[0].monthly;
						allowance.ytd = res.results[0].ytd;
						payrollControllerScope.earningMonth += parseFloat(res.results[0].monthly);
						payrollControllerScope.earningYear += parseFloat(res.results[0].ytd);
						payrollControllerScope.spinner = false;
					} else {
						payrollControllerScope.spinner = false;
					}
				}, function (err) {
					payrollControllerScope.spinner = false;
				});;
			} else {
				if (payrollControllerScope.employeeCompensationEarningList.length > 1) {
					payrollControllerScope.modalMsg = 'Allowance is already selected';
					$('#confirmation').modal('show');
				}
				allowance.allowanceId = '';
				allowance.monthly = '';
				allowance.ytd = '';
				payrollControllerScope.spinner = false;
			}
		}
	}

	function getDeductionById(deduction, ctc) {
		if (deduction && ctc) {
			payrollControllerScope.deductionMonth = 0;
			payrollControllerScope.deductionYear = 0
			payrollControllerScope.hasDeductionSelectedAlreadyMsg = '';
			payrollControllerScope.spinner = true;
			var canEnter = true;
			if (payrollControllerScope.employeeCompensationDeductionList.length > 1) {
				for (var i = 0; i < payrollControllerScope.employeeCompensationDeductionList.length; i++) {
					if (deduction.deductionId == payrollControllerScope.employeeCompensationDeductionList[i].deductionId && payrollControllerScope.employeeCompensationDeductionList[i].monthly != '') {
						deduction.monthly = '';
						deduction.ytd = '';
						canEnter = false;
					}
					if (payrollControllerScope.employeeCompensationDeductionList[i].monthly != '') {
						payrollControllerScope.deductionMonth += parseFloat(payrollControllerScope.employeeCompensationDeductionList[i].monthly);
						payrollControllerScope.deductionYear += parseFloat(payrollControllerScope.employeeCompensationDeductionList[i].ytd);
					}
				}
				console.log('enter for')
			} else if (payrollControllerScope.employeeCompensationEarningList[0].allowanceId == '') {
				canEnter = false;
				payrollControllerScope.modalMsg = 'Please ensure basic is selected in Earning';
				$('#confirmation').modal('show');
			}
			if (canEnter) {
				payrollService.getDeductionById(deduction.deductionId, ctc, payrollControllerScope.employeeCompensationEarningList[0].monthly).then(function (res) {
					console.log('getDeductionById', res)
					if (res.successflag == 'true' && res.results.length > 0) {
						deduction.monthly = res.results[0].monthly;
						deduction.ytd = res.results[0].ytd;
						payrollControllerScope.deductionMonth += parseFloat(res.results[0].monthly);
						payrollControllerScope.deductionYear += parseFloat(res.results[0].ytd);
						payrollControllerScope.spinner = false;
					} else {
						payrollControllerScope.spinner = false;
					}
				}, function (err) {
					payrollControllerScope.spinner = false;
				});
			} else {
				console.log('can enter is false')
				if (payrollControllerScope.employeeCompensationEarningList[0].allowanceId != '') {
					payrollControllerScope.modalMsg = 'Deduction is already selected';
					$('#confirmation').modal('show');
				}
				deduction.deductionId = '';
				deduction.ytd = '';
				deduction.monthly = '';
				payrollControllerScope.spinner = false;
			}
		}
	}

	function getAllowanceType() {
		payrollControllerScope.getSpinner = true;
		configurationService.getEarningsType().then(function (res) {
			if (res.successflag == 'true' && res.results.length > 0) {
				payrollControllerScope.allowanceTypeList = res.results;
				payrollControllerScope.getSpinner = false;
			} else {
				payrollControllerScope.getSpinner = false;
			}
		}, function (err) {
			payrollControllerScope.getSpinner = false;
		});
	}

	function getDeduction() {
		payrollControllerScope.spinner = true;
		payrollControllerScope.deductionMsg = '';
		payrollService.getDeduction().then(function (res) {
			console.log('getDeduction res', res);
			if (res.successflag == 'true' && res.results.length > 0) {
				payrollControllerScope.deductionList = res.results;
				payrollControllerScope.spinner = false;
			} else {
				payrollControllerScope.deductionMsg = "Deduction Not Available";
				payrollControllerScope.spinner = false;
			}
		}, function (err) {
			payrollControllerScope.deductionMsg = "Deduction Not Available";
			payrollControllerScope.spinner = false;
		});
	}

	function getDeductionType() {
		payrollControllerScope.spinner = true;
		configurationService.getDeductionType().then(function (res) {
			if (res.successflag == 'true' && res.results.length > 0) {
				payrollControllerScope.deductionTypeList = res.results;
				payrollControllerScope.spinner = false;
			} else {
				payrollControllerScope.spinner = false;
			}
		}, function (err) {
			payrollControllerScope.spinner = false;
		});
	}

	function getAllowance() {
		payrollControllerScope.spinner = true;
		payrollService.getAllowance().then(function (res) {
			console.log("allowance...", res)
			if (res.successflag == 'true' && res.results.length > 0) {
				payrollControllerScope.allowanceList = res.results;
				payrollControllerScope.spinner = false;
			} else {
				payrollControllerScope.spinner = false;
			}
		}, function (err) {
			payrollControllerScope.spinner = false;
		});
	}

	function getEarningsType(data) {
		payrollControllerScope.spinner = true;
		configurationService.getEarningsType(data).then(function (res) {
			console.log("get allowance", res)
			if (res.successflag == 'true') {
				payrollControllerScope.allowanceTypeList = res.results;
				payrollControllerScope.spinner = false;
			} else {
				payrollControllerScope.spinner = false;
			}
		}, function (err) {
			payrollControllerScope.spinner = false;
		});
	}

	function getRunPayroll() {
		payrollControllerScope.spinner = true;
		payrollControllerScope.isRunPayroll = false;
		payrollService.getRunPayroll().then(function (res) {
			console.log('getRunPayroll res', res);
			if (res.successflag == 'true') {
				payrollControllerScope.runPayrollList = res.results;
				payrollControllerScope.isRunPayroll = true;
			}
			payrollControllerScope.spinner = false;
		}, function (err) {
			payrollControllerScope.spinner = false;
		});
	}
	
	function getRunPayrollMonthly(month, status){
		if(month && status){
			payrollControllerScope.spinner = true;
			payrollService.getRunPayrollMonthly({monthly:month}, status).then(function(res){
				console.log('getRunPayrollMonthly res',res);
				payrollControllerScope.spinner = false;
				if(res.successflag == 'true' && res.results.length > 0){
					payrollControllerScope.month = month;
					delete $localStorage.spheresuite['runPayrollDate']
					payrollControllerScope.runPayrollDetailList = res.results;
//					$location.path('/payroll/run');
				}
			}, function(err){
				payrollControllerScope.spinner = false;
			});
		}
	}
	
	function gotoRunPayroll(r){
		if(r)
			$location.path('/payroll/run');
		payrollControllerScope.isPayrollDetail = !payrollControllerScope.isPayrollDetail;
	}

	function openAllowanceModal(allowance) {
		if (allowance) {
			payrollControllerScope.allowance = angular.copy(allowance);
			payrollControllerScope.isEdit = true;
		}
	}

	function openDeductionModal(deduction) {
		if (deduction) {
			payrollControllerScope.deduction = angular.copy(deduction);
			payrollControllerScope.isEdit = true;
		}
	}

	function openEffectiveFromCalender($event) {
		$event.preventDefault();
		$event.stopPropagation();
		payrollControllerScope.isEffectiveFrom = !payrollControllerScope.isEffectiveFrom;
	}

	function openEffectiveToCalender($event) {
		$event.preventDefault();
		$event.stopPropagation();
		payrollControllerScope.isEffectiveTo = !payrollControllerScope.isEffectiveTo;
	}

	function processPayroll() {
		if (payrollControllerScope.runPayroll.payPeriod && payrollControllerScope.runPayrollList) {
			payrollControllerScope.spinner = true;

			var payrollList = [];
			for (var i = 0; i < payrollControllerScope.runPayrollList.length; i++) {
				payrollList.push({
					id: payrollControllerScope.runPayrollList[i].id,
					empId: payrollControllerScope.runPayrollList[i].empId,
					empName: payrollControllerScope.runPayrollList[i].name,
					basicGrossPay: payrollControllerScope.runPayrollList[i].basicGrossPay,
					earningMonth: payrollControllerScope.runPayrollList[i].earningMonth,
					deductionMonth: payrollControllerScope.runPayrollList[i].deductionMonth,
					netMonth: payrollControllerScope.runPayrollList[i].netMonth
				});
			}
			var data = { payrollMonth: payrollControllerScope.runPayroll.payPeriod, payrollList: payrollList, updatedBy: $localStorage.spheresuite.id };
			console.log('data',data)
			payrollService.processPayroll(data).then(function (res) {
				console.log('process payroll', res)
				if (res.successflag == 'true' && res.results.length != 0) {
					$localStorage.spheresuite.runPayrollDate = payrollControllerScope.runPayroll.payPeriod; 
					$location.path('/payroll/detail');
				}
				payrollControllerScope.spinner = false;
			}, function (err) {
				payrollControllerScope.spinner = false;
			})
		}
	}

	function resetDeductionAmount() {
		if (payrollControllerScope.deduction.type == 'P') {
			payrollControllerScope.deduction.basicGrossPay = '';
			payrollControllerScope.deduction.fixedAmount = '0';
			payrollControllerScope.deduction.percentageAmount = '';
		} else if (payrollControllerScope.deduction.type == 'F') {
			payrollControllerScope.deduction.basicGrossPay = 'G';
			payrollControllerScope.deduction.fixedAmount = '';
			payrollControllerScope.deduction.percentageAmount = '0';
		}
	}


	function resetAllowanceAmount() {
		if (payrollControllerScope.allowance.type == 'P') {
			payrollControllerScope.allowance.basicGrossPay = '';
			payrollControllerScope.allowance.fixedAmount = '0';
			payrollControllerScope.allowance.percentageAmount = '';
		} else if (payrollControllerScope.allowance.type == 'F') {
			payrollControllerScope.allowance.basicGrossPay = 'G';
			payrollControllerScope.allowance.fixedAmount = '';
			payrollControllerScope.allowance.percentageAmount = '0';
		}
	}
	
	function submitPayroll(){
		if(payrollControllerScope.runPayrollDetailList){
			payrollControllerScope.spinner = true;
			var ids = [];
			for(var i = 0; i < payrollControllerScope.runPayrollDetailList.length; i++){
				ids.push({id:payrollControllerScope.runPayrollDetailList[i].id});
			}
			if(ids.length != 0){
				payrollService.submitPayroll({updatedBy: $localStorage.spheresuite.id, ids: ids}).then(function(res){
					console.log('submitPayroll res',res);
					if(res.successflag == 'true'){
						getRunPayrollMonthly(payrollControllerScope.month, 'status');
					}
					payrollControllerScope.spinner = false;
				},function(err){
					console.log('err',err)
					payrollControllerScope.spinner = false;
				})
			}else{
				payrollControllerScope.spinner = true;
			}
		}
	}

	function updateEmployeeCompensation() {
		payrollControllerScope.spinner = true;
		if (payrollControllerScope.employeeCompensationEarningList[payrollControllerScope.employeeCompensationEarningList.length - 1].allowanceId == '')
			payrollControllerScope.employeeCompensationEarningList.splice(payrollControllerScope.employeeCompensationEarningList.length - 1, 1)
		if (payrollControllerScope.employeeCompensationDeductionList[payrollControllerScope.employeeCompensationDeductionList.length - 1].deductionId == '')
			payrollControllerScope.employeeCompensationDeductionList.splice(payrollControllerScope.employeeCompensationDeductionList.length - 1, 1)
		if (!payrollControllerScope.leadListByEmp.effectiveTo) {
			payrollControllerScope.leadListByEmp.effectiveTo = '';
		}
		else {
			payrollControllerScope.leadListByEmp.effectiveTo = moment(payrollControllerScope.leadListByEmp.effectiveTo).format('MMM DD YYYY')
		}
		var data = {
			basicGrossPay: Number(payrollControllerScope.leadListByEmp.empctc) / 12,
			empId: payrollControllerScope.allowance.empId,
			effectiveFrom: moment(payrollControllerScope.leadListByEmp.effectiveFrom).format('MMM DD YYYY'),
			effectiveTo: payrollControllerScope.leadListByEmp.effectiveTo,
			employeeCompensationEarningList: payrollControllerScope.employeeCompensationEarningList,
			employeeCompensationDeductionList: payrollControllerScope.employeeCompensationDeductionList,
			earningMonth: payrollControllerScope.earningMonth,
			earningYear: payrollControllerScope.earningYear,
			deductionMonth: payrollControllerScope.deductionMonth,
			deductionYear: payrollControllerScope.deductionYear,
			netMonth: payrollControllerScope.earningMonth - payrollControllerScope.deductionMonth,
			netYear: payrollControllerScope.earningYear - payrollControllerScope.deductionYear,
			updatedBy: $localStorage.spheresuite.id
		}
		console.log('data', data)
		if (data) {
			payrollService.updateEmployeeCompensation(data).then(function (res) {
				console.log('res updateEmployeeCompensation', res);
				if (res.successflag == 'true') {
					payrollControllerScope.spinner = false;
					payrollControllerScope.allowance = { empId: '' };
					payrollControllerScope.leadListByEmp = null;
					payrollControllerScope.employeeCompensationEarningList = null;
					payrollControllerScope.employeeCompensationDeductionList = null;
					payrollControllerScope.earningMonth = 0;
					payrollControllerScope.earningYear = 0;
					payrollControllerScope.deductionMonth = 0;
					payrollControllerScope.deductionYear = 0;
					payrollControllerScope.earning = false;
					payrollControllerScope.modalMsg = "Compensation is updated successfully";
					$('#confirmation').modal('show');
				}
				payrollControllerScope.spinner = false;
			}, function (err) {
				payrollControllerScope.spinner = false;
			})
		} else {
			payrollControllerScope.spinner = false;
		}

	}

	function viewPayrollDetail(empId) {
		if (empId) {
			getEmpId(empId);
			payrollControllerScope.isPayrollDetail = true;

		}
	}


	$('.select1').select2();
	$('#select2').select2();
}