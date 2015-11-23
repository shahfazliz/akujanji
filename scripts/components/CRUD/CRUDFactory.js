/*
    Created by jebat on 26/10/2015
    Last updated by jebat on 22/11/2015
    
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
        create: function(model, callbackSucess, callbackFail){
            
            // Populate Database
            // Get only keys and values in model.properties
            var json = {
                APIToken : Auth.authentication.token
            };
            angular.forEach(model.properties, function(v, k){
                json[k] = v.value;
            });
            
            // Initialize $resource for POST
            var Resource = $resource(model.resourceLink, {}, {
                save: {
                    method  : 'POST',
                    transformRequest: function (data) {
                        $log.info('$httpParamSerializer(data): ', $httpParamSerializer(data));
                        return $httpParamSerializer(data);
                    },
                    headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
                }
            });
            
            // Save the json data
            Resource.save(json, 
                function(sucessData){
                    runCallback(callbackSucess, sucessData);
                },
                function(failData){
                    runCallback(callbackFail, failData);
                });
        },
        
        read: function(model, params, callbackSucess, callbackFail){
            // Read from Database
            var Resource = $resource(model.resourceLink, {}, {
                get : {
                    method  : 'GET',
                    transformRequest: function (data) {
                        $log.info('$httpParamSerializer(data): ', $httpParamSerializer(data));
                        return $httpParamSerializer(data);
                    },
                    headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
                }
            });
            
            Resource.get(params,
                function(sucessData){
                    // Populate Model
                    angular.forEach(sucessData.properties, function(value, key){
                        model.properties[key] = value;
                        try{
                            model.properties[key].value = JSON.parse(model.properties[key].value);
                        }catch(SyntaxError){
                            // Do nothing
                        }
                    });
                    runCallback(callbackSucess, sucessData);
                },
                function(failData){
                    runCallback(callbackFail, failData);
                });
            
            // TODO: Listen to updates on Database then update Model to reflect on template
        },
        
        update: function(model, params, callbackSucess, callbackFail){
            // Initialize from Database
            var Resource = $resource(model.resourceLink, {}, {
                put : {
                    method  : 'PUT',
                    transformRequest: function (data) {
                        $log.info('$httpParamSerializer(data): ', $httpParamSerializer(data));
                        return $httpParamSerializer(data);
                    },
                    headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
                }
            });
            
            Resource.put(params,
                function(sucessData){
                    runCallback(callbackSucess, sucessData);
                },
                function(failData){
                    runCallback(callbackFail, failData);
                });
        },
        
        remove: function(model, params, callbackSucess, callbackFail){
            // Initialize from Database
            // Use $http insted of $resource because angular ignores body in method delete 
            // thus there will be no data send to transformRequest()
            $http({ 
                url     : model.resourceLink,
                method  : 'DELETE',
                transformRequest: function(data){
                    $log.info('$httpParamSerializer(data): ', $httpParamSerializer(data));
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
        }
    };
}]);