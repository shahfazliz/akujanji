/*
    Created by jebat on 19/11/2015
    Last updated by jebat on 09/12/2015
    
    Description:
    This service is a Model side of MVC pattern for Authentication that will hold
    the current value of the selected User Login. The actual implementation of this 
    Model must be done on server side.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').service('Role', ['CRUD',function(CRUD){
    var self = this;
    
    var resourceLink    = '//jbase-shahfazliz.c9users.io/auth/role/index.php';
    var properties      = {};
    var initialized     = false;
    var name            = 'Role';
    
    self.resourceLink   = resourceLink;
    self.properties     = properties;
    self.initialized    = initialized;
    self.name           = name;
    
    // Initialize Model
    CRUD.options(self);
}]);