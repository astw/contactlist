'use strict'; 

var app = angular.module("myContactViewer");

var contactListController = function($scope, repository) {
    $scope.contacts = [];

    $scope.getContacts = function() {
        repository.getContacts().then(function(ret) {
            if (ret.succeed) {
                console.log(ret.contacts);
                $scope.contacts = $scope.contacts.concat(ret.contacts);
                console.log($scope.contacts);
            }
        });
    };
    
    $scope.getContacts();

};

app.controller("contactListController", contactListController);
 