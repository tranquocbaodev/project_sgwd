/* Services */
angular
    .module('app.core')
    .factory('dataSvc', dataSvc);

//dataSvc
function dataSvc($http, $q) {
    return {
        query : function(fileName) {
            var deferred = $q.defer();
            $http({method: 'GET', url: 'app/data/'+fileName+'.json'})
            .then(function successCallback(res) {
               deferred.resolve(res.data);
            }, function errorCallback(res) {
               deferred.reject(res.data);
            });
            return deferred.promise;
        }
    };
};

