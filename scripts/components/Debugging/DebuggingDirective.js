/*
    Created by jebat on 26/10/2015
    Last updated by jebat on 26/10/2015
    
    Description:
    This directive is optional to display debugging output on template
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').directive('debugging', [function(){
    return {
        scope:{
            enableDebugging : '=enable',
            valueInput      : '=value'
        },
        template: '<div ng-show="enableDebugging"><strong style="color:red;">input:</strong> {{ valueInput }}</div>'
        // sample : <debugging enable="ctrl.debugging" value="modelValue.value"/>
    };
}]);