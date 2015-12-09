/*
    Created by jebat on 09/11/2015
    Last updated by jebat on 09/11/2015
    
    Description:
    This directive is to provide hide/show elements depending on user roles 
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').directive('showRole', ['RoleFactory','Auth',function(RoleFactory,Auth){
    
    // sample <button showRole='Baju' action-type='Delete (owner)'>
    return function(scope, element, attrs) {
        
        var authorized = false;
        RoleFactory.can(attrs.modelName, attrs.actionType, Auth.authentication.roles, function(){
            authorized = true;
        });
        
        if(!authorized) element.hide();
        else element.show();
    };
}]);