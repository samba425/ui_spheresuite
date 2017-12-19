angular
    .module('spheresuite')
    .controller('hrPolicyController', hrPolicyController);

hrPolicyController.$inject = ['$scope', '$rootScope', '$location', '$filter', '$localStorage', 'hrPolicyService', 'commonService'];

function hrPolicyController($scope, $rootScope, $location, $filter, $localStorage, hrPolicyService, commonService) {
    var hrPolicyControllerScope = this;
	$rootScope.headerMenu = "HR Policies"; 
	hrPolicyControllerScope.dataMsg = '';
    hrPolicyControllerScope.isUpdate = false;
    hrPolicyControllerScope.hrPolicy;
    hrPolicyControllerScope.hrPolicyList = [];
    hrPolicyControllerScope.spinner = false;
    
    hrPolicyControllerScope.addHrPolicy = addHrPolicy;
    hrPolicyControllerScope.changeStatus = changeStatus;
    hrPolicyControllerScope.decline = decline;
    hrPolicyControllerScope.editHrPolicy = editHrPolicy;
    hrPolicyControllerScope.exportData = exportData;
    hrPolicyControllerScope.getHrPolicy = getHrPolicy;
    hrPolicyControllerScope.gotoEditHrPolicy = gotoEditHrPolicy;
    
    getHrPolicy();
        
    function addHrPolicy(){ 
    	if(hrPolicyControllerScope.hrPolicy){
    	    hrPolicyControllerScope.spinner = true;
    	    hrPolicyControllerScope.hrPolicy.updatedBy= $localStorage.spheresuite.id; 
			hrPolicyService.addHrPolicy(hrPolicyControllerScope.hrPolicy).then(function(res){ 
				if(res.successflag == 'true'){
					decline();
					getHrPolicy();
				}
				hrPolicyControllerScope.spinner = false;
			},function(err){
				hrPolicyControllerScope.spinner = false;
			});
    	}
    }
    
    function changeStatus(hrPolicy){
    	if(hrPolicy){
    		if(hrPolicy.status && hrPolicy.status == 'i'){
    			hrPolicy.status = 'a'
    		} else {
    			hrPolicy.status = 'i'
    		}
    		hrPolicyControllerScope.hrPolicy = hrPolicy;
    		hrPolicyControllerScope.hrPolicy.value = hrPolicy.name;
    		editHrPolicy();
    	}
    }

    function decline(){
    		hrPolicyControllerScope.hrPolicy = null;
	    	hrPolicyControllerScope.hrPolicyForm.$setPristine();
	    	hrPolicyControllerScope.hrPolicyForm.$setUntouched();
	    	hrPolicyControllerScope.isUpdate = false;
	        $('#hrPolicy').modal('hide');
    }
    
    function editHrPolicy(){
    	if(hrPolicyControllerScope.hrPolicy){
    	    hrPolicyControllerScope.spinner = true;
    	    hrPolicyControllerScope.hrPolicy.updatedBy= $localStorage.spheresuite.id;
			hrPolicyService.updateHrPolicy(hrPolicyControllerScope.hrPolicy).then(function(res){ 
				if(res.successflag == 'true'){
					decline();
					getHrPolicy();
				}
				hrPolicyControllerScope.spinner = false;
			},function(err){
				hrPolicyControllerScope.spinner = false;
			});
    	}
    }
    
    function exportData() { 
        $scope.fileName = "Hr Policy";
        $scope.exportData = []; 
        $scope.exportData.push(["Id", "Policy", "Updated By", "Updated On"]); 
        $scope.Filterdata = hrPolicyControllerScope.hrPolicyList;
        var firstFiter = $filter('filter')(hrPolicyControllerScope.hrPolicyList);
        $scope.Filterdata = $filter('filter')(firstFiter, { name: hrPolicyControllerScope.searchName });
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
    
    function getHrPolicy(data){ 
	    hrPolicyControllerScope.spinner = true;
	    hrPolicyControllerScope.dataMsg = '';
		hrPolicyService.getHrPolicy(data).then(function(res){
			if(res.successflag == 'true' && res.results.length > 0){
		    	hrPolicyControllerScope.hrPolicyList = res.results;
		    	if($location.path() == '/hrpolicies'){
		    		var list = [];
		    		angular.forEach(hrPolicyControllerScope.hrPolicyList,function(val, key){
		    			if(val.status == 'a'){
		    				list.push(val);
		    			}
		    		});
		    		hrPolicyControllerScope.hrPolicyList = list;
		    		if(list.length === 0){
		    			hrPolicyControllerScope.dataMsg = "HR Policies Not Available";
		    		}
		    	}
			} else{
				hrPolicyControllerScope.dataMsg = "HR Policies Not Available";
				}
			hrPolicyControllerScope.spinner = false;
		},function(err){
			hrPolicyControllerScope.dataMsg = "HR Policies Not Available";
			hrPolicyControllerScope.spinner = false;
		});
    }
    
    function gotoEditHrPolicy(hrPolicy){
    	if(hrPolicy){
    		hrPolicyControllerScope.hrPolicy = hrPolicy;
    		hrPolicyControllerScope.hrPolicy.value = hrPolicy.name;
    		hrPolicyControllerScope.isUpdate = true;
    	}
    }

}