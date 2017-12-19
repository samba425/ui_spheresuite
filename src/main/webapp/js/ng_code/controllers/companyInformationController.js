angular
    .module('spheresuite')
    .controller('companyInformationController', companyInformationController);

companyInformationController.$inject = ['$scope', '$rootScope', '$localStorage', 'companyInformationService', 'configurationService', 'commonService','Upload'];

function companyInformationController($scope, $rootScope, $localStorage, companyInformationService, configurationService, commonService,Upload) {

    var companyInformationControllerScope = this;

    $rootScope.headerMenu = "Company Information";

    companyInformationControllerScope.countryList;
    companyInformationControllerScope.companyInfo;
    companyInformationControllerScope.companyInfoBackUp;
    companyInformationControllerScope.companyInfoForm;
    companyInformationControllerScope.isAdd = true;
    companyInformationControllerScope.isDisabled = false;
    companyInformationControllerScope.isEdit = false;
    companyInformationControllerScope.industryList;
    companyInformationControllerScope.stateList;
    companyInformationControllerScope.spinner = false;

    companyInformationControllerScope.addCompanyInformation = addCompanyInformation;
    companyInformationControllerScope.changePhoto = changePhoto;
    companyInformationControllerScope.decline = decline;
    companyInformationControllerScope.declineAdd = declineAdd;
    companyInformationControllerScope.editCompanyInformation = editCompanyInformation;
    companyInformationControllerScope.getCompanyInformation = getCompanyInformation;
    companyInformationControllerScope.getCountry = getCountry;
    companyInformationControllerScope.getIndustry = getIndustry;
    companyInformationControllerScope.getState = getState;
    companyInformationControllerScope.hideOption = hideOption;
    companyInformationControllerScope.showEditField = showEditField;
    companyInformationControllerScope.clearimage =clearimage;
    companyInformationControllerScope.dismiss = dismiss;
    companyInformationControllerScope.clearicon =clearicon;
    companyInformationControllerScope.changeicon =changeicon;

    getCompanyInformation();
    getCountry();
    getIndustry();

    function addCompanyInformation() {      
            companyInformationControllerScope.spinner = true;
            var pic;
            var icon;
        	if(companyInformationControllerScope.companyInfo.photo && companyInformationControllerScope.companyInfo.photo != ''){
        		console.log("companyInformationControllerScope.companyInfo.photo",companyInformationControllerScope.companyInfo.photo)
        		pic = angular.copy(companyInformationControllerScope.companyInfo.photo);
        		delete companyInformationControllerScope.companyInfo['photo'];
        	}
        	if(companyInformationControllerScope.companyInfo.icon && companyInformationControllerScope.companyInfo.icon != ''){
        		icon = angular.copy(companyInformationControllerScope.companyInfo.icon);
        		delete companyInformationControllerScope.companyInfo['icon'];
          	}
//        	if(companyInformationControllerScope.companyPic && companyInformationControllerScope.companyPic != ''){
//        		pic = angular.copy(companyInformationControllerScope.companyPic);
//                delete companyInformationControllerScope.companyInfo['photo'];
//        	}
//            if(companyInformationControllerScope.companyicon && companyInformationControllerScope.companyicon != ''){
//        		icon = angular.copy(companyInformationControllerScope.companyicon);
//
//        		delete companyInformationControllerScope.companyInfo['icon'];
//        	}
            commonService.formValNotManditory(companyInformationControllerScope.companyInfoForm, companyInformationControllerScope.companyInfo).then(function(data) {
                if (data) {
                    if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                        data.updatedBy = $localStorage.spheresuite.id;
                    }
                    console.log("data",data)
                    companyInformationService.addCompanyInformation(data).then(function(res) {
                    	console.log("res",res)
                        if (res.successflag == 'true' && res.results != '') {
                        	console.log('icon data', icon);
                        	console.log('pic data', pic)
                        	if(icon)
                        		changeicon(icon);
                        /*	if(pic)
                        		changePhoto(pic);*/
                           
                            companyInformationControllerScope.isDisabled = true;
                            companyInformationControllerScope.spinner = false;
                        } else {
                            companyInformationControllerScope.isAdd = true;
                            companyInformationControllerScope.isEdit = false;
                            companyInformationControllerScope.spinner = false;
                        }
                    }, function(err) {
                        companyInformationControllerScope.isAdd = true;
                        companyInformationControllerScope.isEdit = false;
                        companyInformationControllerScope.spinner = false;
                    });
                }else{
                    companyInformationControllerScope.spinner = false;
                }
            });
    }
    
    function changePhoto(photo){
    	if(photo){
            companyInformationControllerScope.spinner = true;
            if(companyInformationControllerScope.companyInfo.id){
            	console.log("companyInformationControllerScope.companyInfo",companyInformationControllerScope.companyInfo.id)
            	 id = companyInformationControllerScope.companyInfo.id;
            } else{
            	 id = '';
            } 
            var data={
            		photo: photo,
            		id:  id
            };
                     
            companyInformationService.changePhoto(data).then(function(res){
                companyInformationControllerScope.spinner = false;  
                decline();
            },function(err){
                companyInformationControllerScope.spinner = false;
            });
    	}
    }
    function changeicon(icon){
    	if(icon){
            companyInformationControllerScope.spinner = true;
            if(companyInformationControllerScope.companyInfo.id){
            	 id = companyInformationControllerScope.companyInfo.id;
            }else{
            	 id = '';
            }  
            var data ={
            		photo  : icon,
            		id :  id
            };
                   
            companyInformationService.changeicon(data).then(function(res){
                companyInformationControllerScope.spinner = false; 
                decline();
            	
            },function(err){
                companyInformationControllerScope.spinner = false;
            });
    	}
    }
    
    function decline() {
    	getCompanyInformation();
        companyInformationControllerScope.companyInfoForm.$setPristine();
        companyInformationControllerScope.companyInfoForm.$setUntouched();
        if(!companyInformationControllerScope.isDisabled && !companyInformationControllerScope.isEdit){
            companyInformationControllerScope.companyInfo = angular.copy(companyInformationControllerScope.companyInfoBackUp);
        }
        companyInformationControllerScope.isEdit = true; 
        companyInformationControllerScope.isAdd = false;
        companyInformationControllerScope.spinner = false;
    }
    
    function declineAdd() { 
        companyInformationControllerScope.companyInfoForm.$setPristine();
        companyInformationControllerScope.companyInfoForm.$setUntouched(); 
        companyInformationControllerScope.companyInfo  = { panno : '', tanno : '',city: '', zip : '' };
        companyInformationControllerScope.companyInfo.photo ='';
        companyInformationControllerScope.companyInfo.icon ='';
        companyInformationControllerScope.companyPic = '';
        companyInformationControllerScope.companyicon = '';
    }
    
    function editCompanyInformation() {
    	  companyInformationControllerScope.isEdit = true;
        if (companyInformationControllerScope.companyInfo) { 
            companyInformationControllerScope.spinner = true;
            var pic;
            var icon;
        	if(companyInformationControllerScope.companyInfo.photo && companyInformationControllerScope.companyInfo.photo != ''){
        		pic = angular.copy(companyInformationControllerScope.companyInfo.photo);
        		delete companyInformationControllerScope.companyInfo['photo'];
        	}
        	if(companyInformationControllerScope.companyInfo.icon && companyInformationControllerScope.companyInfo.icon != ''){
        		icon = angular.copy(companyInformationControllerScope.companyInfo.icon);
        		delete companyInformationControllerScope.companyInfo['icon'];
        	}
            commonService.formValNotManditory(companyInformationControllerScope.companyInfoForm, companyInformationControllerScope.companyInfo).then(function(data) {
                if (data) {
                    if ($localStorage.spheresuite && $localStorage.spheresuite.id) {
                        data.updatedBy = $localStorage.spheresuite.id;
                    }
                    companyInformationService.editCompanyInformation(data).then(function(res) { 
                        if (res.successflag == 'true') {
                        	if(pic)
                        	changePhoto(pic);   
                        	/*if(icon)
                            	changeicon(icon);  */
                        }
                        decline();
                        companyInformationControllerScope.spinner = false;
                    }, function(err) {
                        companyInformationControllerScope.spinner = false;
                    });
                }else{
				    companyInformationControllerScope.spinner = false;
				}
            });
        }
    }
 
    function getCompanyInformation(comapanyId) {
        companyInformationControllerScope.Companyspinner = true;
        companyInformationService.getCompanyInformation(comapanyId).then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                getState(res.results[0].country);
                companyInformationControllerScope.companyInfo = res.results[0];    
                companyInformationControllerScope.isAdd = false;
                companyInformationControllerScope.isEdit = true;
                companyInformationControllerScope.isDisabled = true; 
                companyInformationControllerScope.Companyspinner = false;
            } else {
            	companyInformationControllerScope.companyInfo = { photo : '', icon : '' }; 
                companyInformationControllerScope.isAdd = true;
                companyInformationControllerScope.isEdit = false;
                companyInformationControllerScope.icon = true; 
            }
            companyInformationControllerScope.Companyspinner = false;
        }, function(err) {
            companyInformationControllerScope.Companyspinner = false;
        });
    }

    function getCountry() {
        companyInformationControllerScope.spinner = true;
        configurationService.getCountry().then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                companyInformationControllerScope.countryList = res.results;
                companyInformationControllerScope.spinner = false;
            } else {
                companyInformationControllerScope.spinner = false;
            }
        }, function(err) {
            companyInformationControllerScope.spinner = false;
        });
    }

    function getIndustry(data) {
        companyInformationControllerScope.spinner = true;
        configurationService.getIndustryType(data).then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                companyInformationControllerScope.industryList = res.results;
                companyInformationControllerScope.spinner = false;
            } else {
                companyInformationControllerScope.spinner = false;
            }
        }, function(err) {
            companyInformationControllerScope.spinner = false;
        });
    }

    function getState(country) {
        configurationService.getState(country).then(function(res) {
            if (res.successflag == 'true' && res.results.length > 0) {
                companyInformationControllerScope.stateList = res.results;
                companyInformationControllerScope.spinner = false;
            } else {
                companyInformationControllerScope.spinner = false;
            }
        }, function(err) {
            companyInformationControllerScope.spinner = false;
        });
    }

    function showEditField() {
        companyInformationControllerScope.isEdit = false;
        companyInformationControllerScope.isDisabled = false;
        companyInformationControllerScope.companyInfoBackUp = angular.copy(companyInformationControllerScope.companyInfo);
    }

    function hideOption(field) {
        field.hideOptionValue = !field.hideOptionValue;
    }

    $("#select1").select2();
    $("#select2").select2();
    $("#select3").select2();
    $("#select4").select2();
    
    companyInformationControllerScope.myImage = '';
    companyInformationControllerScope.myIcon = '';  
    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
        	companyInformationControllerScope.myImage = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    
    
    var handleFileSelect1=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
          	companyInformationControllerScope.myIcon = evt.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput1')).on('change',handleFileSelect1);
      
    function clearimage() {
   	 companyInformationControllerScope.companyInfo.photo   = companyInformationControllerScope.companyPic = companyInformationControllerScope.myImage;
    	 companyInformationControllerScope.myImage=''; 
   	 $("#fileInput").val('');
   }
    function clearicon() {
      	 companyInformationControllerScope.companyInfo.icon = companyInformationControllerScope.companyicon  = companyInformationControllerScope.myIcon;
      	 companyInformationControllerScope.myIcon=''; 
      	 $("#fileInput").val('');
      }
    
    function dismiss() {
   	 companyInformationControllerScope.myImage=''; 
   	 companyInformationControllerScope.myIcon=''; 
   	 $("#fileInput").val('');
   }
   
     
     
}