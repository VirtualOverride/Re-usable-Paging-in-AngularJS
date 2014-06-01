
var pagination = angular.module('Pagination', []);

pagination.filter('limitFromTo', function () {
    return function (input, offset, limit) {
        if (!(input instanceof Array) && !(input instanceof String)) return input;

        limit = parseInt(limit, 10);

        if (input instanceof String) {
            if (limit) {
                return limit >= 0 ? input.slice(offset, limit) : input.slice(limit, input.length);
            } else {
                return "";
            }
        }

        var out = [],
            i, n;

        if (limit > input.length)
            limit = input.length;
        else if (limit < -input.length)
            limit = -input.length;

        if (limit > 0) {
            i = offset;
            n = limit;
        } else {
            i = input.length + limit;
            n = input.length;
        }

        for (; i < n; i++) {
            out.push(input[i]);
        }

        return out;
    };
});

pagination.factory('PagerFactory', ['$filter', function ($filter) {
    var paging = {};

    paging.createNew = function (itemsPerPage) {

        itemsPerPage = itemsPerPage === undefined ? 5 : itemsPerPage;

        var tempItems = {};
        tempItems.createNew = function (items) {
            var localItems = items;
            var localTemp = {};

            localTemp.limitFromTo = function () {
                var tempArray = [];

                if (!Array.isArray(localItems)) return localItems;

                var from = temp.currentPage * temp.itemsPerPage;
                var to = from + temp.itemsPerPage;

                tempArray = $filter('limitFromTo')(localItems, from, to);

                return tempArray;
            };

            return localTemp;
        };

        var temp = {
            itemsPerPage: itemsPerPage,
            currentPage: 0,
            dataLength: 0
        };

        temp.getItems = function (items) {
            return tempItems.createNew(items);
        };

        temp.range = function () {
            var rangeSize = 5;
            var ret = [];
            var start;

            start = temp.currentPage;
            if (start > temp.pageCount() - rangeSize) {
                start = temp.pageCount() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                if (i >= 0)
                    ret.push(i);
            }
            return ret;
        };

        temp.prevPage = function () {
            if (temp.currentPage > 0) {
                temp.currentPage--;
            }
        };

        temp.pageCount = function () {
            return Math.ceil(temp.dataLength / temp.itemsPerPage) - 1;
        };

        temp.nextPage = function () {
            if (temp.currentPage < temp.pageCount()) {
                temp.currentPage++;
            }
        };

        temp.setPage = function (n) {
            temp.currentPage = n;
        };

        temp.getCurrentPage = function () {
            return temp.currentPage * temp.itemsPerPage;
        };

        temp.getItemsPerPage = function () {
            return temp.getCurrentPage() + temp.itemsPerPage;
        };

        return temp;
    };

    return paging;
}]);
