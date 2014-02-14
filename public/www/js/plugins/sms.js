
//var native_accessor = {
//
//    send_sms: function (phone, message) {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
//    },
//
//    receive_message: function (json_message) {
//        console.log(JSON.stringify(json_message));
//        if (typeof this.process_received_message === 'function') {
//            this.process_received_message(json_message);
//        }
//    }
//
//};

function notify_message_received(message_json) {
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}
function notify_sms_received(json_message) {
    native_accessor.receive_message(json_message);
}

var native_accessor = {
    process_received_message: function (json_message) {
        judge_and_process_received_apply_message(json_message);
    },

    receive_message: function (json_message) {

        if (typeof this.process_received_message === 'function') {

            this.process_received_message(json_message);
        }
    }
};

function judge_and_process_received_apply_message(json_message) {
    var temp_message = json_message.messages[0].message;

    if (temp_message.substr(0, 2).toUpperCase() == 'BM') {
        sms.is_or_no_signing_up(json_message);
    }
    if (temp_message.substr(0, 2).toUpperCase() == 'JJ') {
        sms.is_or_no_bidding(json_message);
    }
}

function sms() {

}

sms.get_message = function (json_message) {
    var temp_message = json_message.messages[0].message.replace(/\s/g, "");
    var message = temp_message.substr(2);
    return message;
}

sms.get_phone = function (json_message) {
    var phone = json_message.messages[0].phone;
    return phone;
}

sms.sign_up_status = function () {
    var activity_of_user=user.get_activity_of_user()

    return  activity_of_user["current_activity"]!=null&&activity_of_user["current_bid"]==null
}

sms.is_or_no_signing_up = function (json_message) {
    var is_signing_up = sms.sign_up_status();
    if (is_signing_up == false) {
        return  sms.sign_up_is_or_no_repeat(json_message);
    }
//    return  send
}

sms.sign_up_is_or_no_repeat = function (json_message) {
    var phone = sms.get_phone(json_message);
    if (!SignUp.sign_ups_is_or_repeat(phone)) {
        return sms.sign_up_success(json_message);
    }
//    return send;
}

sms.sign_up_success = function (json_message) {
    SignUp.add_sign_up(json_message);
    go_to_act_detail_page_by_name_of("auction")

}

sms.is_or_no_bidding = function (json_message) {
    var is_bidding = Bidding.bidding_status();
    if (!(is_bidding ==true)) {
        return sms.is_or_no_sign_up(json_message);
    }
    //    return send;
}

sms.is_or_no_sign_up = function (json_message) {
    var phone = sms.get_phone(json_message);
    if (Bidding.bid_is_or_not_sign_up(phone)!=false) {
        return sms.is_or_no_bid_repeat(json_message)
    }
//    return:send;
}

sms.is_or_no_bid_repeat = function (json_message) {
    if (Bidding.is_or_no_bid_repeat(json_message)==false) {
         Bidding.bid_success(json_message);
        go_to_act_detail_page_by_name_of("bidder_list")

    }
//    return ;
}

go_to_act_detail_page_by_name_of = function (act_name) {
    var page_jump_or_not = document.getElementById(act_name)
    if (page_jump_or_not) {
        var scope = angular.element(page_jump_or_not).scope();
        scope.$apply(function () {
            scope.data_refresh();
        })
    }
}

go_to__message_synchronous = function (act_name) {
    var page_jump_or_not = document.getElementById(act_name)
    if (page_jump_or_not) {
        var scope = angular.element(page_jump_or_not).scope();
        scope.$apply(function () {
            scope.data_synchronous();
        })
    }
}