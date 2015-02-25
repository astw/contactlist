'use strict';

var repository = function($http, $q) {

    var firebaseUrl = 'https://gmx5pu2y6zn.firebaseio-demo.com/';

    var getContacts = function() {
        var dfd = $q.defer();
        var ref = new Firebase(firebaseUrl + "users");

        ref.once("value", function(snapshot) {
                var ret = {
                    succeed: true,
                    contacts: []
                };
                snapshot.forEach(function(userSnap) {
                        console.log(userSnap.val());
                        var user = userSnap.val();
                        var id = userSnap.key();
                        ret.contacts.push({ email: user.email, name: user.name, id: id });
                    }
                );

                dfd.resolve(ret);
            },
            function(errorObject) {
                console.log("The read failed: " + errorObject.code);
                dfd.resolve({
                    succeed: false,
                    contacts: null
                });
            });

        return dfd.promise;
    };

    var deleteContact = function(id) {
        var dfd = $q.defer();
        var ref = new Firebase(firebaseUrl + "users/" + id);
        ref.remove(function(error) {
            if (error) {
                console.log(error);
                dfd.resolve({
                    succeed: false,
                    id: id
                });
            } else {
                console.log("delete ok");
                dfd.resolve({
                    succeed: true,
                    id: id
                });
            }
        });
        return dfd.promise;
    };

    var addNewContact = function(name, email) {
        var dfd = $q.defer();
        var ref = new Firebase(firebaseUrl);
        var usersRef = ref.child("users");

        var newContactRef = usersRef.push({
            name: name,
            email: email
        }, function(error) {
            if (error) {
                console.log(error);
                dfd.resolve({
                    succeed: false,
                    id: null
                });
            } else {
                var contactId = newContactRef.key();
                dfd.resolve({
                    succeed: true,
                    id: contactId
                });
            }
        });
        return dfd.promise;
    };

    return {
        addNewContact: addNewContact,
        getContacts: getContacts,
        deleteContact: deleteContact
    };

};

var module = angular.module("myContactViewer");
module.factory("repository", repository);
 