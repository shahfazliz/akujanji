/*
    Created by jebat on 16/11/2015
    Last updated by jebat on 19/11/2015
    
    Description:
    This controller is a View Model side of MVVM pattern for Auth that will
    interface Model with template.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').controller('AuthCtrl', ['$log','$state','Auth','AuthFactory','CRUD',function($log,$state,Auth,AuthFactory,CRUD){
    var self = this;
    
    self.title      = $state.current.data.title;
    self.debugging  = $state.current.data.debugging;
    self.model      = Auth;
    self.style      = {
        imageClassWidth: 3,
        labelClassWidth: 3,
        inputClassWidth: 9
    };
    
    self.onClick = function(actionName, params){
        actions[actionName](params);
    };
    
    var actions = {
        // Login
        Login : function(){
            CRUD.update(self.model, {
                Username : self.model.properties.Username.value,
                Password : self.model.properties.Password.value
            },
                // If Sucess
                function(sucessData){
                    $log.info('sucessData', sucessData);
                    
                    AuthFactory.setLoggedin(sucessData.id, sucessData.APIToken);
                    
                    $state.go('home');
                },
                // If Fail
                function(failData){
                    // $log.error('failData', failData);
                }
            );
        },
        
        // Save self.model
        Create : function(){
            CRUD.create(self.model,
                // If Sucess
                function(sucessData){
                    // $log.info('sucessData', sucessData);
                },
                // If Fail
                function(failData){
                    // $log.error('failData', failData);
                });
        },
        
        // Initialize self.model
        Read : function(params){
            CRUD.read(self.model, params,
                // If Sucess
                function(sucessData){
                    // $log.info('sucessData',sucessData);
                },
                // If Fail
                function(failData){
                    // $log.error('failData', failData);
                });
        },
        
        // Update self.model
        Update : function(params){
            var newParams = {id: $state.params.id};
            newParams[params[0]] = params[1];
            
            CRUD.update(self.model, newParams,
                // If Sucess
                function(sucessData){
                    self.model.properties[params[0]].value = params[1];
                    // $log.info('sucessData',sucessData);
                },
                // If Fail
                function(failData){
                    // $log.error('failData', failData);
                });
        },
        
        // Delete self.model
        Remove : function(){
            CRUD.remove(self.model, $state.params,
                // If Sucess
                function(sucessData){
                    // $log.info('sucessData',sucessData);
                },
                // If Fail
                function(failData){
                    // $log.error('failData', failData);
                });
        }
    };
    
    // Initialize Model
    actions.Read($state.params);
}]);