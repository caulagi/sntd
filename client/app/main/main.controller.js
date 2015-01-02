'use strict';

angular.module('sntdApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.meetups = [];

    $http.get('/api/meetups').success(function(meetups) {
      $scope.meetups = meetups;
    });

    $scope.addMeetup = function() {
      $http.post('/api/meetups', { 
        name: $scope.title
      });
    };

    $scope.deleteThing = function(meetup) {
      $http.delete('/api/meetups/' + thing._id);
    };
  });
