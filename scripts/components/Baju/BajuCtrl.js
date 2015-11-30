/*
    Created by jebat on 26/10/2015
    Last updated by jebat on 27/11/2015
    
    Description:
    This controller is a View Model side of MVVM pattern for BajuNiaga that will
    interface Model with template.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').controller('BajuCtrl', ['$log','$state','Baju','CRUD',function($log,$state,Baju,CRUD){
    var self = this;
    
    self.title      = $state.current.data.title;
    self.debugging  = $state.current.data.debugging;
    self.model      = Baju;
    self.style      = {
        imageClassWidth: 3,
        labelClassWidth: 3,
        inputClassWidth: 9
    };
    
    self.onClick = function(actionName, params){
        actions[actionName](params);
    };
    
    var actions = {
        // Save self.model
        Create : function(){
            CRUD.create(self.model,
                // If Sucess
                function(sucessData){
                    $log.info('sucessData', sucessData);
                    
                    // Re direct to id from sucessData
                    $state.go('baju.read.id', {id:sucessData.id});
                },
                // If Fail
                function(failData){
                    $log.error('failData', failData);
                });
        },
        
        // Initialize self.model
        Read : function(params){
            CRUD.read(self.model, params,
                // If Sucess
                function(sucessData){
                    $log.info('sucessData', sucessData);
                },
                // If Fail
                function(failData){
                    $log.error('failData', failData);
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
                    $log.info('sucessData', sucessData);
                },
                // If Fail
                function(failData){
                    $log.error('failData', failData);
                });
        },
        
        // Delete self.model
        Remove : function(){
            CRUD.remove(self.model, $state.params,
                // If Sucess
                function(sucessData){
                    $log.info('sucessData', sucessData);
                },
                // If Fail
                function(failData){
                    $log.error('failData', failData);
                });
        }
    };
    
    // Initialize Model
    if($state.params) actions.Read($state.params);
}]);