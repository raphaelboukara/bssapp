app.factory('Client', ['$resource', function($resource) {

  function Client() {
    this.service = $resource('/api/clients/:clientId', {clientId: '@id'});
  };

  Client.prototype.all = function() {
    return this.service.query();
  };

  Client.prototype.delete = function(stId) {
    this.service.remove({clientId: stId});
  };

  return new Client;
}]);