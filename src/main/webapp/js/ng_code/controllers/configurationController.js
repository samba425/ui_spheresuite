angular
    .module('spheresuite')
    .controller('configurationController', configurationController);

configurationController.$inject = ['$scope', '$location','$localStorage', '$rootScope', 'configurationService','employeeService'];

function configurationController($scope, $location,$localStorage, $rootScope, configurationService,employeeService) {
    var configurationControllerScope = this;

    $rootScope.headerMenu = "Configuration";
    configurationControllerScope.divValue = 'country';
    if ($location.path() == '/configuration/crm') { 
    configurationControllerScope.divValue = 'contactType';
    }  if ($location.path() == '/configuration/hrms') { 
    configurationControllerScope.divValue = 'hrRequestType';
    }
    configurationControllerScope.saveShow = true;
    configurationControllerScope.saveupdate = false;
    configurationControllerScope.isUpdate = false;

    configurationControllerScope.category;
    configurationControllerScope.categoryForm;
    configurationControllerScope.categoryList;
    configurationControllerScope.contactType;
    configurationControllerScope.contactTypeList;
    configurationControllerScope.contactTypeForm;
    configurationControllerScope.country;
    configurationControllerScope.countryForm;
    configurationControllerScope.countryList;
    configurationControllerScope.department;
    configurationControllerScope.departmentForm;
    configurationControllerScope.departmentList;
    configurationControllerScope.employeeType;
    configurationControllerScope.employeeTypeList;
    configurationControllerScope.employeeTypeForm;
    configurationControllerScope.industryType;
    configurationControllerScope.industryTypeList;
    configurationControllerScope.industryTypeForm;
    configurationControllerScope.leadStatus;
    configurationControllerScope.leadStatusList;
    configurationControllerScope.leadStatusForm;
    configurationControllerScope.leadType;
    configurationControllerScope.leadTypeList;
    configurationControllerScope.leadTypeForm;
    configurationControllerScope.reCategory;
    configurationControllerScope.reCategoryForm;
    configurationControllerScope.Salution;
    configurationControllerScope.salutationForm;
    configurationControllerScope.allowanceType;
    configurationControllerScope.allowanceTypeForm;
    configurationControllerScope.payrollBatch;
    configurationControllerScope.payrollBatchForm;
    configurationControllerScope.deductionType;
    configurationControllerScope.deductionTypeForm;
    configurationControllerScope.state;
    configurationControllerScope.stateList;
    configurationControllerScope.stateForm;
    configurationControllerScope.workLocation;
    configurationControllerScope.workLocationList;
    configurationControllerScope.workLocationForm;
    configurationControllerScope.project;
    configurationControllerScope.projectForm;
    configurationControllerScope.payment;
    configurationControllerScope.paymentForm;
    configurationControllerScope.hrRequestType;
    configurationControllerScope.hrRequestTypeForm;
    configurationControllerScope.timeSheet;
    configurationControllerScope.timeSheetForm;
    configurationControllerScope.propertyType;
    configurationControllerScope.propertyTypeForm;
    configurationControllerScope.storageType;
    configurationControllerScope.storageTypeForm; 
    configurationControllerScope.SalesStage;
    configurationControllerScope.SalesStageForm;
    configurationControllerScope.invoicingTerms;
    configurationControllerScope.invoicingTermsForm;
    configurationControllerScope.gstTax;
    configurationControllerScope.gstTaxForm;
    configurationControllerScope.paymentMode;
    configurationControllerScope.paymentModeForm;
    configurationControllerScope.leaveType;
    configurationControllerScope.leaveTypeForm;
    configurationControllerScope.manageLeaves;
    configurationControllerScope.manageLeavesForm;
    configurationControllerScope.batchType;


    configurationControllerScope.addCategory = addCategory;
    configurationControllerScope.addContactType = addContactType;
    configurationControllerScope.addCountry = addCountry;
    configurationControllerScope.addDepartment = addDepartment;
    configurationControllerScope.addEmployeeType = addEmployeeType;
    configurationControllerScope.addIndustryType = addIndustryType;
    configurationControllerScope.addLeadStatus = addLeadStatus;
    configurationControllerScope.addLeadType = addLeadType;
    configurationControllerScope.addNew = addNew;
    configurationControllerScope.addhrRequestType = addhrRequestType;
    configurationControllerScope.addtimeSheet = addtimeSheet;
    configurationControllerScope.addPropertyType = addPropertyType;
    configurationControllerScope.addSalesStage = addSalesStage;
    configurationControllerScope.addInvoicingTerms = addInvoicingTerms;
    configurationControllerScope.addGstTax = addGstTax;
    configurationControllerScope.addPaymentMode = addPaymentMode;
    configurationControllerScope.addStorageType = addStorageType;
    configurationControllerScope.addleaveType = addleaveType;
    configurationControllerScope.addmanageLeaves = addmanageLeaves;
    configurationControllerScope.addPayment = addPayment;
    configurationControllerScope.addProject = addProject;
    configurationControllerScope.addSalution = addSalution;
    configurationControllerScope.addAllowanceType = addAllowanceType;
    configurationControllerScope.addDeductionType = addDeductionType;
    configurationControllerScope.addState = addState;
    configurationControllerScope.addWorkLocation = addWorkLocation;
    configurationControllerScope.updateCategory = updateCategory;
    configurationControllerScope.updatehrRequestType  = updatehrRequestType;
    configurationControllerScope.updatetimeSheet  = updatetimeSheet;
    configurationControllerScope.updatePropertyType = updatePropertyType;
    configurationControllerScope.updateInvoicingTerms = updateInvoicingTerms;
    configurationControllerScope.updateGstTax  = updateGstTax;
    configurationControllerScope.updatePaymentMode  = updatePaymentMode;
    configurationControllerScope.updateSalesStage  = updateSalesStage;
    configurationControllerScope.updateStorageType  = updateStorageType;
    configurationControllerScope.updateleaveType  = updateleaveType;
    configurationControllerScope.updatemanageLeaves  = updatemanageLeaves;
    configurationControllerScope.changeCountryFun = changeCountryFun;
    configurationControllerScope.changeDiv = changeDiv;
    configurationControllerScope.changeStatus = changeStatus;
    configurationControllerScope.decline = decline;
    configurationControllerScope.editCategory = editCategory; 
    configurationControllerScope.editcontact = editcontact;
    configurationControllerScope.editCountry = editCountry;
    configurationControllerScope.editDepartment = editDepartment;
    configurationControllerScope.editEmployee = editEmployee;
    configurationControllerScope.editIndustry = editIndustry;
    configurationControllerScope.editLeadStatus = editLeadStatus;
    configurationControllerScope.editLeadType = editLeadType;
    configurationControllerScope.editPayment = editPayment;
    configurationControllerScope.editProject = editProject;
    configurationControllerScope.editState = editState;
    configurationControllerScope.editSalution = editSalution;
    configurationControllerScope.editAllowanceType = editAllowanceType;
    configurationControllerScope.editPayrollBatch = editPayrollBatch;
    configurationControllerScope.editDeductionType = editDeductionType;
    configurationControllerScope.editWorkLocation = editWorkLocation;
    configurationControllerScope.edithrRequestType  = edithrRequestType;
    configurationControllerScope.edittimeSheet  = edittimeSheet;
    configurationControllerScope.editPropertyType  = editPropertyType;
    configurationControllerScope.editStorageType = editStorageType;
    configurationControllerScope.editInvoicingTerms = editInvoicingTerms;
    configurationControllerScope.editGstTax = editGstTax;
    configurationControllerScope.editPaymentMode = editPaymentMode;
    configurationControllerScope.editSalesStage = editSalesStage;
    configurationControllerScope.editleaveType  = editleaveType;
    configurationControllerScope.editmanageLeaves  = editmanageLeaves;
    configurationControllerScope.getCategory = getCategory;
    configurationControllerScope.getContactType = getContactType;
    configurationControllerScope.getCountry = getCountry;
    configurationControllerScope.getDepartment = getDepartment;
    configurationControllerScope.getEmployeeType = getEmployeeType;
    configurationControllerScope.getIndustryType = getIndustryType;
    configurationControllerScope.getLeadStatus = getLeadStatus;
    configurationControllerScope.getLeadType = getLeadType;
    configurationControllerScope.getPayment = getPayment;
    configurationControllerScope.getOpportunity = getOpportunity;
    configurationControllerScope.getSalution = getSalution;
    configurationControllerScope.getEarningsType = getEarningsType;
    configurationControllerScope.getDeductionType = getDeductionType;
    configurationControllerScope.getWorkLocation = getWorkLocation;
    configurationControllerScope.gethrRequestType = gethrRequestType;
    configurationControllerScope.getTimeSheetType = getTimeSheetType;
    configurationControllerScope.getPropertyType = getPropertyType;
    configurationControllerScope.getStorageType = getStorageType;
    configurationControllerScope.getInvoicingTerms = getInvoicingTerms;
    configurationControllerScope.getGstTax = getGstTax;
    configurationControllerScope.getPaymentMode = getPaymentMode;
    configurationControllerScope.getSalesStage = getSalesStage;
    configurationControllerScope.getleaveType = getleaveType;
    configurationControllerScope.getmanageLeaves = getmanageLeaves;
    configurationControllerScope.stateById = stateById;
    configurationControllerScope.updateContact = updateContact;
    configurationControllerScope.updateCountry = updateCountry;
    configurationControllerScope.updateDepartment = updateDepartment;
    configurationControllerScope.updateEmployee = updateEmployee;
    configurationControllerScope.updateIndustry = updateIndustry;
    configurationControllerScope.updateLeadStatus = updateLeadStatus;
    configurationControllerScope.updateLeadType = updateLeadType;
    configurationControllerScope.updatePayment = updatePayment;
    configurationControllerScope.updateProject = updateProject;
    configurationControllerScope.updateState = updateState;
    configurationControllerScope.updateSalution = updateSalution;
    configurationControllerScope.updateAllowanceType = updateAllowanceType;
    configurationControllerScope.updateDeductionType = updateDeductionType;
    configurationControllerScope.updateWorkLocation = updateWorkLocation;
    configurationControllerScope.getEmployee = getEmployee;
    configurationControllerScope.getPayrollBatch = getPayrollBatch;
    configurationControllerScope.addPayrollBatch = addPayrollBatch;
    configurationControllerScope.updatePayrollBatch = updatePayrollBatch;
    
  if($location.path() == '/configuration/hrms') { 
	    gethrRequestType(); 
	    getmanageLeaves();
	    getEarningsType();
	    getPayrollBatch();
	    getDeductionType();
	    getleaveType();
	    getTimeSheetType();
    } else if($location.path() == '/configuration/crm'){
	  getContactType();
	  getLeadStatus();
	  getIndustryType();
	  getLeadType();
	  getSalution();
	  getSalesStage();
	  getGstTax();
	  getOpportunity();
	  getCategory();
  }else if($location.path() == '/configuration/ims'){
    getCountry();
    getDepartment();
    getEmployeeType()
    getPayment();
    getState();
   // getWorkLocation(); 
    getEmployee();
    //getleaveType();
    getPropertyType();
    getStorageType();
    //getInvoicingTerms();
    getPaymentMode();
  }else{
	  getCountry();
	  getState();
	  getWorkLocation(); 
	  getEmployeeType()
	  getSalution();
	  getDepartment();
	  getEmployee();
  }
    
    configurationControllerScope.format = "MMM DD, YYYY";  
//    configurationControllerScope.format = "DD MM YYYY"
    
    function getEmployee(data) {
        employeeService.getEmployee(data).then(function(res) {
        	if (res.successflag === 'true') {
        		 configurationControllerScope.employeeList = res.results; 
        	}
        }); 
    }

 

    function addCategory() {
        if (configurationControllerScope.category) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.category.updatedBy = $localStorage.spheresuite.id;
            }
            if(configurationControllerScope.category.desc== undefined){
            	configurationControllerScope.category.desc = '';
            }
            configurationService.addCategory(configurationControllerScope.category).then(function(res) {
            	  if (res.successflag == 'true') {
                    decline();
                    getCategory();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.category = {};
        $('#category').modal('hide');
    }

     
    function addhrRequestType() {
        if (configurationControllerScope.hrRequestType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.hrRequestType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addhrRequestType(configurationControllerScope.hrRequestType).then(function(res) {
            	 if (res.successflag == 'true') {
                    decline();
                    gethrRequestType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.hrRequestType = {};
        $('#hrRequestType').modal('hide');
    }
    
    function addtimeSheet() {
    	console.log("timesheet",configurationControllerScope.timeSheet)
        if (configurationControllerScope.timeSheet) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.timeSheet.updatedBy = $localStorage.spheresuite.id;
            }
            configurationControllerScope.timeSheet.status = "a";
            configurationService.addtimeSheet(configurationControllerScope.timeSheet).then(function(res) {
            	 if (res.successflag == 'true') {
                    decline();
                    getTimeSheetType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.timeSheet = {};
        $('#timeSheet').modal('hide');
    }
    
    function addPropertyType() {
    	console.log("addPropertyType",configurationControllerScope.propertyType)
        if (configurationControllerScope.propertyType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.propertyType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationControllerScope.propertyType.status = "a";
            configurationService.addPropertyType(configurationControllerScope.propertyType).then(function(res) {
            	 if (res.successflag == 'true') {
                    decline();
                    getPropertyType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.propertyType = {};
        $('#propertyType').modal('hide');
    }
    
    function addStorageType() {
    	console.log("storageType",configurationControllerScope.storageType)
        if (configurationControllerScope.storageType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.storageType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationControllerScope.storageType.status = "a";
            configurationService.addStorageType(configurationControllerScope.storageType).then(function(res) {
            	 if (res.successflag == 'true') {
                    decline();
                    getStorageType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.storageType = {};
        $('#storageType').modal('hide');
    }
    function addSalesStage() {
    	console.log("SalesStage",configurationControllerScope.SalesStage)
        if (configurationControllerScope.SalesStage) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.SalesStage.updatedBy = $localStorage.spheresuite.id;
            }
            configurationControllerScope.SalesStage.status = "a";
            configurationService.addSalesStage(configurationControllerScope.SalesStage).then(function(res) {
            	 if (res.successflag == 'true') {
                    decline();
                    getSalesStage();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.SalesStage = {};
        $('#SalesStage').modal('hide');
    }
    
    function addPaymentMode() {
    	console.log("PaymentMode.....",configurationControllerScope.paymentMode)
        if (configurationControllerScope.paymentMode) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.paymentMode.updatedBy = $localStorage.spheresuite.id;
            }
            configurationControllerScope.paymentMode.status = "a";
            configurationService.addPaymentMode(configurationControllerScope.paymentMode).then(function(res) {
            	console.log("payment mode call back",res)
            	 if (res.successflag == 'true') {
                    decline();
                    getPaymentMode();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.paymentMode = {};
        $('#paymentMode').modal('hide');
    }
    
    function addInvoicingTerms() {
    	console.log("addInvoicingTerms.....",configurationControllerScope.invoicingTerms)
        if (configurationControllerScope.invoicingTerms) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.invoicingTerms.updatedBy = $localStorage.spheresuite.id;
            }
            configurationControllerScope.invoicingTerms.status = "a";
            configurationService.addInvoicingTerms(configurationControllerScope.invoicingTerms).then(function(res) {
            	console.log("invoicingTerms mode call back",res)
            	 if (res.successflag == 'true') {
                    decline();
                    getInvoicingTerms();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.invoicingTerms = {};
        $('#invoicingTerms').modal('hide');
    }
    
    function addGstTax() {
    	console.log("PaymentMode.....",configurationControllerScope.gstTax)
        if (configurationControllerScope.gstTax) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.gstTax.updatedBy = $localStorage.spheresuite.id;
            } 
            configurationControllerScope.gstTax.status = "a"; 
            configurationService.addGstTax(configurationControllerScope.gstTax).then(function(res) {
            	console.log("gstTax mode call back",res)
            	 if (res.successflag == 'true') {
                    decline();
                    getGstTax();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.gstTax = {};
        $('#gstTax').modal('hide');
    }
    
    
    function addleaveType() {
    	 if (configurationControllerScope.leaveType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.leaveType.updatedBy = $localStorage.spheresuite.id;
                configurationControllerScope.leaveType.status = 'a';
            }
            configurationService.addleaveType(configurationControllerScope.leaveType).then(function(res) {
             if (res.successflag == 'true') {
                    decline();
                    getleaveType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.leaveType = {};
        $('#leaveType').modal('hide');
    }
    
    function addmanageLeaves() {
    	 if (configurationControllerScope.manageLeaves) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.manageLeaves.updatedBy = $localStorage.spheresuite.id;
                configurationControllerScope.manageLeaves.status = 'a';
                
            }
            configurationService.addmanageLeaves(configurationControllerScope.manageLeaves).then(function(res) {
            	  if (res.successflag == 'true') {
                    decline();
                    getmanageLeaves();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.manageLeaves = {};
        $('#manageLeaves').modal('hide');
    }

    function addContactType() {
        if (configurationControllerScope.contactType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.contactType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addContact(configurationControllerScope.contactType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getContactType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.addContact = {};
        $('#contactType').modal('hide');
    }

    function addCountry() {
        if (configurationControllerScope.country) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.country.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addCountry(configurationControllerScope.country).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getCountry();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.country = {};
        getCountry();
        $('#country').modal('hide');

    }

    function addDepartment() { 
        if (configurationControllerScope.department && configurationControllerScope.department.name) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.department.updatedBy = $localStorage.spheresuite.id;
            } 
            if(configurationControllerScope.department.empId == undefined){
            	configurationControllerScope.department.empId = '';
            }
            configurationService.addDepartment(configurationControllerScope.department).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getDepartment();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#department').modal('hide');

    }


    function addEmployeeType() {
        if (configurationControllerScope.employeeType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.employeeType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addEmployee(configurationControllerScope.employeeType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getEmployeeType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }

        $('#employeeType').modal('hide');
    }

    function addIndustryType() {
        if (configurationControllerScope.industryType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.industryType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addIndustry(configurationControllerScope.industryType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getIndustryType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#industry').modal('hide');
    }

    function addLeadStatus() {
        if (configurationControllerScope.leadStatus) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.leadStatus.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addLead(configurationControllerScope.leadStatus).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getLeadStatus();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#leadStatus').modal('hide');
    }

    function addLeadType() {
        if (configurationControllerScope.leadType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.leadType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addLeadType(configurationControllerScope.leadType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getLeadType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }


        $('#leadType').modal('hide');
    }

    function addNew() {
        configurationControllerScope.optionsShow = false;
        configurationControllerScope.saveShow = true;
        configurationControllerScope.saveupdate = false;
    }

    function addState() {
        if (configurationControllerScope.state) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.state.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addState(configurationControllerScope.state).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getState();
                    getCountry();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        getState();
        $('#state').modal('hide');
    }

    function addSalution() {
        if (configurationControllerScope.salutation) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.salutation.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addSalutionType(configurationControllerScope.salutation).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getSalution();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#salutation').modal('hide');
    }

    function addAllowanceType() {
        if (configurationControllerScope.allowanceType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.allowanceType.updatedBy = $localStorage.spheresuite.id;
            }
            if(configurationControllerScope.allowanceType.displayName == undefined){
            	configurationControllerScope.allowanceType.displayName = '';
            }
            configurationService.addAllowanceType(configurationControllerScope.allowanceType).then(function(res) {
            	console.log("add alloiwncance",res)
                if (res.successflag == 'true') {
                    decline();
                    getEarningsType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#allowanceType').modal('hide');
    }
    
    function addPayrollBatch() {
        if (configurationControllerScope.payrollBatch) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.payrollBatch.updatedBy = $localStorage.spheresuite.id;
            }
            if(configurationControllerScope.payrollBatch.displayName == undefined){
            	configurationControllerScope.payrollBatch.displayName = '';
            }
            configurationService.addPayrollBatch( configurationControllerScope.payrollBatch).then(function(res) {
            	console.log("add payrollBatch",res)
                if (res.successflag == 'true') {
                    decline();
                    getPayrollBatch();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#batchType').modal('hide');
    }
    function addDeductionType() {
        if (configurationControllerScope.deductionType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.deductionType.updatedBy = $localStorage.spheresuite.id;
            }

            if(configurationControllerScope.deductionType.displayName== undefined){
            	configurationControllerScope.deductionType.displayName = '';
            } 
            configurationService.addDeductionType(configurationControllerScope.deductionType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getDeductionType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#deductionType').modal('hide');
    }

    function addWorkLocation() {
        configurationControllerScope.isAdd = true;
        if (configurationControllerScope.workLocation) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.workLocation.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addWorkLocation(configurationControllerScope.workLocation).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getWorkLocation();
                    getCountry();
                    getState();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }

        $('#workLocation').modal('hide');
    }

    function addProject() {
        configurationControllerScope.isAdd = true;
        if (configurationControllerScope.project) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.project.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addProject(configurationControllerScope.project).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getOpportunity();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }

        $('#project').modal('hide');
    }

    function addPayment() {
        configurationControllerScope.isAdd = true;
        if (configurationControllerScope.payment) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.payment.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.addPayment(configurationControllerScope.payment).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getPayment();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#payment').modal('hide');
    }



    function updateCategory() {
        if (configurationControllerScope.category) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.category.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateCategory(configurationControllerScope.category).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getCategory();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#category').modal('hide');
    }

    function updateProject() {
        if (configurationControllerScope.project) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.project.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateProject(configurationControllerScope.project).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getOpportunity();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#project').modal('hide');
    }

    function updatePayment() {
        if (configurationControllerScope.payment) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.payment.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updatePayment(configurationControllerScope.payment).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getPayment();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#payment').modal('hide');
    }

    
    function updatehrRequestType() {
        if (configurationControllerScope.hrRequestType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.hrRequestType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updatehrRequestType(configurationControllerScope.hrRequestType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    gethrRequestType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#hrRequestType').modal('hide');
    }
    
    function updatetimeSheet() {
        if (configurationControllerScope.timeSheet) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.timeSheet.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updatetimeSheet(configurationControllerScope.timeSheet).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getTimeSheetType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#timeSheet').modal('hide');
    }
    function updatePropertyType() {
        if (configurationControllerScope.propertyType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.propertyType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updatePropertyType(configurationControllerScope.propertyType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getPropertyType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#propertyType').modal('hide');
    }
    function updateStorageType() {
        if (configurationControllerScope.storageType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.storageType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateStorageType(configurationControllerScope.storageType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getStorageType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#storageType').modal('hide');
    }
    function updateSalesStage() {
        if (configurationControllerScope.SalesStage) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.SalesStage.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateSalesStage(configurationControllerScope.SalesStage).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getSalesStage();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#SalesStage').modal('hide');
    }
    function updatePaymentMode() {
        if (configurationControllerScope.paymentMode) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.paymentMode.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updatePaymentMode(configurationControllerScope.paymentMode).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getPaymentMode();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#paymentMode').modal('hide');
    }
    function updateInvoicingTerms() {
        if (configurationControllerScope.invoicingTerms) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.invoicingTerms.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateInvoicingTerms(configurationControllerScope.invoicingTerms).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getInvoicingTerm();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#invoicingTerms').modal('hide');
    }
    function updateGstTax() {
        if (configurationControllerScope.gstTax) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.gstTax.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateGstTax(configurationControllerScope.gstTax).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getGstTax();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#gstTax').modal('hide');
    }
    function updateleaveType() {
        if (configurationControllerScope.leaveType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.leaveType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateleaveType(configurationControllerScope.leaveType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getleaveType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#leaveType').modal('hide');
    }
    
    function updatemanageLeaves() {
        if (configurationControllerScope.manageLeaves) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.manageLeaves.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updatemanageLeaves(configurationControllerScope.manageLeaves).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getmanageLeaves();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#manageLeaves').modal('hide');
    }
    
    
    function changeCountryFun() {
        configurationControllerScope.spinner = true;

        var getCountryId = {
            id: configurationControllerScope.workLocation.countryName.id
        }
        configurationService.getState(getCountryId).then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                configurationControllerScope.getCountry = res.results;
            }
            configurationControllerScope.spinner = false;
        }, function(err) {
            configurationControllerScope.spinner = false;
        });

    }

    function changeStatus(data, field) {
        if (data) {
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                data.updatedBy = $localStorage.spheresuite.id;
            }
            if (data.status == 'i')
                data.status = 'a';
            else
                data.status = 'i';
            if (field == "country") {
                configurationControllerScope.spinner = true;
                configurationService.updateCountry(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getCountry();
                    } else{
                    	configurationControllerScope.spinner = false;
                    }
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "state") {
                configurationControllerScope.spinner = true;
                configurationService.updateState(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getState();
                    } else {
                    	configurationControllerScope.spinner = false;
                    }
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "employee") {
                configurationControllerScope.spinner = true;
                configurationService.updateEmployee(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getEmployeeType();
                    } else {
                    	configurationControllerScope.spinner = false;
                    }
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "leadStatus") {
                configurationControllerScope.spinner = true;
                configurationService.updateLead(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getLeadStatus();
                    } else {
                    	configurationControllerScope.spinner = false;
                    }
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "leadStatus") {
                configurationControllerScope.spinner = true;
                configurationService.updateLead(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getLeadStatus();
                    } else {
                    	configurationControllerScope.spinner = false;
                    }
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "industry") {
                configurationControllerScope.spinner = true;
                configurationService.updateIndustry(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getIndustryType();
                    } else {
                    	configurationControllerScope.spinner = false;
                    }
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "worklocation") {
                configurationControllerScope.spinner = true;
                configurationService.updateWorkLocation(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getWorkLocation();
                    } else {
                    	configurationControllerScope.spinner = false;
                    }
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "leadType") {
                configurationControllerScope.spinner = true;
                configurationService.updateLeadType(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getLeadType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "salutation") {
                configurationControllerScope.spinner = true;
                configurationService.updateSalution(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getSalution();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            }else if (field == "allowanceType") {
                configurationControllerScope.spinner = true;
                configurationService.updateAllowanceType(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getEarningsType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            }else if (field == "payrollBatch") {
                configurationControllerScope.spinner = true;
                configurationService.updatePayrollBatch(data).then(function(res) {
                    if (res.successflag == 'true') {
                    	getPayrollBatch();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            }else if (field == "deductionType") {
                configurationControllerScope.spinner = true;
                configurationService.updateDeductionType(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getDeductionType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "category") {
                configurationControllerScope.spinner = true;
                configurationService.updateCategory(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getCategory();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "contact") {
                configurationControllerScope.spinner = true;
                configurationService.updateContact(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getContactType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "department") {
                configurationControllerScope.spinner = true;
                configurationService.updateDepartment(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getWorkLocation();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "project") {
                configurationControllerScope.spinner = true;
                configurationService.updateProject(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getOpportunity();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "payment") {
                configurationControllerScope.spinner = true;
                configurationService.updatePayment(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getPayment();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "hrRequestType") {
                configurationControllerScope.spinner = true;
                configurationService.updatehrRequestType(data).then(function(res) {
                    if (res.successflag == 'true') {
                        gethrRequestType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "timeSheet") {
                configurationControllerScope.spinner = true;
                configurationService.updatetimeSheet(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getTimeSheetType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "propertyType") {
                configurationControllerScope.spinner = true;
                configurationService.updatePropertyType(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getPropertyType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "storageType") {
                configurationControllerScope.spinner = true;
                configurationService.updateStorageType(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getStorageType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } else if (field == "SalesStage") {
                configurationControllerScope.spinner = true;
                configurationService.updateSalesStage(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getSalesStage();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            }  else if (field == "paymentMode") {
                configurationControllerScope.spinner = true;
                configurationService.updatePaymentMode(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getPaymentMode();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            } 
            else if (field == "invoicingTerms") {
                configurationControllerScope.spinner = true;
                configurationService.updateInvoicingTerms(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getInvoicingTerms();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            }
            else if (field == "gstTax") {
                configurationControllerScope.spinner = true;
                configurationService.updateGstTax(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getGstTax();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            }else if (field == "leaveType") {
                configurationControllerScope.spinner = true;
                configurationService.updateleaveType(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getleaveType();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            }  else if (field == "manageLeaves") {
                configurationControllerScope.spinner = true;
                configurationService.updatemanageLeaves(data).then(function(res) {
                    if (res.successflag == 'true') {
                        getmanageLeaves();
                    } else
                    configurationControllerScope.spinner = false;
                }, function(err) {
                    configurationControllerScope.spinner = false;
                });
            }
        }
    }

    function decline() {
        configurationControllerScope.country = null;
        configurationControllerScope.isUpdate = false;

        configurationControllerScope.state = null;
        configurationControllerScope.department = null;
        if (configurationControllerScope.countryForm) {
            configurationControllerScope.country = { name: '', code: ''};
            configurationControllerScope.countryForm.$setPristine();
            configurationControllerScope.countryForm.$setUntouched();
            getCountry();
        }

        if (configurationControllerScope.stateForm) {
        	configurationControllerScope.state = { name: ''};
            configurationControllerScope.stateForm.$setPristine();
            configurationControllerScope.stateForm.$setUntouched();
            getState();
        }
        configurationControllerScope.category = null;
        if (configurationControllerScope.categoryForm) {
        	configurationControllerScope.category = { name: ''};
            configurationControllerScope.categoryForm.$setPristine();
            configurationControllerScope.categoryForm.$setUntouched();
            getCategory();
        }
        configurationControllerScope.employeeType = null;
        if (configurationControllerScope.employeeTypeForm) {
        	configurationControllerScope.employeeType = { name: ''};
            configurationControllerScope.employeeTypeForm.$setPristine();
            configurationControllerScope.employeeTypeForm.$setUntouched();
            getEmployeeType();
        }
        configurationControllerScope.contactType = null;
        if (configurationControllerScope.contactTypeForm) {
        	configurationControllerScope.contactType = { name: ''};
            configurationControllerScope.contactTypeForm.$setPristine();
            configurationControllerScope.contactTypeForm.$setUntouched();
            getContactType();
        }
        configurationControllerScope.department = null;
        if (configurationControllerScope.departmentForm) {
        	configurationControllerScope.department = { name: '', empId: ''};
            configurationControllerScope.departmentForm.$setPristine();
            configurationControllerScope.departmentForm.$setUntouched();
            getDepartment();
        }
        configurationControllerScope.leadStatus = null;
        if (configurationControllerScope.leadStatusForm) {
        	configurationControllerScope.leadStatus = { name: ''};
            configurationControllerScope.leadStatusForm.$setPristine();
            configurationControllerScope.leadStatusForm.$setUntouched();
            getLeadStatus();
        }
        configurationControllerScope.industryType = null;
        if (configurationControllerScope.industryTypeForm) {
        	configurationControllerScope.industryType = { name: ''};
            configurationControllerScope.industryTypeForm.$setPristine();
            configurationControllerScope.industryTypeForm.$setUntouched();
            getIndustryType();
        }
        configurationControllerScope.leadType = null;
        if (configurationControllerScope.leadTypeForm) {
            configurationControllerScope.leadType = { name: ''};
            configurationControllerScope.leadTypeForm.$setPristine();
            configurationControllerScope.leadTypeForm.$setUntouched();
            getLeadType();
        }
        configurationControllerScope.salutation = null;
        if (configurationControllerScope.salutationForm) {

        	configurationControllerScope.salutation = { name: ''};
            configurationControllerScope.salutationForm.$setPristine();
            configurationControllerScope.salutationForm.$setUntouched();
            getSalution();
        }
        configurationControllerScope.allowancetype = null;
        if (configurationControllerScope.allowanceTypeForm) {

        	configurationControllerScope.allowanceType = { name: '',displayName: ''};
            configurationControllerScope.allowanceTypeForm.$setPristine();
            configurationControllerScope.allowanceTypeForm.$setUntouched();
            getEarningsType();
        }
        configurationControllerScope.payrollBatch = null;
        if (configurationControllerScope.payrollBatchForm) {
        	configurationControllerScope.payrollBatch = { name: '',displayName: ''};
            configurationControllerScope.payrollBatchForm.$setPristine();
            configurationControllerScope.payrollBatchForm.$setUntouched();
            getPayrollBatch();
        }
        configurationControllerScope.deductionType = null;
        if (configurationControllerScope.deductionTypeForm) { 
        	configurationControllerScope.deductionType = { name: '',displayName: ''};
            configurationControllerScope.deductionTypeForm.$setPristine();
            configurationControllerScope.deductionTypeForm.$setUntouched();
            getDeductionType();
        }
        configurationControllerScope.workLocation = null;
        if (configurationControllerScope.workLocationForm) {
        	configurationControllerScope.workLocation = { city : ''};
            configurationControllerScope.workLocationForm.$setPristine();
            configurationControllerScope.workLocationForm.$setUntouched();
            getWorkLocation();
        }
        configurationControllerScope.project = null;
        if (configurationControllerScope.projectForm) {
        	configurationControllerScope.project = { name: ''};
            configurationControllerScope.projectForm.$setPristine();
            configurationControllerScope.projectForm.$setUntouched();
            getOpportunity();
        }
        configurationControllerScope.payment = null;
        if (configurationControllerScope.paymentForm) {
               configurationControllerScope.payment ={name:''};
            configurationControllerScope.paymentForm.$setPristine();
            configurationControllerScope.paymentForm.$setUntouched();
            getPayment();
        }
        
        configurationControllerScope.hrRequestType = null;
        if (configurationControllerScope.hrRequestTypeForm) {
               configurationControllerScope.hrRequestType ={ requestType :''};
            configurationControllerScope.hrRequestTypeForm.$setPristine();
            configurationControllerScope.hrRequestTypeForm.$setUntouched();
            gethrRequestType();
        }
        configurationControllerScope.propertyType = null;
        if (configurationControllerScope.propertyTypeForm) {
               configurationControllerScope.propertyType ={ name :''};
            configurationControllerScope.propertyTypeForm.$setPristine();
            configurationControllerScope.propertyTypeForm.$setUntouched();
            getPropertyType();
        }
        configurationControllerScope.storageType = null;
        if (configurationControllerScope.storageTypeForm) {
               configurationControllerScope.storageType ={ name :''};
            configurationControllerScope.storageTypeForm.$setPristine();
            configurationControllerScope.storageTypeForm.$setUntouched();
            getStorageType();
        }
        configurationControllerScope.SalesStage = null;
        if (configurationControllerScope.SalesStageForm) {
            configurationControllerScope.SalesStage ={ name :''};
         configurationControllerScope.SalesStageForm.$setPristine();
         configurationControllerScope.SalesStageForm.$setUntouched();
         getSalesStage();
     }
        configurationControllerScope.paymentMode = null;
        if (configurationControllerScope.paymentModeForm) {
            configurationControllerScope.paymentMode ={ name :''};
         configurationControllerScope.paymentModeForm.$setPristine();
         configurationControllerScope.paymentModeForm.$setUntouched();
         getPaymentMode();
     }
        configurationControllerScope.invoicingTerms = null;
        if (configurationControllerScope.invoicingTermsForm) {
            configurationControllerScope.invoicingTerms ={ name :''};
         configurationControllerScope.invoicingTermsForm.$setPristine();
         configurationControllerScope.invoicingTermsForm.$setUntouched();
         getInvoicingTerms();
     }
        
        configurationControllerScope.gstTax = null;
        if (configurationControllerScope.gstTaxForm) {
            configurationControllerScope.gstTax ={ name :''};
         configurationControllerScope.gstTaxForm.$setPristine();
         configurationControllerScope.gstTaxForm.$setUntouched();
         getGstTax();
     }
        
        configurationControllerScope.timeSheet = null;
        if (configurationControllerScope.timeSheetForm) {
               configurationControllerScope.timeSheet ={ type :''};
            configurationControllerScope.timeSheetForm.$setPristine();
            configurationControllerScope.timeSheetForm.$setUntouched();
            getTimeSheetType();
        }
        configurationControllerScope.leaveType = null;
        if (configurationControllerScope.leaveTypeForm) {
               configurationControllerScope.leaveType ={ leaveType :''};
            configurationControllerScope.leaveTypeForm.$setPristine();
            configurationControllerScope.leaveTypeForm.$setUntouched();
            getleaveType();
        }
        configurationControllerScope.manageLeaves = null;
        if (configurationControllerScope.manageLeavesForm) {
               configurationControllerScope.manageLeaves ={ manageLeaves :''};
            configurationControllerScope.manageLeavesForm.$setPristine();
            configurationControllerScope.manageLeavesForm.$setUntouched();
            getmanageLeaves();
        }
    }



    function editCategory(category) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.category = category;
    }

    function editDepartment(department) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.department = department;
    }

    function editCountry(country) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.country = country;
    }

    function editEmployee(employee) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.employeeType = employee;
    }

    function editIndustry(industry) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.industryType = industry;
    }

    function editLeadStatus(leadStatus) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.leadStatus = leadStatus;
    }

    function editLeadType(leadType) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.leadType = leadType;
    }


    function editcontact(contact) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.contactType = contact;
    }

    function editSalution(salutation) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.salutation = salutation;
    }
    function editAllowanceType(allowanceType) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.allowanceType = allowanceType;
    }
    function editPayrollBatch(payrollBatch) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.payrollBatch = payrollBatch;
        console.log(configurationControllerScope.payrollBatch.name,"asdasdadasdasasd");
    }
    function editDeductionType(deductionType) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.deductionType = deductionType;
    }


    function editState(state) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.isUpdate = true;
        configurationControllerScope.state = state;
    }

    function editProject(project) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.project = project;
    }

    function editPayment(payment) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.payment = payment;
    }

    function edithrRequestType(hrRequestType) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.hrRequestType = hrRequestType;
    }
    
    function edittimeSheet(timeSheet) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.timeSheet = timeSheet;
    }
    function editStorageType(storageType) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.storageType = storageType;
    }  
    function editSalesStage(SalesStage) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.SalesStage = SalesStage;
    }  
    function editPaymentMode(paymentMode) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.paymentMode = paymentMode;
    }  
    function editInvoicingTerms(invoicingTerms) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.invoicingTerms = invoicingTerms;
    }  
    function editGstTax(gstTax) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.gstTax = gstTax;
    }  
    function editPropertyType(propertyType) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.propertyType = propertyType;
    }
    function editleaveType(leaveType) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.leaveType = leaveType;
    }
    function editmanageLeaves(manageLeaves) {
        configurationControllerScope.saveShow = false;
        configurationControllerScope.saveupdate = true;
        configurationControllerScope.manageLeaves = manageLeaves;
    }

    function editWorkLocation(worklocation) {
        if (worklocation) {
            configurationControllerScope.spinner = true;
            configurationControllerScope.isUpdate = true;
            configurationService.getState(worklocation.countryId).then(function(res) {
                if (res.successflag == 'true' && res.results.length > 0) {
                    configurationControllerScope.saveShow = false;
                    configurationControllerScope.saveupdate = true;
                    configurationControllerScope.workLocation = angular.copy(worklocation);
                    configurationControllerScope.workLocation.countryId = angular.copy(worklocation.countryId);
                    configurationControllerScope.workLocation.stateId = angular.copy(worklocation.stateId);
                }
                configurationControllerScope.spinner = false;
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
    }

    function getCategory(data) {
        configurationControllerScope.spinner = true;
        configurationService.getCategory(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.categoryList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getContactType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getContactType(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.contactTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    
    function gethrRequestType(data) {
    	configurationControllerScope.spinner = true;
        configurationService.gethrRequestType(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.hrRequestTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
            	configurationControllerScope.spinner = false;
            }
        }, function(err) {
        	configurationControllerScope.spinner = false;
        });
    }
    function getTimeSheetType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getTimeSheetType(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.timeSheetList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    function getPropertyType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getPropertyType(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.propertyTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    function getStorageType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getStorageType(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.storageTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    function getSalesStage(data) {
        configurationControllerScope.spinner = true;
        configurationService.getSalesStage(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.SalesStageList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    function getPaymentMode(data) {
        configurationControllerScope.spinner = true;
        configurationService.getPaymentMode(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.paymentModeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    function getInvoicingTerms(data) {
        configurationControllerScope.spinner = true;
        configurationService.getInvoicingTerms(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.invoicingTermsList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    function getGstTax(data) {
        configurationControllerScope.spinner = true;
        configurationService.getGstTax(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.gstTaxList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
 
    function getmanageLeaves() { 
        configurationControllerScope.spinner = true;
        configurationService.getmanageLeaves().then(function(res) {
        	console.log('getmanageLeaves res',res);
        	 if (res.successflag == 'true') {
                configurationControllerScope.manageLeavesList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getleaveType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getleaveType(data).then(function(res) {
        	console.log("configurationControllerScope.leaveTypeList ",res )
        	  if (res.successflag == 'true') {
                configurationControllerScope.leaveTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getCountry() {
        configurationControllerScope.spinner = true;
        configurationService.getCountry().then(function(res) {
        	if (res.successflag == 'true') {
                configurationControllerScope.countryList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getDepartment(data) {
        configurationControllerScope.spinner = true;
        configurationService.getDepartment(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.departmentList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getEmployeeType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getEmployeeType(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.employeeTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getIndustryType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getIndustryType(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.industryTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getLeadStatus(data) {
        configurationControllerScope.spinner = true;
        configurationService.getLeadStatus(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.leadStatusList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getLeadType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getLeadType(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.leadTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getSalution(data) {
        configurationControllerScope.spinner = true;
        configurationService.getSalution(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.salutaionList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    
    function getEarningsType(data) {
        configurationControllerScope.spinner = true;
        configurationService.getEarningsType(data).then(function(res) {
        	console.log("get allowance",res)
            if (res.successflag == 'true') {
                configurationControllerScope.allowanceTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    
    function getPayrollBatch(data) {
        configurationControllerScope.spinner = true;
        configurationService.getPayrollBatch(data).then(function(res) {
        	console.log("get payrollbatch",res)
            if (res.successflag == 'true') {
                configurationControllerScope.payrollBatchList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    function getDeductionType(data) {
    	console.log("sagskajghskj")
        configurationControllerScope.spinner = true;
        configurationService.getDeductionType(data).then(function(res) {
        	console.log("get dedection",res)
            if (res.successflag == 'true') {
                configurationControllerScope.deductionTypeList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }
    

    function getState(data) {
        configurationControllerScope.spinner = true;
        configurationService.getState(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.stateList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getWorkLocation() {
        configurationControllerScope.spinner = true;
        configurationService.getWorkLocation().then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.workLocationList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function getOpportunity() {
        configurationControllerScope.spinner = true;
        configurationService.getOpportunity().then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.projectLists = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }


    function getPayment() {
        configurationControllerScope.spinner = true;
        configurationService.getPayment().then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.paymentList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function stateById(data) {
        configurationControllerScope.spinner = true;
        configurationService.getState(data).then(function(res) {
            if (res.successflag == 'true') {
                configurationControllerScope.stateList = res.results;
                configurationControllerScope.spinner = false;
            } else {
                configurationControllerScope.spinner = false;
            }
        }, function(err) {
            configurationControllerScope.spinner = false;
        });
    }

    function updateContact() {
        if (configurationControllerScope.contactType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.contactType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateContact(configurationControllerScope.contactType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getContactType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#contactType').modal('hide');
    }

    function updateCountry() {
        if (configurationControllerScope.country) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.country.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateCountry(configurationControllerScope.country).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getCountry();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.country = {};
        $('#country').modal('hide');
    }

    function updateDepartment() {
        if (configurationControllerScope.department) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.department.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateDepartment(configurationControllerScope.department).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getDepartment();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }

        $('#department').modal('hide');
    }

    function updateEmployee() {
        if (configurationControllerScope.employeeType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.employeeType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateEmployee(configurationControllerScope.employeeType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getEmployeeType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        configurationControllerScope.country = {};
        $('#employeeType').modal('hide');
    }

    function updateIndustry() {
        if (configurationControllerScope.industryType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.industryType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateIndustry(configurationControllerScope.industryType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getSalution();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#industry').modal('hide');
    }

    function updateLeadStatus() {
        if (configurationControllerScope.leadStatus) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.leadStatus.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateLead(configurationControllerScope.leadStatus).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getLeadStatus();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#leadStatus').modal('hide');
    }

    function updateLeadType() {
        if (configurationControllerScope.leadType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.leadType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateLeadType(configurationControllerScope.leadType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getLeadType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#leadType').modal('hide');
    }

    function updateSalution() {
        if (configurationControllerScope.salutation) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.salutation.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateSalution(configurationControllerScope.salutation).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getSalution();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#salutation').modal('hide');
    }
    function updateAllowanceType() {
        if (configurationControllerScope.allowanceType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.allowanceType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateAllowanceType(configurationControllerScope.allowanceType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getEarningsType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#allowanceType').modal('hide');
    }
    
    function updatePayrollBatch() {
        if (configurationControllerScope.payrollBatch) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.payrollBatch.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updatePayrollBatch(configurationControllerScope.payrollBatch).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getPayrollBatch();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#batchType').modal('hide');
    }
    function updateDeductionType() {
        if (configurationControllerScope.deductionType) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.deductionType.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateDeductionType(configurationControllerScope.deductionType).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getDeductionType();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#deductionType').modal('hide');
    }
    

    function updateState() {
        if (configurationControllerScope.state) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.state.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateState(configurationControllerScope.state).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getState();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#state').modal('hide');
    }

    function updateWorkLocation() {
        if (configurationControllerScope.workLocation) {
            configurationControllerScope.spinner = true;
            if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                configurationControllerScope.workLocation.updatedBy = $localStorage.spheresuite.id;
            }
            configurationService.updateWorkLocation(configurationControllerScope.workLocation).then(function(res) {
                if (res.successflag == 'true') {
                    decline();
                    getWorkLocation();
                    configurationControllerScope.spinner = false;
                } else {
                    configurationControllerScope.spinner = false;
                }
            }, function(err) {
                configurationControllerScope.spinner = false;
            });
        }
        $('#workLocation').modal('hide');
    }


    function changeDiv(selectedDiv) {
        if (selectedDiv == 'workLocation') {
            configurationControllerScope.divValue = 'workLocation';
        } else if (selectedDiv == 'categories') {
            configurationControllerScope.divValue = 'categories';
        } else if (selectedDiv == 'contactType') {
            configurationControllerScope.divValue = 'contactType';
        } else if (selectedDiv == 'country') {
            configurationControllerScope.divValue = 'country';
        } else if (selectedDiv == 'state') {
            configurationControllerScope.divValue = 'state';
            getState();
        } else if (selectedDiv == 'employeeType') {
            configurationControllerScope.divValue = 'employeeType';
        } else if (selectedDiv == 'leadStatus') {
            configurationControllerScope.divValue = 'leadStatus';
        } else if (selectedDiv == 'industry') {
            configurationControllerScope.divValue = 'industry';
        } else if (selectedDiv == 'leadType') {
            configurationControllerScope.divValue = 'leadType';
        } else if (selectedDiv == 'salutation') {
            configurationControllerScope.divValue = 'salutation';
        }  else if (selectedDiv == 'allowanceType') {
            configurationControllerScope.divValue = 'allowanceType';
        }  else if (selectedDiv == 'deductionType') {
            configurationControllerScope.divValue = 'deductionType';
        } else if (selectedDiv == 'department') {
            configurationControllerScope.divValue = 'department';
        } else if (selectedDiv == 'projectType') {
            configurationControllerScope.divValue = 'projectType';
        } else if (selectedDiv == 'paymentTerms') {
            configurationControllerScope.divValue = 'paymentTerms';
        } else if (selectedDiv == 'hrRequestType') {
            configurationControllerScope.divValue = 'hrRequestType';
        } else if (selectedDiv == 'timeSheet') {
            configurationControllerScope.divValue = 'timeSheet';
        }  else if (selectedDiv == 'propertyType') {
            configurationControllerScope.divValue = 'propertyType';
        }  else if (selectedDiv == 'storageType') {
            configurationControllerScope.divValue = 'storageType';
        } else if (selectedDiv == 'SalesStage') {
            configurationControllerScope.divValue = 'SalesStage';
        } else if (selectedDiv == 'paymentMode') {
            configurationControllerScope.divValue = 'paymentMode';
        } else if (selectedDiv == 'invoicingTerms') {
            configurationControllerScope.divValue = 'invoicingTerms';
        } else if (selectedDiv == 'gstTax') {
            configurationControllerScope.divValue = 'gstTax';
        } else if (selectedDiv == 'leaveType') {
            configurationControllerScope.divValue = 'leaveType';
        }else if (selectedDiv == 'manageLeaves') {
            configurationControllerScope.divValue = 'manageLeaves';
        }else if(selectedDiv == 'batchType') {
            configurationControllerScope.divValue = 'batchType';
        }
       
    }


    $("#select1").select2();
    $("#select2").select2();
    $("#select4").select2();
    $("#select5").select2();
    $("#select6").select2();
    $("#select7").select2();
    $("#select8").select2();
    $("#select9").select2();
    $("#select10").select2();
    $("#select11").select2();
    $("#select12").select2();
    $("#select13").select2(); 


}