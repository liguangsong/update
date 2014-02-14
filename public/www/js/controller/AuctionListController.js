function AuctionListController($scope, $navigate,$timeout,$http) {

    var activity_name=Activity.get_now_activity_name();
    var bid_start_name=Bid.get_bid_start_name();
    var activity_name_apply_start=Activity.current_activity();
    $scope.is_able=!(bid_start_name==""&&activity_name_apply_start=="");

    function list_loading(){
        $scope.auction_list=Bid.list_auction_name_and_activity_name(activity_name);
    }

    $scope.go_to_auction_list=function(){
        Bid.add_auction(activity_name);
        Activity.activity_status_change(activity_name, "start_bid")
        Activity.create_activity_start(activity_name)
        $scope.data_synchronous()
        $navigate.go("/bidder_list");
    }

    $scope.go_to_auction_apply_list=function(list){
        var auction_name=list.bid_name;
        Bid.create_now_bid(auction_name);
        $navigate.go("/bidder_list");
    }

    $scope.go_to_activity_list=function(){
        $navigate.go("/activity_list");
    }

    $scope.go_to_auction=function(){
       $navigate.go("/auction")
    }
    list_loading();
    $scope.data_synchronous=function(){
        synchronous($http)
    }
}