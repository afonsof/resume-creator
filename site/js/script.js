'use strict';
var app = angular.module('angularjs-starter', []);

app.controller('MainCtrl', function ($scope) {

    $scope.changeTab = function (tab) {
        $scope.currentTab = tab;
    };

    // example JSON
    $scope.jsonData = {
        name: "Afonso França de Oliveira",
        title: "Software Engineer",
        contactInfo: "+55 24 99947-5822\nafonso.franca@gmail.com\nafonsof.com • github.com/afonsof\nlinkedin.com/in/afonsof",

        sections: [
            {
                title: "Profile",
                "order": 1,
                "type": "text",
                "layout": "text",
                "visible": true,
                "content": "sd fa sdf asd fas dfa sdf asd fa sdf asdf adsfasdfasdf ads fa sdfas df asdf asdfa"
            },
            {
                title: "Main Skills",
                "order": 2,
                "type": "keyValuePair",
                "layout": "titled3Columns",
                "visible": true,
                "items": [
                    {
                        key: "Web Programmer",
                        value: "10 years creating software, started using PHP passing through .NET and nowadays I enjoy NodeJS."
                    },
                    {
                        key: "Agile Enthusiast",
                        value: "I've already worn the hat of Scrum Master and Product Owner, In these days we are also using some Kanban principles."
                    },
                    {
                        key: "Software Engineer",
                        value: "I know how is important to use TDD, Refactoring and Code Review to create profitable software."
                    }
                ]
            },
            {
                title: "Technical",
                "order": 3,
                "type": "array",
                "layout": "list3Columns",
                "visible": true,
                "items": [
                    {content: "Javascript"},
                    {content: "C#/ASP.NET MVC"},
                    {content: "HTML5"},
                    {content: "NodeJS"},
                    {content: "CSS3"},

                    {content: "Agile"},
                    {content: "XP"},
                    {content: "Kanban"},
                    {content: "Scrum"},
                    {content: "Python"},

                    {content: "Code Coverage"},
                    {content: "Design Patterns"},
                    {content: "TDD"},
                    {content: "CVS"},
                    {content: "Continuous Integration"}
                ]
            },
            {
                title: "Work Experiences",
                "order": 4,
                "visible": true,
                type: "occupationList",
                "layout": "work",
                "items": [
                    {
                        "period": "2006-current",
                        "organization": "Diebold Inc.",
                        "location": "São Paulo - Brazil",
                        "occupations": [
                            {
                                "title": "Software Engineer",
                                "tasks": [
                                    "Intranet using ASP.NET MVC",
                                    "Social Network Malware finder",
                                    "Heuristic site classifier",
                                    "Javascript unique Machine Identification",
                                    "Build scripts in Python",
                                    "Design Patterns and TDD"
                                ]
                            },
                            {
                                "title": "Team Leader/Scrum Master",
                                "tasks": [
                                    "Facilitated 6 developers",
                                    "Continuous integration, Nightly Builds and Code Review, CVS, Code coverage",
                                    "ASP.NET MVC Project",
                                    "Scrum, Kanban and XP based methodology"
                                ]
                            },
                            {
                                "title": "Dev Manager",
                                "tasks": [
                                    "Fraud prevention console",
                                    "Protecting 40 millions of clients",
                                    "Agile Leadership Practices"
                                ]
                            }
                        ]
                    },
                    {
                        "period": "2005-2006",
                        "organization": "Flextronics International",
                        "location": "Rio de Janeiro - Brazil",
                        "occupations": [
                            {
                                "title": "IT Trainee",
                                "tasks": [
                                    "Delivered internal softwares made using PHP"
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: "Education",
                "order": 5,
                "visible": true,
                "type": "occupationList",
                "layout": "education",
                "items": [
                    {
                        "period": "2008-2011",
                        "title": "MBA in Project Management (PMBOK based)",
                        "organization": "FGV – Getúlio Vargas Foundation"
                    },
                    {
                        "period": "2002-2006",
                        "end": 2006,
                        "title": "Bachelor of Science Degree, Computer Science",
                        "organization": "UBM – University Center of Barra Mansa"
                    }
                ]
            },
            {
                title: "Volunteer Experience",
                "order": 6,
                "visible": true,
                type: "occupationList",
                "layout": "volunteer",
                "items": [
                    {
                        "title": "Collaborator in Open Source Community",
                        "organization": "github.com/afonsof",
                        "content": "Projects: BayesSharp • EvolveSharp • grunt-qunit-cov • pyhammer"
                    },
                    {
                        "title": "Co-creator and Presenter",
                        "organization": "Event Web Dev Summit 2015",
                        "content": "Organized together Google Developer Group in Rio an event for 200 people."
                    },
                    {
                        "title": "Community Leader",
                        "organization": "Jubasulf",
                        "content": "Coordinated 24 fellowship and entertainment events of a group of 2,000 youths."
                    }
                ]
            },
            {
                title: "Certifications and Trainings",
                "order": 7,
                "type": "array",
                "layout": "list2Columns",
                "visible": true,
                "items": [
                    {"content": "Certified Lean-Kanban"},
                    {"content": "CSPO – Certified Scrum Product Owner"},
                    {"content": "Management 3.0 - Agile Leadership Practices"},
                    {"content": "CSM – Certified Scrum Master"},
                    {"content": "MCP - Programming in HTML5 with Js and CSS3"},
                    {"content": "GDG Dev Fest Sudeste 2014"},
                    {"content": "Tableless Conference 2014"},
                    {"content": "BraziJS 2014"},
                    {"content": "Black Hat and DefCon 2014"},
                    {"content": "Agile Trends 2014"},
                    {"content": "Chrome Dev Summit 2013"},
                    {"content": "Agile Brazil 2013"},
                    {"content": "Visual Studio Summit 2013"},
                    {"content": "ACM – Intern. Collegiate Program. Contest 2006"}
                ]
            }
        ]
    };

    $scope.defaultTab = "Personal";
    $scope.currentTab = $scope.defaultTab;

    var a;

    $scope.download = function () {
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

    $scope.upload = function () {
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
                    $scope.$apply();
                }
            };
            var blob = file.slice(start, stop + 1);
            reader.readAsText(blob);

        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }

    var form, input;

    $scope.generate = function () {
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
        input.value = JSON.stringify($scope.jsonData);
        form.submit();
    };
});