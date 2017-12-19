angular
    .module('spheresuite')
    .controller('salesPolicyController', salesPolicyController);

salesPolicyController.$inject = ['$scope', '$rootScope', '$location', '$filter', '$localStorage', 'salesPolicyService', 'commonService'];

function salesPolicyController($scope, $rootScope, $location, $filter, $localStorage, salesPolicyService, commonService) {
    var salesPolicyControllerScope = this;
	$rootScope.headerMenu = "Sales Policies";

	salesPolicyControllerScope.dataMsg = '';
    salesPolicyControllerScope.isUpdate = false;
    salesPolicyControllerScope.salesPolicy;
    salesPolicyControllerScope.salesPolicyList = [];
    salesPolicyControllerScope.spinner = false;
    
    salesPolicyControllerScope.addSalesPolicy = addSalesPolicy
    salesPolicyControllerScope.changeStatus = changeStatus;
    salesPolicyControllerScope.decline = decline;
    salesPolicyControllerScope.editSalesPolicy = editSalesPolicy;
    salesPolicyControllerScope.exportData = exportData;
    salesPolicyControllerScope.getSalesPolicy = getSalesPolicy;
    salesPolicyControllerScope.gotoEditSalesPolicy = gotoEditSalesPolicy;
    
    getSalesPolicy();
        
    function addSalesPolicy(){
    	if(salesPolicyControllerScope.salesPolicy){
    	    salesPolicyControllerScope.spinner = true;
    	    salesPolicyControllerScope.salesPolicy.updatedBy= $localStorage.spheresuite.id; 
			salesPolicyService.addSalesPolicy(salesPolicyControllerScope.salesPolicy).then(function(res){ 
				if(res.successflag == 'true'){
					decline();
					getSalesPolicy();
				}
				salesPolicyControllerScope.spinner = false;
			},function(err){
				salesPolicyControllerScope.spinner = false;
			});
    	}
    }
    
    function changeStatus(salesPolicy){
    	if(salesPolicy){
    		if(salesPolicy.status && salesPolicy.status == 'i'){
    			salesPolicy.status = 'a'
    		} else {
    			salesPolicy.status = 'i'
    		}
    		salesPolicyControllerScope.salesPolicy = salesPolicy;
    		salesPolicyControllerScope.salesPolicy.value = salesPolicy.name;
    		editSalesPolicy();
    	}
    }

    function decline(){
    		salesPolicyControllerScope.salesPolicy = null;
	    	salesPolicyControllerScope.salesPolicyForm.$setPristine();
	    	salesPolicyControllerScope.salesPolicyForm.$setUntouched();
	    	salesPolicyControllerScope.isUpdate = false;
	        $('#salesPolicy').modal('hide');
    }
    
    function editSalesPolicy(){
    	if(salesPolicyControllerScope.salesPolicy){
    	    salesPolicyControllerScope.spinner = true;
    	    salesPolicyControllerScope.salesPolicy.updatedBy= $localStorage.spheresuite.id;
			salesPolicyService.updateSalesPolicy(salesPolicyControllerScope.salesPolicy).then(function(res){ 
				if(res.successflag == 'true'){
					decline();
					getSalesPolicy();
				}
				salesPolicyControllerScope.spinner = false;
			},function(err){
				salesPolicyControllerScope.spinner = false;
			});
    	}
    }
    
    function exportData() { 
        $scope.fileName = "Sales Policy";
        $scope.exportData = []; 
        $scope.exportData.push(["Id", "Policy", "Updated By", "Updated On"]); 
        $scope.Filterdata = salesPolicyControllerScope.salesPolicyList;
        var firstFiter = $filter('filter')(salesPolicyControllerScope.salesPolicyList);
        $scope.Filterdata = $filter('filter')(firstFiter, { name: salesPolicyControllerScope.searchName } );
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.name, value.updatedBy, value.updatedon]);
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
    
    function getSalesPolicy(data){
	    salesPolicyControllerScope.spinner = true;
		salesPolicyControllerScope.dataMsg = '';
		salesPolicyService.getSalesPolicy(data).then(function(res){ 
			  if(res.successflag == 'true' && res.results.length > 0){
				  salesPolicyControllerScope.spinner = false;
			    	salesPolicyControllerScope.salesPolicyList = res.results;
		    	if($location.path() == '/salespolicies'){
		    		var list = []
		    		angular.forEach(salesPolicyControllerScope.salesPolicyList,function(val, key){
		    			if(val.status == 'a'){
		    				list.push(val);
		    			}
		    		});
		    		salesPolicyControllerScope.salesPolicyList = list;
		    		if(list.length === 0 ){
		    			salesPolicyControllerScope.dataMsg = "Sales Policies Not Available";
		    		}
		    	}  		
			} else { 
				salesPolicyControllerScope.spinner = false;
				salesPolicyControllerScope.dataMsg = "Sales Policies Not Available";
			}
		},function(err){
			salesPolicyControllerScope.dataMsg = "Sales Policies Not Available";
			salesPolicyControllerScope.spinner = false;
		});
    }
    
    function gotoEditSalesPolicy(salesPolicy){
    	if(salesPolicy){
    		salesPolicyControllerScope.salesPolicy = salesPolicy;
    		salesPolicyControllerScope.salesPolicy.value = salesPolicy.name;
    		salesPolicyControllerScope.isUpdate = true;
    	}
    }

}