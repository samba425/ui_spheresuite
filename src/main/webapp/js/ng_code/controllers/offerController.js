angular
    .module('spheresuite')
    .controller('offerController', offerController);

offerController.$inject = ['$rootScope', '$scope', '$filter', '$location', '$localStorage', '$routeParams', 'commonService', 'leadService', 'opportunityService', 'requirementService', 'configurationService', 'offerService','companyInformationService'];

function offerController($rootScope, $scope, $filter, $location, $localStorage, $routeParams, commonService, leadService, opportunityService, requirementService, configurationService, offerService,companyInformationService) {
	
	var offerControllerScope = this;

    $rootScope.headerMenu = "Offers";
    $scope.format = "MMM dd, yyyy";
    
    offerControllerScope.approverList;
    offerControllerScope.customerList;
    offerControllerScope.isDisabled = false;
    offerControllerScope.isUpdate = false;
    offerControllerScope.isOpenJoiningDate = false;
    offerControllerScope.isOpenOfferDate = false;
    offerControllerScope.limitToShow = 5;
    offerControllerScope.msg = '';
    offerControllerScope.offer;
    offerControllerScope.offerForm;
    offerControllerScope.offerList;
    offerControllerScope.projectList;
    offerControllerScope.requirementList;

    offerControllerScope.addMore = addMore;
    offerControllerScope.addOffer = addOffer;
    offerControllerScope.decline = decline;
    offerControllerScope.editOffer = editOffer;
    offerControllerScope.exportData = exportData;
    offerControllerScope.getApprover = getApprover;
    offerControllerScope.getCustomer = getCustomer;
    offerControllerScope.getOffer = getOffer;
    offerControllerScope.getOpportunity = getOpportunity;
    offerControllerScope.getRequirement = getRequirement;
    offerControllerScope.gotoEdit = gotoEdit;
    offerControllerScope.gotoView = gotoView;
    offerControllerScope.openJoiningDateCalender = openJoiningDateCalender;
    offerControllerScope.openOfferDateCalender = openOfferDateCalender;
    offerControllerScope.getCompanyInformation = getCompanyInformation;
    
    if($location.path() == '/offer/add'){
    	getCustomer('C');
    	getApprover();
    	delete $localStorage.spheresuite['offerId'];
    }else if($location.path() == '/offer/view'){
    	getOffer($localStorage.spheresuite.offerId);
    }else if($location.path() == '/offers'){
    	getOffer();
    	delete $localStorage.spheresuite['offerId'];
    }else if($location.path().indexOf('/offer/edit') == 0){
        offerControllerScope.isUpdate = true;
        if($location.path() == '/offer/edit'){
        	getCustomer('C');
        	getOpportunity(); 
        	getApprover();
	    	getOffer($localStorage.spheresuite.offerId);
    	}else if($routeParams && Number($routeParams.empId) && Number($routeParams.offerId) && $localStorage.spheresuite && $localStorage.spheresuite.id == $routeParams.empId){
    	    offerControllerScope.isDisabled = true;
	    	getOffer($routeParams.offerId);
    	}else {
    		$localStorage.approveOffer = {empId: $routeParams.empId,offerId: $routeParams.offerId};
    		$location.path('/');
    	}
    }
    
    function addMore(){
    	offerControllerScope.limitToShow += 5;
    }
    getCompanyInformation();
    offerControllerScope.companyInfo;
    function getCompanyInformation(comapanyId) { 
        companyInformationService.getCompanyInformation(comapanyId).then(function(res) {
        	console.log("company information",res)
            if (res.successflag == 'true' && res.results.length > 0) { 
                offerControllerScope.companyInfo = res.results[0];     
            } else {
            	offerControllerScope.companyInfo = { photo : '', icon : '' };  
            } 
        }, function(err) { 
        });
    }
    
    function addOffer(){
    	if(offerControllerScope.offer){
    		offerControllerScope.spinner = true;
   		 	commonService.formValNotManditory(offerControllerScope.offerForm, offerControllerScope.offer).then(function(data) {
                if (data) {
                    data.updatedBy = $localStorage.spheresuite.id;
            		data.offerDate = $filter('date')(data.offerDate, 'MMM dd, yyyy');
            		data.joiningDate = $filter('date')(data.joiningDate, 'MMM dd, yyyy');
                    offerService.addOffer(data).then(function(res){
                    	if(res.successflag == 'true'){
                    		decline();
                    		$location.path('/offers');
                    	}else{
               	    		offerControllerScope.spinner = false;
                    	}
                    },function(err){
           	    		offerControllerScope.spinner = false;
                    });
                }
   		 	},function (err){
   	    		offerControllerScope.spinner = false;
   		 	});
    	}
    }
    
    function decline(){
   		offerControllerScope.spinner = false;
   		if($location.path() == '/offer/edit'){
    		$location.path('/offer/view');
   		} else {
   			offerControllerScope.offer = null;
   			offerControllerScope.offerForm.$setPristine();
   			offerControllerScope.offerForm.$setUntouched();
   		}
    }
    
    function editOffer(){
    	if(offerControllerScope.offer){
    		offerControllerScope.spinner = true;
    		offerControllerScope.offer.updatedBy = $localStorage.spheresuite.id;
    		offerControllerScope.offer.offerDate = $filter('date')(offerControllerScope.offer.offerDate, 'MMM dd, yyyy');
    		offerControllerScope.offer.joiningDate = $filter('date')(offerControllerScope.offer.joiningDate, 'MMM dd, yyyy');
	        offerService.editOffer(offerControllerScope.offer).then(function(res){
	       	 if(res.successflag == 'true'){
	       		 decline();
		       	 offerControllerScope.spinner = false;
	       		 $location.path('/offers');
	       	 }else{
		       	 offerControllerScope.spinner = false;
	       	 }
	        },function(err){
	       	 offerControllerScope.spinner = false;
	        });
    	}
    }
    
    function exportData(){
    	$scope.fileName = $rootScope.headerMenu;
        $scope.exportData = [];
        // Headers:
        $scope.exportData.push(["Id", "Name", "CTC", "Customer Id", "Cutomer Name", "Approver", "Approver Id", "Offer Date", "Joining Date", "Designation", "Address", "Phone", "Requirement", "Requirement Id", "Project Id", "Project Name", "Status", "Comment", "Updated By", "Updated On"]);
        $scope.Filterdata = offerControllerScope.offerList;

        var firstFiter = $filter('filter')(offerControllerScope.offerList, { status : offerControllerScope.status });
        $scope.Filterdata = $filter('filter')(firstFiter, offerControllerScope.searchName);
        angular.forEach($scope.Filterdata, function(value, key) {
            $scope.exportData.push([value.id, value.name, value.cost, value.customerId, value.cutomerName, value.approver, value.approverId, value.offerDate, value.joiningDate, value.designation, value.address, value.phone, value.requirement, value.requirementId, value.projectId, value.projectName, value.status, value.comment, value.updatedBy, value.updatedon]);
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
    
    function getApprover(){
    	offerControllerScope.spinner = true;
    	configurationService.getDepartmentActive().then(function(res) {
        	if (res.successflag == 'true' && res.results.length > 0) {
                offerControllerScope.approverList = res.results;
            }
        	offerControllerScope.spinner = false;
        }, function(err) {
            offerControllerScope.spinner = false;
        });
    }
    
    function getCustomer(type){
    	offerControllerScope.spinner = true;
        leadService.getLeadByType(type).then(function(res) {
        	if (res.successflag == 'true' && res.results.length > 0) {
                offerControllerScope.customerList = res.results;
                offerControllerScope.spinner = false;
            } else {
                offerControllerScope.spinner = false;
            }
        }, function(err) {
            offerControllerScope.spinner = false;
        });
    }
    
    function getOffer(data){
    	offerControllerScope.msg = '';
		offerControllerScope.getSpinner = true;
        offerService.getOffer(data).then(function(res){
		   	 if(res.successflag == 'true' && res.results.length > 0){
		   		 if(data){
		   			 if($routeParams && $routeParams.empId){
		   				 getOpportunity(res.results[0].customerId);
		   				 getRequirement(res.results[0].projectId);
		   			 }
		   			 offerControllerScope.offer = res.results[0];
		   			 getRequirement(res.results[0].projectId);
		   		 }else{

	                    offerControllerScope.offerListBackup = angular.copy(res.results);
	                    offerControllerScope.isDataAvailable = true;

	                	for(var i = 0; i < offerControllerScope.offerListBackup.length; i++){
	                    	offerControllerScope.offerListBackup[i].isActiveClass = false;
	                    	offerControllerScope.offerListBackup[i].isSelect = false;
	                	}

	                    offerControllerScope.offerList =  angular.copy(offerControllerScope.offerListBackup);
	                	if((offerControllerScope.buttonBeginFrom + offerControllerScope.buttonLimitToShow) * offerControllerScope.buttonLimitToShow >= offerControllerScope.offerList.length)
	                		offerControllerScope.isNextDisabled = true;
	                	
	                	offerControllerScope.offerList[0].isActiveClass = true;
		   		 }
		       	 offerControllerScope.getSpinner = false;
		   	 }else{
		 		offerControllerScope.msg = 'Offer Not Available';
		       	 offerControllerScope.getSpinner = false;
		   	 }
        },function(err){
     		offerControllerScope.msg = 'Offer Not Available';
     		offerControllerScope.getSpinner = false;
        });
    }
    
    function getOpportunity(data){
    	offerControllerScope.projectList ='';
    	if(offerControllerScope.offer && offerControllerScope.offer.projectId){
    		offerControllerScope.offer.projectId = '';
    	}
    	if(offerControllerScope.offer && offerControllerScope.offer.requirementId){
    		offerControllerScope.offer.requirementId = '';
    	}
    	offerControllerScope.spinner = true;
        opportunityService.getOpportunity(data).then(function(res) {
        	if (res.successflag == 'true' && res.results.length > 0) {  
        		offerControllerScope.projectList = res.results;  
        		console.log("offerControllerScope.projectList",offerControllerScope.projectList)
        		offerControllerScope.spinner = false;
        	}else{
        		offerControllerScope.spinner = false;
        	}
        },function(err){
            offerControllerScope.spinner = false;
        });
    }
    
    function getRequirement(projectId){ 
    	offerControllerScope.requirementList = '';
    	if(offerControllerScope.offer && offerControllerScope.offer.requirementId){
    		offerControllerScope.offer.requirementId = '';
    	} 
    	if(projectId) {
			offerControllerScope.spinner = true;
	    	var data = {projectId: projectId};
	        requirementService.getRequirement(data).then(function(res){
	        	console.log("res for requiremnet",res)
			   	 if(res.successflag == 'true' && res.results.length > 0){
			   		 offerControllerScope.requirementList = res.results;
			   	 }
			     offerControllerScope.spinner = false;
	        },function(err){
	     		offerControllerScope.spinner = false;
	        }); 
    		
    	}
    }
    
    function gotoEdit(){
    	$location.path('/offer/edit');
    }
    
    function gotoView(id){
    	if(id){
    		$localStorage.spheresuite.offerId = id;
    		$location.path('/offer/view');
    	}else{
    		$location.path('/offers');
    	}
    }

    function openJoiningDateCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        offerControllerScope.isOpenJoiningDate = !offerControllerScope.isOpenJoiningDate;
    }
    
    function openOfferDateCalender($event) {
        $event.preventDefault();
        $event.stopPropagation();
        offerControllerScope.isOpenOfferDate = !offerControllerScope.isOpenOfferDate;
    }
    
    
    
    $rootScope.limitToShow = 10;
    $rootScope.beginFrom = 0;
//	var id = [];
    
    offerControllerScope.buttonLimitToShow = angular.copy($rootScope.limitToShow);
    offerControllerScope.buttonBeginFrom = 0;
//	offerControllerScope.isCannotDelete = false;
	offerControllerScope.isNextDisabled = false;
//	offerControllerScope.isSingleRecordToDelete = false;
	
//	offerControllerScope.closeModal = closeModal;
//    offerControllerScope.deleteRequirement = deleteRequirement;
    offerControllerScope.gotoPage = gotoPage;
	offerControllerScope.searchMe = searchMe;
	offerControllerScope.showPrevNav = showPrevNav;
    offerControllerScope.showNextNav = showNextNav;
    offerControllerScope.toggleSelect = toggleSelect;
//    offerControllerScope.showDelete = showDelete;
    
//    function showDelete(){
//    	offerControllerScope.spinner = true;
//    	offerControllerScope.isSingleRecordToDelete = false;
//		offerControllerScope.isCannotDelete = false;
//    	var filteredData = $filter('orderBy')(offerControllerScope.requirementList, '-id');
//    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
//    	if(offerControllerScope.search)
//    		filteredData = $filter('filter')(filteredData, offerControllerScope.search);
//    	if(offerControllerScope.searchName)
//    		filteredData = $filter('filter')(filteredData, offerControllerScope.searchName);
//		id = [];
//    	for(var i = 0; i < filteredData.length; i++){
//    		if(filteredData[i].isSelect){
//    			id.push({id:filteredData[i].id});
//    		}
//    	}
//		console.log('id',JSON.stringify(id));
//    	if(id.length > 0){
//    		if(id.length == 1){
//    			offerControllerScope.isSingleRecordToDelete = true;
//    		}
//    		offerControllerScope.spinner = false;
//    		$('#confirmation').modal('show');
//    	}else{
//    		offerControllerScope.spinner = false;
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
//    		offerControllerScope.isCannotDelete = false;
//    		requirementService.deleteRequirement(id).then(function(res){
//    			console.log('deleteLead res',res);
//    			if(res.successflag == 'true'){
//    				$('#confirmation').modal('hide');
//    				getLead({ type: $scope.type });
//    			}else{
//    				$('#confirmation').modal('hide');
//					if(offerControllerScope.isSingleRecordToDelete){
//						offerControllerScope.isSingleRecordToDelete = false;
//    		    		offerControllerScope.isCannotDelete = true;
//	    				setTimeout(function(){
//	        		    		offerControllerScope.isCannotDelete = true;
//	            				$('#confirmation').modal('show');
//	    				},1000);
//    				}
//    				
//    					
//    	    		offerControllerScope.spinner = false;
//    			}
//        		offerControllerScope.isSelect = false;
//    		}, function(err){
//        		offerControllerScope.spinner = false;
//    		});
//    	}
//    	
//    }
    
    function gotoPage(index, activeIndex){
    	$rootScope.beginFrom = index;
    	for(var i = 0; i < offerControllerScope.offerList.length; i++){
        	console.log(' data[i].isActiveClass', offerControllerScope.offerList[i].isActiveClass);
        	offerControllerScope.offerList[i].isActiveClass = false;
    	}
    	if(!activeIndex)
    		activeIndex = index
    	offerControllerScope.offerList[activeIndex].isActiveClass = true;
    	console.log('index',index, offerControllerScope.offerList[index].isActiveClass);
    }
    
    function searchMe(ifMobile){
    	var canEnter = false;
    	offerControllerScope.isNextDisabled = false;
    	for (var item in offerControllerScope.search){
    		if(offerControllerScope.search[item] != ''){
    			canEnter = true;
    		} 
    	}
    	if(ifMobile && offerControllerScope.searchName != ''){
    		offerControllerScope.offerList = $filter('filter')(offerControllerScope.offerListBackup, offerControllerScope.searchName)
    	}else if(canEnter){
    		offerControllerScope.offerList = $filter('filter')(offerControllerScope.offerListBackup, offerControllerScope.search);
    	}else {
    		offerControllerScope.offerList = angular.copy(offerControllerScope.offerListBackup);
    	}
    	$rootScope.beginFrom = 0;
    	for(var i = 0; i < offerControllerScope.offerList.length; i++){
        	offerControllerScope.offerList[i].isActiveClass = false;
        	offerControllerScope.offerList[i].isSelect = offerControllerScope.isSelect;
    	}
    	if(offerControllerScope.offerList[0])
    		offerControllerScope.offerList[0].isActiveClass = true;
    	if((offerControllerScope.buttonBeginFrom + offerControllerScope.buttonLimitToShow) * offerControllerScope.buttonLimitToShow >= offerControllerScope.offerList.length)
    		offerControllerScope.isNextDisabled = true;
    }
    
    function showPrevNav(){
		offerControllerScope.buttonBeginFrom -= offerControllerScope.buttonLimitToShow;
    	gotoPage(offerControllerScope.buttonBeginFrom)
		offerControllerScope.isNextDisabled = false;
	}
	
	function showNextNav(){
		offerControllerScope.buttonBeginFrom += offerControllerScope.buttonLimitToShow;
		gotoPage(offerControllerScope.buttonBeginFrom)
		if((offerControllerScope.buttonBeginFrom + offerControllerScope.buttonLimitToShow) * offerControllerScope.buttonLimitToShow >= offerControllerScope.offerList.length)
			offerControllerScope.isNextDisabled = true;
	}
    

    function toggleSelect(isSelect){
    	offerControllerScope.spinner = true;
    	var filteredData = $filter('orderBy')(offerControllerScope.offerList, '-id');
    	filteredData = $filter('limitTo')(filteredData, $rootScope.limitToShow, $rootScope.beginFrom);
    	if(offerControllerScope.search)
    		filteredData = $filter('filter')(filteredData, offerControllerScope.search);
    	if(offerControllerScope.searchName)
    		filteredData = $filter('filter')(filteredData, offerControllerScope.searchName);
    	for(var i = 0; i < filteredData.length; i++){
    		filteredData[i].isSelect = isSelect;
    	}
    	console.log('toggleSelect',filteredData)
    	offerControllerScope.spinner = false; 		
    }
    
    
    
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };
   
    
    $('.select1').select2();
    var doc = new jsPDF(); 
    offerControllerScope.pdf = pdf;
    offerControllerScope.pdfCreate = pdfCreate;
   offerControllerScope.pdfPrint = pdfPrint;
    
    function pdf(offer){
		var imgData = offerControllerScope.companyInfo.photo;
//		var footerImage = "data:image/png;base64,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4rd85gfCx2dh7W5th52LZ8NOOa6+w+3nHXHF2VfR9sJzzWs2Xekdb3Ws7rk4P65rrebbRbOtlflaiIOonm6+jYbQKj83LP3djsf5LNzfWg+XOrcUv54/SZ5CgAABAgTGICD4GkMVzYEAAQIECKwgYBvVCljf86Vdh9t/z0NreHzL2y2P3kCNiAABAgQIEJiQgOBrQsU2VQIECBAgUAgIvo7POji6wVd9y6d1dXzWlZESIECAAIEpCQi+plRtcyVAgAABAoKvY7UGjm7wtTz8fr0SdSbVsVpbBkuAAAECBKYiIPiaSqXNkwABAgQIECBAgAABAgQIECAwMQHB18QKbroECBAgQIAAAQIECBAgQIAAgakICL6mUmnzJECAAAECBAgQIECAAAECBAhMTEDwNbGCmy4BAgQIECBAgAABAgQIECBAYCoCgq+pVNo8CRAgQIAAAQIECBAgQIAAAQITExB8TazgpkuAAAECBAgQIECAAAECBAgQmIqA4GsqlTZPAgQIECBAgAABAgQIECBAgMDEBARfEyu46RIgQIAAAQIECBAgQIAAAQIEpiIg+JpKpc2TAAECBAgQIECAAAECBAgQIDAxAcHXxApuugQIECBAgAABAgQIECBAgACBqQgIvqZSafMkQIAAAQIECBAgQIAAAQIECExMQPA1sYKbLgECBAgQIECAAAECBAgQIEBgKgKCr6lU2jwJECBAgAABAgQIECBAgAABAhMTEHxNrOCmS4AAAQIECBAgQIAAAQIECBCYioDgayqVNk8CBAgQIECAAAECBAgQIECAwMQEBF8TK7jpEiBAgAABAgQIECBAgAABAgSmIiD4mkqlzZMAAQIECBAgQIAAAQIECBAgMDEBwdfECm66BAgQIECAAAECBAgQIECAAIGpCKw9fPjw1VQma54ECBAgQIAAAQIECBAgQIAAAQLTEfg/c/qDf3P5QKYAAAAASUVORK5CYII=";
var year = new Date().getFullYear();
        doc.addImage(imgData, 'JPEG',160,5,45,9); 
        doc.setFontSize(13);
		doc.setTextColor(100);
		doc.setFontStyle("times"); 
		doc.setDrawColor(100);
		doc.line(0, 280, 280, 280);
		doc.text(75,285,offerControllerScope.companyInfo.name +"  "+ year  +" " + offerControllerScope.companyInfo.address1 +','+  offerControllerScope.companyInfo.city); 
    	this.pdfCreate(offer,true);
    }
  
    function pdfPrint(offer) {
    	this.pdfCreate(offer,false);
    	
    }
    
    function pdfCreate (offer,ispdf)  { 
		var addresssplit = offer.address;
		if(offer.address){
			var data = addresssplit.split(" ");
			var store =[];
			for(var i=0;i<data.length;i++){
			  store.push(data[i]);
			}
		}
		
		  var display = " <p style='color:#585858;text-align:justify; line-height:20px'> Congratulations! on being selected for the position of <b>"+offer.designation+"</b> at  "+offerControllerScope.companyInfo.name+". Your gross compensation will be <b>Rs."+offer.cost+"</b>  and the full breakup is presented in<b> Annexure A </b>.</p>";
		                
 	                   var date = new Date();
  	                   var newDate = $filter('date')(date, 'mediumDate');
						doc.setFontSize(13);
						doc.setTextColor(100);
						doc.setFontStyle("times");                
						doc.setDrawColor(100);
//						doc.line(0, 20, 220, 20);
						doc.setFontSize(12);
						doc.setFontStyle("bolditalic");
						doc.text(10, 30,offer.name);
						doc.setFontSize(11);
						doc.setFontStyle("times");
						doc.text(10, 35,store[0]  || "");
						doc.text(10, 40,store[1] +' '+ store[2]|| "");
							doc.text(10, 45,store[3] || ''); 
						doc.text(10, 50,"Mobile:" + offer.phone); 
//
						doc.text(170, 25, "Date: " + newDate); 
					    doc.fromHTML("<p style='color:#585858;text-align:justify;word-break:break-all;line-height:20px' >We take great pleasure in inviting you to be an integral part of "+offerControllerScope.companyInfo.name+".</p>", 10, 55, { 
					          'width': 192,
					          'elementHandlers': specialElementHandlers
					        });
					    doc.fromHTML("<p style='color:#585858; line-height:20px'> Congratulations! on being selected for the position of <b>" +offer.designation+"</b> at  "+offerControllerScope.companyInfo.name+". Your gross compensation will be <b>Rs."+offer.cost+"</b>  and the full breakup is presented in<b> Annexure A </b>.</p>", 10, 65, { 
					          'width':192,
					          'elementHandlers': specialElementHandlers
					        });
					    doc.fromHTML("<p style='color:#585858;text-align:justify;word-break:break-all;line-height:20px' >Your place of posting will be Bangalore. You will, however, be required to work at other locations as directed by project and business requirements. Your appointment will be governed by the terms and conditions of "+offerControllerScope.companyInfo.name+".</p>", 10, 80, { 
					          'width': 192,
					          'elementHandlers': specialElementHandlers
					        });  
					    doc.fromHTML("<p style='color:#585858;text-align:justify;word-break:break-all;line-height:20px' >I attach two copies of this offer that I have  signed on behalf of the Company. If this offer is acceptable to you, please sign both copies of the contract, write in the start date and return one in the self addressed envelope to     us no later than on or before <b><i>"+offer.joiningDate+"</i></b>.</p>", 10, 100, { 
					          'width': 192,
					          'elementHandlers': specialElementHandlers
					        });  
					    doc.fromHTML("<p style='color:#585858;text-align:justify;word-break:break-all;line-height:20px' >We kindly request you to provide us with a start date no later than one month from the date of receiving this offer letter. At the time of joining, please submit all the original documents requested by the company. Please note that this offer is conditional upon satisfactory references and checks.</p>", 10, 120, { 
					          'width': 192,
					          'elementHandlers': specialElementHandlers
					        }); 
					    doc.fromHTML("<p style='color:#585858;text-align:justify; word-break:break-all;line-height:15px' >We look forward to you joining us. Please do not hesitate to call us if you need further information.</p>", 10, 140, { 
					          'width': 192,
					          'elementHandlers': specialElementHandlers
					        });  
					    

						doc.text(10,160, "Yours Sincerely, ");
						doc.setFontSize(12); 
						doc.setFontStyle("bolditalic");
						doc.text(10,165,offerControllerScope.companyInfo.name); 

						doc.setFontSize(12); 
						doc.setFontStyle("times");
						doc.text(10,185,"Authorized Signatory"); 
						if(ispdf){ 
							doc.save( offer.name + '.pdf');
						} else { 
							doc.autoPrint();
							window.open(doc.output('bloburl'), '_blank');
						}
						
						doc = new jsPDF();
					};



}