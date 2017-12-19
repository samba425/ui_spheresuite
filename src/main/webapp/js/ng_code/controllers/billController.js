var app =angular.module('spheresuite')
 app.controller('billController', billController);

billController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', 'billService', '$timeout', '$filter', 'configurationService', 'leadService', 'commonService','chequeService'];

function billController($scope, $rootScope, $location, $localStorage, billService, $timeout, $filter, configurationService, leadService, commonService,chequeService) {
    var billControllerScope = this;

    billControllerScope.isUpdate = false;
    billControllerScope.endCalender = false;
    billControllerScope.paidCalender = false;
    billControllerScope.startCalender = false;

    $rootScope.headerMenu = "Bills";
    
    $scope.format = "MMM dd, yyyy";

    billControllerScope.limitToShow = 0;

    function addMoreItems() {
        billControllerScope.limitToShow += 5;
    }

    billControllerScope.countryList;
    billControllerScope.vendorLists;

    billControllerScope.bill;
    billControllerScope.billForm;
    var chequenumbers;

    billControllerScope.openstartCalender = openstartCalender;
    billControllerScope.openpaidCalender = openpaidCalender;
    billControllerScope.openendCalender = openendCalender;
    billControllerScope.goToBills = goToBills;
    billControllerScope.goToEditBills = goToEditBills;
    billControllerScope.viewBill = viewBill;
    billControllerScope.addBill = addBill;
    billControllerScope.getPaymentMode = getPaymentMode;
    billControllerScope.addMoreItems = addMoreItems;
    billControllerScope.decline = decline;
    billControllerScope.editBill = editBill;
    billControllerScope.exportData = exportData;
    billControllerScope.getBill = getBill;
    billControllerScope.getCountry = getCountry;
    billControllerScope.getVendor = getVendor;
    billControllerScope.addMoreItems = addMoreItems;
    billControllerScope.getBillNumber =getBillNumber;
    billControllerScope.getCheques = getCheques;

    getPaymentMode();
	function addMoreItems() { 
		billControllerScope.limitToShow += 5; 
    }
	
	if ($location.path() == '/bill/add'){ 
        getVendor();
		getBillNumber();  
		getCheques();
        getCountry();
        getPaymentMode();
        delete $localStorage.spheresuite['billId'];
	}else if ($location.path() == '/bill/view'){
        getBill($localStorage.spheresuite.billId);
	}else if ($location.path() == '/bill/edit'){
		getVendor();
        billControllerScope.isUpdate = true; 
        getCheques();
        getCountry();
        getPaymentMode(); 
	}else if ($location.path() == '/bills'){
        getBill();
        getVendor();
        delete $localStorage.spheresuite['billId'];
	}
	
	  
    function openstartCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        billControllerScope.startCalender = !billControllerScope.startCalender
    };


    function openpaidCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        billControllerScope.paidCalender = !billControllerScope.paidCalender
    };

    function openendCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        billControllerScope.endCalender = !billControllerScope.endCalender
    };

    billControllerScope.changeCheque = changeCheque;
    billControllerScope.checkStatus = checkStatus;
    billControllerScope.newdata = false;
    
    function changeCheque(data){
    	console.log("data..........",data,billControllerScope.bill.paymentMode)
        billControllerScope.newdata = false;
		billControllerScope.bill.paymentMode = 'other';
    	for(var i=0; i<billControllerScope.paymentModeList.length; i++ ){
    		if(billControllerScope.paymentModeList[i].id == data && billControllerScope.paymentModeList[i].name.toLowerCase() == 'cheque'){
    			billControllerScope.newdata = true;
    			console.log('enter;')
    			billControllerScope.bill.paymentMode = 'cheque'; 
    			break;
    		}else{
    			$timeout(function(){
    	    	if($location.path() == '/bill/edit' && chequenumbers){
    		        $('#select1').val(chequenumbers).trigger('change');
    	    	}else{
    		        $('#select1').val('').trigger('change');
    		        billControllerScope.bill.chequenumber = ['cash']
    	    	}},500);
    		}
    	}
    	console.log('billControllerScope.newdata',billControllerScope.newdata,billControllerScope.bill.paymentMode);
    }
    
    billControllerScope.close = close;
    function close() {
    	$('#confirmation').modal('hide')
    }
    function checkStatus(staus, chequeNum) {
    	console.log("change vaues", staus, chequeNum, billControllerScope.bill.paymentMode)
//    	 for(var i=0; i<billControllerScope.paymentModeList.length; i++ ){
//     		if(billControllerScope.paymentModeList[i].id == paymentMode){
//     			paymentMode = billControllerScope.paymentModeList[i].name; 
//     			console.log("change vaue1",paymentMode)
//     		} 
//     	} 
    	 if(billControllerScope.bill.paymentMode == 'cheque' && staus == 'Paid') {
		 	for(var i=0; i < billControllerScope.ChequeList.length; i++ ){
//		 		if(typeof(b) == 'string') {
		 			chequeNum = chequeNum;
 					console.log('chequeNum',chequeNum);
	 				for(j in chequeNum) {
	 					console.log('billControllerScope.ChequeList[i].id ==  chequeNum[j]',billControllerScope.ChequeList[i].id,chequeNum[j]);
    	    			if(billControllerScope.ChequeList[i].id ==  chequeNum[j]){ 
    	        		    if(billControllerScope.ChequeList[i].status == 'noclear'){
    	        		    	billControllerScope.bill.status =  "Pending"; 
    	        		    	$('#confirmation').modal('show');
    	        		    	break;
    	        		    }
    	        		}
	 				}
//		 		} else { 
//	 				for(j in chequeNum) {  
//		    			if(billControllerScope.ChequeList[i].id ==  chequeNum[j]){ 
//		        		    if(billControllerScope.ChequeList[i].status == 'noclear'){
//		        		    	billControllerScope.bill.status =  "Pending"; 
//		        		    	$('#confirmation').modal('show');
//		        		    	break;
//		        		    }
//		        		}
//	 				}
//		 		}  
	    	} 
    	}
    }
    
	function getBillNumber() {  
		billService.getBillNumber().then(function(res) { 
			billControllerScope.bill= { billNumber :  res }; 
    }, function(err) { 
    });
	}
	
    function addBill() {  
        if (billControllerScope.bill) {
            if (billControllerScope.bill.status == 'Pending') {
                billControllerScope.bill.paidDate = "";
            } 
            billControllerScope.spinner = true;
            commonService.formValNotManditory(billControllerScope.billForm, billControllerScope.bill).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    data.dueDate = moment(data.dueDate).format('MMM DD, YYYY');
                    data.billDate = moment(data.billDate).format('MMM DD, YYYY');
                    console.log('data',data)
                    billService.addBill(data).then(function(res) {
                        if (res.successflag === 'true') {
                            billControllerScope.spinner = false;
                            $location.path('/bills');
                        } else{
                        	billControllerScope.spinner = false;
                        }
                    }, function(err) {
                        billControllerScope.spinner = false;
                    });
                } else {
                    billControllerScope.spinner = false;
                }
            }, function(err) {
                billControllerScope.spinner = false;
            });
        }
    }


    function decline() {
    	 if ($location.path() === '/bill/add') {  
        	 getBillNumber();
         }else if ($location.path() === '/bill/edit') {
            $location.path('/bill/view');
        } else {
            billControllerScope.bill = null;
            billControllerScope.billForm.$setPristine();
            billControllerScope.billForm.$setUntouched();
            billControllerScope.isUpdate = false;
            billControllerScope.newdata = null;
            billControllerScope.bill ={ chequenumber : ''};
        }
    }

    function editBill() {
    	console.log("billControllerScope.bill.......",billControllerScope.bill)
        billControllerScope.spinner = true;
        if (billControllerScope.bill && $localStorage.spheresuite.id && $localStorage.spheresuite.id != '') {
            billControllerScope.bill.updatedBy = $localStorage.spheresuite.id;
            if (billControllerScope.bill.status == 'Pending') {
                billControllerScope.bill.paidDate = "";
            }
            if(billControllerScope.bill.paymentMode.toLowerCase() != 'cheque'){
            	billControllerScope.bill.chequenumber = ['cash'];
            }

            billControllerScope.bill.dueDate = moment(billControllerScope.bill.dueDate).format('MMM DD, YYYY');
            billControllerScope.bill.billDate = moment(billControllerScope.bill.billDate).format('MMM DD, YYYY');
            billService.editBill(billControllerScope.bill).then(function(res) {
                if (res.successflag === 'true') {
                    $location.path('/bill/view');
                    billControllerScope.spinner = false;
                }
                billControllerScope.spinner = false;
            }, function(err) {
                billControllerScope.spinner = false;
            });
        }
    }


    function exportData() {
        $scope.fileName = "Bills";
        $scope.exportData = [];
        $scope.exportData.push(["Vendor Id", "Vendor Name", "Bill Date", "Bill Number", "Amount Type", "Comments", "Due Date", "Status", "Paid Date", "Amount", "Updated By", "Updatedon"]);
        $scope.Filterdata = billControllerScope.billList;

        var firstFiter = $filter('filter')(billControllerScope.billList, { billtype: billControllerScope.billtype });
        $scope.Filterdata = $filter('filter')(firstFiter, billControllerScope.searchName);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.name, value.billDate, value.billNumber, value.currencyType, value.desc, value.dueDate, value.status, value.paidDate, value.rate, value.updatedBy, value.updatedon]);
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

    
    
    function getPaymentMode(data) {
    	billControllerScope.spinner = true;
    	configurationService.getPaymentMode(data).then(function(res) {
            if (res.successflag === 'true' && res.results.length > 0) { 
                	console.log("billControllerScope.paymentModeList",res.results)
                	billControllerScope.paymentModeList = res.results;
                	billControllerScope.spinner = false;
                	if($location.path()=='/bill/edit' || $location.path()=='/bill/view') {
                		getBill($localStorage.spheresuite.billId);
                	}
                	
            } else {
            	billControllerScope.spinner = false;
            }
        }, function(err) {
        	billControllerScope.spinner = false;
        });
    };
    
    function getCheques(data) {
    	billControllerScope.spinner = true;
    	chequeService.getCheque(data).then(function(res) {
            if (res.successflag === 'true' && res.results.length > 0) { 
            	billControllerScope.ChequeList = res.results;
            	billControllerScope.spinner = false;  
            	billControllerScope.options = true;
            } else {
            	billControllerScope.spinner = false;
            }
        }, function(err) {
        	billControllerScope.spinner = false;
        });
    }


    function getCountry() {
        billControllerScope.spinner = true;
        configurationService.getCountry().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                billControllerScope.countryList = res.results;
                billControllerScope.spinner = false;
            }else{
                billControllerScope.spinner = false;
            }
        }, function(err) {
            billControllerScope.spinner = false;
        });
    }

    function getVendor() {
        billControllerScope.getSpinner = true;
        leadService.getLeadByType('V').then(function(res) {
        	console.log('getVendor res',res)
            if (res.successflag === 'true' && res.results.length > 0) {
                billControllerScope.vendorLists = res.results;
                billControllerScope.getSpinner = false;
            } else {
                billControllerScope.getSpinner = false;
            }
        }, function(err) {
            billControllerScope.getSpinner = false;

        });
    }

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) { 
    	billControllerScope.viewBillspinner = false;
    });
    
    
    function getBill(data) { 
        billControllerScope.viewBillspinner = true;
        billService.getBill(data).then(function(res) {
        	console.log('getBill res',res);
        	if (res.successflag === 'true' && res.results.length > 0) {
                if (data) {  
                	/*if(billControllerScope.paymentModeList) {
                	for(var i=0;i<billControllerScope.paymentModeList.length;i++ ){
                		if(billControllerScope.paymentModeList[i].id == res.results[0].paymentmode){
                			billControllerScope.newdata = false;
                		} else {
                			billControllerScope.newdata = true;	
                		}
                		} 
                	} */
                    billControllerScope.bill = res.results[0]; 
                    chequenumbers =  angular.copy(JSON.parse(billControllerScope.bill.chequenumber));
                    if( !billControllerScope.bill.chequenumber || billControllerScope.bill.chequenumber == '["cash"]'){
                    	billControllerScope.bill.paymentMode = 'other';
            			billControllerScope.newdata = false;
                    }else{
                    	billControllerScope.bill.paymentMode = 'cheque';
            			billControllerScope.newdata = true;
                    }
                    billControllerScope.viewBillspinner = false;  
                      
                      $timeout(function(){
                    	  $('#select1').val(chequenumbers);
                    	  $('#select1').trigger('change');
                      },500);
                } else { 
                    billControllerScope.billList = res.results; 
                    billControllerScope.billListBackup = angular.copy(res.results);
                    billControllerScope.isDataAvailable = true;

                	for(var i = 0; i < billControllerScope.billListBackup.length; i++){
                    	billControllerScope.billListBackup[i].isActiveClass = false;
                    	billControllerScope.billListBackup[i].isSelect = false;
                	}

                    billControllerScope.billList =  angular.copy(billControllerScope.billListBackup);
                	if((billControllerScope.buttonBeginFrom + billControllerScope.buttonLimitToShow) * billControllerScope.buttonLimitToShow >= billControllerScope.billList.length)
                		billControllerScope.isNextDisabled = true;
                	
                	billControllerScope.billList[0].isActiveClass = true;
                    billControllerScope.viewBillspinner = false;
                } 
            } else {
                billControllerScope.viewBillspinner = false;
            		billControllerScope.dataMsg = "Bills Not Available";
            }
        }, function(err) {
    		billControllerScope.dataMsg = "Bills Not Available";
            billControllerScope.viewBillspinner = false;
        });

        

    }

    function goToEditBills(billID) {
        if (billID) {
            $localStorage.spheresuite.billId = billID;
            $location.path('/bill/edit');
        }
    }

    function viewBill(data) {
        if (data) {
            $localStorage.spheresuite.billId = data;
            $location.path('/bill/view');
        }
    }

    function goToBills() {
        $location.path('bills');
    }

    $('.select1').select2();
    $('#select1').select2();

    var importedDataList;
    billControllerScope.chooseFileSection = true;
    billControllerScope.declineImport = declineImport;
    billControllerScope.goImportPage = goImportPage;
    billControllerScope.importBill = importBill;


    function declineImport() {
 		contactControllerScope.feilds = null;
 		contactControllerScope.billsImportForm.$setPristine();
 		contactControllerScope.billsImportForm.$setUntouched();
    }

    function goImportPage() {
        $location.path('/bill/import');
    }

    function importBill() {
    	billControllerScope.spinner = true;
        var dataToSend = {
            fileData: importedDataList,
            columFields: billControllerScope.bill,
            updatedBy : $localStorage.spheresuite.id
        }
        console.log('dataToImport ',JSON.stringify(dataToSend));
        billService.importBill(dataToSend).then(function(res) {
        	billControllerScope.spinner = false;
        	if(res.successflag == 'true'){
        		declineImport();
                $location.path('/bills');
        	}
        }, function(err) {
        	billControllerScope.spinner = false;
        });
    }

    $scope.selectedFile = null;
    
    $scope.loadFile = function(files) {
        $scope.selectedFile = files[0];
    }
    
    $scope.handleFile = function() {
        if ($scope.selectedFile) {
            var reader = new FileReader();
            $scope.selectedFile.name = "report";
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
            var output = to_json(wb);
            var keySet;
            for (var fieldName in output){
                keySet = output[fieldName][0];
                importedDataList = output[fieldName];
                break;
            }
            billControllerScope.fileInputFields = [];
            angular.forEach(keySet, function(value, key) {
                billControllerScope.fileInputFields.push(key)
            })
            $scope.$apply(function() {
                billControllerScope.chooseFileSection = false;
            })

        }

        function to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }
    }
    
    
//    new module
    
    $rootScope.limitToShow = 10;
    $rootScope.beginFrom = 0;
//	var id = [];
    
    billControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
    billControllerScope.buttonBeginFrom = 0;
//	billControllerScope.isCannotDelete = false;
	billControllerScope.isNextDisabled = false;
//	billControllerScope.isSingleRecordToDelete = false;
	
//	billControllerScope.closeModal = closeModal;
//    billControllerScope.deleteRequirement = deleteRequirement;
    billControllerScope.gotoPage = gotoPage;
	billControllerScope.searchMe = searchMe;
	billControllerScope.showPrevNav = showPrevNav;
    billControllerScope.showNextNav = showNextNav;
    billControllerScope.toggleSelect = toggleSelect;
//    billControllerScope.showDelete = showDelete;
    
//    function showDelete(){
//    	billControllerScope.spinner = true;
//    	billControllerScope.isSingleRecordToDelete = false;
//		billControllerScope.isCannotDelete = false;
//    	var filteredData = $filter('orderBy')(billControllerScope.requirementList, '-id');
//    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
//    	if(billControllerScope.search)
//    		filteredData = $filter('filter')(filteredData, billControllerScope.search);
//    	if(billControllerScope.searchName)
//    		filteredData = $filter('filter')(filteredData, billControllerScope.searchName);
//		id = [];
//    	for(var i = 0; i < filteredData.length; i++){
//    		if(filteredData[i].isSelect){
//    			id.push({id:filteredData[i].id});
//    		}
//    	}
//		console.log('id',JSON.stringify(id));
//    	if(id.length > 0){
//    		if(id.length == 1){
//    			billControllerScope.isSingleRecordToDelete = true;
//    		}
//    		billControllerScope.spinner = false;
//    		$('#confirmation').modal('show');
//    	}else{
//    		billControllerScope.spinner = false;
//    	}
//    }
//    
//    function closeModal(){
//		$('#confirmation').modal('hide');
//    }
//    
//    function deleteRequirement(){
//
//		console.log('deleteRequirement');
//    	if(id.length > 0){
//    		billControllerScope.isCannotDelete = false;
//    		requirementService.deleteRequirement(id).then(function(res){
//    			console.log('deleteLead res',res);
//    			if(res.successflag == 'true'){
//    				$('#confirmation').modal('hide');
//    				getLead({ type: $scope.type });
//    			}else{
//    				$('#confirmation').modal('hide');
//					if(billControllerScope.isSingleRecordToDelete){
//						billControllerScope.isSingleRecordToDelete = false;
//    		    		billControllerScope.isCannotDelete = true;
//	    				setTimeout(function(){
//	        		    		billControllerScope.isCannotDelete = true;
//	            				$('#confirmation').modal('show');
//	    				},1000);
//    				}
//    				
//    					
//    	    		billControllerScope.spinner = false;
//    			}
//        		billControllerScope.isSelect = false;
//    		}, function(err){
//        		billControllerScope.spinner = false;
//    		});
//    	}
//    	
//    }
    
    function gotoPage(index, activeIndex){
    	$rootScope.beginFrom = index;
    	for(var i = 0; i < billControllerScope.billList.length; i++){
        	console.log(' data[i].isActiveClass', billControllerScope.billList[i].isActiveClass);
        	billControllerScope.billList[i].isActiveClass = false;
    	}
    	if(!activeIndex)
    		activeIndex = index
    	billControllerScope.billList[activeIndex].isActiveClass = true;
    	console.log('index',index, billControllerScope.billList[index].isActiveClass);
    }
    
    function searchMe(ifMobile){
    	var canEnter = false;
    	billControllerScope.isNextDisabled = false;
    	for (var item in billControllerScope.search){
    		if(billControllerScope.search[item] != ''){
    			canEnter = true;
    		} 
    	}
    	if(ifMobile && billControllerScope.searchName != ''){
    		billControllerScope.billList = $filter('filter')(billControllerScope.billListBackup, billControllerScope.searchName)
    	}else if(canEnter){
    		billControllerScope.billList = $filter('filter')(billControllerScope.billListBackup, billControllerScope.search);
    	}else {
    		billControllerScope.billList = angular.copy(billControllerScope.billListBackup);
    	}
    	$rootScope.beginFrom = 0;
    	for(var i = 0; i < billControllerScope.billList.length; i++){
        	billControllerScope.billList[i].isActiveClass = false;
        	billControllerScope.billList[i].isSelect = billControllerScope.isSelect;
    	}
    	if(billControllerScope.billList[0])
    		billControllerScope.billList[0].isActiveClass = true;
    	if((billControllerScope.buttonBeginFrom + billControllerScope.buttonLimitToShow) * billControllerScope.buttonLimitToShow >= billControllerScope.billList.length)
    		billControllerScope.isNextDisabled = true;
    }
    
    function showPrevNav(){
		billControllerScope.buttonBeginFrom -= billControllerScope.buttonLimitToShow;
    	gotoPage(billControllerScope.buttonBeginFrom)
		billControllerScope.isNextDisabled = false;
	}
	
	function showNextNav(){
		billControllerScope.buttonBeginFrom += billControllerScope.buttonLimitToShow;
		gotoPage(billControllerScope.buttonBeginFrom)
		if((billControllerScope.buttonBeginFrom + billControllerScope.buttonLimitToShow) * billControllerScope.buttonLimitToShow >= billControllerScope.billList.length)
			billControllerScope.isNextDisabled = true;
	}
    

    function toggleSelect(isSelect){
    	billControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(billControllerScope.billList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(billControllerScope.search)
    		filteredData = $filter('filter')(filteredData, billControllerScope.search);
    	if(billControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, billControllerScope.searchName);
    	for(var i = 0; i < filteredData.length; i++){
    		filteredData[i].isSelect = isSelect;
    	}
    	console.log('toggleSelect',filteredData)
    	billControllerScope.spinner = false; 		
    }
    

}

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});