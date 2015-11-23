/*
    Created by jebat on 22/11/2015
    Last updated by jebat on 22/11/2015
    
    Description:
    This factory is a Model's basic actions for Authentication.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').factory('AuthFactory', ['Auth','$log', function(Auth,$log){
    return {
        setLoggedin : function(id, token){
            Auth.properties.Username.value = '';
            Auth.properties.Password.value = '';
            
            Auth.authentication.id = id;
            Auth.authentication.token = token;
            Auth.authentication.loggedIn = true;
            
            $log.info('Logged in: ', Auth.authentication);
        },
        
        setLoggedOut : function(){
            Auth.authentication.id = '';
            Auth.authentication.token = '';
            Auth.authentication.loggedIn = false;
            
            $log.info('Logged out: ', Auth.authentication);
        }
    };
}]);