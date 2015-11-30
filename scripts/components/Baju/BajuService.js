/*
    Created by jebat on 26/10/2015
    Last updated by jebat on 30/11/2015
    
    Description:
    This service is a Model side of MVC pattern for BajuNiaga that will hold
    the current value of the selected Baju. The actual implementation of this 
    Model must be done on server side.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').service('Baju', ['CRUD',function(CRUD){
    var self = this;
    
    var resourceLink    = '//jbase-shahfazliz.c9.io/bajuniaga/baju/index.php';
    var properties      = {};
    var initialized     = false;
    
    self.resourceLink   = resourceLink;
    self.properties     = properties;
    self.initialized    = initialized;
    
    // Initialize Model
    CRUD.options(self);
        
    // Define onChange here?
    // properties['Test Radio'].onChange = function(){
    //     alert('Hehehe');
    // };
    
    // self.setProperty = function(key, value, callback){
    //     properties[key] = value;
    //     if(typeof callback === 'function') callback();
    // };
}]);