/**
 * ngInline
 * an AngularJs directive for inline editing
 * By: Andrew Mead
 **/

angular.module('tooltip', []).directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
              
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});