/*
    Created by jebat on 26/10/2015
    Last updated by jebat on 01/12/2015
    
    Description:
    This factory is a Model's basic actions for BajuNiaga that should will hold
    the associated Model's CRUD impelementation.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').factory('CRUD', ['$log','Auth','$resource','$http','$httpParamSerializer',function($log,Auth,$resource,$http,$httpParamSerializer){
    
    // Test callback if callback is a function
    function runCallback( callback, data ){
        if(typeof callback === 'function') callback(data);
    }
    
    return {
        create: function(model, params, callbackSucess, callbackFail){
            // Populate Database
            // Get only keys and values in model.properties
            var json = {};
            if(Auth.authentication.token){
                json['APIToken'] = Auth.authentication.token;
            }
            
            angular.forEach(model.properties, function(v, k){
                json[k] = v.value;
            });
            angular.forEach(params, function(v,k){
                json[k] = v.value;
            });
            
            // Initialize $resource for POST
            var Resource = $resource(model.resourceLink, {}, {
                save: {
                    method  : 'POST',
                    transformRequest: function (data) {
                        $log.info('CRUDFactory.create() returns $httpParamSerializer(data): ', $httpParamSerializer(data));
                        return $httpParamSerializer(data);
                    },
                    headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
                }
            });
            
            // Save the json data
            $log.info('Initiate CRUD.create() with json:', json);
            Resource.save(json, 
                function(sucessData){
                    runCallback(callbackSucess, sucessData);
                },
                function(failData){
                    runCallback(callbackFail, failData);
                });
        },
        
        read: function(model, params, callbackSucess, callbackFail){
            if(Auth.authentication.token){
                if(!params) params = {};
                params['APIToken'] = Auth.authentication.token;
            }
            
            // Read from Database
            var Resource = $resource(model.resourceLink, {}, {
                get : {
                    method  : 'GET',
                    isArray : true,
                    transformRequest: function (data) {
                        $log.info('CRUDFactory.read() returns $httpParamSerializer(data): ', $httpParamSerializer(data));
                        return $httpParamSerializer(data);
                    },
                    headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
                }
            });
            
            $log.info('Initiate CRUD.read() with params:', params);
            Resource.get(params,
                function(sucessData){
                    // If there is only one data in sucessData array, then just dump into one model
                    if(sucessData.length === 1){
                        
                        // Populate Model
                        angular.forEach(sucessData[0].properties, function(value, key){
                            model.properties[key] = value;
                            try{
                                model.properties[key].value = JSON.parse(model.properties[key].value);
                            }catch(SyntaxError){
                                // Do nothing. Because value is not JSON type.
                            }
                        });
                        model.initialized = true;
                    }
                    
                    // More than one data in the sucessData array
                    else{}
                    
                    runCallback(callbackSucess, sucessData);
                },
                function(failData){
                    runCallback(callbackFail, failData);
                });
                
            // TODO: Listen to updates on Database then update Model to reflect on template
        },
        
        update: function(model, params, callbackSucess, callbackFail){
            if(Auth.authentication.token){
                if(!params) params = {};
                params['APIToken'] = Auth.authentication.token;
            }
            
            // Initialize from Database
            var Resource = $resource(model.resourceLink, {}, {
                put : {
                    method  : 'PUT',
                    transformRequest: function (data) {
                        $log.info('CRUDFactory.update() returns $httpParamSerializer(data): ', $httpParamSerializer(data));
                        return $httpParamSerializer(data);
                    },
                    headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
                }
            });
            
            $log.info('Initiate CRUD.update() with params:', params);
            Resource.put(params,
                function(sucessData){
                    runCallback(callbackSucess, sucessData);
                },
                function(failData){
                    runCallback(callbackFail, failData);
                });
        },
        
        remove: function(model, params, callbackSucess, callbackFail){
            if(Auth.authentication.token){
                if(!params) params = {};
                params['APIToken'] = Auth.authentication.token;
            }
            
            // Initialize from Database
            // Use $http insted of $resource because angular ignores body in method delete 
            // thus there will be no data send to transformRequest()
            $log.info('Initiate CRUD.remove() with params:', params);
            $http({ 
                url     : model.resourceLink,
                method  : 'DELETE',
                transformRequest: function(data){
                    $log.info('CRUDFactory.remove() returns $httpParamSerializer(data): ', $httpParamSerializer(data));
                    return $httpParamSerializer(data);
                },
                data    : params,
                headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
            }).then(
                function(sucessData){
                    runCallback(callbackSucess, sucessData);
                },
                function(failData){
                    runCallback(callbackFail, failData);
                });
        },
        
        options: function(model, params, callbackSucess, callbackFail){
            if(!model.initialized){
                if(Auth.authentication.token){
                    if(!params) params = {};
                    params['APIToken'] = Auth.authentication.token;
                }
                
                // Initialize from Database
                var Resource = $resource(model.resourceLink, {}, {
                    options : {
                        method  : 'OPTIONS',
                        transformRequest: function (data) {
                            $log.info('CRUDFactory.options() returns $httpParamSerializer(data): ', $httpParamSerializer(data));
                            return $httpParamSerializer(data);
                        },
                        headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
                    }
                });
                
                $log.info('Initiate CRUD.options() with params:', params);
                Resource.options(params,
                    function(sucessData){
                        if(!model.initialized){
                            // Populate Model
                            angular.forEach(sucessData.properties, function(value, key){
                                model.properties[key] = value;
                                try{
                                    model.properties[key].value = JSON.parse(model.properties[key].value);
                                }catch(SyntaxError){
                                    // Do nothing. Because value is not JSON type.
                                }
                            });
                            model.initialized = true;
                        }
                        runCallback(callbackSucess, sucessData);
                    },
                    function(failData){
                        runCallback(callbackFail, failData);
                    });
            }
        }
    };
}]);