'use strict';
var app = angular.module('resume-creator', []);

app
    .controller('MainCtrl', function ($scope, $http) {


        $scope.jsonData = {};

        var savedData = localStorage.getItem('data');

        if (savedData) {
            $scope.jsonData = JSON.parse(savedData);
            startWatch();
            showAlert('Data loaded locally!');
        }
        else {
            $http.get('resume.json')
                .then(function (res) {
                    $scope.jsonData = res.data;
                    startWatch();
                    localStorage.setItem('data', JSON.stringify(res.data));
                });
        }

        var timeout, _oldData;

        function startWatch() {
            $scope.$watch('jsonData', function (oldData, newData) {
                if (!_oldData) {
                    _oldData = oldData;
                }
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(function () {
                    var diff = JsDiff.diffChars(angular.toJson(_oldData), angular.toJson(newData));
                    _oldData = null;
                    if (diff) {
                        var filteredDiff = [];
                        for (var i = 0; i < diff.length; i++) {
                            var d = diff[i];
                            if (d.kind == 'E') {
                                filteredDiff.push(d.path.join('>'));
                            }
                        }
                        ga('send', 'event', 'data', 'change', JSON.stringify(filteredDiff));
                    }
                }, 3000);

                localStorage.setItem('data', JSON.stringify($scope.jsonData));
            }, true);
        }

        function showAlert(message) {
            $scope.message = message;
            setTimeout(function () {
                $scope.message = "";
                $scope.$apply();
            }, 5000);
        }

        $scope.changeTab = function (tab) {
            ga('send', 'event', 'tab', 'change', tab);
            $scope.currentTab = tab;
        };

        $scope.defaultTab = "Personal";
        $scope.currentTab = $scope.defaultTab;

        var a;

        $scope.export = function () {
            ga('send', 'event', 'button', 'click', 'export');
            if (!a) {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.download = "resume-data.json";
            }
            var json = JSON.stringify($scope.jsonData),
                blob = new Blob([json], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.click();
            window.URL.revokeObjectURL(url);
        };

        $scope.import = function () {
            ga('send', 'event', 'button', 'click', 'import');
            // Check for the various File API support.
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var files = document.getElementById('file').files;
                if (!files.length) {
                    alert('Please select a file!');
                    return;
                }

                var file = files[0];
                var start = 0;
                var stop = file.size - 1;

                var reader = new FileReader();
                reader.onloadend = function (evt) {
                    if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                        $scope.jsonData = JSON.parse(evt.target.result);
                        showAlert('Data imported!');
                        $scope.$apply();

                    }
                };
                var blob = file.slice(start, stop + 1);
                reader.readAsText(blob);

            } else {
                alert('The File APIs are not fully supported in this browser.');
            }
        };

        var form, input;

        $scope.generate = function (language) {
            ga('send', 'event', 'button', 'click', 'generate');
            if (!form) {
                form = document.createElement("form");
                form.action = '/';
                form.method = 'POST';
                form.target = "_blank";
                input = document.createElement("textarea");
                input.name = 'json';
                form.appendChild(input);
                form.style.display = 'none';
                document.body.appendChild(form);
            }
            var data = angular.copy($scope.jsonData);
            data.language = language || 'default';
            input.value = JSON.stringify(data);
            form.submit();
        };

        $scope.clear = function () {
            localStorage.setItem('data', '');
        };
    })
    .directive('resumeField', function () {
        return {
            link: function (scope, element) {
                element.addClass('resume-field');
                element.on('click', 'button', function () {
                    element.addClass('translated');
                    element.find('.ptBR').focus();
                });
                if (scope.resumeField.ptBR) {
                    element.addClass('translated');
                }
            },
            restrict: 'A',
            scope: {
                resumeField: '='
            },
            template: '<input type="text" class="form-control" ng-model="resumeField.default" />' +
            '<button>pt-BR</button><input placeholder="pt-BR" class="ptBR form-control" ng-model="resumeField.ptBR">'
        };
    });