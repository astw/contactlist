 
'use strict';
var app = angular.module("myContactViewer", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/main", {
            templateUrl: "angularjs/views/main.html",
            controller: "mainController"
        })
        .when("/contactlist", {
            templateUrl: "angularjs/views/contactlist.html",
            controller: "contactListController"
        })
        .otherwise({ redirectTo: "/main" });
});