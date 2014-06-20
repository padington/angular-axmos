'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('TestController',[ '$http', function($http){
    var store = this;
    store.servers = [];
    $http.get('/app/store-servers.json').success(function(data){
        store.servers = data;	        
    });    
  }]);
