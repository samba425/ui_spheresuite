angular
    .module('spheresuite')
    .service('configurationService', configurationService);

configurationService.$inject = ['constants', 'commonService'];

function configurationService(constants, commonService) {

    var configurationsService = {
    		
    		addCategory : addCategory,
    		addCountry: addCountry,
    		addContact: addContact,
    		addDepartment: addDepartment,
    		addhrRequestType : addhrRequestType,
    		addtimeSheet : addtimeSheet,
    		addPropertyType : addPropertyType,
    		addStorageType : addStorageType,
    		addSalesStage: addSalesStage,
    		addInvoicingTerms: addInvoicingTerms,
    		addGstTax: addGstTax,
    		addPaymentMode: addPaymentMode,
    		getEmployeeByStatus: getEmployeeByStatus, 
    		addEmployee: addEmployee,
    		addIndustry: addIndustry,
    		addLead: addLead,
    		addLeadType: addLeadType,
    		addleaveType: addleaveType,
    		addState: addState,
    		addSalutionType: addSalutionType,
    		addAllowanceType : addAllowanceType,
    		addPayrollBatch : addPayrollBatch,
    		addDeductionType: addDeductionType,
    		addProject: addProject,
    		addPayment: addPayment,
    		addWorkLocation: addWorkLocation,
    		addmanageLeaves:addmanageLeaves,
    		deleteCountry: deleteCountry,
    		deleteState: deleteState,
    		getCategory: getCategory,
    		getCountry: getCountry,
    		getContactType: getContactType,
    		getDepartment: getDepartment,
    		getDepartmentActive: getDepartmentActive,
    		gethrRequestType: gethrRequestType,
    		getTimeSheetType: getTimeSheetType,
    		getPropertyType: getPropertyType,
    		getStorageType: getStorageType,
    		getSalesStage: getSalesStage,
    		getInvoicingTerms: getInvoicingTerms,
    		getGstTax : getGstTax,
    		getPaymentMode: getPaymentMode,
    		getleaveType: getleaveType,
    		getmanageLeaves: getmanageLeaves,
    		getDepartmentByStatus: getDepartmentByStatus,
            getEmployeeType: getEmployeeType,
    		getIndustryType: getIndustryType,
    		getLeadStatus: getLeadStatus,
    		getLeadType: getLeadType,
    		getSalution: getSalution,
    		getPayrollBatch: getPayrollBatch,
    		getEarningsType: getEarningsType,
    		getDeductionType: getDeductionType,
    		getState: getState,
            getWorkLocation: getWorkLocation,
            getWorkLocationByStatus: getWorkLocationByStatus,
            getOpportunity: getOpportunity,
            getPayment: getPayment,
            updateCategory: updateCategory,
        	updateCountry: updateCountry,
        	updatehrRequestType: updatehrRequestType,
        	updatetimeSheet : updatetimeSheet,
        	updatePropertyType : updatePropertyType,
        	updateStorageType : updateStorageType,
        	updateInvoicingTerms : updateInvoicingTerms,
        	updateGstTax: updateGstTax,
        	updatePaymentMode : updatePaymentMode,
        	updateSalesStage : updateSalesStage,
        	updateleaveType: updateleaveType,
        	updatemanageLeaves: updatemanageLeaves,
    		updateContact: updateContact,
            updateDepartment: updateDepartment,
            updateEmployee: updateEmployee,
            updateIndustry: updateIndustry,
    		updateLead: updateLead,
    		updateLeadType: updateLeadType,
    		updateSalution: updateSalution,
    		updateAllowanceType: updateAllowanceType,
    		updatePayrollBatch: updatePayrollBatch,
    		updateDeductionType: updateDeductionType,
    		updateState: updateState,
    		updateProject: updateProject,
    		updatePayment: updatePayment,
            updateWorkLocation: updateWorkLocation
    };

    return configurationsService;
 
    function addCategory(data) {
        return commonService.apiCall(constants.configCategoryPersist, data);
    }
    
    function addhrRequestType(data) {
        return commonService.apiCall(constants.confighrRequestTypePersist, data);
    }
    
    function addtimeSheet(data) {
        return commonService.apiCall(constants.configtimeSheetPersist, data);
    }
    function addPropertyType(data) {
        return commonService.apiCall(constants.configPropertyTypePersist, data);
    }
    function addStorageType(data) {
        return commonService.apiCall(constants.configStorageTypePersist, data);
    }
    function addSalesStage(data) {
        return commonService.apiCall(constants.configSalesStagePersist, data);
    }
    
    function addPaymentMode(data) {
        return commonService.apiCall(constants.configPaymentModePersist, data);
    }
    
    function addInvoicingTerms(data) {
        return commonService.apiCall(constants.configInvoicingTermsPersist, data);
    }
    
    function addGstTax(data) {
        return commonService.apiCall(constants.configGstTaxPersist, data);
    }
    
    function addleaveType(data) {
        return commonService.apiCall(constants.configleaveTypePersist, data);
    }
    function addmanageLeaves(data) {
        return commonService.apiCall(constants.configmanageLeavesPersist, data);
    }
    function addCountry(data) {
        return commonService.apiCall(constants.configCountryPersist, data);
    }

    function addContact(data) {
        return commonService.apiCall(constants.configContactPersist, data);
    }
    
    function addDepartment(data) {
        return commonService.apiCall(constants.configDepartmentPersist, data);
    }
    
    function addEmployee(data) {
        return commonService.apiCall(constants.configEmployeePersist, data);
    }
    
    function addIndustry(data) {
        return commonService.apiCall(constants.configIndustryPersist, data);
    }
    
    function addLead(data) {
        return commonService.apiCall(constants.configLeadStatusPersist, data);
    }
    
    function addLeadType(data) {
        return commonService.apiCall(constants.configLeadTypePersist, data);
    }
        
    function addState(data) {
        return commonService.apiCall(constants.configStatePersist,data);
    }
    
    function addWorkLocation(data) {
        return commonService.apiCall(constants.configWorkLocationPersist,data);
    }
	
	 function addSalutionType(data) {
        return commonService.apiCall(constants.configSalutionPersist,data);
    }
	 function addAllowanceType(data) {
		 console.log("sevice",data)
	        return commonService.apiCall(constants.configAllowanceTypePersist,data);
	    }
	 
	 function addPayrollBatch(data) {
		 console.log("sevice",data)
	        return commonService.apiCall(constants.configPayrollBatchPersist,data);
	    }
	 function addDeductionType(data) {
		 console.log(":sdedede",data)
	        return commonService.apiCall(constants.configDeductionTypePersist,data);
	    }
    
    function addWorkLocation(data) {
        return commonService.apiCall(constants.configWorkLocationPersist,data);
    }

    function addProject(data) {
        return commonService.apiCall(constants.configProjectPersist,data);
    }
    function addPayment(data) {
        return commonService.apiCall(constants.configPaymentPersist,data);
    }
    function updateCategory(data) {
        return commonService.apiCall(constants.configCategoryUpdate, data);
    }
    
    function deleteCountry(data) {
        return commonService.apiCall(constants.configCountryDelete, data);
    }

    function deleteState(data) {
        return commonService.apiCall(constants.configStateDelete, data);
    }

    function updateCountry(data) {
        return commonService.apiCall(constants.countryUpdate, data);
    }
    
    function updateContact(data) {
        return commonService.apiCall(constants.configContactUpdate, data);
    }
    

    function updateDepartment(data) {
        return commonService.apiCall(constants.configDepartmentUpdate, data);
    }
    
    function updatehrRequestType(data) {
        return commonService.apiCall(constants.confighrRequestTypeUpdate, data);
    }
    function updatetimeSheet(data) {
        return commonService.apiCall(constants.configtimeSheetUpdate, data);
    }
    function updatePropertyType(data) {
        return commonService.apiCall(constants.configPropertyTypeUpdate, data);
    }
    function updateStorageType(data) {
        return commonService.apiCall(constants.configStorageTypeUpdate, data);
    }
    function updateSalesStage(data) {
        return commonService.apiCall(constants.configSalesStageUpdate, data);
    }
    function updatePaymentMode(data) {
        return commonService.apiCall(constants.configPaymentModeUpdate, data);
    }
    function updateInvoicingTerms(data) {
        return commonService.apiCall(constants.configInvoicingTermsUpdate, data);
    }
    function updateGstTax(data) {
        return commonService.apiCall(constants.configGstTaxUpdate, data);
    }
    function updateleaveType(data) {
        return commonService.apiCall(constants.configleaveTypeUpdate, data);
    }
    function updatemanageLeaves(data) {
        return commonService.apiCall(constants.configmanageLeavesUpdate, data);
    }
    function updateEmployee(data) {
        return commonService.apiCall(constants.configEmployeeUpdate, data);
    }

    function updateIndustry(data) {
        return commonService.apiCall(constants.configIndustryUpdate, data);
    }

    function updateLead(data) {
        return commonService.apiCall(constants.configLeadStatusUpdate, data);
    }

    function updateLeadType(data) {
        return commonService.apiCall(constants.configLeadTypeUpdate, data);
    }
    
  
      function updateWorkLocation(data) {
        delete data['$$hashKey'];
        return commonService.apiCall(constants.configWorkLocationUpdate,data);
    }    

      function updateSalution(data) {
          return commonService.apiCall(constants.configSalutionUpdate, data);
      }
      
      function updateAllowanceType(data) {
          return commonService.apiCall(constants.configAllowanceTypeUpdate, data);
      }
      function updatePayrollBatch(data) {
          return commonService.apiCall(constants.configPayrollBatchUpdate, data);
      }
      
      function updateDeductionType(data) {
          return commonService.apiCall(constants.configDeductionTypeUpdate, data);
      }
      
    function updateState(data) {
         delete data['countryName'];
        return commonService.apiCall(constants.configStateUpdate, data);
    }
    function updateProject(data) {
        delete data['projectName'];
       return commonService.apiCall(constants.configProjectUpdate, data);
   }
    function updatePayment(data) {
        delete data['paymentName'];
       return commonService.apiCall(constants.configPaymentUpdate, data);
   }

    function getCategory(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configCategoryRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configCategoryRetrieveById, data);
        }
    }
    
    function getCountry(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configCountryRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configCountryRetrieveById, data);
        }
    }
    
    function getContactType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configContactRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configContactRetrieveById, data);
        }
    }

    function gethrRequestType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.confighrRequestTypeRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.confighrRequestTypeRetrieveById, data);
        }
    }
    function getTimeSheetType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configtimeSheetRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configtimeSheetRetrieveById, data);
        }
    }
    function getPropertyType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configPropertyTypeRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configPropertyTypeRetrieveById, data);
        }
    }
    function getStorageType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configStorageTypeRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configStorageTypeRetrieveById, data);
        }
    }
    function getSalesStage(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configSalesStageRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configSalesStageRetrieveById, data);
        }
    }
    function getPaymentMode(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configPaymentModeRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configPaymentModeRetrieveById, data);
        }
    }
    function getInvoicingTerms(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configInvoicingTermsRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configInvoicingTermsRetrieveById, data);
        }
    }
    function getGstTax(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configGstTaxRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configGstTaxRetrieveById, data);
        }
    }
    function getleaveType(data){
        if (!data){
        	var res = commonService.httpCallGetAll(constants.configleaveTypeRetrieve);
        	res.then(function(res1){
        	console.log('res getleaveType',res1)
        	});
        	
          return res
        }else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configleaveTypeRetrieveById, data);
        }
    }
    function getmanageLeaves(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configmanageLeavesRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configmanageLeavesRetrieveById, data);
        }
    }
    
    function getDepartment(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configDepartmentRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configDepartmentRetrieveById, data);
        }
    }
    
    function getEmployeeType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configEmployeeRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configEmployeeRetrieveById, data);
        }
    }
   
    function getDepartmentActive(){
          return commonService.httpCallGetAll(constants.configDepartmentRetrieveActive);
    }
    

    function getDepartmentByStatus(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configDepartmentRetrieveStatus);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configDepartmentRetrieveStatus, data);
        }
    }
    
    function getEmployeeByStatus(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configEmployeeRetrieveStatus);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configEmployeeRetrieveStatus, data);
        }
    }
    
    function getIndustryType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configIndustryRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configIndustryRetrieveById, data);
        }
    }
    
    function getLeadStatus(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configLeadStatusRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configLeadStatusRetrieveById, data);
        }
    }
    
    function getLeadType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configLeadTypeRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configLeadTypeRetrieveById, data);
        }
    }

    function getSalution(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configSalutionRetrieve);
        else {
        	data = { id : data };
        	return commonService.httpCallGetById(constants.configSalutionRetrieveById, data);
        }
    }
    function getEarningsType(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configAllowanceTypeRetrieve);
        else {
        	data = { id : data };
        	return commonService.httpCallGetById(constants.configAllowanceTypeRetrieveById, data);
        }
    }
    
    function getPayrollBatch(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configPayrollBatchRetrieve);
        else {
        	data = { id : data };
        	return commonService.httpCallGetById(constants.configPayrollBatchRetrieveById, data);
        }
    }
    
    function getDeductionType(data){
    	console.log("dededede")
        if (!data)
          return commonService.httpCallGetAll(constants.configDeductionTypeRetrieve);
        else {
        	data = { id : data };
        	return commonService.httpCallGetById(constants.configDeductionTypeRetrieveById, data);
        }
    }
    
    
    function getState(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configStateRetrieve);
        else {
        	data = { id : data };
        	return commonService.httpCallGetById(constants.configStateRetrieveById, data);
        }
    }
    
     function getWorkLocation(data){
        if (!data)
          return commonService.httpCallGetAll(constants.configWorkLocationRetrieve);
        else {
        	data = { id : data };
          return commonService.httpCallGetById(constants.configWorkLocationRetrieveById, data);
        }
    }
     function getPayment(data){
         if (!data)
           return commonService.httpCallGetAll(constants.configPaymentRetrieve);
         else {
         	data = { id : data };
           return commonService.httpCallGetById(constants.configPaymentRetrieveById, data);
         }
     }
      
     function getOpportunity(data){
         if (!data)
           return commonService.httpCallGetAll(constants.configProjectRetrieve);
         else {
         	data = { id : data };
           return commonService.httpCallGetById(constants.configProjectRetrieveById, data);
         }
     }
      
     
     function getWorkLocationByStatus(data){
         if (!data)
           return commonService.httpCallGetAll(constants.configWorkLocationRetrieveStatus);
         else {
         	data = { id : data };
           return commonService.httpCallGetById(constants.configWorkLocationRetrieveStatus, data);
         }
     }
}