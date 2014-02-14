myModule.config(function($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl: "pages/creat_activity.html",
            controller: CreatActivityController
        }).when("/activity_list", {
            templateUrl: "pages/activity_list.html",
            controller:ActivityListController
        }). when("/auction", {
            templateUrl: "pages/auction.html",
            controller:AuctionController
        }). when("/auction_list", {
            templateUrl: "pages/auction_list.html",
            controller:AuctionListController
        }). when("/bidder_list", {
            templateUrl: "pages/bidder_list.html",
            controller:BidderListController
        }).
        otherwise({
            redirectTo: "/"
        });
});