var app = angular.module('spheresuite')
app.controller('proposalController',
		proposalController);

proposalController.$inject = [ '$scope', '$rootScope', '$location', '$filter',
		'$localStorage', '$rootScope', 'configurationService',
		'opportunityService', 'leadService', 'commonService', 'proposalService',
		'Upload', 'constants' ];

function proposalController($scope, $rootScope, $location, $filter,
		$localStorage, $rootScope, configurationService, opportunityService,
		leadService, commonService, proposalService, Upload, constants) {
	var proposalControllerScope = this;
	$rootScope.headerMenu = "Proposals";

	$scope.IsVisibleFixed = false;
	$scope.IsVisiblePercentage = false;
	proposalControllerScope.hidefixed = true;
	proposalControllerScope.hidePercentage = true;
	proposalControllerScope.isUpdate = false;
	proposalControllerScope.isIncovicingValid = false;
	proposalControllerScope.startCalender = false;
	proposalControllerScope.proposal = {};
	proposalControllerScope.proposal = {
		invoiceTermList : [ {
			comment : '',
			percentage : ''
		} ],
		fieldList : [],
		files : []
	};
	proposalControllerScope.proposalForm;
	proposalControllerScope.proposalList;

	proposalControllerScope.addNewField = addNewField;
	proposalControllerScope.addNewInput = addNewInput;
	proposalControllerScope.addProposal = addProposal;
	proposalControllerScope.editProposal = editProposal;
	proposalControllerScope.decline = decline;
	proposalControllerScope.goBackToPropsals = goBackToPropsals;
	proposalControllerScope.goToEditProposal = goToEditProposal;
	proposalControllerScope.getWorkLocation = getWorkLocation;
	proposalControllerScope.getOpportunityType = getOpportunityType;
	proposalControllerScope.getPayment = getPayment;
	proposalControllerScope.getOpportunity = getOpportunity;
	proposalControllerScope.getCustomerType = getCustomerType;
	proposalControllerScope.getCountry = getCountry;
	proposalControllerScope.getLead = getLead;
	proposalControllerScope.getProposal = getProposal;
	proposalControllerScope.openstartCalender = openstartCalender;
	proposalControllerScope.ShowFixed = ShowFixed;
	proposalControllerScope.ShowPercentege = ShowPercentege;
	proposalControllerScope.removeChoice = removeChoice;
	proposalControllerScope.removeChoiceGet = removeChoiceGet;
	proposalControllerScope.removeField = removeField;
	proposalControllerScope.removeDefaultField = removeDefaultField;
	proposalControllerScope.viewProposal = viewProposal;

	proposalControllerScope.addMoreItems = addMoreItems;
	proposalControllerScope.limitToShow = 0;
    
    function addMoreItems() { 
    	proposalControllerScope.limitToShow += 5; 
    }

    
	if ($localStorage.spheresuite.id && $localStorage.spheresuite.id != ''
			&& $location.path() != '/proposal/view'
			&& $location.path() != '/proposals') {
		getLead();
		getOpportunity();
		getCountry();
		getWorkLocation();
		getPayment();
		getOpportunityType();
		getCustomerType();
	} else if ($location.path() == '/proposals') {
		getProposal();
		getOpportunityType();
	}

	if ($localStorage.spheresuite && $localStorage.spheresuite.proposalId
			&& $location.path() == '/proposal/view'
			|| $location.path() == '/proposal/edit') {
		getProposal($localStorage.spheresuite.proposalId);
		getLead(proposalControllerScope.proposal.customerId);
		if ($location.path() == '/proposal/edit') {
			proposalControllerScope.isUpdate = true;
		}
	} else {
		delete $localStorage.spheresuite['proposalId'];
	}

	function addNewField() {
		proposalControllerScope.proposal.fieldList.push({
			key : '',
			value : ''
		});
	}

	 
	proposalControllerScope.proposal.defaultList = [{key : 'Description',value : ''},{key : 'Supplier Employee Name',value : ''},
		{key : 'Start Date',value : ''},{key : 'Duration',value : ''},{key : 'Project Type',
			value : ''},{key : 'Supplier Employee Name',value : ''},
			{key : 'Expenses',value : ''},{key : 'Expense Term',value : ''},
			{key : 'Location of Work',value : ''},{key : 'Scope/Description of Work',value : ''}, {key : 'Customer Primary Contact & Ph',value : ''},
			{key : 'Supplier Primary Contact & Ph',value : ''}];
	
	function removeDefaultField(index) {
		proposalControllerScope.proposal.defaultList.splice(index, 1);
	}
	
	function addNewInput() {
		proposalControllerScope.proposal.invoiceTermList.push({
			comment : '',
			percentage : ''
		});
	}

	function addProposal() {
		if (proposalControllerScope.proposalForm && $scope.IsVisibleFixed == false && $scope.IsVisiblePercentage == false) {
			proposalControllerScope.proposalForm.$invalid = true;
			proposalControllerScope.isIncovicingValid = true;
		} else if (proposalControllerScope.proposal
				&& $localStorage.spheresuite.id
				&& $localStorage.spheresuite.id != '') {
			proposalControllerScope.spinner = true;
			angular.forEach(proposalControllerScope.proposal.fieldList,
					function(val) {
						delete val['$$hashKey'];
					});
			angular.forEach(proposalControllerScope.proposal.invoiceTermList,
					function(val) {
						delete val['$$hashKey'];
					});
			angular.forEach(proposalControllerScope.proposal.defaultList,
					function(val) {
						delete val['$$hashKey'];
					});
			commonService
					.formValNotManditory(proposalControllerScope.proposalForm,
							proposalControllerScope.proposal)
					.then(
							function(data) { 
								if (data) {
									data.updatedBy = $localStorage.spheresuite.id;
									if (proposalControllerScope.proposal.files.length > 0) {
										proposalControllerScope.spinner = true;
										Upload
												.base64DataUrl(
														proposalControllerScope.proposal.files)
												.then(function(urls) {
													data.files = "";
													proposal(data,urls);
												});
									} else {
										proposalControllerScope.proposal.files = '';
										proposal(data);
									}
								} else {
									proposalControllerScope.spinner = false;
								}
							}, function(err) { 
								proposalControllerScope.spinner = false;
							});
		}
	}

	function proposal(data,files) {
		if (data) { 
			proposalControllerScope.spinner = true;
			data.projectType = "";
			proposalService.addProposal(data).then(function(res) { 
				if (res.successflag === 'true' && res.results != '') {
					if(files){
						proposalService.changeicon({id:res.results,file:files}).then(function(res){
							console.log('res',res)
						},function(err){
							console.log('err',err);
						});
					}
					decline();
					$location.path('/proposals');
					proposalControllerScope.spinner = false;
				} else {
					proposalControllerScope.spinner = false; 
				}
			}, function(err) { 
				proposalControllerScope.spinner = false;
			});
		}
	}

	function proposalEdit(data) {
		if (data) {
			proposalControllerScope.spinner = true;
			if (data.files && data.files.length == 0)
				data.files = "";
			data.files = ""; 
			data.updatedBy = $localStorage.spheresuite.id;
			if (data.invoiceTermList && data.invoiceTermList.comment == ''
					&& data.invoiceTermList.percentage == '') {
				data.invoiceTermList = data.invoiceTermListGet;
			} else {
				angular.forEach(data.invoiceTermListGet, function(val) {
					data.invoiceTermList[data.invoiceTermList.length] = val;
				});
				delete data['invoiceTermListGet'];
			}
			angular.forEach(data.fieldList, function(val) {
				delete val['$$hashKey'];
			});
			angular.forEach(data.invoiceTermList, function(val) {
				delete val['$$hashKey'];
			});
			angular.forEach(data.defaultList, function(val) {
						delete val['$$hashKey'];
					});
			if (data.fieldList && data.fieldList.length == 0)
				data.fieldList = '';
			proposalService.editProposal(data).then(function(res) {
				if (res.successflag === 'true') {
					decline();
					$location.path('/proposal/view');
					proposalControllerScope.spinner = false;
				} else {
					proposalControllerScope.spinner = false; 
				}
			}, function(err) { 
				proposalControllerScope.spinner = false;
			});
		}
	}

	function editProposal() {
		if (proposalControllerScope.proposalForm
				&& $scope.IsVisibleFixed == false
				&& $scope.IsVisiblePercentage == false) {
			proposalControllerScope.proposalForm.$invalid = true;
			proposalControllerScope.isIncovicingValid = true;
		} else if (proposalControllerScope.proposal) {
			proposalControllerScope.spinner = true;
			if (proposalControllerScope.proposal.files
					&& proposalControllerScope.proposal.files.length > 0) {
				Upload.base64DataUrl(proposalControllerScope.proposal.files)
						.then(function(urls) {
							proposalControllerScope.proposal.files = urls;
							proposalEdit(proposalControllerScope.proposal);
						});
			} else {
				proposalEdit(proposalControllerScope.proposal);
			}
		}
	}

	function decline() {
		if ($location.path() == '/proposal/edit') {
			$location.path('/proposal/view');
		} else {
			proposalControllerScope.proposal = {
				invoiceTermList : [ {
					comment : '',
					percentage : ''
				} ],
				fieldList : [],
				files : []
			};
			proposalControllerScope.proposal.defaultList = [{key : 'Description',value : ''},{key : 'Supplier Employee Name',value : ''},
				{key : 'Start Date',value : ''},{key : 'Duration',value : ''},{key : 'Project Type',
					value : ''},{key : 'Supplier Employee Name',value : ''},
					{key : 'Expenses',value : ''},{key : 'Expense Term',value : ''},
					{key : 'Location of Work',value : ''},{key : 'Scope/Description of Work',value : ''}, {key : 'Customer Primary Contact & Ph',value : ''},
					{key : 'Supplier Primary Contact & Ph',value : ''}];
			
			proposalControllerScope.proposalForm.$setPristine();
			proposalControllerScope.proposalForm.$setUntouched();
			$scope.IsVisibleFixed = false;
			$scope.IsVisiblePercentage = false;
			proposalControllerScope.hidefixed = true;
			proposalControllerScope.hidePercentage = true;
		}
	}

	function goBackToPropsals() {
		$location.path('/proposals');
	}

	function goToEditProposal(proposal) {
		if (proposal) {
			$localStorage.spheresuite.proposalId = proposal;
			$location.path('/proposal/edit');
		}
	}

	function getWorkLocation() {
		proposalControllerScope.spinner = true;
		configurationService.getWorkLocation().then(function(res) {
			if (res.successflag == 'true') {
				proposalControllerScope.workLocationList = res.results;
				proposalControllerScope.spinner = false;
			} else {
				proposalControllerScope.spinner = false;
			}
		}, function(err) { 
			proposalControllerScope.spinner = false;
		});
	}

	function getOpportunityType() {
		proposalControllerScope.spinner = true;
		configurationService.getOpportunity().then(function(res) {
			if (res.successflag == 'true' && res.results.length > 0) {
				proposalControllerScope.projectType = res.results;
				proposalControllerScope.spinner = false;
			} else {
				proposalControllerScope.spinner = false;
			}
		}, function(err) { 
			proposalControllerScope.spinner = false;
		});
	}

	function getCountry() {
		proposalControllerScope.spinner = true;
		configurationService.getCountry().then(function(res) {
			if (res.successflag == 'true' && res.results.length > 0) {
				proposalControllerScope.countryList = res.results;
				proposalControllerScope.spinner = false;
			} else {
				proposalControllerScope.spinner = false;
			}
		}, function(err) { 
			proposalControllerScope.spinner = false;
		});
	}

	function getLead(data) {
		proposalControllerScope.getSpinner = true;
		leadService.getLead(data).then(
			function(res) { 
				if (res.successflag == 'true' && res.results.length > 0) {
					proposalControllerScope.leadList = res.results;
					proposalControllerScope.pdfLeadAddress = proposalControllerScope.leadList[0].address; 
					proposalControllerScope.getSpinner = false;
				} else {
					proposalControllerScope.getSpinner = false;
				}
			}, function(err) { 
				proposalControllerScope.getSpinner = false;
			});
	}

	function getOpportunity(data) {
		proposalControllerScope.spinner = true;
		opportunityService.getOpportunity(data).then(function(res) {
			if (res.successflag == 'true' && res.results.length > 0) {
				proposalControllerScope.projectList = res.results;
				proposalControllerScope.spinner = false;
			} else {
				proposalControllerScope.spinner = false;
			}
		}, function(err) { 
			proposalControllerScope.spinner = false;
		});

	}

	 $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) { 
		 proposalControllerScope.viewProposalspinner = false;
	    });
	    
	 function getProposal(data) {
		proposalControllerScope.viewProposalspinner = true;
		proposalService.getProposal(data).then(function(res) {  
			  if (res.successflag == 'true' && res.results.length > 0) {
								if ($location.path() == '/proposals') {
									proposalControllerScope.proposalList = res.results;
									
									proposalControllerScope.proposalListBackup = angular.copy(res.results);
				                    proposalControllerScope.isDataAvailable = true;

				                	for(var i = 0; i < proposalControllerScope.proposalListBackup.length; i++){
				                    	proposalControllerScope.proposalListBackup[i].isActiveClass = false;
				                    	proposalControllerScope.proposalListBackup[i].isSelect = false;
				                	}

				                    proposalControllerScope.proposalList =  angular.copy(proposalControllerScope.proposalListBackup);
				                	if((proposalControllerScope.buttonBeginFrom + proposalControllerScope.buttonLimitToShow) * proposalControllerScope.buttonLimitToShow >= proposalControllerScope.proposalList.length)
				                		proposalControllerScope.isNextDisabled = true;
				                	
				                	proposalControllerScope.proposalList[0].isActiveClass = true;
									
									
									
								} else if ($location.path() == '/proposal/edit'
										|| $location.path() == '/proposal/view') {
									proposalControllerScope.proposal = res.results[0];
									if (proposalControllerScope.proposal.invoiceTerm == 'P') {
										$scope.ShowPercentageData = true;
										$scope.IsVisiblePercentage = true;
									} else if (proposalControllerScope.proposal.invoiceTerm == 'F') {
										$scope.ShowFixedData = true;
										$scope.IsVisibleFixed = true;
									}
									proposalControllerScope.proposal.invoiceTermListGet = proposalControllerScope.proposal.invoiceTermList;
									proposalControllerScope.proposal.invoiceTermList = [];
									if (proposalControllerScope.proposal.fieldList == '') {
										proposalControllerScope.proposal.fieldList = [];
									}
									if (proposalControllerScope.proposal.deafultList == '') {
										proposalControllerScope.proposal.deafultList = [];
									}
								}
								proposalControllerScope.viewProposalspinner = false;
							} else {
								proposalControllerScope.viewProposalspinner = false; 
								proposalControllerScope.dataMsg = "Proposals Not Available";
							}
						}, function(err) { 
							proposalControllerScope.viewProposalspinner = false;
						});
	}

	function getCustomerType() {
		proposalControllerScope.spinner = true;
		leadService.getLead().then(function(res) {
			if (res.successflag == 'true') {
				proposalControllerScope.CustomerTypeList = res.results;
				proposalControllerScope.spinner = false;
			} else {
				proposalControllerScope.spinner = false; 
			}
		}, function(err) {
			proposalControllerScope.spinner = false; 
		});

	}

	function getPayment() {
		proposalControllerScope.spinner = true;
		configurationService.getPayment().then(function(res) {
			if (res.successflag == 'true' && res.results.length > 0) {
				proposalControllerScope.paymentList = res.results;
				proposalControllerScope.spinner = false;
			} else {
				proposalControllerScope.spinner = false;
			}
		}, function(err) {
			proposalControllerScope.spinner = false; 
		});
	}

	function openstartCalender($event) {
		$event.preventDefault();
		$event.stopPropagation();
		proposalControllerScope.startCalender = !proposalControllerScope.startCalender
	}
	;

	function removeChoice(index) {
		proposalControllerScope.proposal.invoiceTermList.splice(index, 1);
	}

	function removeChoiceGet(index) {
		proposalControllerScope.proposal.invoiceTermListGet.splice(index, 1);
	}

	function removeField(index) {
		proposalControllerScope.proposal.fieldList.splice(index, 1);
	}

	
	function viewProposal(proposal) {
		if (proposal) {
			$localStorage.spheresuite.proposalId = proposal;
			$location.path('/proposal/view');
		}
	}

	function ShowFixed() {
		proposalControllerScope.spinner = true;
		$scope.IsVisibleFixed = $scope.ShowFixedData;
		$scope.IsVisiblePercentage = false;
		$scope.ShowPercentageData = false;
		if (!proposalControllerScope.proposal)
			proposalControllerScope.proposal = {
				invoiceTermList : [ {
					comment : '',
					percentage : ''
				} ]
			};
		if (proposalControllerScope.isUpdate
				&& !proposalControllerScope.proposal.invoiceTermList)
			proposalControllerScope.proposal.invoiceTermList = [ {
				comment : '',
				percentage : ''
			} ];
		if (proposalControllerScope.proposal
				&& proposalControllerScope.proposal.invoiceTermList.length > 0)
			proposalControllerScope.proposal.invoiceTermList = [ {
				comment : '',
				percentage : ''
			} ];
		proposalControllerScope.proposal.invoiceTerm = "F";  
		proposalControllerScope.spinner = false;
	}

	function ShowPercentege() {
		proposalControllerScope.spinner = true;
		$scope.IsVisiblePercentage = $scope.ShowPercentageData;
		$scope.IsVisibleFixed = false;
		$scope.ShowFixedData = false;
		if (!proposalControllerScope.proposal)
			proposalControllerScope.proposal = {
				invoiceTermList : [ {
					comment : '',
					percentage : ''
				} ]
			};
		if (proposalControllerScope.isUpdate
				&& !proposalControllerScope.proposal.invoiceTermList)
			proposalControllerScope.proposal.invoiceTermList = [ {
				comment : '',
				percentage : ''
			} ];
		if (proposalControllerScope.proposal
				&& proposalControllerScope.proposal.invoiceTermList.length > 0)
			proposalControllerScope.proposal.invoiceTermList = [ {
				comment : '',
				percentage : ''
			} ];
		proposalControllerScope.proposal.invoiceTerm = "P";
		proposalControllerScope.spinner = false;
	}

	$('.select1').select2();

	var doc = new jsPDF();

	$('#cmd').click(function() { 
						var date = new Date();
						var newDate = $filter('date')(date, 'fullDate');
						var imgData = "data:image/png;base64,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";
						var footerImage = "data:image/png;base64,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4rd85gfCx2dh7W5th52LZ8NOOa6+w+3nHXHF2VfR9sJzzWs2Xekdb3Ws7rk4P65rrebbRbOtlflaiIOonm6+jYbQKj83LP3djsf5LNzfWg+XOrcUv54/SZ5CgAABAgTGICD4GkMVzYEAAQIECKwgYBvVCljf86Vdh9t/z0NreHzL2y2P3kCNiAABAgQIEJiQgOBrQsU2VQIECBAgUAgIvo7POji6wVd9y6d1dXzWlZESIECAAIEpCQi+plRtcyVAgAABAoKvY7UGjm7wtTz8fr0SdSbVsVpbBkuAAAECBKYiIPiaSqXNkwABAgQIECBAgAABAgQIECAwMQHB18QKbroECBAgQIAAAQIECBAgQIAAgakICL6mUmnzJECAAAECBAgQIECAAAECBAhMTEDwNbGCmy4BAgQIECBAgAABAgQIECBAYCoCgq+pVNo8CRAgQIAAAQIECBAgQIAAAQITExB8TazgpkuAAAECBAgQIECAAAECBAgQmIqA4GsqlTZPAgQIECBAgAABAgQIECBAgMDEBARfEyu46RIgQIAAAQIECBAgQIAAAQIEpiIg+JpKpc2TAAECBAgQIECAAAECBAgQIDAxAcHXxApuugQIECBAgAABAgQIECBAgACBqQgIvqZSafMkQIAAAQIECBAgQIAAAQIECExMQPA1sYKbLgECBAgQIECAAAECBAgQIEBgKgKCr6lU2jwJECBAgAABAgQIECBAgAABAhMTEHxNrOCmS4AAAQIECBAgQIAAAQIECBCYioDgayqVNk8CBAgQIECAAAECBAgQIECAwMQEBF8TK7jpEiBAgAABAgQIECBAgAABAgSmIiD4mkqlzZMAAQIECBAgQIAAAQIECBAgMDEBwdfECm66BAgQIECAAAECBAgQIECAAIGpCKw9fPjw1VQma54ECBAgQIAAAQIECBAgQIAAAQLTEfg/c/qDf3P5QKYAAAAASUVORK5CYII=";
						doc.addImage(imgData, 'JPEG', 10, 5, 25, 10);
						doc.setFontSize(13);
						doc.setTextColor(100);
						doc.setFontStyle("times");
						doc.text(90, 10, "Quotation");
						doc.setDrawColor(100);
						doc.line(0, 20, 220, 20);
						doc.setFontSize(11);
						doc.setFontStyle("bolditalic");
						doc.text(10, 30,"Saptalabs Software Solutions Pvt Ltd");
						doc.setFontSize(10);
						doc.setFontStyle("times");
						doc.text(10, 35, "#280, 2nd Floor, 5th Main, ");
						doc.text(10, 40, "6th Sector,HSR Layout,");
						doc.text(10, 45, "Bangalore-560102, India");
						doc.text(10, 55, "Phone: 9900910806");
						doc.text(10, 60, "Email: sales@spheresuite.com");

						doc.text(150, 35, "Date: " + newDate);
						doc.text(150, 40, "Quotation # : SS0001");

						doc.setFontSize(12);
						doc.setFontStyle("bolditalic");
						doc.text(10, 70, "Prepared for");
						doc.setFontSize(11);
						doc.setFontStyle("bolditalic");
						// doc.text(50,70,proposalControllerScope.pdfLeadAddress);
						doc.text(50, 70,proposalControllerScope.pdfLeadAddress || "address");
						doc.setFontSize(10);
						doc.setFontStyle("times");
						doc.text(50, 75, "");
						doc.text(50, 80, "");
						doc.text(50, 85, "");
						doc.text(50, 90, "");
						doc.text(50, 95, "");
						doc.setFontSize(10);
						doc.setFontStyle("times");
						doc.setDrawColor(100);
						doc.line(5, 100, 200, 100);
						doc.text(8, 106, 'S.No');
						doc.text(40, 106, 'Item');
						doc.text(130, 106, 'Qty');
						doc.text(150, 106, 'Price (INR)');
						doc.text(170, 106, 'Total (INR)');
						doc.setDrawColor(100);
						doc.line(5, 110, 200, 110);
						doc.setTextColor(100);
						doc.text(8, 120, "1");
						doc.text(40, 120,"CRM Portal (web & Hybrid Mobile App) with Gps");
						doc.text(40, 125, "Module Integration");
						doc.setFontSize(12);
						doc.setFontStyle("bolditalic");
						doc.setTextColor(255, 0, 0);
						doc.text(40, 130, "Objective");
						doc.setFontSize(10);
						doc.setTextColor(100);
						doc.setFontStyle("times");
						doc.text(40, 135, "Sales Module");
						doc.text(40, 140, "Sales Team Activity");
						doc.text(40, 145, "Sales Delivery");
						doc.text(40, 150, "User Performance");
						doc.text(40, 155, "User targets");
						doc.text(40, 160, "User achievements");
						doc.text(40, 165, "User Potential Meetings");
						doc.text(40, 170, "User Achievement graph");
						doc.text(40, 175, "User Today's activities");
						doc.setFontSize(12);
						doc.setFontStyle("bolditalic");
						doc.setTextColor(255, 0, 0);
						doc.text(40, 180, "GPS Module integration");
						doc.setTextColor(100);
						doc.setFontSize(10);
						doc.setFontStyle("times");
						doc.text(40, 185, "Customer Gps points");
						doc.text(40, 190, "User GPS tracking");
						doc.text(40, 195, "Customer route creation CLOUDBENCH");
						doc.setFontSize(10);
						doc.setFontStyle("times");
						doc.setTextColor(100);
						doc.text(130, 120,proposalControllerScope.proposal.quantity);
						doc.text(150, 120,
								proposalControllerScope.proposal.rate);
						doc.text(170, 120,
								proposalControllerScope.proposal.rate);
						doc.addImage(footerImage, 'JPEG', -57, 282);
						doc.setDrawColor(100);
						doc.line(5, 200, 200, 200);
						doc.text(40, 205,"Note:  Advance - 30% , Development - 30%,Testing - 20%, Go Live - 20%");
						doc.save(proposalControllerScope.proposal.projectName + '.pdf');
					});
	
	

    $rootScope.limitToShow = 5;
    $rootScope.beginFrom = 0;
    
    proposalControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
    proposalControllerScope.buttonBeginFrom = 0;
	proposalControllerScope.isNextDisabled = false;

    proposalControllerScope.deleteProposal = deleteProposal;
    proposalControllerScope.gotoPage = gotoPage;
	proposalControllerScope.searchMe = searchMe;
	proposalControllerScope.showPrevNav = showPrevNav;
    proposalControllerScope.showNextNav = showNextNav;
    proposalControllerScope.toggleSelect = toggleSelect;
    
    function deleteProposal(){
    	proposalControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(proposalControllerScope.proposalList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(proposalControllerScope.search)
    		filteredData = $filter('filter')(filteredData, proposalControllerScope.search);
    	if(proposalControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, proposalControllerScope.searchName);
    	var id = [];
		
    	for(var i = 0; i < filteredData.length; i++){
    		if(filteredData[i].isSelect){
    			id.push({id:filteredData[i].id});
    		}
    	}
		console.log('id',JSON.stringify(id));
    	proposalControllerScope.spinner = false;
    }
    
    function gotoPage(index, activeIndex){
    	$rootScope.beginFrom = index;
    	for(var i = 0; i < proposalControllerScope.proposalList.length; i++){
        	console.log(' data[i].isActiveClass', proposalControllerScope.proposalList[i].isActiveClass);
        	proposalControllerScope.proposalList[i].isActiveClass = false;
    	}
    	if(!activeIndex)
    		activeIndex = index
    	proposalControllerScope.proposalList[activeIndex].isActiveClass = true;
    	console.log('index',index, proposalControllerScope.proposalList[index].isActiveClass);
    }
    
    function searchMe(ifMobile){
    	var canEnter = false;
    	proposalControllerScope.isNextDisabled = false;
    	for (var item in proposalControllerScope.search){
    		if(proposalControllerScope.search[item] != ''){
    			canEnter = true;
    		} 
    	}
    	if(ifMobile && proposalControllerScope.searchName != ''){
    		proposalControllerScope.proposalList = $filter('filter')(proposalControllerScope.proposalListBackup, proposalControllerScope.searchName)
    	}else if(canEnter){
    		proposalControllerScope.proposalList = $filter('filter')(proposalControllerScope.proposalListBackup, proposalControllerScope.search);
    	}else {
    		proposalControllerScope.proposalList = angular.copy(proposalControllerScope.proposalListBackup);
    	}
    	$rootScope.beginFrom = 0;
    	for(var i = 0; i < proposalControllerScope.proposalList.length; i++){
        	proposalControllerScope.proposalList[i].isActiveClass = false;
        	proposalControllerScope.proposalList[i].isSelect = proposalControllerScope.isSelect;
    	}
    	if(proposalControllerScope.proposalList[0])
    		proposalControllerScope.proposalList[0].isActiveClass = true;
    	if((proposalControllerScope.buttonBeginFrom + proposalControllerScope.buttonLimitToShow) * proposalControllerScope.buttonLimitToShow >= proposalControllerScope.proposalList.length)
    		proposalControllerScope.isNextDisabled = true;
    }
    
    function showPrevNav(){
		proposalControllerScope.buttonBeginFrom -= proposalControllerScope.buttonLimitToShow;
    	gotoPage(proposalControllerScope.buttonBeginFrom)
		proposalControllerScope.isNextDisabled = false;
	}
	
	function showNextNav(){
		proposalControllerScope.buttonBeginFrom += proposalControllerScope.buttonLimitToShow;
		gotoPage(proposalControllerScope.buttonBeginFrom)
		if((proposalControllerScope.buttonBeginFrom + proposalControllerScope.buttonLimitToShow) * proposalControllerScope.buttonLimitToShow >= proposalControllerScope.proposalList.length)
			proposalControllerScope.isNextDisabled = true;
	}
    

    function toggleSelect(isSelect){
    	proposalControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(proposalControllerScope.proposalList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(proposalControllerScope.search)
    		filteredData = $filter('filter')(filteredData, proposalControllerScope.search);
    	if(proposalControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, proposalControllerScope.searchName);
    	for(var i = 0; i < filteredData.length; i++){
    		filteredData[i].isSelect = isSelect;
    	}
    	console.log('toggleSelect',filteredData)
    	proposalControllerScope.spinner = false; 		
    }
	
	
	
	

}