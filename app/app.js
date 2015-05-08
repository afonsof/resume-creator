'use strict';

angular
    .module('resumeCreator', [
        'ngRoute',
        'resumeCreator.home',
        'resumeCreator.creator'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .directive('resumeField', function () {
        return {
            link: function (scope, element) {
                element.addClass('resume-field');
                element.on('click', 'button', function () {
                    element.addClass('translated');
                    element.find('.ptBR').focus();
                });
                if (scope.resumeField && scope.resumeField.ptBR) {
                    element.addClass('translated');
                }
            },
            restrict: 'A',
            scope: {
                resumeField: '='
            },
            template: function (element, attr) {
                if(attr.type=="textarea") {
                    return '<textarea class="form-control" ng-model="resumeField.default"></textarea>' +
                        '<button class="btn btn-default"><img src="translate.png"/></button>' +
                        '<textarea placeholder="pt-BR" class="ptBR form-control" ng-model="resumeField.ptBR"></textarea>';
                }
                else {
                    return '<input type="text" class="form-control" ng-model="resumeField.default" />' +
                        '<button class="btn btn-default"><img src="translate.png"/></button>' +
                        '<input placeholder="pt-BR" class="ptBR form-control" ng-model="resumeField.ptBR">';
                }
            }
        };
    });