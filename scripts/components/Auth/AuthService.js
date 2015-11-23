/*
    Created by jebat on 16/11/2015
    Last updated by jebat on 16/11/2015
    
    Description:
    This service is a Model side of MVC pattern for Authentication that will hold
    the current value of the selected User Login. The actual implementation of this 
    Model must be done on server side.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').service('Auth', [function(){
    var self = this;
    
    var resourceLink = '//jbase-shahfazliz.c9.io/auth/index.php';
    var properties = {};
    var authentication = {
        id      : '',
        token   : '',
        loggedIn: false
    };
    
    self.properties = properties;
    self.resourceLink = resourceLink;
    
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