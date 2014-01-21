app.controller('ClientsCtrl', ['$scope', '$filter', 'Client', function($scope, $filter, Client) {


	$scope.master = {"name": "", "email": ""};
	$scope.client = angular.copy($scope.master);

	$scope.sortingOrder = 'name';
    $scope.reverse = false;
    $scope.filteredClients = [];
    $scope.groupedClients = [];
    $scope.clientsPerPage = 4;
    $scope.pagedClients = [];
    $scope.currentPage = 0;
	$scope.clients = Client.all();

	

    

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedClients.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.search = function () {
        $scope.filteredClients = $filter('filter')($scope.clients, function (client) {
            for(var attr in client) {
                if(searchMatch(client[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredClients = $filter('orderBy')($scope.filteredClients, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

    var searchMatch = function (haystack, needle) {
        if (!needle) 
        {
            return true;
        }
        return String(haystack).toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    $scope.groupToPages = function () {
        $scope.pagedClients = [];
        
        for (var i = 0; i < $scope.filteredClients.length; i++) {
            if (i % $scope.clientsPerPage === 0) {
                $scope.pagedClients[Math.floor(i / $scope.clientsPerPage)] = [ $scope.filteredClients[i] ];
            } else {
                $scope.pagedClients[Math.floor(i / $scope.clientsPerPage)].push($scope.filteredClients[i]);
            }
        }
    };

    $scope.search();


	$scope.createClient = function(client) {
		Client.service.save(
				client,
				function(data){
					$scope.clients.push(data);
					console.log(data);
					$scope.client = angular.copy($scope.master);
				},
				function(error){
					jQuery.extend(client, error.data);
				}
			);
	};


	$scope.deleteClient = function(id, idx) {
		$scope.clients.splice(idx, 1);
		return Client.delete(id);
	};


}]);