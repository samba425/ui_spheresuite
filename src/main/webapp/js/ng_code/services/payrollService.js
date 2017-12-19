angular
    .module('spheresuite')
    .service('payrollService', payrollService);

payrollService.$inject = ['constants', 'commonService'];

function payrollService(constants, commonService) {

    var payrollServices = {
    		addAllowance: addAllowance,
    		addDeduction: addDeduction,
    		editAllowance: editAllowance,
    		editDeduction: editDeduction,
    		getAllowance: getAllowance,
    		getDeduction: getDeduction,
    		getLeadByEmp: getLeadByEmp,
    		getAllowanceById: getAllowanceById,
    		getDeductionById: getDeductionById,
    		getRunPayroll: getRunPayroll,
    		getRunPayrollMonthly: getRunPayrollMonthly,
    		updateEmployeeCompensation: updateEmployeeCompensation,
    		processPayroll: processPayroll,
    		submitPayroll: submitPayroll
    }
    return payrollServices;

    function addAllowance(data){
    	return commonService.apiCall(constants.payrollAllowancePersist, data);
    }  
    
    function addDeduction(data){
    	return commonService.apiCall(constants.payrollDeductionPersist, data);
    }

    function editAllowance(data){
    	return commonService.apiCall(constants.payrollAllowanceUpdate, data);
    }  
    
    function editDeduction(data){
    	return commonService.apiCall(constants.payrollDeductionUpdate, data);
    }
    
    function getLeadByEmp(data) {  
        	data = {id: data};
        	console.log("empl id",data)
           	return commonService.httpCallGetById(constants.payrollgetLeadByEmpRetrieveById, data);
         
    }     
    
    function getAllowance(data) {
    	if(!data){
        	return commonService.httpCallGetAll(constants.payrollAllowanceRetrieve);
        } else {
        	data = {id: data};
           	return commonService.httpCallGetById(constants.payrollAllowanceRetrieveById, data);
        }
    } 
    function  getAllowanceById(id,ctc) { 
        	data = {id: id,
        			empctc:ctc };
           	return commonService.apiCall(constants.payrollGetAllowanceById, data); 
    } 
  
    function  getDeductionById(id,ctc,monthly) {
    	if(id && ctc && monthly){
	    	data = {id: id,
	    			empctc: ctc,
	    			basicPay: monthly};
	       	return commonService.apiCall(constants.payrollGetDeductionById, data);
    	}
    } 
     
    function getDeduction(data) {
    	if(!data){
        	return commonService.httpCallGetAll(constants.payrollDeductionRetrieve);
        } else {
        	data = {id: data};
           	return commonService.httpCallGetById(constants.payrollDeductionRetrieveById, data);
        }
    }
    
    function getRunPayroll(){
    	return commonService.httpCallGetAll(constants.runPayrollRetrieve);
    }
    
    function getRunPayrollMonthly(data, status){
    	console.log('stats',status)
    	if(status == 'monthly')
    		return commonService.httpCallGetById(constants.payrollProcessRetrieveByMonth, data);
    	else if(status == 'status')
    		return commonService.httpCallGetById(constants.payrollProcessRetrieveByStatus, data);
    }
  
    function updateEmployeeCompensation(data){
    	return commonService.apiCall(constants.empcompensation, data);
    }

    function processPayroll(data){
    	return commonService.apiCall(constants.payrollProcess, data);
    }
    
    function submitPayroll(data){
    	return commonService.apiCall(constants.payrollProcessUpdate, data);
    }
}