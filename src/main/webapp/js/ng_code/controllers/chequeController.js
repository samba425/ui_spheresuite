var app =angular.module('spheresuite')
 app.controller('chequeController', chequeController);

chequeController.$inject = ['$scope', '$rootScope', '$location', '$localStorage', '$filter',  'commonService','chequeService'];

function chequeController($scope, $rootScope, $location, $localStorage, $filter,  commonService,chequeService) {
    var chequeControllerScope = this;

    $rootScope.headerMenu = "Cheques";
    
    chequeControllerScope.isUpdate = false; 
    chequeControllerScope.startCalender = false;
 

    chequeControllerScope.limitToShow = 0;

    function addMoreItems() {
        chequeControllerScope.limitToShow += 5;
    }
 

    chequeControllerScope.cheque;
    chequeControllerScope.chequeForm;

    chequeControllerScope.openstartCalender = openstartCalender; 
    chequeControllerScope.goToCheques = goToCheques;
    chequeControllerScope.goToEditCheques = goToEditCheques;
    chequeControllerScope.viewCheque = viewCheque;
    chequeControllerScope.addCheque = addCheque;
    chequeControllerScope.addMoreItems = addMoreItems;
    chequeControllerScope.decline = decline;
    chequeControllerScope.editCheque = editCheque;
    chequeControllerScope.exportData = exportData;
    chequeControllerScope.getCheque= getCheque;  
    chequeControllerScope.addMoreItems = addMoreItems;
   
	function addMoreItems() { 
		chequeControllerScope.limitToShow += 5; 
    }
	
	if ($location.path() == '/cheque/add'){ 
        delete $localStorage.spheresuite['chequeId'];
	}else if ($location.path() == '/cheque/view'){ 
		console.log("new id......",$localStorage.spheresuite.chequeID)
        getCheque($localStorage.spheresuite.chequeID);
	}else if ($location.path() == '/cheque/edit'){
        chequeControllerScope.isUpdate = true; 
        getCheque($localStorage.spheresuite.chequeID);
	}else if ($location.path() == '/cheques'){ 
		 getCheque();
        delete $localStorage.spheresuite['chequeId'];
	}
	 
    function openstartCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        chequeControllerScope.startCalender = !chequeControllerScope.startCalender
    };
 
    function addCheque() {
        if (chequeControllerScope.cheque) { 
            chequeControllerScope.spinner = true;
            commonService.formValNotManditory(chequeControllerScope.chequeForm, chequeControllerScope.cheque).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
                    chequeService.addCheque(data).then(function(res) {
                    	console.log("Chequr res",res)
                        if (res.successflag === 'true') {
                            chequeControllerScope.spinner = false;
                            $location.path('/cheques');
                        } else{
                        	chequeControllerScope.spinner = false;
                        }
                    }, function(err) {
                        chequeControllerScope.spinner = false;
                    });
                } else {
                    chequeControllerScope.spinner = false;
                }
            }, function(err) {
                chequeControllerScope.spinner = false;
            });
        }
    }



    function decline() {
        if ($location.path() === '/cheque/edit') {
            $location.path('/cheque/view');
        } else {
            chequeControllerScope.cheque = null;
            chequeControllerScope.chequeForm.$setPristine();
            chequeControllerScope.chequeForm.$setUntouched();
            chequeControllerScope.isUpdate = false;
        }
    }

    function editCheque() {
        chequeControllerScope.spinner = true;
        if (chequeControllerScope.cheque && $localStorage.spheresuite.id && $localStorage.spheresuite.id != '') {
            chequeControllerScope.cheque.updatedBy = $localStorage.spheresuite.id; 
            chequeService.editCheque(chequeControllerScope.cheque).then(function(res) {
                if (res.successflag === 'true') {
                    $location.path('/cheque/view');
                    chequeControllerScope.spinner = false;
                }
                chequeControllerScope.spinner = false;
            }, function(err) {
                chequeControllerScope.spinner = false;
            });
        }
    }


    function exportData() {
        $scope.fileName = "Chequs";
        $scope.exportData = [];
        $scope.exportData.push(["Vendor Id", "Vendor Name", "Bill Date", "Bill Number", "Amount Type", "Comments", "Due Date", "Status", "Paid Date", "Amount", "Updated By", "Updatedon"]);
        $scope.Filterdata = chequeControllerScope.chequeList;

        var firstFiter = $filter('filter')(chequeControllerScope.chequeList, { billtype: chequeControllerScope.chequetype });
        $scope.Filterdata = $filter('filter')(firstFiter, chequeControllerScope.searchName);
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

      
    
    function getCheque(data) {
    	console.log("check",data)
        chequeControllerScope.viewBillspinner = true;
       chequeService.getCheque().then(function(res) {
    	   console.log('hetchequs res111',res);
        	if (res.successflag === 'true' && res.results.length > 0) {
             for(i in res.results) {
            	 if( Number(data) == Number(res.results[i].id) )
            	 {
                	 chequeControllerScope.cheque = res.results[i];  
                	 chequeControllerScope.viewBillspinner = false
            	 }
             }
                    chequeControllerScope.chequeList = res.results; 
                    chequeControllerScope.viewBillspinner = false
                    addMoreItems(); 
            } else { 
            		chequeControllerScope.dataMsg = "Cheques Not Available";
            		chequeControllerScope.viewBillspinner = false
            }
        }, function(err) {
    		chequeControllerScope.dataMsg = "Cheques Not Available"; 
    		chequeControllerScope.viewBillspinner = false
        }); 
    }

    function goToEditCheques(chequeID) {
        if (chequeID) {
            $localStorage.spheresuite.chequeID = chequeID;
            $location.path('/cheque/edit');
        }
    }

    function viewCheque(data) {
    	
        if (data) {
            $localStorage.spheresuite.chequeID = data;
            console.log("cheque id",$localStorage.spheresuite.chequeID )
            $location.path('/cheque/view');
        }
    }

    function goToCheques() {
        $location.path('cheques');
    }

    $('.select1').select2();

    var importedDataList;
    chequeControllerScope.chooseFileSection = true;
    chequeControllerScope.declineImport = declineImport;
    chequeControllerScope.goImportPage = goImportPage;
    chequeControllerScope.importCheque = importCheque;


    function declineImport() {
 		contactControllerScope.feilds = null;
 		contactControllerScope.billsImportForm.$setPristine();
 		contactControllerScope.billsImportForm.$setUntouched();
    }

    function goImportPage() {
        $location.path('/cheque/import');
    }

    function importCheque() {
    	chequeControllerScope.spinner = true;
        var dataToSend = {
            fileData: importedDataList,
            columFields: chequeControllerScope.cheque,
            updatedBy : $localStorage.spheresuite.id
        }
        console.log('dataToImport ',JSON.stringify(dataToSend));
        chequeService.importCheque(dataToSend).then(function(res) {
        	chequeControllerScope.spinner = false;
        	if(res.successflag == 'true'){
        		declineImport();
                $location.path('/cheques');
        	}
        }, function(err) {
        	chequeControllerScope.spinner = false;
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
            chequeControllerScope.fileInputFields = [];
            angular.forEach(keySet, function(value, key) {
                chequeControllerScope.fileInputFields.push(key)
            })
            $scope.$apply(function() {
                chequeControllerScope.chooseFileSection = false;
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
    

}
 