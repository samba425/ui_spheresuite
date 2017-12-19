angular
    .module('spheresuite')
    .controller('salesTargetController', salesTargetController);

salesTargetController.$inject = ['$scope','$rootScope', '$localStorage', 'salesTargetService', 'employeeService', 'commonService' ];

function salesTargetController($scope,$rootScope, $localStorage, salesTargetService, employeeService, commonService ) {
    var salesTargetControllerScope = this;
    $rootScope.headerMenu= "Sales Target"; 
    salesTargetControllerScope.employeeList;
    salesTargetControllerScope.limitToShow = 3;
	salesTargetControllerScope.msg;
    salesTargetControllerScope.salesReportList;
    salesTargetControllerScope.report= {};
    salesTargetControllerScope.reportForm;
    salesTargetControllerScope.reportFromDate = {};
    salesTargetControllerScope.tempSalesReportList;
    salesTargetControllerScope.isInvalidDate = false;
    salesTargetControllerScope.isUpdate = false;
    
    salesTargetControllerScope.addMoreItems = addMoreItems;
    salesTargetControllerScope.addSales = addSales;
    salesTargetControllerScope.checkDate = checkDate;
    salesTargetControllerScope.checkQuater = checkQuater;
    salesTargetControllerScope.decline = decline;
    salesTargetControllerScope.editSales = editSales;
    salesTargetControllerScope.exportData = exportData;
    salesTargetControllerScope.getSalesBetweenDate = getSalesBetweenDate;
    salesTargetControllerScope.goToUpdateSales = goToUpdateSales;
    salesTargetControllerScope.openSalesTargetModal = openSalesTargetModal;

    getEmployee();
    getSalesReport();
    
    var todayDate = new Date();
    var nextYearDate = new Date();
    var currentFinancialYear = {
    		fromDate : '',
    		toDate : ''
    };    

    salesTargetControllerScope.report = angular.copy(currentFinancialYear);
    
    function addMoreItems() {
    	salesTargetControllerScope.limitToShow += 1;
    }
    
    function addSales(){
    	if(salesTargetControllerScope.report){
            salesTargetControllerScope.spinner = true;
            commonService.formValNotManditory(salesTargetControllerScope.reportForm, salesTargetControllerScope.report).then(function(data){
            	if(data){
            		data.updatedBy = $localStorage.spheresuite.id;
            		salesTargetService.addSales(data).then(function(res){
            			if(res.successflag == 'true'){
                            $('#addSalesReport').modal('hide');
                            getSalesReport();
                            decline();
                            salesTargetControllerScope.spinner = false;
            			}else{
                            salesTargetControllerScope.spinner = false;
            			}
            		},function(err){ 
                        salesTargetControllerScope.spinner = false;
                    })
            	}else{
                    salesTargetControllerScope.spinner = false;
            	}
            },function(err){ 
                salesTargetControllerScope.spinner = false;
            });
    	}
    } 
    
    function checkDate(){
        salesTargetControllerScope.isInvalidDate = false;
    	if(salesTargetControllerScope.report && salesTargetControllerScope.report.fromDate && salesTargetControllerScope.report.toDate){
    		if(parseInt(salesTargetControllerScope.report.toDate) == (parseInt(salesTargetControllerScope.report.fromDate) + 1)){
    			salesTargetControllerScope.isInvalidDate = false;
    		}else{
	            salesTargetControllerScope.isInvalidDate = true;
    		}
    	}
    	checkQuater();
    }
    
    function checkQuater(){
    	if(salesTargetControllerScope.report && salesTargetControllerScope.report.empId && salesTargetControllerScope.report.empId && salesTargetControllerScope.report.toDate && salesTargetControllerScope.report.fromDate){
			if((salesTargetControllerScope.report.q1 && salesTargetControllerScope.report.q1 !='') || (salesTargetControllerScope.report.q2 && salesTargetControllerScope.report.q2 !='') || (salesTargetControllerScope.report.q3 && salesTargetControllerScope.report.q3 !='') || (salesTargetControllerScope.report.q4 && salesTargetControllerScope.report.q4 !='')){
				salesTargetControllerScope.reportForm.$invalid = false;
			}else{
				salesTargetControllerScope.reportForm.$invalid = true;
			}
    	}
    }
    
    function decline(){
    	salesTargetControllerScope.report = null;
        salesTargetControllerScope.reportForm.$setPristine();
        salesTargetControllerScope.reportForm.$setUntouched();
        salesTargetControllerScope.isUpdate = false;
        salesTargetControllerScope.isInvalidDate = false;
		salesTargetControllerScope.report = angular.copy(currentFinancialYear);
    }
    

    function exportData() {
        salesTargetControllerScope.spinner = true; 
        $scope.fileName = "Sales Target";
        $scope.exportData = [];
        $scope.total = 0; 
        $scope.exportData.push(["Id", "Name", "From Year", "To Year", "Q1", "Q2", "Q3", "Q4", "Total", "Updated On", "Updated By"]);
 
        $scope.Filterdata = salesTargetControllerScope.salesReportList;
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.name, value.fromDate, value.toDate, value.q1, value.q2, value.q3, value.q4, parseFloat(value.q1) + parseFloat(value.q2) + parseFloat(value.q3) + parseFloat(value.q4), value.updatedon, value.updatedBy]);
            $scope.total += parseFloat(value.q1) + parseFloat(value.q2) + parseFloat(value.q3) + parseFloat(value.q4);
        });
        $scope.exportData.push(['','','','','','','','',$scope.total,'','',])

        function datenum(v, date1904) {
            if (date1904) v += 1462;
            var epoch = Date.parse(v);
            return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        };

        function getSheet(data, opts) {
            salesTargetControllerScope.spinner = true;
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
            salesTargetControllerScope.spinner = false;
            return ws;
        };

        function Workbook() {
            salesTargetControllerScope.spinner = true;
            if (!(this instanceof Workbook)){
                salesTargetControllerScope.spinner = false;
            	return new Workbook();
            }
            this.SheetNames = [];
            this.Sheets = {};
            salesTargetControllerScope.spinner = false;
        }

        var wb = new Workbook(),
            ws = getSheet($scope.exportData); 
        wb.SheetNames.push($scope.fileName);
        wb.Sheets[$scope.fileName] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

        function s2ab(s) {
            salesTargetControllerScope.spinner = true;
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            salesTargetControllerScope.spinner = false;
            return buf;
        }

        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), $scope.fileName + '.xlsx');
        salesTargetControllerScope.spinner = false;

    }
    
    function editSales(){
    	if(salesTargetControllerScope.report){
    		salesTargetControllerScope.report.updatedBy = $localStorage.spheresuite.id;
            		salesTargetService.editSales(salesTargetControllerScope.report).then(function(res){
            			if(res.successflag == 'true'){
                            $('#addSalesReport').modal('hide');
                            getSalesReport();
                            decline();
                            salesTargetControllerScope.spinner = false;
            			}else{
                    salesTargetControllerScope.spinner = false;
            	}
            },function(err){ 
                salesTargetControllerScope.spinner = false;
            });
    	}else{
            salesTargetControllerScope.spinner = false;
    	}
    }
    function getSalesBetweenDate(){ 
        salesTargetControllerScope.spinner = true;
    	if(salesTargetControllerScope.reportFromDate.to && salesTargetControllerScope.reportFromDate.from && salesTargetControllerScope.reportFromDate.to > salesTargetControllerScope.reportFromDate.from){
    		salesTargetControllerScope.salesReportList = [];
    		salesTargetControllerScope.salesReportList.totalSales = 0;
    		angular.forEach(salesTargetControllerScope.tempSalesReportList,function(val){
    			if(val.fromDate >= salesTargetControllerScope.reportFromDate.from && val.toDate <= salesTargetControllerScope.reportFromDate.to){
    	    		salesTargetControllerScope.salesReportList.push(val);
    	    		salesTargetControllerScope.salesReportList.totalSales += parseFloat(val.q1) +  parseFloat(val.q2) + parseFloat(val.q3) + parseFloat(val.q4);
    			}
    		}); 
    		salesTargetControllerScope.msg = 'Sales Target Not Available';
    	    salesTargetControllerScope.spinner = false;
    	} else {
    		salesTargetControllerScope.salesReportList = [];
    		salesTargetControllerScope.salesReportList.totalSales = 0;
	        salesTargetControllerScope.spinner = false;
	        if(!salesTargetControllerScope.reportFromDate.to && salesTargetControllerScope.reportFromDate.from){
	        	salesTargetControllerScope.msg = 'Select To Date';
	        }else if(salesTargetControllerScope.reportFromDate.to && !salesTargetControllerScope.reportFromDate.from){
	        	salesTargetControllerScope.msg = 'Select From Date';
	        }else{
	        	salesTargetControllerScope.msg = 'Invalid From And To Date';
	        }
    	}
    }
    
    function goToUpdateSales(data){
    	if(data){
    		salesTargetControllerScope.isUpdate = true;
    		salesTargetControllerScope.report = angular.copy(data);
    	}
    }
    
    function getEmployee() {
        salesTargetControllerScope.spinner1 = true;
        employeeService.getEmployee().then(function(res) {   	
                if (res.successflag === 'true' && res.results.length > 0) { 
                        salesTargetControllerScope.employeeList = res.results; 
                   	    salesTargetControllerScope.spinner1 = false;
                	 } else {
                	salesTargetControllerScope.spinner1 = false; 
                }
        }, function(err) { 
        });
    }
    
    function getSalesReport() {
        salesTargetControllerScope.spinner = true;
        	salesTargetService.getSalesReport().then(function(res) {
		            if (res.successflag == 'true' && res.results.length > 0) {
		            	salesTargetControllerScope.salesReportList = res.results;
		            	salesTargetControllerScope.salesReportList.totalSales = 0;
		            	angular.forEach(salesTargetControllerScope.salesReportList,function(val){
		            		val.total = parseFloat(val.q1) + parseFloat(val.q2) + parseFloat(val.q3) +  parseFloat(val.q4);
		            		salesTargetControllerScope.salesReportList.totalSales += val.total;
		            	});
		            	salesTargetControllerScope.tempSalesReportList = angular.copy(salesTargetControllerScope.salesReportList);
		                  salesTargetControllerScope.spinner = false;
		            } else {
		        		salesTargetControllerScope.msg = 'Sales Target Not Available'; 
		                salesTargetControllerScope.spinner = false;
		            }
		    }, function(err) {
	    		salesTargetControllerScope.msg = 'Sales Target Not Available';
		        salesTargetControllerScope.spinner = false;
		    });
    }
   
    function openSalesTargetModal(){
		salesTargetControllerScope.isInvalidDate = false;
		salesTargetControllerScope.reportFrom = false;
		salesTargetControllerScope.report = angular.copy(currentFinancialYear);
    }
    
    $(".select1").select2();
}