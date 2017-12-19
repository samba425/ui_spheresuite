var app = angular.module('spheresuite')
app.controller('warehouseController', warehouseController);

warehouseController.$inject = ['$scope', '$rootScope', '$location', '$filter', '$localStorage', 'commonService', 'configurationService', 'warehouseService'];

function warehouseController($scope, $rootScope, $location, $filter, $localStorage, commonService, configurationService, warehouseService) {
    var warehouseControllerScope = this;

    $rootScope.headerMenu = "Warehouses";
    
    warehouseControllerScope.countryList;
    warehouseControllerScope.isUpdate = false;
    warehouseControllerScope.limitToShow = 5;
    warehouseControllerScope.msg = '';
    warehouseControllerScope.propertyList;
    warehouseControllerScope.stateList;
    warehouseControllerScope.storageList;
    warehouseControllerScope.warehouse;
    warehouseControllerScope.warehouseForm;
    warehouseControllerScope.warehouseList;

    warehouseControllerScope.addMoreItems = addMoreItems; 
    warehouseControllerScope.addWarehouse = addWarehouse;
    warehouseControllerScope.decline = decline;
    warehouseControllerScope.editWarehouse = editWarehouse;
    warehouseControllerScope.exportData = exportData;
    warehouseControllerScope.getCountry = getCountry;;
    warehouseControllerScope.getPropertyType = getPropertyType;
    warehouseControllerScope.getState = getState;
    warehouseControllerScope.getStorageType = getStorageType;
    warehouseControllerScope.getWarehouse = getWarehouse;
    warehouseControllerScope.gotoEdit = gotoEdit;
    warehouseControllerScope.gotoView = gotoView;
    
    if($location.path() == '/warehouse/add'){
    	getCountry();
    	getPropertyType();
    	getStorageType();
    	delete $localStorage.spheresuite['warehouseId'];
    }else if($location.path() == '/warehouse/view'){
    	getWarehouse($localStorage.spheresuite.warehouseId);
    }else if($location.path() == '/warehouse/edit'){
        warehouseControllerScope.isUpdate = true;
    	getWarehouse($localStorage.spheresuite.warehouseId);
    	getCountry();
    	getPropertyType();
    	getStorageType();
    }else if($location.path() == '/warehouses'){
    	delete $localStorage.spheresuite['warehouseId'];
    	getWarehouse();
    	getPropertyType();
    }

    function addMoreItems(){
    	warehouseControllerScope.limitToShow += 5;
    }
    
    function addWarehouse(){
    	if(warehouseControllerScope.warehouse){
    		warehouseControllerScope.spinner = true;
    		 commonService.formValNotManditory( warehouseControllerScope.warehouseForm,  warehouseControllerScope.warehouse).then(function(data) {
                 if (data) {
                     data.updatedBy = $localStorage.spheresuite.id;
                     console.log('data',data)
                     warehouseService.addWarehouse(data).then(function(res){
                    	 console.log('addWarehouse res',res)
                    	 warehouseControllerScope.spinner = false;
                    	 if(res.successflag == 'true'){
                    		 decline();
                    		 $location.path('/warehouses');
                    	 }
                     },function(err){
                    	 warehouseControllerScope.spinner = false;
                     });
                 }else{
             		warehouseControllerScope.spinner = false;
                 }
    		 });
    	}
    }
    
    function decline(){
    	if($location.path() == '/warehouse/edit'){
    		$location.path('/warehouse/view');
    	}else{
    		warehouseControllerScope.warehouse = null;
    		warehouseControllerScope.warehouseForm.$setPristine();
    		warehouseControllerScope.warehouseForm.$setUntouched();
    	}
    }
    
    function editWarehouse(){
    	if(warehouseControllerScope.warehouse){
    		warehouseControllerScope.spinner = true;
    		warehouseControllerScope.warehouse.updatedBy = $localStorage.spheresuite.id;
    		if(!warehouseControllerScope.warehouse.state){
    			warehouseControllerScope.warehouse.state  = '';
    		}    			
			 console.log('warehouseControllerScope.warehouse',warehouseControllerScope.warehouse)
    		 warehouseService.editWarehouse(warehouseControllerScope.warehouse).then(function(res){
    			 console.log('editWarehouse',res)
            	 warehouseControllerScope.spinner = false;
            	 if(res.successflag == 'true'){
            		 decline();
            		 $location.path('/warehouse/view');
            	 }
             },function(err){
            	 warehouseControllerScope.spinner = false;
             });
    	}
    }
    

    function exportData() {
        $scope.fileName = $rootScope.headerMenu;
        $scope.exportData = [];
        // Headers:
        $scope.exportData.push(["Id", "Name", "Ware House Id", "Address", "City", "Pincode", "State Id", "State Name", "Country Code", "Country Name", "Property Type Id", "Property Type Name", "Storage Type Id", "Storage Type Name", "Comment", "Updated By", "Updated On"]);
        $scope.Filterdata = warehouseControllerScope.warehouseList;

        var firstFiter = $filter('filter')(warehouseControllerScope.warehouseList, { propertyType : warehouseControllerScope.propertyType });
        $scope.Filterdata = $filter('filter')(firstFiter, warehouseControllerScope.searchName);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.name, value.wareHouseId, value.address, value.city, value.zip, value.state, value.stateName, value.country, value.countryName, value.propertyTypeId, value.propertyTypeName, value.storageTypeId, value.storageTypeName, value.comment, value.updatedBy, value.updatedon]);
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
        /* add worksheet to workbook */
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

    function getCountry(){
		warehouseControllerScope.spinner = true;
		 configurationService.getCountry().then(function(res){
			 console.log('getCountry res',res);
       	 if(res.successflag == 'true' && res.results.length > 0){
       		warehouseControllerScope.countryList = res.results;
       	 }
       	 warehouseControllerScope.spinner = false;
        },function(err){
       	 warehouseControllerScope.spinner = false;
        });
    }
    
    function getPropertyType(){
		warehouseControllerScope.spinner = true;
		 configurationService.getPropertyType().then(function(res){
			 console.log('getPropertyType res',res);
	       	 if(res.successflag == 'true' && res.results.length > 0){
	       		warehouseControllerScope.propertyList = res.results;
	       	 }
	       	 warehouseControllerScope.spinner = false;
        },function(err){
       	 warehouseControllerScope.spinner = false;
        });
    }
    
    function getState(data){
    	warehouseControllerScope.stateList = null;
    	if(data){
			warehouseControllerScope.spinner = true;
			 configurationService.getState(data).then(function(res){
				 console.log('getState res',res);
		   	 if(res.successflag == 'true' && res.results.length > 0){
		   		warehouseControllerScope.stateList = res.results;
		   	 }
		   	 warehouseControllerScope.spinner = false;
		    },function(err){
		   	 warehouseControllerScope.spinner = false;
		    });
    	}
    }
    
    function getStorageType(){
		warehouseControllerScope.spinner = true;
		 configurationService.getStorageType().then(function(res){
			 console.log('getStorageType res',res);
       	 if(res.successflag == 'true' && res.results.length > 0){
       		warehouseControllerScope.storageList = res.results;
       	 }
       	 warehouseControllerScope.spinner = false;
        },function(err){
       	 warehouseControllerScope.spinner = false;
        });
    }
    
    function getWarehouse(data){
    	warehouseControllerScope.msg = '';
		warehouseControllerScope.getSpinner = true;
		 warehouseService.getWarehouse(data).then(function(res){
			 console.log('getWarehouse res',res);
        	 if(res.successflag == 'true' && res.results.length > 0){
        		 if(data){
        			 getState(res.results[0].country);
        			 warehouseControllerScope.warehouse = res.results[0];
        		 }else{
        			 warehouseControllerScope.warehouseList = res.results;
        		 }
        	 }else{
        		 warehouseControllerScope.msg = 'Warehouse Not Available';
        	 }
        	 warehouseControllerScope.getSpinner = false;
         },function(err){
    		 warehouseControllerScope.msg = 'Warehouse Not Available';
        	 warehouseControllerScope.getSpinner = false;
         });
    }

    function gotoEdit(){
    	$location.path('/warehouse/edit');
    }
    
    function gotoView(id){
    	if(id){
    		$localStorage.spheresuite.warehouseId = id;
    		console.log('$localStorage.spheresuite.warehouseId',$localStorage.spheresuite.warehouseId)
        	$location.path('/warehouse/view');
    	}else{
        	$location.path('/warehouses');
    	}
    }
     
    $('.select1').select2();
}