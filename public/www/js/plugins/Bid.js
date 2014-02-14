function Bid(bid_name, activity_name) {
    this.bid_name = bid_name;
    this.activity_name = activity_name;
    this.biddings = [];
    this.analysis=[];
    this.status='';
    this.sort={};
}

Bid.get_all_bid = function (activity_of_user) {
    return activity_of_user["bids"]
}

//Bid.create_new_bid = function (activity_id) {
//    var all_bid = Bid.get_all_bid();
//    var name = Bid.create_new_bid_name(activity_id);
//    all_bid.push({name: name, activity_id: activity_id, biddings: []})
//    localStorage.setItem("bids", JSON.stringify(all_bid));
//}

Bid.get_all_bid_of_activity=function(all_bid,activity_name){
    return _.filter(all_bid,function(list){
        return list["activity_name"]==activity_name;
    })
}

Bid.create_new_bid_name = function (activity_name) {
    var activity_of_user=user.get_activity_of_user()
    var all_bid = Bid.get_all_bid(activity_of_user);
    var all_bid_of_activity=Bid.get_all_bid_of_activity(all_bid,activity_name)
    var count = all_bid_of_activity.length + 1;
    return "竞价" + count;
}
//
//Bid.create_new_bid_activity_name = function (activity_id) {
//    var all_activity = Activity.get_all_activity();
//    var activity = _.find(all_activity, function (list) {
//        return list.activity_id == activity_id
//    })
//    return activity[0].name;
//}

//Bid.render_bids = function (activity_id) {
//    var activity_id = Activity.current_activity();
//    var all_bid = Bid.get_all_bid();
//    var bid_for_activity = Bid.bid_for_activity(activity_id, all_bid)
//    var group_price = _.groupBy(bid_for_activity, function (list) {
//        return list.name
//    })
//    var list_bid_name = [];
//    _.map(group_price, function (value, key) {
//        list_bid_name.push({"name": key, "number": value.length})
//    })
//    return list_bid_name;
//}

//Bid.bid_for_activity = function (activity_id, all_bid) {
//    var bid_for_activity = _.filter(all_bid, function (list) {
//        return list.activity_id == activity_id;
//    })
//    return bid_for_activity;
//}

Bid.get_bid_start_name=function(){
    var activity_of_user =user.get_activity_of_user()
    return activity_of_user["current_bid"]
}

Bid.list_auction_name_and_activity_name=function(activity_name){
    var activity_of_user=user.get_activity_of_user()
    var all_bid=Bid.get_all_bid(activity_of_user)
    return Bid.get_all_bid_of_activity(all_bid,activity_name)
}

Bid.add_auction=function(activity_name){
    var activity_of_user=user.get_activity_of_user()
    var all_bid = Bid.get_all_bid(activity_of_user);
    var name = Bid.create_new_bid_name(activity_name);
    all_bid.push({bid_name: name, activity_name: activity_name,status:"start", biddings: [],sort:""})
    user.save_activity_of_user(activity_of_user)
    return  Bid.create_current_bid(name)
}

Bid.create_current_bid=function(name){
    var activity_of_user=user.get_activity_of_user()
    activity_of_user["current_bid"]=name
    user.save_activity_of_user(activity_of_user)
    return Bid.create_now_bid(name)
}

Bid.create_now_bid=function(name){
    var activity_of_user=user.get_activity_of_user()
    activity_of_user["now_bid"]=name
    user.save_activity_of_user(activity_of_user)
}

Bid.get_now_bid_name=function(){
    var activity_of_user =user.get_activity_of_user()
    return activity_of_user["now_bid"]
}

Bid.get_status=function(activity_name,bid_name){
    var activity_of_user=user.get_activity_of_user()
    return _.find(activity_of_user["bids"],function(list){
        return list["activity_name"]==activity_name&&list["bid_name"]==bid_name;
    })["status"]
}

Bid.change_status=function(activity_name,bid_name,status){
    var activity_of_user=user.get_activity_of_user()
    activity_of_user["bids"]=_.map(activity_of_user["bids"],function(list){
        if(list["activity_name"]==activity_name&&list["bid_name"]==bid_name){
            list["status"]=status
        }
        return list
    })
    user.save_activity_of_user(activity_of_user);
}

Bid.destroy_current_activity=function(){
    var activity_of_user=user.get_activity_of_user()
    activity_of_user["current_bid"]=""
    user.save_activity_of_user(activity_of_user);
}

