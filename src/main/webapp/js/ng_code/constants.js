(function() {
    'use strict';

    var apiRoutesUrl = {
        // bill
        billPersist: 'bills/persist',
        billRetrieve: 'bills/retrieve/',
        billRetrieveById: 'bills/retriveById/',
        billUpdate: 'bills/update',
        billImport: 'bills/importBills/',
        billNumber: 'bills/getBillNumber/',
  
        
        //check 
        ChequePersist: 'chequemanagement/persist',
        ChequeRetrieve: 'chequemanagement/retrieve/',
        ChequeRetrieveById: 'chequemanagement/retriveById/',
        ChequeUpdate: 'chequemanagement/update', 

        // category
        categoryUpdate: 'category/update',

        // customer
        /*customerPersist: 'customer/persist',
        customerRetrieve: 'customer/retrieve/',
        customerUpdate: 'customer/update',
        customerDelete: 'customer/delete/',*/

        // proposal
        proposalPersist: 'proposals/persist',
        proposalRetrieve: 'proposals/retrieve/',
        proposalUpdate: 'proposals/update',
        proposalRetrieveById: 'proposals/retriveById/',

        // contact
        contactDelete: 'contact/delete',
        contactPersist: 'contact/persist',
        contactRetrieve: 'contact/retrieve/',
        contactRetrieveById: 'contact/retriveById/',
        contactRetrieveByLeadId: 'contact/retrieveByLeadId/',
        contactUpdate: 'contact/update',
        contactDelete: 'contact/delete/',
        calendarUpcoming: 'schedule/retrieveUpcomingCalender/',
        importContact: 'contact/importContact/',


        //Configuration
        configCountryDelete: 'category/delete/',
        configCountryPersist: 'country/persist',
        configCountryRetrieve: 'country/retrieve/',
        configStateRetrieveId: 'state/retrieveActive/',
        configStatePersist: 'state/persist',
        configWorkLocationPersist: 'worklocation/persist',
        configStateDelete: 'category/delete/',
        configStateUpdate: 'state/update',
        configStateRetrieve: 'state/retrieve/',
        configStateRetrieveById: 'state/retrieveByCountryId/',
        configWorkLocationRetrieve: 'worklocation/retrieve/',
        configWorkLocationRetrieveStatus: 'worklocation/retrieveActive/',
        configWorkLocationUpdate: 'worklocation/update',

        // configuration Category
        configCategoryPersist: 'category/persist',
        configCategoryRetrieve: 'category/retrieve/',
        configCategoryRetrieveById: 'category/RetrieveById/',
        configCategoryUpdate: 'category/update',

        // configuration Contact
        configContactPersist: 'contacttype/persist',
        configContactRetrieve: 'contacttype/retrieve/',
        configContactRetrieveById: 'contacttype/RetrieveById/',
        configContactUpdate: 'contacttype/update',

        // configuration Department
        configDepartmentPersist: 'department/persist',
        configDepartmentRetrieve: 'department/retrieve/',
        configDepartmentRetrieveActive: 'department/retrieveActive/',
        configDepartmentRetrieveById: 'department/retrieveById/',
        configDepartmentUpdate: 'department/update',
        configDepartmentRetrieveStatus: 'department/retrieveActive/',

        // configuration Employee
        configEmployeePersist: 'employeetype/persist',
        configEmployeeRetrieve: 'employeetype/retrieve/',
        configEmployeeRetrieveById: 'employeetype/retrieveById/',
        configEmployeeUpdate: 'employeetype/update',
        configEmployeeRetrieveStatus: 'employeetype/retrieveActive/',

        // configuration hrRequestType
        confighrRequestTypePersist: 'hrRequestType/persist',
        confighrRequestTypeRetrieve: 'hrRequestType/retrieve/',
        confighrRequestTypeRetrieveById: 'hrrequests/retrieveById/',
        confighrRequestTypeUpdate: 'hrRequestType/update',
        
        // configuration Industry
        configIndustryPersist: 'industry/persist',
        configIndustryRetrieve: 'industry/retrieve/',
        configIndustryRetrieveById: 'industry/retrieveById/',
        configIndustryUpdate: 'industry/update',

        // configuration leadStatus
        configLeadStatusPersist: 'leadstatus/persist',
        configLeadStatusRetrieve: 'leadstatus/retrieve/',
        configLeadStatusRetrieveById: 'leadstatus/retrieveById/',
        configLeadStatusUpdate: 'leadstatus/update',

        // configuration leadType
        configLeadTypePersist: 'leadtype/persist',
        configLeadTypeRetrieve: 'leadtype/retrieve/',
        configLeadTypeRetrieveById: 'leadtype/retrieveById/',
        configLeadTypeUpdate: 'leadtype/update',
        
        // configuration manage leaves
        configmanageLeavesPersist: 'leaveType/persist',
        configmanageLeavesRetrieve: 'leaveType/retrieve/', 
        configmanageLeavesUpdate: 'leaveType/update',
        
        configleaveTypePersist: 'leavemanagement/persist',
        configleaveTypeRetrieve: 'leavemanagement/retrieve', 
        configleaveTypeUpdate: 'leavemanagement/update',
         

        // configuration Salution
        configSalutionPersist: 'salutation/persist',
        configSalutionRetrieve: 'salutation/retrieve/',
        configSalutionRetrieveById: 'salutation/retrieveById/',
        configSalutionUpdate: 'salutation/update',

        // configuration projectTYpe
        configProjectPersist: 'projecttype/persist',
        configProjectRetrieve: 'projecttype/retrieve/',
        configProjectRetrieveById: 'projecttype/retrieveById/',
        configProjectUpdate: 'projecttype/update',

        // configuration deductaionType
        configDeductionTypePersist: 'deductiontype/persist',
        configDeductionTypeRetrieve: 'deductiontype/retrieve/',
        configDeductionTypeRetrieveById: 'deductiontype/retrieveById/',
        configDeductionTypeUpdate: 'deductiontype/update',
        
        // configuration allowanceType
        configAllowanceTypePersist: 'allowancetype/persist',
        configAllowanceTypeRetrieve: 'allowancetype/retrieve/',
        configAllowanceTypeRetrieveById: 'allowancetype/retrieveById/',
        configAllowanceTypeUpdate: 'allowancetype/update',
        
        // configuration payrollBatch
        configPayrollBatchPersist: 'payrollbatch/persist',
        configPayrollBatchRetrieve: 'payrollbatch/retrieve/',
        configPayrollBatchRetrieveById: 'payrollbatch/retrieveById/',
        configPayrollBatchUpdate: 'payrollbatch/update',
        
        // configuration property
        configPropertyTypePersist: 'propertytype/persist',
        configPropertyTypeRetrieve: 'propertytype/retrieve/',
        configPropertyTypeRetrieveById: 'propertytype/retrieveById/',
        configPropertyTypeUpdate: 'propertytype/update',
        
        // configuration storageType
        configStorageTypePersist: 'storagetype/persist',
        configStorageTypeRetrieve: 'storagetype/retrieve/',
        configStorageTypeRetrieveById: 'storagetype/retrieveById/',
        configStorageTypeUpdate: 'storagetype/update',
        
        // configuration SalesStageType
        configSalesStagePersist: 'salestage/persist',
        configSalesStageRetrieve: 'salestage/retrieve/',
        configSalesStageRetrieveById: 'salestage/retrieveById/',
        configSalesStageUpdate: 'salestage/update',
        
        // configuration Payment Mode
        configPaymentModePersist: 'paymentmode/persist',
        configPaymentModeRetrieve: 'paymentmode/retrieve/',
        configPaymentModeRetrieveById: 'paymentmode/retrieveById/',
        configPaymentModeUpdate: 'paymentmode/update',
        
     // configuration Invoicing terms
        configInvoicingTermsPersist: 'invoiceTerms/persist',
        configInvoicingTermsRetrieve: 'invoiceTerms/retrieve/',
        configInvoicingTermsRetrieveById: 'invoiceTerms/retrieveById/',
        configInvoicingTermsUpdate: 'invoiceTerms/update', 
        // configuration Gst Tax Slab
        configGstTaxPersist: 'gstTaxSlab/persist',
        configGstTaxRetrieve: 'gstTaxSlab/retrieve/',
        configGstTaxRetrieveById: 'gstTaxSlab/retrieveById/',
        configGstTaxUpdate: 'gstTaxSlab/update',
        
        
        // configuration payment
        configPaymentPersist: 'paymentterm/persist',
        configPaymentRetrieve: 'paymentterm/retrieve/',
        configPaymentRetrieveById: 'paymentterm/retrieveById/',
        configPaymentUpdate: 'paymentterm/update',
        
        configtimeSheetPersist: 'timesheetType/persist',
        configtimeSheetRetrieve: 'timesheetType/retrieve/', 
        configtimeSheetUpdate: 'timesheetType/update', 


        //companyInformation
        companyInformationDelete: 'company/delete/',
        companyInformationChangePhoto: 'company/updatepic',
        companyInformationChangeicon: 'company/updateicon',
        companyInformationPersist: 'company/persist',
        companyInformationRetrieve: 'company/retrieve/',
        companyInformationRetrieveById: 'company/retrieveById/',
        companyInformationUpdate: 'company/update',

        // country
        countryPersist: 'country/persist',
        countryRetrieve: 'country/retrieve/',
        countryRetrieveById: 'country/retrieveById/',
        countryUpdate: 'country/update',
        countryDelete: 'country/delete/',

        // email
        emailLogin: 'employee/updateEmail/',
        emailLogout: 'employee/resetEmail/',
        emailRetrieveInbox: 'email/retrieveInbox/',
        emailRetrieveSent: 'email/retrieveSent/',
        emailRetrieveMessage: 'email/retrieveMessage',

        // employee
        employeeCompensationUpdateDate : 'empctc/updateDate',
        employeecompensationPersist: 'empctc/persist',
        employeeCompensationRetrieve: 'empctc/retrieve/',
        employeeCompensationRetrieveById:  'empctc/retriveByEmpId/',
        employeeCompensationUpdate: 'empctc/update',
        employeePersist: 'employee/persist',
        employeeUpdateProfilePic :'employee/updatepic',
        employeeRetrieve: 'employee/retrieve/',
        employeeRetrieveById: 'employee/retriveById/',
        employeeRetrieveByMail: 'employee/retriveByEmail/',
        EmployeeIdRetrieve:  'employee/retrieveId',
        employeeUpdate: 'employee/update',
        employeeDelete: 'employee/delete/',
        importEmployee: 'employee/importEmp/',
        userRetrieveActive: 'employee/retrieveActive',

        // HR policy
        hrPolicyPersist: 'hrpolicy/persist',
        hrPolicyRetrieve: 'hrpolicy/retrieve/',
        hrPolicyUpdate: 'hrpolicy/update',
        hrPolicyRetrieveById: 'hrpolicy/retrieveById/',
        
        // Holiday
        holidayPersist: 'holidays/persist',
        holidayRetrieve: 'holidays/retrieve/',
        holidayUpdate: 'holidays/update',
        
        // HR request
//        hrAcceptRequest: '',
        hrRequestPersist: 'hrrequests/persist',
        hrRequestRetrieve: 'hrrequests/retrieve/',
        hrRequestUpdate: 'hrrequests/update',
        hrRequestRetrieveByEmpId: 'hrrequests/retrieveByEmpId/',
        hrRequestRetrieveById: 'hrrequests/retrieveById/',

        // lead
        leadDelete: 'lead/delete',
        leadPersist: 'lead/persist',
        leadRetrieve: 'lead/retrieve/',
        leadRetrieveById: 'lead/retrieveById/',
        leadRetrieveByType: 'lead/retrieveByType/',
        leadUpdate: 'lead/update',
        leadEmailPersist: 'leademail/persist',
        leadRetrieveLeadByEmp : 'lead/retrieveLeadByEmp/',
        leadEmailRetrieveByLeadId: 'leademail/retrieveByLeadId/',
        leadEmailRetrieveById: 'leademail/retrieveById/',
        leadLogActivityPersist: 'logactivity/persist',
        leadLogActivityRetrieve: 'logactivity/retrieveByLeadId/',
        leadNotesPersist: 'notes/persist',
        leadNotesRetrieve: 'notes/retrieveByLeadId/',
        leadRevokeTransfer: 'lead/revokeLead/',
        leadRetrieveTransfer: 'lead/retrieveTransferLead/',
        leadSchedulePersist: 'schedule/persist',
        leadScheduleRetrieve: 'schedule/retrieveByLeadId/',
        leadTaskPersist: 'task/persist',
        leadTaskRetrieve: 'task/retrieveByLeadId/',
        leadTaskRetrievePending: 'task/retrievePendingTask/',
        leadTaskUpdate: 'task/updateStatus/',
        leadTransfer: 'lead/transferLead',
        leadretrieveBetweenDate: 'lead/retrieveBetweenDate/',
        ConvertCustomerUpdate: 'lead/convertAsCustomer',
        customerretrieveBetweenDate: 'customer/retrieveBetweenDate/',
        myLeadsChartDetailsByEmp: 'lead/retrieveBetweenDateByEmp/',
        myCustomersChartDetailsByEmp: 'customer/retrieveBetweenDateByEmp/',
        mySalesTargetChartDetailsByEmp: 'salestarget/retrieveBetweenDate/',
        leadImport: 'lead/importLeads/',
        leadupdatepic: 'lead/updatepic',
        
        // leave Management
        leaveStatusRetrieve: 'leaverequests/retrieveLeaveStatus/',
        leaveManagementPersist: 'leaverequests/persist',
        leaveManagementRetrieve: 'leaverequests/retrieve/',
        leaveManagementUpdate: 'leaverequests/update',
        leaveManagementRetrieveByEmpId: 'leaverequests/retrieveByEmpId/',
        leaveManagementRetrieveById: 'leaverequests/retrieveById/',
        leaveManagementRetrieveAllActive: 'leavemanagement/retrieveAllActive/',
        leaveManagementRetrieveAvailableLeavesByEmpId: 'leaverequests/retrieveAvailableLeavesByEmpId/',     

        // Menu   
        menuRetrieve: 'menus/retrieve/',
        
        // Offers
        offerPersist: 'offers/persist',
        offerRetrieve: 'offers/retrieve/',
        offerRetrieveById: 'offers/retriveById/',
        offerUpdate: 'offers/update',

        // Payroll
        payrollAllowancePersist:'allowancesettings/persist',
        payrollAllowanceRetrieve:'allowancesettings/retrieve/',
        payrollAllowanceUpdate:'allowancesettings/update',
        payrollDeductionPersist:'deductionsettings/persist',
        payrollDeductionRetrieve:'deductionsettings/retrieve/',
        payrollDeductionUpdate:'deductionsettings/update',
        payrollgetLeadByEmpRetrieveById: 'empctc/retriveByEmpIdWithEarnings/',
        payrollGetAllowanceById: 'allowancesettings/retriveAmount/',
        payrollGetDeductionById: 'deductionsettings/retriveAmount/',
        empcompensation: 'empcompensation/persist',
        runPayrollRetrieve: 'empcompensation/retrieve/',
        payrollProcess: 'empPayroll/persist',
        payrollProcessRetrieveByMonth: 'empPayroll/retriveByMonth/',
        payrollProcessRetrieveByStatus: 'empPayroll/retriveByStatus/',
        payrollProcessUpdate: 'empPayroll/update',

        // Opportunity
        opportunityPersist: 'opportunity/persist',
        opportunityRetrieve: 'opportunity/retrieve/',
        opportunityRetrieveById: 'opportunity/retrieveById/',
        opportunityRetrieveByCustomerId: 'opportunity/retrieveByCustomerId/',
        opportunityUpdate: 'opportunity/update',
        opportunityDelete: 'opportunity/delete/',
        opportunityUploadDocument: 'opportunity/updatepic/',
        opportunityRetrieveSalesStageReportChartDetails: 'opportunity/retrieveAll/',
        
        // Project
        projectPersist: ' project/persist',
        projectRetrieve: ' project/retrieve/',
        projectUpdate: ' project/update',
        projectDelete: ' project/delete/',
        projectRetrieveById: ' project/retrieveByProjectId/',
        projectRetrieveByOpportunityId: 'project/retrieveByOpportunityId/',
        projectUploadDocument: ' project/updatepic/',
        projectRetrieveSalesStageReportChartDetails: ' project/retrieveAll/',
        
        // Requirement
        requirementPersist : 'requirements/persist',
        requirementRetrieve: 'requirements/retrieve/',
        requirementRetrieveById: 'requirements/retriveById/',
        requirementRetrieveByProjectId: 'requirements/retrieveByProjectId/',
        requirementUpdate: 'requirements/update',

        // role
        rolePersist: 'roles/persist',
        roleRetrieve: 'roles/retrieve/',
        roleUpdate: 'assignedmenu/persist',
        roleDelete: 'roles/delete/',
        
        // sales policy
        salesPolicyPersist: 'salespolicy/persist',
        salesPolicyRetrieve: 'salespolicy/retrieve/',
        salesPolicyUpdate: 'salespolicy/update',
        salesPolicyRetrieveById: 'salespolicy/retrieveById/',
        
        // sales target
        salesPersist: 'salestarget/persist',
        salesRetrieve: 'salestarget/retrieve/',
//        salesRetrieveSalesByDate: 'retrieveBetweenDateByEmp/fromDate/toDate/empId',
        salesUpdate: 'salestarget/update',

        // state
        statePersist: 'state/persist',
        stateRetrieve: 'state/retrieve/',
        stateUpdate: 'state/update',
        stateDelete: 'state/delete/',
        
        // timesheet
        timeSheetCreate: 'timesheet/persist',
        timeSheetRetrieve: 'timesheet/retrieve/',
        timeSheetRetrieveEmpTimesheet: 'timesheet/retrieveEmpTimesheet/',
        timeSheetRetrieveEmpWeekelyTimesheet: 'timesheet/retrieveEmpWeekelyTimesheet/',
        timeSheetUpdate: 'timesheet/update',
        
        // user
        userPersist: 'user/persist',
        userRetrieve: 'user/retrieve/',
        userRetrieveById: 'user/retriveById/',
        userUpdate: 'user/update',
        userDelete: 'user/delete/',
        userLogin: 'user/retrieveForLogin',
        userChangePassword: 'user/resetpassword',
        userResendInvite: 'user/resendInvite/',
        userSendPassword: 'user/sendPassword',

        // warehouse
        warehousePersist: 'warehouse/persist',
        warehouseRetrieve: 'warehouse/retrieve/',
        warehouseRetrieveById: 'warehouse/retriveById/',
        warehouseUpdate: 'warehouse/update',

    };

    angular.module('spheresuite').constant('constants', apiRoutesUrl);

})();