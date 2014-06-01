/// <reference path="paginationApp.js" />

var app = angular.module("MyApp", ['Pagination']);

app.controller("PaginationCtrl", ['$scope','PagerFactory', function ($scope, PagerFactory) {
    var items = [];

    $scope.items = [];
    $scope.paging = {};

    $scope.paging = PagerFactory.createNew();
    
    function Init() {
        for (var i = 0; i < 50; i++) {
            items.push({ id: i, name: "name " + i, description: "description " + i });
        }
    }

    $scope.$watch('paging.currentPage', function () {
        if (items.length <= 0) {
            Init();

            $scope.paging.dataLength = items.length;
            $scope.items = $scope.paging.getItems(items).limitFromTo();
        }
        else {
            $scope.items = $scope.paging.getItems(items).limitFromTo()
        }
    });

}]);