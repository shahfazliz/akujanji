/*
    Created by jebat on 03/12/2015
    Last updated by jebat on 04/12/2015
    
    Description:
    This factory is a
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').factory('RoleFactory', ['CRUD','Role',function(CRUD,Role){
    
    // Role list
    var RoleList = {};
    
    // Test callback if callback is a function
    function runCallback( callback, data ){
        if(typeof callback === 'function') callback();
    }
    
    // Function test from RoleList given string of Role Names
    function testRole(modelName, action, roleList){
        var roleAuthenticated = false;
        
        // Test for Public role if return true then skip all authentication
        try{
            if(RoleList['Public'][modelName][action]) return true;
            else throw "No Public access";
            
        }catch(err){
            // If Public role does not return true
            roleList = roleList.split(',');
            angular.forEach(roleList, function(roleName){
                try{
                    if(RoleList[roleName][modelName][action]) roleAuthenticated = true;
                
                // Sometimes if statement is not enough, may return undefines in some roles
                // catch error and just continue iterate forEach loop
                }catch(err){}
            });
        }
        
        return roleAuthenticated;
    }
    
    return {
        // Function to reload from server
        reloadRoles: function(){
            CRUD.read(Role, {}, 
                function(sucessData){
                    
                    // Populate RoleList
                    angular.forEach(sucessData, function(objects){
                        
                        var roleName = '';
                        var models = {};
                        
                        angular.forEach(objects.properties, function(stringJson, modelName){
                            if(modelName == 'Name') roleName = stringJson.value;
                            else{
                                models[modelName] = JSON.parse(stringJson.value);
                            }
                        });
                        
                        RoleList[roleName] = models;
                    });
                },
                function(failData){});
        },
        
        can: function(modelName, action, roleList, callback){
            if(testRole(modelName, action, roleList)){
                runCallback(callback);
            }
        },
        
        canRead: function(modelName, roleList, callback){
            if(testRole(modelName, 'Read', roleList)){
                runCallback(callback);
            }
        },
        canCreate: function(modelName, roleList, callback){
            if(testRole(modelName, 'Create', roleList)){
                runCallback(callback);
            }
        },
        canUpdateOwner: function(modelName, roleList, callback){
            if(testRole(modelName, 'Update (owner)', roleList)){
                runCallback(callback);
            }
        },
        canUpdateOther: function(modelName, roleList, callback){
            if(testRole(modelName, 'Update (other)', roleList)){
                runCallback(callback);
            }
        },
        canDeleteOwner: function(modelName, roleList, callback){
            if(testRole(modelName, 'Delete (owner)', roleList)){
                runCallback(callback);
            }
        },
        canDeleteOther: function(modelName, roleList, callback){
            if(testRole(modelName, 'Delete (other)', roleList)){
                runCallback(callback);
            }
        }
    };
}]);