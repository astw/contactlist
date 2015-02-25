'use strict';

var app = angular.module("myContactViewer");

var mainController = function($scope, repository) {
    $scope.contacts = [];

    $scope.getContacts = function() {
        repository.getContacts().then(function(ret) {
            if (ret.succeed) {
                console.log(ret.contacts);
                $scope.contacts = $scope.contacts.concat(ret.contacts); 
            }
        });
    };

    $scope.addNewContact = function(name, email) {
        repository.addNewContact(name, email).then(function(ret) {
            if (ret.succeed) {
                $scope.contacts.push({
                    "name": name,
                    "email": email,
                    "id": ret.id
                });
            }
        });
    };

    $scope.deleteContact = function(id) {
        repository.deleteContact(id).then(function(ret) {
            if (ret.succeed) { 
                for (var i = 0; i < $scope.contacts.length; i++) {
                    if ($scope.contacts[i].id === id) { 
                        $scope.contacts.splice(i, 1);
                    }
                }
            }
        });
    };

    $scope.getContacts();

};

app.controller("mainController", mainController);
 