function Bidding() {

}

Bidding.get_winner_price=function(bidding){

    var winner = _.find(bidding, function (list) {
        return list.number == 1
    })
    if( winner!=undefined){
        return winner.price
    }
}

Bidding.winner_phone = function (bidding_list) {
    var price = Bidding.winner_price(bidding_list);
    return _.find(bidding_list, function (list) {
        return list.price == price
    })["phone"]
}

Bidding.winner_name = function (activity_id, bidding_list) {
    var sign_up = SignUp.render_sign_ups(activity_id);
    var phone = Bidding.winner_phone(bidding_list);
    return _.find(sign_up,function (list) {
        return list.phone == phone
    }).name;
}

Bidding.bid_is_or_not_sign_up = function (phone) {
    var activity_name = Activity.current_activity();
    return _.some(SignUp.render_sign_ups(activity_name), function (list) {
        return list.phone == phone
    })
}

Bidding.bid_success = function (json_message) {
    var activity_of_user=user.get_activity_of_user()
    var activity_name = Activity.current_activity();
    var bid_name=Bid.get_bid_start_name()
    var phone = sms.get_phone(json_message);
    var price = sms.get_message(json_message);
    var name =Bidding.get_name(activity_name,phone)["name"]
    activity_of_user["bids"] = _.map(activity_of_user["bids"], function (list) {
        if(list.activity_name == activity_name&&list.bid_name==bid_name){
            list["biddings"].push({name:name,phone:phone,price:price})
        }
        return list
    });

        Bidding.message_analysis(activity_name,bid_name)
        go_to__message_synchronous("synchronous")
}

Bidding.get_name=function(activity_name,phone){
    var Sign_ups=SignUp.render_sign_ups(activity_name)
    return _.find(Sign_ups,function(list){
       return list.phone==phone
    })
}

Bidding.is_or_no_bid_repeat = function (json_message) {
    var phone = sms.get_phone(json_message);
    var activity_of_user=user.get_activity_of_user()
    var all_bid = Bid.get_all_bid(activity_of_user);
    var activity_name = Activity.current_activity();
    var bid_name=Bid.get_bid_start_name()
    var bid_for_activity = _.filter(all_bid, function (list) {
        return list.activity_name == activity_name&&list.bid_name==bid_name
    })
    return _.some(bid_for_activity[0].biddings, function (list) {
        return list.phone == phone;
    })
}

Bidding.bidding_status = function () {
    return Bid.get_bid_start_name==""||Bid.get_bid_start_name()==undefined
}

Bidding.sort_bidding_list=function(activity_name,bid_name){
    var activity_of_user=user.get_activity_of_user()
    var bid_of_activity=activity_of_user["bids"]
    activity_of_user["bids"]=_.map(bid_of_activity,function(list){
        if(list["activity_name"]==activity_name&&list["bid_name"]==bid_name){
           list['biddings']= Bid.sort_bidding(list["biddings"])
        }
        return list
    })
    user.save_activity_of_user(activity_of_user)
}

Bid.sort_bidding=function(bidding_list){
    return _.sortBy(bidding_list,function(list){
       return list.price
    })

}

Bidding.bidding_list=function(activity_name,bid_name){
    var activity_of_user=user.get_activity_of_user()
    var bid_of_activity=activity_of_user["bids"]
    return _.find(bid_of_activity,function(list){
        return list["activity_name"]==activity_name&&list["bid_name"]==bid_name
    })["biddings"]
}

Bidding.message_analysis=function(activity_name,bid_name){
    console.log("3")
    var activity_of_user=user.get_activity_of_user()
    var bid_of_activity=activity_of_user["bids"]
    activity_of_user["bids"]=_.map(bid_of_activity,function(list){
        if(list["activity_name"]==activity_name&&list["bid_name"]==bid_name){
            list['analysis']= Bidding.groupby_bidding(list["biddings"])
        }
        console.log(list["bid_name"])
        console.log(list["analysis"])
        return list
    })
    user.save_activity_of_user(activity_of_user)
}

Bidding.groupby_bidding=function(bidding_list){
    var group_by_price = _.groupBy(bidding_list, function (list) {
        return list.price
    })
    var price_and_number = [];
    _.map(group_by_price, function (value, key) {
        price_and_number.push({"price": key, "number": value.length})
    })
   return price_and_number;
}

Bidding.sorting=function(activity_name,bid_name){
    var analysis= Bidding.get_analysis(activity_name,bid_name);
    if(Bidding.get_winner_price(analysis)==null){
        Bidding.save_sorting(activity_name,bid_name,"竞价失败")
        return "竞价失败"
    }
    var winner=Bidding.get_winner(activity_name,bid_name,Bidding.get_winner_price(analysis))
    var sort="竞价结果："+"恭喜"+winner.name+"，以￥"+winner.price+"成功竞拍，"+"电话号"+winner.phone
    Bidding.save_sorting(activity_name,bid_name,winner)
    return sort
}

Bidding.get_analysis=function(activity_name,bid_name){
    var activity_of_user=user.get_activity_of_user()
    return _.find(activity_of_user["bids"],function(list){
        return list["activity_name"]==activity_name&&list["bid_name"]==bid_name
    })["analysis"]
}

Bidding.get_winner=function(activity_name,bid_name,price){
    var activity_of_user=user.get_activity_of_user()
    var bidding=_.find(activity_of_user["bids"],function(list){
        return list["activity_name"]==activity_name&&list["bid_name"]==bid_name
    })["biddings"]
    return _.find(bidding,function(list){
        return list["price"]=price
    })
}

Bidding.save_sorting=function(activity_name,bid_name,winner){
    var activity_of_user=user.get_activity_of_user()
     activity_of_user["bids"]=_.map(activity_of_user["bids"],function(list){
        if(list["activity_name"]==activity_name&&list["bid_name"]==bid_name){
           list["sorting"]=winner
        }
        return list
    })
    user.save_activity_of_user(activity_of_user);
}



