/*
    Created by jebat on 02/12/2015
    Last updated by jebat on 02/12/2015
    
    Description:
    This controller is the main view Roles that will
    interface Model with template.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').controller('MainRoleCtrl',['$state','CRUD','Role','RoleFactory','Auth',function($state,CRUD,Role,RoleFactory,Auth){
    var self = this;
    var notification = {
        display : false,
        type    : '',
        message : ''
    };
    
    self.notification = notification;
    
    var popNotification = function(type, message){
        notification.display = true;
        notification.type    = type;
        notification.message = message;
    };
    
    self.title      = $state.current.data.title;
    self.debugging  = $state.current.data.debugging;
    self.model      = Role;
    self.style      = {
        imageClassWidth: 3,
        labelClassWidth: 3,
        inputClassWidth: 9
    };
    
    self.list = [];
    
    popNotification('alert', 'Loading, please wait..');
    
    RoleFactory.canRead('Role', Auth.authentication.roles, function(){
        CRUD.read(self.model, {}, 
        function(sucessData){
            popNotification('sucess', 'Loading sucess');
            self.list = sucessData;
        },
        function(failData){
            popNotification('error', 'Loading fail');
        });
    });
}]);