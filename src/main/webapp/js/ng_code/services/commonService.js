angular
    .module('spheresuite')
    .factory('commonService', commonService);

commonService.$inject = ['$q', '$http','$rootScope','Upload'];

function commonService($q, $http, $rootScope, Upload) {
	
    var commonService = {
        apiCall: apiCall,
        formValNotManditory: formValNotManditory,
        httpCallGetAll: httpCallGetAll,
        httpCallGetById: httpCallGetById,
        httpCallForUploadingImage: httpCallForUploadingImage
    };

    return commonService;

    function apiCall(uri, data) {
        var deferred = $q.defer();
        if(data){
        	uri= $rootScope.appUrl + uri;
        	if (data.hasOwnProperty("$$hashKey")) {
        		delete data['$$hashKey'];
        	}
    		data = JSON.stringify(data);
            httpCall(uri, data).then(function(res) {
                deferred.resolve(res);
            }, function(error) {
                deferred.reject(error);
            });
        }else {
        	deferred.reject({msg: 'Data is undefined'});
        }
	    return deferred.promise;
    }

      function httpCall(uri, data, getAll) {
        var deferred = $q.defer();
        if(data){ 
            uri = uri +'?inputParam='+ encodeURIComponent(data);
            console.log('httpCall uri',uri)
            $http({
                method: "POST",
                url: uri,
            }).then(function(response) { 
                deferred.resolve(response.data.response);
            }, function(error) { 
                deferred.reject(error);
            }); 
        } else deferred.reject({
            msg: 'Data is undefined'
        });
        return deferred.promise;
    }
    
      function httpCallForUploadingImage(uri, data) {
    	  var deferred = $q.defer();
          uri = $rootScope.appUrl + uri;
          console.log('image uri',uri);
          Upload.upload({
              url: uri,
              data: {file: data.photo, id: data.id, name: data.name}
          }).then(function (resp) {
              deferred.resolve(resp.data);
          }, function (resp) {
              deferred.resolve(resp.status);
          }, function (evt) {
              deferred.resolve(evt);
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          }, function (err) {
              deferred.reject(err);
          });
          return deferred.promise;
      }
      
    function httpCallGetAll(uri) {
    	uri= $rootScope.appUrl + uri;
    	console.log("get all",uri)
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: uri
        }).then(function(response) {  
            deferred.resolve(response.data.response);
        }, function(error) { 
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function httpCallGetById(uri, data) {
        var deferred = $q.defer();
        if (data) {
            data = JSON.stringify(data);
        	uri = $rootScope.appUrl + uri + data; 
            console.log('httpCallGetById uri',uri)
            $http({
                method: "GET",
                url: uri
            }).then(function(response) {
                deferred.resolve(response.data.response);
            }, function(error) {
                deferred.reject(error);
            });
        } else deferred.reject({
            msg: 'Data is undefined'
        });
        return deferred.promise;
    }
    
    function formValNotManditory(formName, data) {
        var deferred = $q.defer();
        if (formName, data) {
            angular.forEach(formName.$$element[0].elements, function (element) {
            	if( data[element.name] == null)
            	if ((!data.hasOwnProperty(element.name) && element.name!='') || ((data[element.name] == undefined || data[element.name] == null) && element.name!='') )
            		data[element.name] = '';        	
            });
        	delete data[''];
            deferred.resolve(data);
        }
        return deferred.promise;
    }
}