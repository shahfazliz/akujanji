/*
    Created by jebat on 16/11/2015
    Last updated by jebat on 09/12/2015
    
    Description:
    This service is a Model side of MVC pattern for Authentication that will hold
    the current value of the selected User Login. The actual implementation of this 
    Model must be done on server side.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').service('Auth', [function(){
    var self = this;
    
    var resourceLink    = '//jbase-shahfazliz.c9users.io/auth/index.php';
    var properties      = {};
    var initialized     = false;
    var name            = 'Auth';
    var authentication  = {
        id      : '',
        token   : '',
        roles   : '',
        loggedIn: false
    };
    
    self.resourceLink   = resourceLink;
    self.properties     = properties;
    self.initialized    = initialized;
    self.name           = name;
    
    // Extra info for this Authentication
    self.authentication = authentication;
    
    // Define onChange here?
    // properties['Test Radio'].onChange = function(){
    //     alert('Hehehe');
    // };
    
    // self.setProperty = function(key, value, callback){
    //     properties[key] = value;
    //     if(typeof callback === 'function') callback();
    // };
}]);