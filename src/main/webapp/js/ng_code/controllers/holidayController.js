angular
    .module('spheresuite')
    .controller('holidayController', holidayController);

holidayController.$inject = ['$scope', '$rootScope', '$location', '$filter', '$localStorage', 'holidayService', 'commonService'];

function holidayController($scope, $rootScope, $location, $filter, $localStorage, holidayService, commonService) {
    var holidayControllerScope = this;
	$rootScope.headerMenu = "Holidays";
	holidayControllerScope.format = "YYYY";
	holidayControllerScope.formatDate = "DD MMM";
	holidayControllerScope.dataMsg = '';
    holidayControllerScope.isUpdate = false;
    holidayControllerScope.holiday;
    holidayControllerScope.holidayList = [];
    holidayControllerScope.spinner = false;
    
    holidayControllerScope.addHoliday = addHoliday
    holidayControllerScope.changeStatus = changeStatus;
    holidayControllerScope.decline = decline;
    holidayControllerScope.editHoliday  = editHoliday;
    holidayControllerScope.exportData = exportData;
    holidayControllerScope.getHoliday = getHoliday;
    holidayControllerScope.gotoEditHoliday = gotoEditHoliday;
    holidayControllerScope.checkEmptyList = checkEmptyList;
    
    getHoliday();
        
    function addHoliday(){ 
    	if(holidayControllerScope.holiday){
    	    holidayControllerScope.spinner = true;
    	    holidayControllerScope.holiday.updatedBy= $localStorage.spheresuite.id; 
    	    holidayControllerScope.holiday.status= "a";
    	    holidayService.addHoliday(holidayControllerScope.holiday).then(function(res){ 
				if(res.successflag == 'true'){
					decline();
					getHoliday();
				}
				holidayControllerScope.spinner = false;
			},function(err){
				holidayControllerScope.spinner = false;
			});
    	}
    }
    
    function changeStatus(holiday){
    	if(holiday){
    		if(holiday.status && holiday.status == 'i'){
    			holiday.status = 'a'
    		} else {
    			holiday.status = 'i'
    		}
    		holidayControllerScope.holiday = holiday;
    		holidayControllerScope.holiday.value = holiday.name;
    		editHoliday();
    	}
    }

    function decline(){
    		holidayControllerScope.holiday = null;
	    	holidayControllerScope.holidayForm.$setPristine();
	    	holidayControllerScope.holidayForm.$setUntouched();
	    	holidayControllerScope.isUpdate = false;
	        $('#holiday').modal('hide');
    }
    
    function editHoliday(){ 
    	if(holidayControllerScope.holiday){
    	    holidayControllerScope.spinner = true;
    	    holidayControllerScope.holiday.updatedBy= $localStorage.spheresuite.id;
			holidayService.updateHoliday(holidayControllerScope.holiday).then(function(res){ 
				if(res.successflag == 'true'){
					decline();
					getHoliday();
				}
				holidayControllerScope.spinner = false;
			},function(err){
				holidayControllerScope.spinner = false;
			});
    	}
    }
    
    function checkEmptyList(){
    	holidayControllerScope.msg = '';
    	if(holidayControllerScope.searchName && holidayControllerScope.holidayList){
    		var len = ($filter('filter')(holidayControllerScope.holidayList, holidayControllerScope.searchName)).length;
    			
    		if(len == 0)
    			holidayControllerScope.msg = 'Holiday Requests Not Available';
    	}
    	console.log(len)
    }
    
    function exportData() { 
        $scope.fileName = "Holiday List";
        $scope.exportData = []; 
        $scope.exportData.push(["Id", "Date","year", "Description", "Updated By","Updated On"]); 
        $scope.Filterdata = holidayControllerScope.holidayList;
        var firstFiter = $filter('filter')(holidayControllerScope.holidayList);
        $scope.Filterdata = $filter('filter')(firstFiter, holidayControllerScope.searchName );
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.date, value.year ,value.desc,value.updatedBy, value.updatedon]);
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
    
    function getHoliday(data){
	    holidayControllerScope.spinner = true;
	    holidayControllerScope.dataMsg = '';
		holidayService.getHoliday(data).then(function(res){ 
			if(res.successflag == 'true' && res.results.length > 0){
		    	holidayControllerScope.holidayList = res.results;
		    	 var newObj = {};
		    	var newArr = [];
		    	
		    	 if($location.path() == '/holidays'){
		    		angular.forEach(res.results,function(val){ 
		    			if(val.status == 'a'){
		    			if(newArr.length == 0){
		    				newArr.push({year:val.year,data:[val]});  
		    			}else{
							var found = false;
		    				for(var item in newArr){
		    					if (parseInt(val.year) == parseInt(newArr[item].year) ){
				    				newArr[item].data.push(val);
				    				found = true;
		    					} 
		    				}
		    				if(!found){ 
			    				newArr.push({year:val.year,data:[val]});
		    				}
		    			}
		    		}
		    		}); 
//		    		newArr.reverse();
			    	holidayControllerScope.holidayList = newArr;
			    	if(newArr.length === 0 ){
			    		holidayControllerScope.msg = "Holidays Not Available"
			    	}
		    	} 
			} else{
				holidayControllerScope.dataMsg = "Holidays Not Available";
				}
			holidayControllerScope.spinner = false;
		},function(err){
			holidayControllerScope.dataMsg = "Holidays Not Available";
			holidayControllerScope.spinner = false;
		});
    }
    
    function gotoEditHoliday(holiday){
    	if(holiday){
    		holidayControllerScope.holiday = holiday;
    		holidayControllerScope.holiday.value = holiday.name;
    		holidayControllerScope.isUpdate = true;
    	}
    }

}