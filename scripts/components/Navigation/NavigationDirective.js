/*
    Created by jebat on 20/11/2015
    Last updated by jebat on 22/11/2015
    
    Description:
    This directive is provide navigation bar without relying on $rootScope
    when user already logged in or not.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').directive('navigation', [function(){
    return {
        restrict: 'E',
        controller: ['Auth','AuthFactory',function(Auth,AuthFactory){
            var self = this;
            self.auth = Auth.authentication;
            
            self.popUpLogin = function(){
                AuthFactory.popUpLogin();
            };
            
            self.popUpRegister = function(){
                AuthFactory.popUpRegister();
            };
        }],
        controllerAs: 'navigationCtrlDirective',
        templateUrl: '/scripts/components/Navigation/navigationBar.html'
    };
}]);