var app = angular.module("MyApp", ['Pagination']);

app.controller("PaginationCtrl", ['$scope', 'PagerFactory', function ($scope, PagerFactory) {
    var items = [];

    $scope.items = [];
    $scope.paging = {};
   
    function Init() {
        for (var i = 0; i < 50; i++) {
            items.push({ id: i, name: "name " + i, description: "description " + i });
        }
    }

    Init();

    $scope.paging = PagerFactory.createNew();
    $scope.paging.dataLength = items.length;
    $scope.items = items;
}]);