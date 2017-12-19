var app = angular.module('spheresuite')
app.controller('hrRequestController', hrRequestController);

hrRequestController.$inject = ['$scope', '$rootScope', '$localStorage', '$location', '$filter', 'commonService', 'configurationService', 'hrRequestService'];

function hrRequestController($scope, $rootScope, $localStorage, $location, $filter, commonService, configurationService, hrRequestService) {
    var hrRequestControllerScope = this;

    $rootScope.headerMenu = "HR Request";

    hrRequestControllerScope.hrRequest;
    hrRequestControllerScope.hrRequestForm;
    hrRequestControllerScope.hrRequestList;
    hrRequestControllerScope.hrRequestTypeList;
    hrRequestControllerScope.isAcceptRequest = false;
    hrRequestControllerScope.isUpdate = false;
    hrRequestControllerScope.limitToShow = 5;
    hrRequestControllerScope.msg = '';
    hrRequestControllerScope.request;
    hrRequestControllerScope.requestForm;

    hrRequestControllerScope.acceptRequest = acceptRequest;
    hrRequestControllerScope.addMoreItems = addMoreItems;
    hrRequestControllerScope.createHrRequest = createHrRequest;
    hrRequestControllerScope.checkEmptyList = checkEmptyList;
    hrRequestControllerScope.decline = decline;
    hrRequestControllerScope.declineAccept = declineAccept;
    hrRequestControllerScope.editHrRequest = editHrRequest;
    hrRequestControllerScope.exportData = exportData;
    hrRequestControllerScope.getHrRequest = getHrRequest;
    hrRequestControllerScope.getHrRequestType = getHrRequestType;
    hrRequestControllerScope.gotoEdit = gotoEdit;
    hrRequestControllerScope.gotoMyRequests = gotoMyRequests;
    hrRequestControllerScope.gotoViewRequest = gotoViewRequest;
    hrRequestControllerScope.toggleAcceptRequest = toggleAcceptRequest;
    
    if($location.path() == '/hrrequest/companiesrequest'){
    	delete $localStorage.spheresuite['hrRequestId'];
    	getHrRequest();
    }else if($location.path() == '/hrrequests'){
    	delete $localStorage.spheresuite['hrRequestId'];
    	getHrRequest($localStorage.spheresuite.id);
    }else if($location.path() == '/hrrequest/edit'){
        hrRequestControllerScope.isUpdate = true;
        getHrRequestType();
    	getHrRequest($localStorage.spheresuite.hrRequestId, 'edit');
    }else if($location.path() == '/hrrequest/view' || $location.path() == '/hrrequest/companiesrequest/view'){
    	getHrRequest($localStorage.spheresuite.hrRequestId, 'view');
    }else if($location.path() == '/hrrequest/add'){
        getHrRequestType();
    	delete $localStorage.spheresuite['hrRequestId'];
    }
    
    function acceptRequest(){
    	if(hrRequestControllerScope.hrRequest){
    		hrRequestControllerScope.spinner = true;
	        commonService.formValNotManditory(hrRequestControllerScope.requestForm, hrRequestControllerScope.hrRequest).then(function(data) {
	        	if(data){
	        		data.updatedBy = $localStorage.spheresuite.id;
	        		hrRequestService.acceptRequest(data).then(function(res){
		        		hrRequestControllerScope.spinner = false;
		        		if(res.successflag == 'true'){
	        				declineAccept();
	        			}
	        		},function(err){
		        		hrRequestControllerScope.spinner = false;
	        		})
	        	}else{
	        		hrRequestControllerScope.spinner = false;
	        	}
	        },function(err){
	    		hrRequestControllerScope.spinner = false;
	        });
    	}
    }
    
    function addMoreItems(){
        hrRequestControllerScope.limitToShow += 5;
    }
    
    function createHrRequest(){
    	if(hrRequestControllerScope.hrRequest){
	        hrRequestControllerScope.spinner = true;
	        commonService.formValNotManditory(hrRequestControllerScope.hrRequestForm, hrRequestControllerScope.hrRequest).then(function(data) {
	        	if(data){
	        		data.updatedBy = $localStorage.spheresuite.id;
	        		data.status = 's';
	        		hrRequestService.createHrRequest(data).then(function(res){
	        			if(res.successflag == 'true'){
	            	        hrRequestControllerScope.spinner = false;
	        				decline();
	        				$location.path('/hrrequests');
	        			}else{
	        				hrRequestControllerScope.spinner = false;
	        			}
	        		},function(err){
	        	        hrRequestControllerScope.spinner = false;
	        		})
	        	}else{
	        		hrRequestControllerScope.spinner = false;
	        		}
	        });
    	}
    }
    
    function checkEmptyList(){
    	hrRequestControllerScope.msg = '';
    	if(hrRequestControllerScope.search && hrRequestControllerScope.hrRequestList){
    		var len = ($filter('filter')(hrRequestControllerScope.hrRequestList, hrRequestControllerScope.search)).length;
    			
    		if(len == 0)
    			hrRequestControllerScope.msg = 'HR Requests Not Available';
    	}
    }

    function decline(){
    	if(hrRequestControllerScope.isUpdate){
			$location.path('/hrrequests');
    	}else{
	        hrRequestControllerScope.hrRequest = null;
	        hrRequestControllerScope.hrRequestForm.$setPristine();
	        hrRequestControllerScope.hrRequestForm.$setUntouched();
    	}
    }
    
    function declineAccept(){
        hrRequestControllerScope.requestForm.$setPristine();
        hrRequestControllerScope.requestForm.$setUntouched();
        toggleAcceptRequest();
    }
    
    function editHrRequest(){
    	if(hrRequestControllerScope.hrRequest){
	        hrRequestControllerScope.spinner = true;
	        hrRequestControllerScope.hrRequest.updatedBy = $localStorage.spheresuite.id;
	        if(!hrRequestControllerScope.hrRequest.comment){
	        	hrRequestControllerScope.hrRequest.comment = '';
	        }
	        if($location.path() == '/hrrequest/edit' && hrRequestControllerScope.hrRequest.status == 'o'){
	        	hrRequestControllerScope.hrRequest.status = 's';
	        }
    		hrRequestService.editHrRequest(hrRequestControllerScope.hrRequest).then(function(res){
    			if(res.successflag == 'true'){
        	        hrRequestControllerScope.spinner = false;
        	        if($location.path() == '/hrrequest/companiesrequest/view'){
        	        	$location.path('/hrrequest/companiesrequest');
        	        }else{
        	        	decline();
        	        	$location.path('/hrrequests');
        	        }
    			}else{
    				hrRequestControllerScope.spinner = false;
    			}
    		},function(err){
    	        hrRequestControllerScope.spinner = false;
    		});
    	}    	
    }
    
    function getHrRequest(data, type){
		hrRequestControllerScope.msg = '';
        hrRequestControllerScope.getSpinner = true;
        hrRequestService.getHrRequest(data, type).then(function(res){
        	if(res.successflag == 'true' && res.results.length > 0){
        		if(data && type && type == 'edit' || type == 'view'){
        			if($location.path() == '/hrrequest/edit' || $location.path() == '/hrrequest/view' || $location.path() == '/hrrequest/companiesrequest/view' ){
        				hrRequestControllerScope.hrRequest = res.results[0];
        			}
        		}else {
        			hrRequestControllerScope.hrRequestList = res.results;
        		}
        		hrRequestControllerScope.getSpinner = false;
        	}else{
				hrRequestControllerScope.msg = 'HR Requests Not Available';
        		hrRequestControllerScope.getSpinner = false;
        	}
        },function(err){
            hrRequestControllerScope.getSpinner = false;
        });
    }
    
    function getHrRequestType(){
        hrRequestControllerScope.spinner = true;
    	configurationService.gethrRequestType().then(function(res){
    		if(res.successflag == 'true' && res.results.length > 0){
    			hrRequestControllerScope.hrRequestTypeList = res.results; 
    		}
    		hrRequestControllerScope.spinner = false;
    	},function(err){
    		hrRequestControllerScope.spinner = false;
    	});
    }
    
    function gotoEdit(){
    	$location.path('/hrrequest/edit');
    }

    function gotoMyRequests(){
    	if($location.path() == '/hrrequest/companiesrequest/view'){
    		$location.path('/hrrequest/companiesrequest');
    	}else if($location.path() == '/hrrequest/view'){
    		$location.path('/hrrequests');
    	}
    }
    
    function gotoViewRequest(id){
    	if(id){
    		$localStorage.spheresuite.hrRequestId = id;
        	if($location.path() == '/hrrequests'){
    			$location.path('/hrrequest/view');
    		}else if($location.path() == '/hrrequest/companiesrequest'){
        		$location.path('/hrrequest/companiesrequest/view');
        	}
    	}
    }
    
    function toggleAcceptRequest(){
    	hrRequestControllerScope.isAcceptRequest = !hrRequestControllerScope.isAcceptRequest;
    }
    

    function exportData() {
        $scope.fileName = "HR Request";
        $scope.exportData = []; 
        $scope.exportData.push(["Id", "Created By", "Created On", "Status", "Type", "Type Name", "Desc", "Comment", "Updatedon", "UpdatedBy"]);
        $scope.Filterdata = hrRequestControllerScope.hrRequestList;
        var firstFiter = $filter('filter')(hrRequestControllerScope.hrRequestList, { status: hrRequestControllerScope.status });
        $scope.Filterdata = $filter('filter')(firstFiter, hrRequestControllerScope.search);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.createdBy, value.createdon, value.status, value.type, value.typeName, value.desc, value.comment, value.updatedon, value.updatedBy]);
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
        
    $('.select1').select2();
}