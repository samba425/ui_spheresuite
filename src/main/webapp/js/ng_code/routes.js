angular.module('spheresuite')
    .config(function config($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
        	.when('/', {
                templateUrl: 'templates/login.html',
                controller: 'loginController as loginControllerScope'
            })
            .when('/dashboard', {
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardController as dashboardControllerScope'
            })
            //start ims 
	        .when('/warehouse/add', {
	            templateUrl: 'templates/addWarehouse.html',
                controller: 'warehouseController as warehouseControllerScope'
	        })
             .when('/warehouse/edit', {
                templateUrl: 'templates/addWarehouse.html',
                controller: 'warehouseController as warehouseControllerScope'
            })
             .when('/warehouse/view', {
                templateUrl: 'templates/viewWarehouse.html',
                controller: 'warehouseController as warehouseControllerScope'
            })
            .when('/warehouses', {
                templateUrl: 'templates/viewWarehouses.html',
                controller: 'warehouseController as warehouseControllerScope'
            })
            .when('/reports', {
                templateUrl: 'templates/reports.html'
            })
            .when('/settings', {
                templateUrl: 'templates/settings.html'
            })
            .when('/category/add', {
                templateUrl: 'templates/addCategory.html',
                controller: 'categoriesController as categoriesControllerScope'
            })
            .when('/categories', {
                templateUrl: 'templates/viewCategories.html',
                controller: 'categoriesController as categoriesControllerScope'
            })
             .when('/category/view', {
                templateUrl: 'templates/viewCategory.html',
                controller: 'categoriesController as categoriesControllerScope'
            })

             .when('/product/add', {
                templateUrl: 'templates/addProduct.html',
                controller: 'productController as productControllerScope'
            })
            .when('/products', {
                templateUrl: 'templates/viewProducts.html',
                controller: 'productController as productControllerScope'
            })
             .when('/product/view', {
                templateUrl: 'templates/viewProduct.html',
                controller: 'productController as productControllerScope'
            })
//             .when('/customer/add', {
//                templateUrl: 'templates/addCustomer.html'
//            })
//            .when('/customer', {
//                templateUrl: 'templates/viewCustomers.html'
//            })
//             .when('/customer/view', {
//                templateUrl: 'templates/viewCustomer.html'
//            })
             .when('/order/add', {
                templateUrl: 'templates/addOrder.html',
                controller: 'ordersController as ordersControllerScope'
            })
            .when('/orders', {
                templateUrl: 'templates/viewOrders.html',
                controller: 'ordersController as ordersControllerScope'
            })
             .when('/order/view', {
                templateUrl: 'templates/viewOrder.html',
                controller: 'ordersController as ordersControllerScope'
            })
             .when('/supplier/add', {
                templateUrl: 'templates/addSupplier.html',
                controller: 'supplierController as supplierControllerScope'
            })
            .when('/suppliers', {
                templateUrl: 'templates/viewSuppliers.html',
                controller: 'supplierController as supplierControllerScope'
            })
             .when('/supplier/view', {
                templateUrl: 'templates/viewSupplier.html',
                controller: 'supplierController as supplierControllerScope'
            })
             .when('/purchase/add', {
                templateUrl: 'templates/addPurchase.html',
                controller: 'proposalController as proposalControllerScope'
            })
            .when('/purchases', {
                templateUrl: 'templates/viewPurchases.html',
                controller: 'proposalController as proposalControllerScope'
            })
             .when('/purchase/view', {
                templateUrl: 'templates/viewPurchase.html',
                controller: 'proposalController as proposalControllerScope'
            })
            .when('/invoice/add', {
                templateUrl: 'templates/addInvoice.html',
                controller: 'invoiceController as invoiceControllerScope'
            })
            .when('/invoices', {
                templateUrl: 'templates/viewInvoices.html',
                controller: 'invoiceController as invoiceControllerScope'
            })
             .when('/invoice/view', {
                templateUrl: 'templates/viewInvoice.html',
                controller: 'invoiceController as invoiceControllerScope'
            })
            .when('/invoice/projectInvoice', {
                templateUrl: 'templates/projectInvoice.html',
                controller: 'projectInvoiceController as projectInvoiceControllerScope'
            })
            .when('/invoice/resourceDeployementInvoice', {
                templateUrl: 'templates/resourceDeployementInvoice.html',
                controller: 'resourceDeployementInvoiceController as resourceDeployementInvoiceControllerScope'
            })
            .when('/invoice/resourceDeployementInvoice/view', {
                templateUrl: 'templates/viewResourceDeployementInvoice.html',
                controller: 'resourceDeployementInvoiceController as resourceDeployementInvoiceControllerScope'
            })
            
            
            //end ims
            
            //start hrms
            	.when('/hrrequest/add', {
                templateUrl: 'templates/addHrRequests.html',
                controller: 'hrRequestController as hrRequestControllerScope'
            })
            .when('/hrrequest/edit', {
                templateUrl: 'templates/addHrRequests.html',
                controller: 'hrRequestController as hrRequestControllerScope'
            })
            .when('/hrrequests', {
                templateUrl: 'templates/viewHrRequests.html',
                controller: 'hrRequestController as hrRequestControllerScope'
            })
            .when('/hrrequest/view', {
                templateUrl: 'templates/viewHrRequest.html',
                controller: 'hrRequestController as hrRequestControllerScope'
            })
             .when('/hrrequest/companiesrequest', {
                templateUrl: 'templates/companyHrRequests.html',
                controller: 'hrRequestController as hrRequestControllerScope'
            })
             .when('/hrrequest/companiesrequest/view', {
                templateUrl: 'templates/viewCompanyHrRequest.html',
                controller: 'hrRequestController as hrRequestControllerScope'
            })
            .when('/leaves', {
                templateUrl: 'templates/viewLeaveManagementRequests.html',
                controller: 'leaveManagementController as leaveManagementControllerScope'
            })            
            .when('/leave/add', {
                templateUrl: 'templates/addLeaveManagementRequest.html',
                controller: 'leaveManagementController as leaveManagementControllerScope'
            })            
            .when('/leave/edit', {
                templateUrl: 'templates/addLeaveManagementRequest.html',
                controller: 'leaveManagementController as leaveManagementControllerScope'
            })
            .when('/leave/view', {
                templateUrl: 'templates/viewLeaveManagementRequest.html',
                controller: 'leaveManagementController as leaveManagementControllerScope'
            })
             .when('/leave/companiesrequests', {
                templateUrl: 'templates/viewLeaveManagementRequests.html',
                controller: 'leaveManagementController as leaveManagementControllerScope'
            })            
            .when('/leave/companiesrequest/view', {
                templateUrl: 'templates/viewLeaveManagementRequest.html',
                controller: 'leaveManagementController as leaveManagementControllerScope'
            })            
            .when('/leave/companiesrequest/edit', {
                templateUrl: 'templates/addLeaveManagementRequest.html',
                controller: 'leaveManagementController as leaveManagementControllerScope'
            })           
            .when('/leave/status', {
                templateUrl: 'templates/leaveStatus.html',
                controller: 'leaveManagementController as leaveManagementControllerScope'
            })
             /*.when('/hrms/leaveManagement/viewLeaveManagementRequest', {
                templateUrl: 'templates/viewLeaveManagementRequest.html'
            })*/            
            .when('/timesheet/add', {
                templateUrl: 'templates/addTimesheet.html',
                controller: 'timeSheetController as timeSheetControllerScope'
            })            
            .when('/timesheet/edit', {
                templateUrl: 'templates/addTimesheet.html',
                controller: 'timeSheetController as timeSheetControllerScope'
            })
            .when('/timesheets', {
                templateUrl: 'templates/viewTimesheets.html',
                controller: 'timeSheetController as timeSheetControllerScope'
            })
            .when('/timesheet/view', {
                templateUrl: 'templates/viewTimesheet.html',
                controller: 'timeSheetController as timeSheetControllerScope'
            })
             .when('/timesheet/companiestimesheets', {
                templateUrl: 'templates/companyTimesheets.html',
                controller: 'timeSheetController as timeSheetControllerScope'
            })
             .when('/timesheet/companiestimesheet/edit', {
                templateUrl: 'templates/addTimesheet.html',
                controller: 'timeSheetController as timeSheetControllerScope'
            })
             .when('/timesheet/companiestimesheet/view', {
                templateUrl: 'templates/viewTimesheet.html',
                controller: 'timeSheetController as timeSheetControllerScope'
            })
            
            
            .when('/requirement/add', {
                templateUrl: 'templates/addRequirement.html',
                controller: 'requirementController as requirementControllerScope'
            })            
            .when('/requirement/edit', {
                templateUrl: 'templates/addRequirement.html',
                controller: 'requirementController as requirementControllerScope'
            })
            .when('/requirements', {
                templateUrl: 'templates/viewRequirements.html',
                controller: 'requirementController as requirementControllerScope'
            })
            .when('/requirement/view', {
                templateUrl: 'templates/viewRequirement.html',
                controller: 'requirementController as requirementControllerScope'
            })
            
            .when('/offer/add', {
                templateUrl: 'templates/addOffer.html',
                controller: 'offerController as offerControllerScope'
            })            
            .when('/offer/edit/:empId?/:offerId?', {
                templateUrl: 'templates/addOffer.html',
                controller: 'offerController as offerControllerScope'
            })
            .when('/offers', {
                templateUrl: 'templates/viewOffers.html',
                controller: 'offerController as offerControllerScope'
            })
            .when('/offer/view', {
                templateUrl: 'templates/viewOffer.html',
                controller: 'offerController as offerControllerScope'
            })
            //end hrms
            
            .when('/employees', {
                templateUrl: 'templates/viewEmployees.html',
                controller: 'employeeController as employeeControllerScope'
            })
             .when('/employee/directory', {
                templateUrl: 'templates/employeedirectory.html',
                controller: 'employeeController as employeeControllerScope'
            })
            .when('/employee/add', {
                templateUrl: 'templates/addEmployee.html',
                controller: 'employeeController as employeeControllerScope'
            })
              .when('/employee/compensation', {
                templateUrl: 'templates/employeeCompensation.html',
                controller: 'payrollController as payrollControllerScope'
            })
              .when('/employee/ctc', {
                templateUrl: 'templates/addCTC.html',
                controller: 'employeeController as employeeControllerScope'
            })
            .when('/employee/edit', {
                templateUrl: 'templates/addEmployee.html',
                controller: 'employeeController as employeeControllerScope'
            })
            .when('/employee/view', {
                templateUrl: 'templates/viewEmployee.html',
                controller: 'employeeController as employeeControllerScope'
            })
             .when('/employeeCompensation/view', {
                templateUrl: 'templates/viewEmployeeCompensation.html',
                controller: 'employeeController as employeeControllerScope'
            })
             .when('/employee/import', {
                templateUrl: 'templates/importEmployee.html',
                controller: 'employeeController as employeeControllerScope'
            })
            .when('/customers', {
                templateUrl: 'templates/viewLeads.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/customer/add', {
                templateUrl: 'templates/addLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/customer/edit', {
                templateUrl: 'templates/addLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/customer/view', {
            	templateUrl: 'templates/viewLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/customer/import', {
                templateUrl: 'templates/importLead.html',
                controller: 'leadController as leadControllerScope'
            })            
            .when('/customer/transfer', {
                templateUrl: 'templates/transferLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/contacts', {
                templateUrl: 'templates/viewContacts.html',
                controller: 'contactController as contactControllerScope'
            })
            .when('/contact/add', {
                templateUrl: 'templates/addContact.html',
                controller: 'contactController as contactControllerScope'
            })
             .when('/contact/edit', {
                templateUrl: 'templates/addContact.html',
                controller: 'contactController as contactControllerScope'
            })
            .when('/contact/import', {
                templateUrl: 'templates/importContact.html',
                controller: 'contactController as contactControllerScope'
            })
            .when('/contact/view', {
                templateUrl: 'templates/viewContact.html',
                controller: 'contactController as contactControllerScope'
            })
            .when('/dashboard', {
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardController as dashboardControllerScope'
            })
            .when('/configuration', {
                templateUrl: 'templates/configuration.html',
                controller: 'configurationController as configurationControllerScope'
            })
            .when('/configuration/hrms', {
                templateUrl: 'templates/configurationHRM.html',
                controller: 'configurationController as configurationControllerScope'
            })
            .when('/configuration/crm', {
                templateUrl: 'templates/configurationCRM.html',
                controller: 'configurationController as configurationControllerScope'
            })
            .when('/configuration/ims', {
                templateUrl: 'templates/configurationIMS.html',
                controller: 'configurationController as configurationControllerScope'
            })
            .when('/changepassword/:temppassword/:email/:type',{
            	templateUrl: 'templates/changePassword.html',
                controller: 'changePasswordController as changePasswordControllerScope'
            })
            .when('/roles', {
                templateUrl: 'templates/roles.html',
                controller: 'rolesController as rolesControllerScope'
            })
            .when('/users', {
                templateUrl: 'templates/users.html',
                controller: 'usersController as usersControllerScope'
            })
            .when('/companyinformation', {
                templateUrl: 'templates/companyInformation.html',
                controller: 'companyInformationController as companyInformationControllerScope'
            })
            .when('/reports', {
                templateUrl: 'templates/reports.html',
                controller: 'reportController as reportControllerScope'
            })
            .when('/payroll/settings', {
                templateUrl: 'templates/payrollSetting.html',
                controller: 'payrollController as payrollControllerScope'
            })
            .when('/payroll/run', {
                templateUrl: 'templates/runPayroll.html',
                controller: 'payrollController as payrollControllerScope'
            })
            .when('/salestarget', {
                templateUrl: 'templates/salesTarget.html',
                controller: 'salesTargetController as salesTargetControllerScope'
            })
            .when('/employee/leads', {
                templateUrl: 'templates/employeeLeads.html',
                controller: 'employeeController as employeeControllerScope'
            })            
            .when('/lead/view', {
                templateUrl: 'templates/viewLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/lead/add', {
                templateUrl: 'templates/addLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/lead/edit', {
                templateUrl: 'templates/addLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/lead/import', {
                templateUrl: 'templates/importLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/leads', {
                templateUrl: 'templates/viewLeads.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/lead/transfer', {
                templateUrl: 'templates/transferLead.html',
                controller: 'leadController as leadControllerScope'
            })
           /* .when('/lead/transfer/add', {
                templateUrl: 'templates/addTransferLead.html',
                controller: 'leadController as leadControllerScope'
            })*/
            .when('/recategorise', {
                templateUrl: 'templates/reCategorise.html',
                controller: 'reCategoriseController as reCategoriseControllerScope'
            })
            .when('/vendors', {
                templateUrl: 'templates/viewLeads.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/vendor/view', {
                templateUrl: 'templates/viewLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/vendor/add', {
                templateUrl: 'templates/addLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/vendor/edit', {
                templateUrl: 'templates/addLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/vendor/import', {
                templateUrl: 'templates/importLead.html',
                controller: 'leadController as leadControllerScope'
            })
            .when('/bills', {
                templateUrl: 'templates/viewBills.html',
                controller: 'billController as billControllerScope'
            })
            .when('/bill/add', {
                templateUrl: 'templates/addBill.html',
                controller: 'billController as billControllerScope'
            })
            .when('/bill/view', {
                templateUrl: 'templates/viewBill.html',
                controller: 'billController as billControllerScope'
            })
            .when('/bill/edit', {
                templateUrl: 'templates/addBill.html',
                controller: 'billController as billControllerScope'
            })
            .when('/bill/import', {
                templateUrl: 'templates/importBill.html',
                controller: 'billController as billControllerScope'
            })
            .when('/cheques', {
                templateUrl: 'templates/viewCheques.html',
                controller: 'chequeController as chequeControllerScope'
            })
            .when('/cheque/add', {
                templateUrl: 'templates/addCheque.html',
                controller: 'chequeController as chequeControllerScope'
            })
            .when('/cheque/view', {
                templateUrl: 'templates/viewCheque.html',
                controller: 'chequeController as chequeControllerScope'
            })
            .when('/cheque/edit', {
                templateUrl: 'templates/addCheque.html',
                controller: 'chequeController as chequeControllerScope'
            })
            .when('/cheque/import', {
                templateUrl: 'templates/importCheque.html',
                controller: 'chequeController as chequeControllerScope'
            })
            .when('/hrpolicy', {
                templateUrl: 'templates/hrPolicySetting.html',
                controller: 'hrPolicyController as hrPolicyControllerScope'
            })
            .when('/hrpolicies', {
                templateUrl: 'templates/viewHrPolicies.html',
                controller: 'hrPolicyController as hrPolicyControllerScope'
            })
             .when('/holiday', {
                templateUrl: 'templates/holidaySetting.html',
                controller: 'holidayController as holidayControllerScope'
            })
            .when('/holidays', {
                templateUrl: 'templates/viewHoliday.html',
                controller: 'holidayController as holidayControllerScope'
            })
            .when('/salespolicy', {
                templateUrl: 'templates/salesPolicySetting.html',
                controller: 'salesPolicyController as salesPolicyControllerScope'
            })
            .when('/salespolicies', {
                templateUrl: 'templates/viewSalesPolicies.html',
                controller: 'salesPolicyController as salesPolicyControllerScope'
            })
            .when('/administration', {
                templateUrl: 'templates/Administration.html',
                controller: 'adminstrationController as adminstrationControllerScope'
            })
            .when('/opportunities', {
                templateUrl: 'templates/viewOpportunities.html',
                controller: 'opportunityController as opportunityControllerScope'
            })
            .when('/opportunity/add', {
                templateUrl: 'templates/addOpportunity.html',
                controller: 'opportunityController as opportunityControllerScope'
            })
            .when('/opportunity/edit', {
                templateUrl: 'templates/addOpportunity.html',
                controller: 'opportunityController as opportunityControllerScope'
            })
            .when('/opportunity/view', {
                templateUrl: 'templates/viewOpportunity.html',
                controller: 'opportunityController as opportunityControllerScope'
            })
             .when('/projects', {
                templateUrl: 'templates/viewProjects.html',
                controller: 'projectController as projectControllerScope'
            })
            .when('/project/add', {
                templateUrl: 'templates/addProject.html',
                controller: 'projectController as projectControllerScope'
            })
            .when('/project/edit', {
                templateUrl: 'templates/addProject.html',
                controller: 'projectController as projectControllerScope'
            })
            .when('/project/view', {
                templateUrl: 'templates/viewProject.html',
                controller: 'projectController as projectControllerScope'
            })
            .when('/assignment/add', {
                templateUrl: 'templates/addAssignment.html',
                controller: 'assignmentController as assignmentControllerScope'
            })
            .when('/assignments', {
                templateUrl: 'templates/viewAssignments.html',
                controller: 'assignmentController as assignmentControllerScope'
            })
            .when('/assignment/view', {
                templateUrl: 'templates/viewAssignment.html',
                controller: 'assignmentController as assignmentControllerScope'
            })
            .when('/reports', {
                templateUrl: 'templates/reports.html',
                controller: 'reportController as reportControllerScope'
            })
            .when('/myinfo', {
                templateUrl: 'templates/myInfo.html',
                controller: 'employeeController as employeeControllerScope'
            })
            .when('/proposals', {
                templateUrl: 'templates/viewProposals.html',
                controller: 'proposalController as proposalControllerScope'
            })
            .when('/proposal/add', {
                templateUrl: 'templates/addProposal.html',
                controller: 'proposalController as proposalControllerScope'
            })
            .when('/proposal/edit', {
                templateUrl: 'templates/addProposal.html',
                controller: 'proposalController as proposalControllerScope'
            })
            .when('/proposal/view', {
                templateUrl: 'templates/viewProposal.html',
                controller: 'proposalController as proposalControllerScope'
            })
            .when('/mailbox/configuremail', {
                templateUrl: 'templates/mailbox.html',
                	controller: 'mailBoxController as mailBoxControllerScope'
            })
            .when('/mycompensation', {
                templateUrl: 'templates/myCompensation.html',
                 controller: 'myCompensationController as myCompensationControllerScope'
            })
            .when('/payroll/detail', {
                templateUrl: 'templates/runPayrolDetail.html',
                controller: 'payrollController as payrollControllerScope'
            })
            .when('/mailbox', {
                templateUrl: 'templates/mailInbox.html',
                controller: 'mailBoxController as mailBoxControllerScope',
                resolve: {
                	"isMailConfigured" : function (employeeService, $localStorage, $location, $rootScope){
                		if($rootScope.configuremail){
                			return true;
                		}else{
		            		employeeService.getEmployee($localStorage.spheresuite.id).then(function(res){
		            			if(res.successflag == 'true' && res.results.length > 0){
		            				if(res.results[0].email != '' && res.results[0].password != ''){
				            			$rootScope.configuremail = true;
		            					return true;
		            				}
		            			}
		            			$rootScope.configuremail = false;
		            			$location.path('/mailbox/configuremail');
		            		},function(err){
		            			$rootScope.configuremail = false;
		            			$location.path('/mailbox/configuremail');
		            		});
		            	}
                	}
                }
            })
//        	.when('/:empId?/:offerId?', {
//                templateUrl: 'templates/login.html',
//                controller: 'loginController as loginControllerScope'
//            })


            .otherwise({ redirectTo: '/' });
          $httpProvider.interceptors.push('TokenInterceptor');
    });

angular.module('spheresuite')
.factory('TokenInterceptor',
    function($q, $location, $localStorage) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                if ($localStorage.spheresuite) {
                    config.headers.Authorization = $localStorage.spheresuite.token;
                    config.headers.Accept = '*';
                }
                return config || $q.when(config);;
            },
            'response': function(response) {
            	
            	if(response.data.response){
            		if(response.data.response.successflag == "false"){
            			if(response.data.response.error_code == "1000"){
            				delete $localStorage.spheresuite;
                            $location.path('/');
            			}
            		}
            			
            	}
            	
                return response;
              },
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                	delete $localStorage.spheresuite;
                    $location.path('/');
                }
                return $q.reject(response);
            }
        };
    });