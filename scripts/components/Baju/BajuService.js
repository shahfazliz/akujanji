/*
    Created by jebat on 26/10/2015
    Last updated by jebat on 09/12/2015
    
    Description:
    This service is a Model side of MVC pattern for BajuNiaga that will hold
    the current value of the selected Baju. The actual implementation of this 
    Model must be done on server side.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').service('Baju', ['CRUD',function(CRUD){
    var self = this;
    
    var resourceLink    = '//jbase-shahfazliz.c9users.io/bajuniaga/baju/index.php';
    var properties      = {};
    var initialized     = false;
    var name            = 'Baju';
    
    self.resourceLink   = resourceLink;
    self.properties     = properties;
    self.initialized    = initialized;
    self.name           = name;
    
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