/*
    Created by jebat on 16/11/2015
    Last updated by jebat on 27/11/2015
    
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
    
    self.recaptcha = {
        sitekey: '6LfMkBETAAAAAKcRqeFYyjFbj1N8iaGzqyfX5mOt'
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
                    $log.info('CRUD.update() via Login function returns sucessData', sucessData);
                    
                    if(sucessData.id && sucessData.APIToken){
                        $log.info('Login sucess');
                        AuthFactory.setLoggedin(sucessData.id, sucessData.APIToken);
                        AuthFactory.popDownLogin();
                        // $state.go('home');
                    }
                    else{
                        $log.error('Login Error with sucessData.id: ', sucessData.id);
                        $log.error('Login Error with sucessData.APIToken: ', sucessData.APIToken);
                    }
                },
                // If Fail
                function(failData){
                    $log.error('CRUD.update() via Login function returns failData', failData);
                }
            );
        },
        
        // Save self.model
        Create : function(){
            var params = {
                "g-recaptcha-response": document.getElementById("g-recaptcha-response") 
            };
            
            CRUD.create(self.model, params,
                // If Sucess
                function(sucessData){
                    $log.info('CRUD.create() returns sucessData', sucessData);
                    AuthFactory.popDownRegister();
                    // $state.go('home');
                },
                // If Fail
                function(failData){
                    $log.error('CRUD.create() returns failData', failData);
                });
        },
        
        // Initialize self.model
        Read : function(params){
            var token = self.model.authentication.token;
            if(token) params['APIToken'] = token;
            
            CRUD.read(self.model, params,
                // If Sucess
                function(sucessData){
                    $log.info('CRUD.read() returns sucessData',sucessData);
                },
                // If Fail
                function(failData){
                    $log.error('CRUD.read() returns failData', failData);
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
                    $log.info('CRUD.update() returns sucessData',sucessData);
                },
                // If Fail
                function(failData){
                    $log.error('CRUD.update() returns failData', failData);
                });
        },
        
        // Delete self.model
        Remove : function(){
            CRUD.remove(self.model, $state.params,
                // If Sucess
                function(sucessData){
                    $log.info('CRUD.remove() returns sucessData',sucessData);
                },
                // If Fail
                function(failData){
                    $log.error('CRUD.remove() returns failData', failData);
                });
        }
    };
    
    // Initialize Model
    CRUD.options(self.model);
    if($state.params) CRUD.read(self.model, $state.params);
}]);