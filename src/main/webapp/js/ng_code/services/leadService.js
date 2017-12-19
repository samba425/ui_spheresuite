angular
    .module('spheresuite')
    .service('leadService', leadService);

leadService.$inject = ['constants', 'commonService', '$localStorage'];

function leadService(constants, commonService, $localStorage) {

    var leadService = {
        addLead: addLead,
        addLogActivity: addLogActivity,
        addNote:addNote,
        addSchedule: addSchedule,
        addTask:addTask,
        convertCustomer:convertCustomer,
        deleteLead: deleteLead,
        editLead: editLead,
        editTaskStatus : editTaskStatus,
        getEmail: getEmail,
        getLead: getLead,
        getLeadByType: getLeadByType,
        getLeadByEmp: getLeadByEmp,
        getLogActivity:getLogActivity,
        getNote : getNote,
        getSchedule:getSchedule,
        getTask:getTask,
        getTransferLead: getTransferLead,
        getCalendarUpcoming:getCalendarUpcoming,
        getMyLeadsChartDetails:getMyLeadsChartDetails,
        getMyCustomersChartDetails:getMyCustomersChartDetails,
        getMyLeadsChartDetailsByEmp:getMyLeadsChartDetailsByEmp,
        getMySalesReportChartDetails : getMySalesReportChartDetails,
        importLead: importLead,
        revokeLeadTransfer: revokeLeadTransfer,
        sendEmail: sendEmail,
        transferLead : transferLead,
        updateProfilePic:updateProfilePic
    };

    return leadService;

    function addLead(data) {
        return commonService.apiCall(constants.leadPersist, data);
    }

    function addLogActivity(data) {
        return commonService.apiCall(constants.leadLogActivityPersist, data);
    }
  
    function addNote(data) {
        return commonService.apiCall(constants.leadNotesPersist, data);
    }
    
    function addSchedule(data) {
        return commonService.apiCall(constants.leadSchedulePersist, data);
    }
  
    function addTask(data) {
        return commonService.apiCall(constants.leadTaskPersist, data);
    }
    
    function convertCustomer(data) {
    		return commonService.apiCall(constants.ConvertCustomerUpdate, data);
    }
    
    function deleteLead(data) {
    	if(data){
    		data = { ids: data, updatedBy: $localStorage.spheresuite.id };
    		return commonService.apiCall(constants.leadDelete, data);
    	}
    }

    function editLead(data) {
        return commonService.apiCall(constants.leadUpdate, data);
    }
    
    function editTaskStatus(data) {
        return commonService.apiCall(constants.leadTaskUpdate, data);
    }
    
    function getEmail(data){
    	if(data){
    		data = { id: data };
    		return commonService.httpCallGetById(constants.leadEmailRetrieveByLeadId, data);
    	}
    }
    
    function getLead(data) {
       if(!data){
           return commonService.httpCallGetAll(constants.leadRetrieve);
       }else if (data.type){
    	   return commonService.httpCallGetById(constants.leadRetrieve, data);
       }else { 
        	data ={ id: data };
        	return commonService.httpCallGetById(constants.leadRetrieveById, data);
        }
    }
    
    function getLeadByType(data){
    	if(data){
    		data = {type: data};
    		return commonService.httpCallGetById(constants.leadRetrieveByType, data);
    	}
    }
    
    function getLeadByEmp(data, type) {
    	if(data){
    		data = { empId: data, type:type };
    		return commonService.httpCallGetById(constants.leadRetrieveLeadByEmp, data);
    	}
     }
    
    function getCalendarUpcoming(data) { 
         if(data){
       data = { id: data };
       return commonService.httpCallGetById(constants.calendarUpcoming, data);
          }   
    }
    
    function getLogActivity(data){
    	if(data){
    		data = { id: data };
    		return commonService.httpCallGetById(constants.leadLogActivityRetrieve, data);
    	}
    }
    
    function getNote(data){
    	if(data){
    		data = { id: data };
    		return commonService.httpCallGetById(constants.leadNotesRetrieve, data);
    	}
    }
    
    function getSchedule(data){
    	if(data){
    		data = { id: data };
    		return commonService.httpCallGetById(constants.leadScheduleRetrieve, data);
    	} else {
    		return commonService.httpCallGetAll(constants.leadScheduleRetrieve);
    	}
    }
        
    function getTask(data){
    	if(data){
    		data = { id: data };
    		return commonService.httpCallGetById(constants.leadTaskRetrieve, data);
    	}  else {
    		return commonService.httpCallGetAll(constants.leadTaskRetrievePending);
    	}
    }
    
    function getTransferLead(data){
    	if(data){
    		return commonService.httpCallGetById(constants.leadRetrieveTransfer, data);
    	}
    }
    
    function getMyLeadsChartDetails(data){
    	return commonService.httpCallGetById(constants.leadretrieveBetweenDate, data);
    }
    
    function getMyCustomersChartDetails(data){
    	return commonService.httpCallGetById(constants.myCustomersChartDetailsByEmp, data);
    }
    
    function getMyLeadsChartDetailsByEmp(data){
    		return commonService.httpCallGetById(constants.myLeadsChartDetailsByEmp, data);
    }

    function getMySalesReportChartDetails(data){
		return commonService.httpCallGetById(constants.mySalesTargetChartDetailsByEmp, data);
    }
    
    function getMyCustomerChartDetails(data){
    	return commonService.httpCallGetById(constants.customerretrieveBetweenDate, data);
    }
    
    function importLead(data){
        return commonService.httpCallGetById(constants.leadImport, data);
    }
    
    function revokeLeadTransfer(data){
        return commonService.apiCall(constants.leadRevokeTransfer, data);
    }
    
    function sendEmail(data) {
        return commonService.apiCall(constants.leadPersist, data);
    }
    
    function transferLead(data){
    	if(data){
    		return commonService.apiCall(constants.leadTransfer, data);
    	}
    }
    
    function updateProfilePic(data){
  	  if(data){
  		    return commonService.httpCallForUploadingImage(constants.leadupdatepic, data);
  	  }
    }
    
}