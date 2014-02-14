function SignUp(name, phone, activity_name) {
    this.name = name;
    this.phone = phone;
    this.activity_name = activity_name;
}

SignUp.find_all_sign_ups = function () {
    var activity_of_user=user.get_activity_of_user()
    return activity_of_user['sign_up'];
}

SignUp.render_sign_ups = function (activity_name) {
    var sign_ups = SignUp.find_all_sign_ups();
    var sign_up = _.filter(sign_ups, function (list) {
        return list.activity_name == activity_name
    })
    return sign_up;
}

SignUp.prototype.create = function () {
    var sign_ups = SignUp.find_all_sign_ups();
    sign_ups.push(this);
    SignUp.save_sign_up(sign_ups);
}

SignUp.add_sign_up = function (json_message) {
    var name = sms.get_message(json_message);
    var phone = sms.get_phone(json_message);
    var activity_name = Activity.current_activity();
    var sign_up = new SignUp(name, phone, activity_name);
    sign_up.create();
    go_to__message_synchronous("synchronous")
}

SignUp.sign_ups_is_or_repeat = function (phone) {

    var current_activity = Activity.current_activity();
    var sign_ups = SignUp.render_sign_ups(current_activity);
    return _.some(sign_ups, function (list) {
        return list.phone == phone
    })
}

SignUp.save_sign_up=function(sign_ups){
    var activity_of_user=user.get_activity_of_user()
    activity_of_user["sign_up"]=sign_ups;
    user.save_activity_of_user(activity_of_user);
}