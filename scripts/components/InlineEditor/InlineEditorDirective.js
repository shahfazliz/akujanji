/*
    Created by jebat on 12/11/2015
    Last updated by jebat on 12/11/2015
    
    Description:
    This directive is provide inline editable inputs
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').directive('inlineEditor', [function(){
    return {
        // scope:{
        //     enableDebugging : '=enable',
        //     valueInput      : '=value'
        // },
        restrict: 'E',
        scope: {
            inputType       : '=type',
            inputValue      : '=value',
            inputOptions    : '=options',
            inputPlaceholder: '=placeholder',
            inputDisabled   : '=disabled',
            actionClick     : '&onClick'
        },
        templateUrl: '/scripts/components/InlineEditor/inlineEditor.html'
    };
}]);