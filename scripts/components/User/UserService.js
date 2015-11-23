/*
    Created by jebat on 29/10/2015
    Last updated by jebat on 11/11/2015
    
    Description:
    This service is a Model side of MVC pattern for BajuNiaga that will hold
    the current value of the selected User. The actual implementation of this 
    Model must be done on server side.
*/
/*global angular*/
'use strict';
angular.module('AkuJanji').service('User', ['$http',function($http){
    var self = this;
    
    var resourceLink = ""
    var properties = {};
    
    $http.get(resourceLink).then(function(response){
        angular.forEach(response.data.properties, function(value, key){
            properties[key] = value;
        });
        
        // Define onChange here
        // properties['Test Radio'].onChange = function(){
        //     alert('Hehehe');
        // };
    });
    
    self.properties = properties;
    self.resourceLink = resourceLink;
}]);