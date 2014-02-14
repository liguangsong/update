function BidderListController($scope, $navigate, $timeout,$http) {
    var list_activity_name = Activity.get_now_activity_name();
    $scope.list_auction_name = Bid.get_now_bid_name();

    function pop_out() {
        $scope.pop_out_modal = true;
        $scope.footer_show = false;
        $timeout(function () {
            $scope.pop_out_modal = false;
            $scope.footer_show = true;
        }, 3000);
    }

    function button() {
        $scope.footer_show = (Bid.get_status(list_activity_name, $scope.list_auction_name) == "stop");
        $scope.bidder_list_show = true
        $scope.statistics_show = (Bid.get_status(list_activity_name, $scope.list_auction_name) == "stop");
        $scope.list_show = false;
    }

    $scope.data_refresh = function () {
        $scope.bidder_list_show = true;
        if (Bid.get_status(list_activity_name, $scope.list_auction_name) == "stop") {
            Bidding.sort_bidding_list(list_activity_name, $scope.list_auction_name);
            Bidding.message_analysis(list_activity_name, $scope.list_auction_name);
            $scope.list_price_and_number = Bidding.get_analysis(list_activity_name, $scope.list_auction_name)
            $scope.sort = Bidding.sorting(list_activity_name, $scope.list_auction_name);
        }
        $scope.bidder_list_name_and_phone_and_price = Bidding.bidding_list(list_activity_name, $scope.list_auction_name)

        $scope.number = $scope.bidder_list_name_and_phone_and_price.length;
    }

    $scope.statistics = function () {
        $scope.bidder_list_show = false;
        $scope.list_show = true;
        $scope.statistics_show = false;
    }

    $scope.list = function () {
        $scope.bidder_list_show = true;
        $scope.statistics_show = true;
        $scope.list_show = false;
    }

    $scope.back = function () {
        $navigate.go("/auction_list");
    }

    $scope.stop_bid = function () {
        var r = confirm("是否结束竞价？");
        if (r == true) {
            Activity.activity_status_change(list_activity_name, "stop");
            Bid.change_status(list_activity_name, $scope.list_auction_name, "stop");
//            Auction.list_auction_name_and_activity_name(list_activity_name);
            Bid.destroy_current_activity();
            Activity.destroy_activity_start();
            $scope.data_refresh();
            $scope.sort = Bidding.sorting(list_activity_name, $scope.list_auction_name);
            pop_out();
            button();
            $scope.data_synchronous()
        }
    }

    $scope.data_refresh();
    button();
    $scope.data_synchronous=function(){
        synchronous($http)
    }
}